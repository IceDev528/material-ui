import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider, CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/joy/className';
import Box from '@mui/joy/Box';

describe('Joy <Box />', () => {
  const { render } = createRenderer();

  describeConformance(<Box />, () => ({
    render,
    ThemeProvider,
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

  it('respects theme from context', () => {
    const { container } = render(
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: 'rgb(255, 0, 0)',
            },
          },
        }}
      >
        <Box color="primary.main" />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  describe('ClassNameGenerator', () => {
    afterEach(() => {
      ClassNameGenerator.reset();
    });

    it('get custom className', () => {
      const { container, rerender } = render(<Box />);
      expect(container.firstChild).to.have.class('JoyBox-root');

      ClassNameGenerator.configure((name) => name.replace('Joy', 'Company'));

      rerender(<Box />);

      expect(container.firstChild).to.have.class('CompanyBox-root');
    });
  });

  describe('sx', () => {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              500: 'rgb(0, 0, 255)',
            },
          },
        },
      },
      radius: {
        md: '77px',
      },
      shadow: {
        md: 'rgb(0, 0, 0) 0px 0px 10px 0px',
      },
    });

    it('color', function test() {
      const isJSDOM = /jsdom/.test(window.navigator.userAgent);

      if (isJSDOM) {
        this.skip();
      }

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ color: 'primary.500' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
      });
    });

    it('bgcolor', function test() {
      const isJSDOM = /jsdom/.test(window.navigator.userAgent);

      if (isJSDOM) {
        this.skip();
      }

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ bgcolor: 'primary.500' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
    });

    it('backgroundColor', function test() {
      const isJSDOM = /jsdom/.test(window.navigator.userAgent);

      if (isJSDOM) {
        this.skip();
      }

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ backgroundColor: 'primary.500' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        backgroundColor: 'rgb(0, 0, 255)',
      });
    });

    it('borderRadius', function test() {
      const isJSDOM = /jsdom/.test(window.navigator.userAgent);

      if (isJSDOM) {
        this.skip();
      }

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ borderRadius: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        borderTopLeftRadius: '77px',
        borderTopRightRadius: '77px',
        borderBottomLeftRadius: '77px',
        borderBottomRightRadius: '77px',
      });
    });

    it('boxShadow', function test() {
      const isJSDOM = /jsdom/.test(window.navigator.userAgent);

      if (isJSDOM) {
        this.skip();
      }

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ boxShadow: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        boxShadow: 'rgb(0, 0, 0) 0px 0px 10px 0px',
      });
    });

    it('fontSize', function test() {
      const isJSDOM = /jsdom/.test(window.navigator.userAgent);

      if (isJSDOM) {
        this.skip();
      }

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ fontSize: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        fontSize: '16px',
      });
    });

    it('fontWeight', function test() {
      const isJSDOM = /jsdom/.test(window.navigator.userAgent);

      if (isJSDOM) {
        this.skip();
      }

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ fontWeight: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        fontWeight: '500',
      });
    });

    it('lineHeight', function test() {
      const isJSDOM = /jsdom/.test(window.navigator.userAgent);

      if (isJSDOM) {
        this.skip();
      }

      const { container } = render(
        <CssVarsProvider theme={theme}>
          <Box sx={{ lineHeight: 'md' }} />
        </CssVarsProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        lineHeight: '24px',
      });
    });
  });
});
