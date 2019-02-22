/* eslint-disable no-console */
const fse = require('fs-extra');
const path = require('path');
const getSize = require('size-limit');
const { flatten, fromPairs } = require('lodash');

const workspaceRoot = path.join(__dirname, '../');
const snapshotDestPath = path.join(workspaceRoot, 'size-snapshot.json');

/**
 * @param {object} snapshot snaphot generated by rollup-plugin-size-snapshot
 * @returns {object} size snapshot with the same format as a snapshot from size-limit
 */
function normalizeRollupSnapshot(snapshot) {
  return { parsed: snapshot.minified, gzip: snapshot.gzipped };
}

async function getRollupSize(snapshotPath) {
  const rollupSnapshot = await fse.readJSON(snapshotPath);

  return Object.entries(rollupSnapshot).map(([bundlePath, snapshot]) => [
    // path in the snapshot is relative the snapshot itself
    path.relative(workspaceRoot, path.join(path.dirname(snapshotPath), bundlePath)),
    normalizeRollupSnapshot(snapshot),
  ]);
}

/**
 * creates size snapshot for every bundle that is analyzed by `size-limit`
 * @param {object} bundles
 */
function getSizeLimitSizes(bundles) {
  return bundles.map(async bundle => [
    bundle.name,
    await getSize(path.join(workspaceRoot, bundle.path)),
  ]);
}

async function getSizeLimitBundles() {
  const buildId = await fse.readFile('.next/BUILD_ID', 'utf8');

  const dirname = '.next/static/chunks';
  const [main] = (await fse.readdir(dirname)).reduce((result, filename) => {
    if (filename.length === 31) {
      return [...result, { path: `${dirname}/${filename}` }];
    }

    return result;
  }, []);

  return [
    {
      name: '@material-ui/core/Paper',
      webpack: true,
      path: 'packages/material-ui/build/Paper/index.js',
    },
    {
      name: '@material-ui/core/Paper.esm',
      webpack: true,
      path: 'packages/material-ui/build/esm/Paper/index.js',
    },
    {
      name: '@material-ui/core',
      webpack: true,
      path: 'packages/material-ui/build/index.js',
    },
    {
      name: '@material-ui/core/styles/createMuiTheme',
      webpack: true,
      path: 'packages/material-ui/build/styles/createMuiTheme.js',
    },
    {
      name: '@material-ui/lab',
      webpack: true,
      path: 'packages/material-ui-lab/build/index.js',
    },
    {
      name: '@material-ui/styles',
      webpack: true,
      path: 'packages/material-ui-styles/build/index.js',
    },
    {
      name: '@material-ui/system',
      webpack: true,
      path: 'packages/material-ui-system/build/index.js',
    },
    {
      name: 'colorManipulator',
      webpack: true,
      path: 'packages/material-ui/build/styles/colorManipulator.js',
    },
    {
      // why we use esm here: https://github.com/mui-org/material-ui/pull/13391#issuecomment-459692816
      name: 'Button',
      webpack: true,
      path: 'packages/material-ui/build/esm/Button/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-modal
      name: 'Modal',
      webpack: true,
      path: 'packages/material-ui/build/esm/Modal/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-popper
      name: '@material-ui/core/Popper',
      webpack: true,
      path: 'packages/material-ui/build/esm/Popper/index.js',
    },
    {
      // vs https://bundlephobia.com/result?p=react-responsive
      // vs https://bundlephobia.com/result?p=react-media
      name: '@material-ui/core/useMediaQuery',
      webpack: true,
      path: 'packages/material-ui/build/useMediaQuery/index.js',
    },
    {
      name: 'docs.main',
      webpack: false,
      path: main.path,
    },
    {
      name: 'docs.landing',
      webpack: false,
      path: `.next/static/${buildId}/pages/index.js`,
    },
  ];
}

async function run() {
  const rollupBundles = [path.join(workspaceRoot, 'packages/material-ui/size-snapshot.json')];
  const sizeLimitBundles = await getSizeLimitBundles();

  const bundleSizes = fromPairs(
    await Promise.all([
      ...getSizeLimitSizes(sizeLimitBundles),
      ...flatten(await Promise.all(rollupBundles.map(getRollupSize))),
    ]),
  );

  await fse.writeJSON(snapshotDestPath, bundleSizes, { spaces: 2 });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
