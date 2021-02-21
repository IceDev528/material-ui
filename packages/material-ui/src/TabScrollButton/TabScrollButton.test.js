import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import TabScrollButton from './TabScrollButton';
import classes from './tabScrollButtonClasses';

describe('<TabScrollButton />', () => {
  const defaultProps = {
    direction: 'left',
    orientation: 'horizontal',
  };
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<TabScrollButton {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiTabScrollButton',
    testVariantProps: { orientation: 'vertical' },
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render as a button with the root class', () => {
    const { container } = render(<TabScrollButton {...defaultProps} />);
    const button = container.firstChild;
    expect(button).to.have.class(classes.root);
  });

  describe('prop: disabled', () => {
    it('should render with a opacity of 0', () => {
      const { container } = render(<TabScrollButton {...defaultProps} disabled />);
      const button = container.firstChild;
      expect(button).to.have.class(classes.disabled);
    });
  });

  describe('prop: direction', () => {
    it('should render with the left icon', () => {
      const { getAllByTestId } = render(
        <TabScrollButton {...defaultProps} {...defaultProps} direction="left" disabled />,
      );
      expect(getAllByTestId('KeyboardArrowLeftIcon').length).to.equal(1);
    });

    it('should render with the right icon', () => {
      const { getAllByTestId } = render(
        <TabScrollButton {...defaultProps} {...defaultProps} direction="right" disabled />,
      );
      expect(getAllByTestId('KeyboardArrowRightIcon').length).to.equal(1);
    });
  });
});
