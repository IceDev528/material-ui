import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import Card from './Card';
import Paper from '../Paper';
import classes from './cardClasses';

describe('<Card />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<Card />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    mount,
    muiName: 'MuiCard',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { raised: true },
    skip: ['componentsProp'],
  }));

  it('when raised should render Paper with 8dp', () => {
    const { container } = render(<Card raised />);
    expect(container.firstChild).to.have.class('MuiPaper-elevation8');
  });

  it('should support variant="outlined"', () => {
    const { container } = render(<Card variant="outlined" />);
    expect(container.firstChild).to.have.class('MuiPaper-outlined');
  });
});
