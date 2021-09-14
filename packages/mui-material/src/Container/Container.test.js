import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createClientRender } from 'test/utils';
import Container, { containerClasses as classes } from '@mui/material/Container';

describe('<Container />', () => {
  const render = createClientRender();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Container {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiContainer',
    skip: ['componentsProp'],
    testVariantProps: { fixed: true },
  }));

  describe('prop: maxWidth', () => {
    it('should support different maxWidth values', () => {
      const { container: firstContainer } = render(<Container {...defaultProps} />);
      expect(firstContainer.firstChild).to.have.class(classes.maxWidthLg);
      const { container: secondsContainre } = render(
        <Container {...defaultProps} maxWidth={false} />,
      );
      expect(secondsContainre.firstChild).not.to.have.class(classes.maxWidthLg);
    });
  });
});
