import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import CardCover, { cardCoverClasses as classes } from '@mui/joy/CardCover';

describe('<CardCover />', () => {
  const { render } = createRenderer();

  describeConformance(<CardCover />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiCardCover',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'solid' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  it('add data-attribute to the first child', () => {
    const { container } = render(
      <CardCover>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </CardCover>,
    );
    expect(container.querySelector('[data-first-child]')).to.have.text('First');
  });
});
