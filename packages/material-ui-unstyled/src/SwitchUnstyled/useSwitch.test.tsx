import { expect } from 'chai';
import React from 'react';
import { spy } from 'sinon';
import {
  act,
  createClientRender,
  focusVisible,
  programmaticFocusTriggersFocusVisible,
  screen,
  simulatePointerDevice,
} from 'test/utils';
import { useSwitch, UseSwitchProps, UseSwitchResult } from '@material-ui/unstyled/SwitchUnstyled';

describe('useSwitch', () => {
  const render = createClientRender();
  const invokeUseSwitch = (props: UseSwitchProps): UseSwitchResult => {
    const ref = React.createRef<UseSwitchResult>();
    function TestComponent() {
      const switchDefinition = useSwitch(props);
      React.useImperativeHandle(ref, () => switchDefinition, [switchDefinition]);
      return null;
    }

    render(<TestComponent />);

    return ref.current!;
  };

  describe('getInputProps', () => {
    it('should include the incoming uncontrolled props in the output', () => {
      const props: UseSwitchProps = {
        defaultChecked: true,
        disabled: true,
        readOnly: true,
        required: true,
      };

      const { getInputProps } = invokeUseSwitch(props);
      const inputProps = getInputProps();

      expect(inputProps.defaultChecked).to.equal(true);
      expect(inputProps.disabled).to.equal(true);
      expect(inputProps.readOnly).to.equal(true);
      expect(inputProps.required).to.equal(true);
    });

    it('should include the incoming controlled prop in the output', () => {
      const props = {
        checked: true,
      };

      const { getInputProps } = invokeUseSwitch(props);
      const inputProps = getInputProps();

      expect(inputProps!.checked).to.equal(true);
    });

    it('should call onChange if a change event is fired', () => {
      const handleChange = spy();
      function Switch() {
        const { getInputProps } = useSwitch({ onChange: handleChange });

        return <input {...getInputProps()} />;
      }
      render(<Switch />);

      act(() => {
        screen.getByRole('checkbox').click();
      });

      expect(handleChange.callCount).to.equal(1);
    });

    it('should call focus event handlers if focus events are fired', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const handleFocusVisible = spy();
      function Switch() {
        const { getInputProps } = useSwitch({
          onBlur: handleBlur,
          onFocus: handleFocus,
          onFocusVisible: handleFocusVisible,
        });

        return <input {...getInputProps()} />;
      }
      render(<Switch />);
      const checkbox = screen.getByRole('checkbox');

      simulatePointerDevice();
      act(() => {
        checkbox.focus();
      });

      expect(handleBlur.callCount).to.equal(0);
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 1 : 0,
      );

      act(() => {
        checkbox.blur();
      });

      expect(handleBlur.callCount).to.equal(1);
      expect(handleFocus.callCount).to.equal(1);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 1 : 0,
      );

      focusVisible(checkbox);

      expect(handleBlur.callCount).to.equal(1);
      expect(handleFocus.callCount).to.equal(2);
      expect(handleFocusVisible.callCount).to.equal(
        programmaticFocusTriggersFocusVisible() ? 2 : 1,
      );
    });
  });
});
