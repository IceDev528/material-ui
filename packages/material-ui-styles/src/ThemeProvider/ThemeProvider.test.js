import React from 'react';
import { assert, expect } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { createClientRender } from 'test/utils/createClientRender';
import makeStyles from '../makeStyles';
import useTheme from '../useTheme';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  let mount;
  const render = createClientRender({ strict: true });

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should provide the theme', () => {
    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = useTheme();

      return <span ref={ref}>{theme.foo}</span>;
    }

    mount(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    assert.strictEqual(text(), 'foo');
  });

  it('should merge the themes', () => {
    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = useTheme();

      return (
        <span ref={ref}>
          {theme.foo}
          {theme.bar}
        </span>
      );
    }

    mount(
      <ThemeProvider theme={{ bar: 'bar' }}>
        <ThemeProvider theme={{ foo: 'foo' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    assert.strictEqual(text(), 'foobar');
  });

  it('should memoize the merged output', () => {
    const themes = [];

    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = useTheme();
      themes.push(theme);

      return (
        <span ref={ref}>
          {theme.foo}
          {theme.bar}
        </span>
      );
    }
    const MemoTest = React.memo(Test);

    const outerTheme = { bar: 'bar' };
    const innerTheme = { foo: 'foo' };

    function Container() {
      return (
        <ThemeProvider theme={outerTheme}>
          <ThemeProvider theme={innerTheme}>
            <MemoTest />
          </ThemeProvider>
        </ThemeProvider>
      );
    }

    const wrapper = mount(<Container />);
    assert.strictEqual(text(), 'foobar');
    wrapper.setProps({});
    assert.strictEqual(text(), 'foobar');
    assert.strictEqual(themes.length, 1);
  });

  it('does not allow setting mui.nested manually', () => {
    if (typeof Symbol === 'undefined') {
      // skip in IE11
      return;
    }

    const useStyles = makeStyles({ root: {} }, { name: 'MuiTest' });
    function Component(props) {
      const classes = useStyles();

      return (
        <div {...props} className={classes.root}>
          Component
        </div>
      );
    }

    const { getByTestId } = render(
      <ThemeProvider theme={{ [Symbol.for('mui.nested')]: true }}>
        <Component data-testid="global" />
        <ThemeProvider theme={{}}>
          <Component data-testid="nested" />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(getByTestId('global')).to.have.class('MuiTest-root');
    expect(getByTestId('nested')).not.to.have.class('MuiTest-root');
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn about missing provider', () => {
      mount(
        <ThemeProvider theme={theme => theme}>
          <div />
        </ThemeProvider>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 2); // twice in strict mode
      assert.include(consoleErrorMock.args()[0][0], 'However, no outer theme is present.');
    });

    it('should warn about wrong theme function', () => {
      mount(
        <ThemeProvider theme={{ bar: 'bar' }}>
          <ThemeProvider theme={() => {}}>
            <div />
          </ThemeProvider>
          ,
        </ThemeProvider>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 2);
      assert.include(
        consoleErrorMock.args()[0][0],
        'you should return an object from your theme function',
      );
    });
  });
});
