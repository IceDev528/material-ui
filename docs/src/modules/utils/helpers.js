const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const { CODE_VARIANTS, SOURCE_CODE_REPO, LANGUAGES } = require('../constants');

/**
 * Mapping from the date adapter sub-packages to the npm packages they require.
 * @example `@material-ui/lab/AdapterDateFns` has a peer dependency on `date-fns`.
 */
const dateAdapterPackageMapping = {
  AdapterDateFns: 'date-fns',
  AdapterDayjs: 'dayjs',
  AdapterLuxon: 'luxon',
  AdapterMoment: 'moment',
};

function titleize(string) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof string !== 'string' || string.length <= 0) {
      console.error('titleize(string) expects a non empty string argument.');
    }
  }

  return string
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function pageToTitle(page) {
  if (page.title === false) {
    return null;
  }

  if (page.title) {
    return page.title;
  }

  const path = page.subheader || page.pathname;
  const name = path.replace(/.*\//, '');

  if (path.indexOf('/api') === 0) {
    return upperFirst(camelCase(name));
  }

  return titleize(name);
}

function pageToTitleI18n(page, t) {
  const path = page.subheader || page.pathname;
  return t(`pages.${path}`, { ignoreWarning: true }) || pageToTitle(page);
}

/**
 * @var
 * set of packages that ship their own typings instead of using @types/ namespace
 * Array because Set([iterable]) is not supported in IE11
 */
const packagesWithBundledTypes = ['date-fns', '@emotion/react', '@emotion/styled'];

/**
 * WARNING: Always uses `latest` typings.
 *
 * Adds dependencies to @types packages only for packages that are not listed
 * in packagesWithBundledTypes
 *
 * @see packagesWithBundledTypes in this module namespace
 * @param {Record<string, string>} deps - list of dependency as `name => version`
 */
function addTypeDeps(deps) {
  const packagesWithDTPackage = Object.keys(deps)
    .filter((name) => packagesWithBundledTypes.indexOf(name) === -1)
    // All the Material-UI packages come with bundled types
    .filter((name) => name.indexOf('@material-ui/') !== 0);

  packagesWithDTPackage.forEach((name) => {
    let resolvedName = name;
    // scoped package?
    if (name.startsWith('@')) {
      // https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
      resolvedName = name.slice(1).replace('/', '__');
    }

    deps[`@types/${resolvedName}`] = 'latest';
  });
}

function includePeerDependencies(deps, versions) {
  let newDeps = {
    ...deps,
    'react-dom': versions['react-dom'],
    react: versions.react,
    '@emotion/react': versions['@emotion/react'],
    '@emotion/styled': versions['@emotion/styled'],
  };

  if (newDeps['@material-ui/lab']) {
    newDeps['@material-ui/core'] = versions['@material-ui/core'];
  }

  if (window.muiDocConfig) {
    newDeps = window.muiDocConfig.csbIncludePeerDependencies(newDeps, { versions });
  }

  return newDeps;
}

/**
 * @param {string} packageName - The name of a package living inside this repository.
 * @param {string} [commitRef]
 * @return string - A valid version for a dependency entry in a package.json
 */
function getMuiPackageVersion(packageName, commitRef) {
  if (commitRef === undefined || SOURCE_CODE_REPO !== 'https://github.com/mui-org/material-ui') {
    // TODO: change 'next' to 'latest' once next is merged into master.
    return 'next';
  }
  const shortSha = commitRef.slice(0, 8);
  return `https://pkg.csb.dev/mui-org/material-ui/commit/${shortSha}/@material-ui/${packageName}`;
}

/**
 * @param {string} raw - ES6 source with es module imports
 * @param {object} options
 * @param {'JS' | 'TS'} [options.codeLanguage] -
 * @param {string} [options.muiCommitRef] - If specified use `@material-ui/*` packages from a specific commit.
 * @returns {Record<string, 'latest'>} map of packages with their required version
 */
function getDependencies(raw, options = {}) {
  const { codeLanguage = CODE_VARIANTS.JS, muiCommitRef } = options;

  let deps = {};
  let versions = {
    react: 'latest',
    'react-dom': 'latest',
    '@emotion/react': 'latest',
    '@emotion/styled': 'latest',
    '@material-ui/core': getMuiPackageVersion('core', muiCommitRef),
    '@material-ui/icons': getMuiPackageVersion('icons', muiCommitRef),
    '@material-ui/lab': getMuiPackageVersion('lab', muiCommitRef),
    '@material-ui/styled-engine': getMuiPackageVersion('styled-engine', muiCommitRef),
    '@material-ui/styled-engine-sc': getMuiPackageVersion('styled-engine-sc', muiCommitRef),
    '@material-ui/styles': getMuiPackageVersion('styles', muiCommitRef),
    '@material-ui/system': getMuiPackageVersion('system', muiCommitRef),
    '@material-ui/unstyled': getMuiPackageVersion('unstyled', muiCommitRef),
    '@material-ui/utils': getMuiPackageVersion('utils', muiCommitRef),
  };

  if (window.muiDocConfig) {
    versions = window.muiDocConfig.csbGetVersions(versions, { muiCommitRef });
  }

  const re = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)/gm;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(raw))) {
    let name;

    if (m[2]) {
      // full import
      // handle scope names
      name = m[2].charAt(0) === '@' ? m[2].split('/', 2).join('/') : m[2].split('/', 1)[0];
    } else {
      name = m[1];
    }

    if (!deps[name]) {
      deps[name] = versions[name] ? versions[name] : 'latest';
    }

    // e.g date-fns
    const dateAdapterMatch = m[2].match(/^@material-ui\/lab\/(Adapter.*)/);
    if (dateAdapterMatch !== null) {
      const packageName = dateAdapterPackageMapping[dateAdapterMatch[1]];
      if (packageName === undefined) {
        throw new TypeError(
          `Can't determine required npm package for adapter '${dateAdapterMatch[1]}'`,
        );
      }
      deps[packageName] = 'latest';
    }
  }

  deps = includePeerDependencies(deps, versions);

  if (codeLanguage === CODE_VARIANTS.TS) {
    addTypeDeps(deps);
    deps.typescript = 'latest';
  }

  return deps;
}

/**
 * Get the value of a cookie
 * Source: https://vanillajstoolkit.com/helpers/getcookie/
 * @param  {String} name  The name of the cookie
 * @return {String}       The cookie value
 */
function getCookie(name) {
  if (process.browser) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  return undefined;
}

function pathnameToLanguage(pathname) {
  const userLanguage = pathname.substring(1, 3);

  if (LANGUAGES.indexOf(userLanguage) !== -1 && pathname.indexOf(`/${userLanguage}/`) === 0) {
    return {
      userLanguage,
      canonical: userLanguage === 'en' ? pathname : pathname.substring(3),
    };
  }

  return {
    userLanguage: 'en',
    canonical: pathname,
  };
}

module.exports = {
  titleize,
  pageToTitle,
  pageToTitleI18n,
  getDependencies,
  getCookie,
  pathnameToLanguage,
};
