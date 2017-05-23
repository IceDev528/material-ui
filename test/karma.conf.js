// @flow weak
const path = require('path');

const browserStack = {
  username: process.env.BROWSERSTACK_USERNAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  build: `material-ui-${new Date().toISOString()}`,
};

// Karma configuration
module.exports = function setKarmaConfig(config) {
  const baseConfig = {
    basePath: '../',
    browsers: ['PhantomJS_Sized'],
    // to avoid DISCONNECTED messages on travis
    browserDisconnectTimeout: 60000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 300000, // default 10000
    colors: true,
    frameworks: ['mocha'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      {
        pattern: 'test/karma.tests.js',
        watched: true,
        served: true,
        included: true,
      },
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
    ],
    /**
     * possible values:
     * - config.LOG_DISABLE
     * - config.LOG_ERROR
     * - config.LOG_WARN
     * - config.LOG_INFO
     * - config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/karma.tests.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              cacheDirectory: true,
            },
          },
        ],
        noParse: [/node_modules\/sinon\//],
      },
      resolve: {
        alias: {
          'material-ui': path.resolve(__dirname, '../src'),
          sinon: 'sinon/pkg/sinon.js',
        },
        extensions: ['.js'],
        modules: [path.join(__dirname, '../'), 'node_modules'],
      },
      externals: {
        jsdom: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window',
        'react/addons': true, // For enzyme
      },
      node: {
        fs: 'empty',
      },
    },
    webpackServer: {
      noInfo: true,
    },
    customLaunchers: {
      PhantomJS_Sized: {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            // Matches JSDom size.
            width: 1024,
            height: 768,
          },
        },
      },
    },
  };

  let newConfig = baseConfig;

  if (browserStack.accessKey) {
    newConfig = Object.assign({}, baseConfig, {
      browserStack,
      browsers: baseConfig.browsers.concat([
        'BrowserStack_Chrome',
        'BrowserStack_Firefox',
        'BrowserStack_Safari',
        // 'BrowserStack_IE',
      ]),
      plugins: baseConfig.plugins.concat(['karma-browserstack-launcher']),
      customLaunchers: Object.assign({}, baseConfig.customLaunchers, {
        BrowserStack_Chrome: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Sierra',
          browser: 'chrome',
          browser_version: 'latest',
        },
        BrowserStack_Firefox: {
          base: 'BrowserStack',
          os: 'Windows',
          os_version: '10',
          browser: 'firefox',
          browser_version: 'latest',
        },
        BrowserStack_Safari: {
          base: 'BrowserStack',
          os: 'OS X',
          os_version: 'Yosemite',
          browser: 'safari',
          browser_version: 'latest',
        },
        // BrowserStack_IE: {
        //   base: 'BrowserStack',
        //   os: 'Windows',
        //   os_version: '10',
        //   browser: 'edge',
        //   browser_version: 'latest',
        // },
      }),
    });
  }

  config.set(newConfig);
};
