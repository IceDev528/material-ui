import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import OutlinedInput from './OutlinedInput';
import InputBase from '../InputBase';
import classes from './outlinedInputClasses';

describe('<OutlinedInput />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<OutlinedInput labelWidth={0} />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiOutlinedInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render a NotchedOutline', () => {
    const { container } = render(
      <OutlinedInput classes={{ notchedOutline: 'notched-outlined' }} labelWidth={0} />,
    );

    expect(container.querySelector('.notched-outlined')).not.to.equal(null);
  });
});
