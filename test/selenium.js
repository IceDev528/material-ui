/* eslint-disable no-console,global-require,flowtype/require-valid-file-annotation */

const childProcess = require('child_process');
const ngrok = require('ngrok');
const webpack = require('webpack');
const httpServer = require('http-server');

module.exports = runSeleniumTests;

function runSeleniumTests({ local = false, browsers = 'chrome', tests = 'test/e2e', webpackConfig, serverRoot }) {
  const compiler = webpack(webpackConfig);

  const server = httpServer.createServer({ root: serverRoot });

  // Kick it off
  buildSite();

  function buildSite() {
    console.log('Building webpack bundle');

    compiler.run((err) => {
      if (err) {
        throw err;
      }
      bootServer();
    });
  }

  function bootServer() {
    console.log('Booting HTTP server');

    server.listen(8080, () => {
      console.log('Server listening on port 8080');

      childProcess.exec('git rev-parse --short HEAD', (err, stdout) => {
        process.env.MUI_HASH = stdout;
        initLocalTunnel(execTests);
      });
    });
  }

  function initLocalTunnel(cb) {
    ngrok.connect(8080, (err, url) => {
      if (err) {
        throw err;
      } else {
        process.env.SELENIUM_LAUNCH_URL = url;
        console.log(`Connected to ${url}. Now testing...`);
        cb();
      }
    });
  }

  function execTests() {
    const child = childProcess.spawn(
      './node_modules/.bin/nightwatch',
      [
        '-c',
        local ? 'test/nightwatch.local.conf.js' : 'test/nightwatch.conf.js',
        '-e',
        browsers,
        tests,
      ],
      {
        stdio: [0, 0, 0],
      }
    );

    child.on('close', (exitCode) => {
      console.log('closed!', exitCode);
      process.exit(exitCode);
    });

    child.on('error', (childErr) => {
      console.log(childErr);
      throw childErr;
    });
  }

  process.on('exit', cleanUp);
  process.on('SIGINT', cleanUp);
  process.on('uncaughtException', cleanUp);

  function cleanUp() {
    ngrok.disconnect();
    ngrok.kill();
    server.close(() => {
      console.log('Shut down server.');
    });
  }
}
