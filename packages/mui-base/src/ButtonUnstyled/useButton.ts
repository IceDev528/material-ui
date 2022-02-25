import * as React from 'react';
import {
  unstable_setRef as setRef,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@mui/utils';
import { UseButtonParameters, UseButtonRootSlotProps } from './useButton.types';
import extractEventHandlers from '../utils/extractEventHandlers';
import { EventHandlers } from '../utils/types';

export default function useButton(parameters: UseButtonParameters) {
  const { component = 'button', disabled = false, href, ref, tabIndex = 0, to, type } = parameters;

  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();

  const [active, setActive] = React.useState<boolean>(false);

  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);

  const createHandleMouseLeave = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    if (focusVisible) {
      event.preventDefault();
    }

    otherHandlers.onMouseLeave?.(event);
  };

  const createHandleBlur = (otherHandlers: EventHandlers) => (event: React.FocusEvent) => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    otherHandlers.onBlur?.(event);
  };

  const createHandleFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLButtonElement>) => {
      // Fix for https://github.com/facebook/react/issues/7769
      if (!buttonRef.current) {
        buttonRef.current = event.currentTarget;
      }

      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);
        otherHandlers.onFocusVisible?.(event);
      }

      otherHandlers.onFocus?.(event);
    };

  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return (
      component !== 'button' && !(button?.tagName === 'A' && (button as HTMLAnchorElement)?.href)
    );
  };

  const createHandleMouseDown = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && !disabled) {
      setActive(true);
    }

    otherHandlers.onMouseDown?.(event);
  };

  const createHandleMouseUp = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setActive(false);
    }

    otherHandlers.onMouseUp?.(event);
  };

  const createHandleKeyDown = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent) => {
    otherHandlers.onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }

    if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
      setActive(true);
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      isNonNativeButton() &&
      event.key === 'Enter' &&
      !disabled
    ) {
      otherHandlers.onClick?.(event);
      event.preventDefault();
    }
  };

  const createHandleKeyUp = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent) => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0

    if (event.target === event.currentTarget) {
      setActive(false);
    }

    otherHandlers.onKeyUp?.(event);

    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      isNonNativeButton() &&
      event.key === ' ' &&
      !event.defaultPrevented
    ) {
      otherHandlers.onClick?.(event);
    }
  };

  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);

  const [hostElementName, setHostElementName] = React.useState<string>('');

  const updateRef = (instance: HTMLElement | null) => {
    setHostElementName(instance?.tagName ?? '');
    setRef(handleRef, instance);
  };

  interface AdditionalButtonProps {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    disabled?: boolean;
    role?: React.AriaRole;
    'aria-disabled'?: React.AriaAttributes['aria-disabled'];
  }

  const buttonProps: AdditionalButtonProps = {};

  if (hostElementName === 'BUTTON') {
    buttonProps.type = type ?? 'button';
    buttonProps.disabled = disabled;
  } else if (hostElementName !== '') {
    if (!href && !to) {
      buttonProps.role = 'button';
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled as boolean;
    }
  }

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseButtonRootSlotProps<TOther> => {
    const propsEventHandlers = extractEventHandlers(parameters) as Partial<UseButtonParameters>;
    const externalEventHandlers = {
      ...propsEventHandlers,
      ...otherHandlers,
    };

    // onFocusVisible can be present on the props, but since it's not a valid React event handler,
    // it must not be forwarded to the inner component.
    delete externalEventHandlers.onFocusVisible;

    return {
      tabIndex: disabled ? -1 : tabIndex,
      type,
      ...externalEventHandlers,
      ...buttonProps,
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      onMouseUp: createHandleMouseUp(externalEventHandlers),
      ref: updateRef as React.Ref<any>,
    };
  };

  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active,
  };
}
