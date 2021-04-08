import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import TimelineSeparator from './TimelineSeparator';
import classes from './timelineSeparatorClasses';

describe('<TimelineSeparator />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<TimelineSeparator />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiTimelineSeparator',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
