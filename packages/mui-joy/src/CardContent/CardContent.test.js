import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import CardContent, { cardContentClasses as classes } from '@mui/joy/CardContent';

describe('<CardContent />', () => {
  const { render } = createRenderer();

  describeConformance(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiCardContent',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'solid' },
    skip: ['classesRoot', 'componentsProp'],
  }));
});
