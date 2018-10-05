import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

// treat as externals not relative and not absolute paths
const external = id => !id.startsWith('.') && !id.startsWith('/');

const input = './src/index.js';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
};

const getBabelOptions = ({ useESModules }) => ({
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  plugins: [
    ['@babel/transform-runtime', { useESModules }],
  ],
});

const commonjsOptions = {
  include: 'node_modules/**',
  namedExports: {
    'node_modules/moment-range/dist/moment-range.js': ['extendMoment'],
  },
};

export default [
  {
    input,
    external,
    output: {
      file: path.join('build', pkg.main),
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(getBabelOptions({ useESModules: false })),
      sizeSnapshot(),
    ],
  },

  {
    input,
    external,
    output: {
      file: path.join('build', pkg.module),
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(getBabelOptions({ useESModules: true })),
      commonjs(commonjsOptions),
      sizeSnapshot(),
    ],
  },

  {
    input,
    external: Object.keys(globals),
    output: {
      globals,
      format: 'umd',
      name: pkg.name,
      file: 'build/dist/material-ui-pickers.umd.js',
    },

    plugins: [
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(getBabelOptions({ useESModules: true })),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
    ],
  },

  {
    input,
    external: Object.keys(globals),
    output: {
      globals,
      format: 'umd',
      name: pkg.name,
      file: 'build/dist/material-ui-pickers.umd.min.js',
    },
    plugins: [
      resolve({ extensions: ['.js', '.jsx'] }),
      babel(getBabelOptions({ useESModules: true })),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      uglify(),
    ],
  },
];
