import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ListItemDecorator, { listItemDecoratorClasses as classes } from '@mui/joy/ListItemDecorator';

describe('Joy <ListItemDecorator />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemDecorator />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    ThemeProvider,
    muiName: 'MuiListItemDecorator',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<ListItemDecorator />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListItemDecorator className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
