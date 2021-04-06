import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import CssBaseline from './CssBaseline';
import ThemeProvider from '../styles/ThemeProvider';
import createMuiTheme from '../styles/createMuiTheme';

describe('<CssBaseline />', () => {
  const render = createClientRender();

  it('renders its children', () => {
    const { container } = render(
      <CssBaseline>
        <div id="child" />
      </CssBaseline>,
    );

    const child = container.querySelector('#child');

    expect(child).to.have.tagName('div');
  });

  it('supports theme overrides as string', () => {
    const theme = createMuiTheme({
      components: { MuiCssBaseline: { styleOverrides: `strong { font-weight: 500; }` } },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <strong id="child" />
        </CssBaseline>
      </ThemeProvider>,
    );

    const child = container.querySelector('strong');

    expect(child).toHaveComputedStyle({ fontWeight: '500' });
  });

  it('supports theme overrides as object', () => {
    const theme = createMuiTheme({
      components: { MuiCssBaseline: { styleOverrides: { strong: { fontWeight: '500' } } } },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <strong id="child" />
        </CssBaseline>
      </ThemeProvider>,
    );

    const child = container.querySelector('strong');

    expect(child).toHaveComputedStyle({ fontWeight: '500' });
  });
});
