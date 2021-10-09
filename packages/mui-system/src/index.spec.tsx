import {
  breakpoints,
  display,
  compose,
  createTheme,
  spacing,
  style,
  styled as muiStyled,
} from '@mui/system';
import * as React from 'react';
import styled from 'styled-components';

function composeTest() {
  function first(props: { color: string }) {
    return {};
  }

  function second(props: { spacing: number }) {
    return {};
  }

  const styler = compose(first, second);
  // @ts-expect-error missing `spacing`
  styler({ color: 'test' });
  // @ts-expect-error missing `color`
  styler({ spacing: 1 });
  styler({ color: 'test', spacing: 1 });

  // filterProps should exist
  styler.filterProps;
}

/**
 * Testing inference of TypeScript + styled-components + @mui/system
 */
function interopTest() {
  const mixin = style({ prop: 'color' });
  // built-in style function
  const SystemSpacingBox = styled.div`
    ${spacing}
    ${mixin}
  `;
  <SystemSpacingBox m={2} />;
}

function breakpointsTest() {
  function styleFunction(props: { color?: string }) {
    return {};
  }

  const styler = breakpoints(styleFunction);
  // Allows styleFunction props
  styler({ color: 'red' });
}

function styleTransformTest() {
  // styles's implementation does support this kind of transform
  style({
    prop: 'vSpacing',
    cssProperty: false,
    transform: (value) => ({
      '& > :not(:last-child)': {
        marginBottom: value as string,
      },
    }),
  });
}

function styleTypeTest() {
  const gap = style({
    prop: 'gap',
    themeKey: 'spacing',
  });

  // theme should be optional
  const CustomComponentWithNoTheme = muiStyled('div')(compose(display, gap));
  <CustomComponentWithNoTheme display="flex" gap={3} />;
}
