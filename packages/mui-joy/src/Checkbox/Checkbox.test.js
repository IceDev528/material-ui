import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, act, createRenderer, fireEvent } from 'test/utils';
import Checkbox, { checkboxClasses as classes } from '@mui/joy/Checkbox';
import { ThemeProvider } from '@mui/joy/styles';

describe('<Checkbox />', () => {
  const { render } = createRenderer();

  describeConformance(<Checkbox />, () => ({
    classes,
    render,
    ThemeProvider,
    muiName: 'MuiCheckbox',
    testDeepOverrides: [{ slotName: 'input', slotClassName: classes.input }],
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp', 'classesRoot', 'propsSpread', 'themeVariants'],
  }));

  it('should have the classes required for Checkbox', () => {
    expect(classes).to.include.all.keys(['root', 'checked', 'disabled']);
  });

  it('renders a `role="checkbox"` with the Unchecked state by default', () => {
    const { getByRole } = render(<Checkbox />);

    expect(getByRole('checkbox')).to.have.property('checked', false);
  });

  it('renders a checkbox with the Checked state when checked', () => {
    const { getByRole } = render(<Checkbox defaultChecked />);

    expect(getByRole('checkbox')).to.have.property('checked', true);
  });

  it('the checkbox can be disabled', () => {
    const { getByRole } = render(<Checkbox disabled />);

    expect(getByRole('checkbox')).to.have.property('disabled', true);
  });

  it('the Checked state changes after change events', () => {
    const { getByRole } = render(<Checkbox defaultChecked />);

    // how a user would trigger it
    act(() => {
      getByRole('checkbox').click();
      fireEvent.change(getByRole('checkbox'), { target: { checked: '' } });
    });

    expect(getByRole('checkbox')).to.have.property('checked', false);
  });

  it('should have configurable color', () => {
    const { container, rerender } = render(<Checkbox />);

    expect(container.firstChild).to.have.class(classes.colorNeutral); // default

    rerender(<Checkbox color="primary" />);
    expect(container.firstChild).to.have.class(classes.colorPrimary);
  });

  it('should have configurable variant', () => {
    const { container, rerender } = render(<Checkbox />);

    expect(container.firstChild).to.have.class(classes.variantOutlined); // default

    rerender(<Checkbox variant="light" />);
    expect(container.firstChild).to.have.class(classes.variantLight);
  });

  it('should have configurable size', () => {
    const { container, rerender } = render(<Checkbox />);

    expect(container.firstChild).to.have.class(classes.sizeMd); // default

    rerender(<Checkbox size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
  });

  describe('prop: indeterminate', () => {
    it('should render an indeterminate icon', () => {
      const { getByTestId } = render(<Checkbox indeterminate />);
      expect(getByTestId('HorizontalRuleIcon')).not.to.equal(null);
    });
  });
});
