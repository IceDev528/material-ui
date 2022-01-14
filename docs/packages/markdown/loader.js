const { promises: fs, readdirSync } = require('fs');
const path = require('path');
const { prepareMarkdown } = require('./parseMarkdown');

const notEnglishMarkdownRegExp = /-([a-z]{2})\.md$/;
// TODO: pass as argument
const LANGUAGES_IN_PROGRESS = ['en', 'zh', 'ru', 'pt', 'es', 'fr', 'de', 'ja'];

/**
 * @param {string} string
 */
function upperCaseFirst(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

/**
 * @param {string} moduleID
 * @example moduleIDToJSIdentifier('./Box.js') === '$$IndexJs'
 * @example moduleIDToJSIdentifier('./Box-new.js') === '$$BoxNewJs'
 * @example moduleIDToJSIdentifier('../Box-new.js') === '$$$BoxNewJs'
 */
function moduleIDToJSIdentifier(moduleID) {
  const delimiter = /(\.|-|\/)/;
  return moduleID
    .split(delimiter)
    .filter((part) => !delimiter.test(part))
    .map((part) => (part.length === 0 ? '$' : part))
    .map(upperCaseFirst)
    .join('');
}

const componentPackageMapping = {
  material: {},
  base: {},
};

const packages = [
  {
    name: 'mui-material',
    product: 'material',
    paths: [
      path.join(__dirname, '../../../packages/mui-lab/src'),
      path.join(__dirname, '../../../packages/mui-material/src'),
      path.join(__dirname, '../../../packages/mui-base/src'),
    ],
  },
  {
    name: 'mui-base',
    product: 'base',
    paths: [path.join(__dirname, '../../../packages/mui-base/src')],
  },
];

packages.forEach((pkg) => {
  pkg.paths.forEach((pkgPath) => {
    const match = pkgPath.match(/packages(?:\\|\/)([^/\\]+)(?:\\|\/)src/);
    const packageName = match ? match[1] : null;
    if (!packageName) {
      throw new Error(`cannot find package name from path: ${pkgPath}`);
    }
    const filePaths = readdirSync(pkgPath);
    filePaths.forEach((folder) => {
      if (folder.match(/^[A-Z]/)) {
        // filename starts with Uppercase = component
        componentPackageMapping[pkg.product][folder] = packageName;
      }
    });
  });
});

/**
 * @type {import('webpack').loader.Loader}
 */
module.exports = async function demoLoader() {
  const englishFilepath = this.resourcePath;

  const englishFilename = path.basename(englishFilepath, '.md');

  const files = await fs.readdir(path.dirname(englishFilepath));
  const translations = await Promise.all(
    files
      .map((filename) => {
        if (filename === `${englishFilename}.md`) {
          return {
            filename,
            userLanguage: 'en',
          };
        }

        const matchNotEnglishMarkdown = filename.match(notEnglishMarkdownRegExp);

        if (
          filename.startsWith(englishFilename) &&
          matchNotEnglishMarkdown !== null &&
          LANGUAGES_IN_PROGRESS.indexOf(matchNotEnglishMarkdown[1]) !== -1
        ) {
          return {
            filename,
            userLanguage: matchNotEnglishMarkdown[1],
          };
        }

        return null;
      })
      .filter((translation) => translation)
      .map(async (translation) => {
        const filepath = path.join(path.dirname(englishFilepath), translation.filename);
        this.addDependency(filepath);
        const markdown = await fs.readFile(filepath, { encoding: 'utf8' });

        return {
          ...translation,
          markdown,
        };
      }),
  );

  const pageFilename = this.context
    .replace(this.rootContext, '')
    // win32 to posix
    .replace(/\\/g, '/')
    .replace(/^\/src\/pages\//, '');
  const { docs } = prepareMarkdown({ pageFilename, translations, componentPackageMapping });

  const demos = {};
  const demoModuleIDs = new Set();
  const demoNames = Array.from(
    new Set(
      docs.en.rendered
        .filter((markdownOrComponentConfig) => {
          return typeof markdownOrComponentConfig !== 'string' && markdownOrComponentConfig.demo;
        })
        .map((demoConfig) => {
          return demoConfig.demo;
        }),
    ),
  );

  await Promise.all(
    demoNames.map(async (demoName) => {
      // TODO: const moduleID = demoName;
      // The import paths currently use a completely different format.
      // They should just use relative imports.
      const moduleID = `./${demoName.replace(`pages/${pageFilename}/`, '')}`;
      const moduleFilepath = path.join(
        path.dirname(this.resourcePath),
        moduleID.replace(/\//g, path.sep),
      );
      this.addDependency(moduleFilepath);
      demos[demoName] = {
        module: moduleID,
        raw: await fs.readFile(moduleFilepath, { encoding: 'utf-8' }),
      };
      demoModuleIDs.add(moduleID);

      try {
        const previewFilepath = moduleFilepath.replace(/\.js$/, '.tsx.preview');

        const jsxPreview = await fs.readFile(previewFilepath, { encoding: 'utf-8' });
        this.addDependency(previewFilepath);

        demos[demoName].jsxPreview = jsxPreview;
      } catch (error) {
        // No preview exists. This is fine.
      }

      try {
        const moduleTS = moduleID.replace(/\.js$/, '.tsx');
        const moduleTSFilepath = path.join(
          path.dirname(this.resourcePath),
          moduleTS.replace(/\//g, path.sep),
        );
        this.addDependency(moduleTSFilepath);
        const rawTS = await fs.readFile(moduleTSFilepath, { encoding: 'utf-8' });

        // In development devs can choose whether they want to work on the TS or JS version.
        // But this leads to building both demo version i.e. more build time.
        demos[demoName].moduleTS = this.mode === 'production' ? moduleID : moduleTS;
        demos[demoName].rawTS = rawTS;
        demoModuleIDs.add(demos[demoName].moduleTS);
      } catch (error) {
        // TS version of the demo doesn't exist. This is fine.
      }
    }),
  );

  /**
   * @param {string} moduleID
   */
  function getDemoIdentifier(moduleID) {
    return moduleIDToJSIdentifier(moduleID);
  }

  const transformed = `
    ${Array.from(demoModuleIDs)
      .map((moduleID) => {
        return `import ${getDemoIdentifier(moduleID)} from '${moduleID}';`;
      })
      .join('\n')}

    export const docs = ${JSON.stringify(docs, null, 2)};
    export const demos = ${JSON.stringify(demos, null, 2)};
    export const demoComponents = {${Array.from(demoModuleIDs)
      .map((moduleID) => {
        return `${JSON.stringify(moduleID)}: ${getDemoIdentifier(moduleID)},`;
      })
      .join('\n')}};
  `;

  return transformed;
};
