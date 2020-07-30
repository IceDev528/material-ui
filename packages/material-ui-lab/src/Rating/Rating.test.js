import * as React from 'react';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import {
  getClasses,
  createMount,
  describeConformance,
  createClientRender,
  fireEvent,
} from 'test/utils';
import Rating from './Rating';

describe('<Rating />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;
  const defaultProps = {
    name: 'rating-test',
    value: 2,
  };

  before(() => {
    classes = getClasses(<Rating {...defaultProps} />);
  });

  describeConformance(<Rating {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('should render', () => {
    const { container } = render(<Rating {...defaultProps} />);

    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should round the value to the provided precision', () => {
    const { container } = render(<Rating {...defaultProps} value={3.9} precision={0.2} />);

    expect(container.querySelector('input[name="rating-test"]:checked')).to.have.property(
      'value',
      '4',
    );
  });

  it('should handle mouse hover correctly', () => {
    const { container } = render(<Rating {...defaultProps} />);
    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      left: 0,
      right: 100,
    }));
    stub(container.firstChild.firstChild, 'getBoundingClientRect').callsFake(() => ({
      width: 20,
    }));
    fireEvent.mouseMove(container.firstChild, {
      clientX: 19,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(1);
    fireEvent.mouseMove(container.firstChild, {
      clientX: 21,
    });
    expect(container.querySelectorAll(`.${classes.iconHover}`).length).to.equal(2);
  });

  it('should clear the rating', () => {
    const handleChange = spy();
    const { getByRole } = render(<Rating {...defaultProps} onChange={handleChange} />);

    const input = getByRole('radio', { name: '2 Stars' });
    fireEvent.click(input, {
      clientX: 1,
    });

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(null);
  });

  it('should select the rating', () => {
    const handleChange = spy();
    const { container, getByRole } = render(<Rating {...defaultProps} onChange={handleChange} />);

    fireEvent.click(getByRole('radio', { name: '3 Stars' }));

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.deep.equal(3);
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('2');
  });

  it('should select the empty input if value is null', () => {
    const { container, getByRole } = render(<Rating {...defaultProps} value={null} />);
    const input = getByRole('radio', { name: 'Empty' });
    const checked = container.querySelector('input[name="rating-test"]:checked');
    expect(input).to.equal(checked);
    expect(input.value).to.equal('');
  });

  it('should support a defaultValue', () => {
    const { container, getByRole } = render(
      <Rating {...defaultProps} value={undefined} defaultValue={3} />,
    );
    let checked;
    checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('3');

    fireEvent.click(getByRole('radio', { name: '2 Stars' }));
    checked = container.querySelector('input[name="rating-test"]:checked');
    expect(checked.value).to.equal('2');
  });
});
