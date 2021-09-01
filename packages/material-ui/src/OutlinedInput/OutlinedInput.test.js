import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformance } from 'test/utils';
import OutlinedInput, { outlinedInputClasses as classes } from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';

describe('<OutlinedInput />', () => {
  const render = createClientRender();

  describeConformance(<OutlinedInput />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiOutlinedInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render a NotchedOutline', () => {
    const { container } = render(
      <OutlinedInput classes={{ notchedOutline: 'notched-outlined' }} />,
    );

    expect(container.querySelector('.notched-outlined')).not.to.equal(null);
  });

  it('should forward classes to InputBase', () => {
    render(<OutlinedInput error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  it('should respects the componentsProps if passed', () => {
    render(<OutlinedInput componentsProps={{ root: { 'data-test': 'test' } }} />);
    expect(document.querySelector('[data-test=test]')).not.to.equal(null);
  });
});
