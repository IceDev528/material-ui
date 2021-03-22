import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TestViewer from './TestViewer';

const fixtures = [];

const requireFixtures = require.context('./tests', true, /\.(js|ts|tsx)$/);
requireFixtures.keys().forEach((path) => {
  const [suite, name] = path
    .replace('./', '')
    .replace(/\.\w+$/, '')
    .split('/');
  fixtures.push({
    path,
    suite: `e2e/${suite}`,
    name,
    case: requireFixtures(path).default,
  });
});

function App() {
  function computeIsDev() {
    if (window.location.hash === '#dev') {
      return true;
    }
    if (window.location.hash === '#no-dev') {
      return false;
    }
    return process.env.NODE_ENV === 'development';
  }
  const [isDev, setDev] = React.useState(computeIsDev);
  React.useEffect(() => {
    function handleHashChange() {
      setDev(computeIsDev());
    }
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  function computePath(test) {
    return `/${test.suite}/${test.name}`;
  }

  return (
    <Router>
      <Switch>
        {fixtures.map((test) => {
          const path = computePath(test);
          const TestCase = test.case;
          if (TestCase === undefined) {
            console.warn('Missing test.case for ', test);
            return null;
          }

          return (
            <Route key={path} exact path={path}>
              <TestViewer>
                <TestCase />
              </TestViewer>
            </Route>
          );
        })}
      </Switch>
      <div hidden={!isDev}>
        <p>
          Devtools can be enabled by appending <code>#dev</code> in the addressbar or disabled by
          appending <code>#no-dev</code>.
        </p>
        <a href="#no-dev">Hide devtools</a>
        <details>
          <summary id="my-test-summary">nav for all tests</summary>
          <nav id="tests">
            <ol>
              {fixtures.map((test) => {
                const path = computePath(test);
                return (
                  <li key={path}>
                    <Link to={path}>{path}</Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </details>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('react-root'));
