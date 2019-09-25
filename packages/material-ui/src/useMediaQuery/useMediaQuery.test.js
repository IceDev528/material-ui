import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { act, createClientRender } from 'test/utils/createClientRender';
import { createRender } from '@material-ui/core/test-utils';
import mediaQuery from 'css-mediaquery';
import { expect } from 'chai';
import { spy } from 'sinon';
import useMediaQuery, { testReset } from './useMediaQuery';

function createMatchMedia(width, ref) {
  const listeners = [];
  return query => {
    const instance = {
      matches: mediaQuery.match(query, {
        width,
      }),
      addListener: listener => {
        listeners.push(listener);
      },
      removeListener: listener => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      },
    };
    ref.push({
      instance,
      listeners,
    });
    return instance;
  };
}

describe('useMediaQuery', () => {
  // Only run the test on node.
  // Waiting for https://github.com/facebook/react/issues/14050
  if (!/jsdom/.test(window.navigator.userAgent)) {
    return;
  }

  const render = createClientRender({ strict: true });
  let values;

  beforeEach(() => {
    testReset();
    values = spy();
  });

  describe('without feature', () => {
    it('should work without window.matchMedia available', () => {
      expect(typeof window.matchMedia).to.equal('undefined');
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = () => {
        const matches = useMediaQuery('(min-width:100px)');
        return <span ref={ref}>{`${matches}`}</span>;
      };

      render(<Test />);
      expect(text()).to.equal('false');
    });
  });

  describe('with feature', () => {
    let matchMediaInstances;

    beforeEach(() => {
      matchMediaInstances = [];
      window.matchMedia = createMatchMedia(1200, matchMediaInstances);
    });

    describe('option: defaultMatches', () => {
      it('should be false by default', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)');
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        render(<Test />);
        expect(text()).to.equal('false');
        expect(values.callCount).to.equal(1);
      });

      it('should take the option into account', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        render(<Test />);
        expect(text()).to.equal('false');
        expect(values.callCount).to.equal(2);
      });
    });

    describe('option: noSsr', () => {
      it('should render once if the default value match the expectation', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: false,
          });
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        render(<Test />);
        expect(text()).to.equal('false');
        expect(values.callCount).to.equal(1);
      });

      it('should render twice if the default value does not match the expectation', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        render(<Test />);
        expect(text()).to.equal('false');
        expect(values.callCount).to.equal(2);
      });

      it('should render once if the default value does not match the expectation', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
            noSsr: true,
          });
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        render(<Test />);
        expect(text()).to.equal('false');
        expect(values.callCount).to.equal(1);
      });
    });

    it('should try to reconcile only the first time', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = () => {
        const matches = useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
        });
        React.useEffect(() => values(matches));
        return <span ref={ref}>{`${matches}`}</span>;
      };

      const { unmount } = render(<Test />);
      expect(text()).to.equal('false');
      expect(values.callCount).to.equal(2);

      unmount();

      render(<Test />);
      expect(text()).to.equal('false');
      expect(values.callCount).to.equal(3);
    });

    it('should be able to change the query dynamically', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = props => {
        const matches = useMediaQuery(props.query, {
          defaultMatches: true,
        });
        React.useEffect(() => values(matches));
        return <span ref={ref}>{`${matches}`}</span>;
      };
      Test.propTypes = {
        query: PropTypes.string.isRequired,
      };

      const { setProps } = render(<Test query="(min-width:2000px)" />);
      expect(text()).to.equal('false');
      expect(values.callCount).to.equal(2);
      setProps({ query: '(min-width:100px)' });
      expect(text()).to.equal('true');
      expect(values.callCount).to.equal(4);
    });

    it('should observe the media query', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = props => {
        const matches = useMediaQuery(props.query);
        React.useEffect(() => values(matches));
        return <span ref={ref}>{`${matches}`}</span>;
      };
      Test.propTypes = {
        query: PropTypes.string.isRequired,
      };

      render(<Test query="(min-width:2000px)" />);
      expect(values.callCount).to.equal(1);
      expect(text()).to.equal('false');

      act(() => {
        matchMediaInstances[0].instance.matches = true;
        matchMediaInstances[0].listeners[0]();
      });
      expect(text()).to.equal('true');
      expect(values.callCount).to.equal(2);
    });
  });

  describe('server-side', () => {
    let serverRender;

    before(() => {
      serverRender = createRender();
    });

    it('should use the ssr match media ponyfill', () => {
      const ref = React.createRef();
      function MyComponent() {
        const matches = useMediaQuery('(min-width:2000px)');
        values(matches);
        return <span ref={ref}>{`${matches}`}</span>;
      }

      const Test = () => {
        const ssrMatchMedia = query => ({
          matches: mediaQuery.match(query, {
            width: 3000,
          }),
        });

        return (
          <ThemeProvider theme={{ props: { MuiUseMediaQuery: { ssrMatchMedia } } }}>
            <MyComponent />
          </ThemeProvider>
        );
      };

      const markup = serverRender(<Test />);
      expect(markup.text()).to.equal('true');
      expect(values.callCount).to.equal(1);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      PropTypes.resetWarningCache();
    });

    it('warns on invalid `query` argument', () => {
      function MyComponent() {
        useMediaQuery(() => '(min-width:2000px)');
        return null;
      }

      render(<MyComponent />);
      expect(consoleErrorMock.args()[0][0]).to.include('the `query` argument provided is invalid');
    });
  });
});
