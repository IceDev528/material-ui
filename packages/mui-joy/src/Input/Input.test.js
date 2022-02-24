import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformance, createRenderer, screen, act } from 'test/utils';
import Input, { inputClasses as classes } from '@mui/joy/Input';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <Input />', () => {
  const { render } = createRenderer();

  describeConformance(<Input />, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    skip: ['propsSpread', 'componentsProp', 'classesRoot'],
  }));

  it('should have error classes', () => {
    const { container } = render(<Input error />);
    expect(container.firstChild).to.have.class(classes.error);
  });

  it('should have fullWidth classes', () => {
    const { container } = render(<Input fullWidth />);
    expect(container.firstChild).to.have.class(classes.fullWidth);
  });

  it('should have startAdornment', () => {
    render(<Input startAdornment={<span data-testid="start">start</span>} />);
    expect(screen.getByTestId('start')).toBeVisible();
  });

  it('should have adornedStart classes', () => {
    const { container } = render(<Input startAdornment="start" />);
    expect(container.firstChild).to.have.class(classes.adornedStart);
  });

  it('should have endAdornment', () => {
    render(<Input endAdornment={<span data-testid="end">end</span>} />);
    expect(screen.getByTestId('end')).toBeVisible();
  });

  it('should have adornedEnd classes', () => {
    const { container } = render(<Input endAdornment="end" />);
    expect(container.firstChild).to.have.class(classes.adornedEnd);
  });

  describe('prop: disabled', () => {
    it('should have disabled classes', () => {
      const { container } = render(<Input disabled />);
      expect(container.firstChild).to.have.class(classes.disabled);
    });

    it('should reset the focused state if getting disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { container, setProps } = render(<Input onBlur={handleBlur} onFocus={handleFocus} />);

      act(() => {
        container.querySelector('input').focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });
      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });
  });
});
