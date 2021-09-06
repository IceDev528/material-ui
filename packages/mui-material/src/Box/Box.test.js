import * as React from 'react';
import { expect } from 'chai';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createClientRender, describeConformance } from 'test/utils';
import Box from '@mui/material/Box';

describe('<Box />', () => {
  const render = createClientRender();

  describeConformance(<Box />, () => ({
    render,
    inheritComponent: 'div',
    skip: [
      'componentProp',
      'componentsProp',
      'rootClass',
      'themeVariants',
      'themeStyleOverrides',
      'themeDefaultProps',
    ],
    refInstanceof: window.HTMLDivElement,
  }));

  it('respects theme from context', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      this.skip();
    }

    const theme = createTheme({
      palette: {
        primary: {
          main: 'rgb(255, 0, 0)',
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Box color="primary.main" />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });
});
