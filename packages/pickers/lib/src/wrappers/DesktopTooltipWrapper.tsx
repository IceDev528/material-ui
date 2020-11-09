import * as React from 'react';
import { WrapperProps } from './Wrapper';
import { StaticWrapperProps } from './StaticWrapper';
import { InnerMobileWrapperProps } from './MobileWrapper';
import { InnerDesktopWrapperProps } from './DesktopWrapper';
import { WrapperVariantContext } from './WrapperVariantContext';
import { KeyboardDateInput } from '../_shared/KeyboardDateInput';
import { executeInTheNextEventLoopTick } from '../_helpers/utils';
import { ExportedPickerPopperProps, PickersPopper } from '../_shared/PickersPopper';
import { CanAutoFocusContext, useAutoFocusControl } from '../_shared/hooks/useCanAutoFocus';

export interface InnerDesktopTooltipWrapperProps extends ExportedPickerPopperProps {}

export interface DesktopTooltipWrapperProps
  extends InnerDesktopTooltipWrapperProps,
    WrapperProps,
    Partial<InnerMobileWrapperProps & StaticWrapperProps & InnerDesktopWrapperProps> {}

export const DesktopTooltipWrapper: React.FC<DesktopTooltipWrapperProps> = (props) => {
  const {
    open,
    children,
    PopperProps,
    onDismiss,
    DateInputProps,
    TransitionComponent,
    KeyboardDateInputComponent = KeyboardDateInput,
  } = props;
  const inputRef = React.useRef<HTMLDivElement>(null);
  const popperRef = React.useRef<HTMLElement>(null);
  const { canAutoFocus, onOpen } = useAutoFocusControl(open);

  const handleBlur = () => {
    executeInTheNextEventLoopTick(() => {
      if (
        inputRef.current?.contains(document.activeElement) ||
        popperRef.current?.contains(document.activeElement)
      ) {
        return;
      }

      onDismiss();
    });
  };

  return (
    <WrapperVariantContext.Provider value="desktop">
      <CanAutoFocusContext.Provider value={canAutoFocus}>
        <KeyboardDateInputComponent
          {...DateInputProps}
          containerRef={inputRef}
          onBlur={handleBlur}
        />
        <PickersPopper
          role="tooltip"
          open={open}
          innerRef={popperRef}
          anchorEl={inputRef.current}
          TransitionComponent={TransitionComponent}
          PopperProps={PopperProps}
          onBlur={handleBlur}
          onClose={onDismiss}
          onOpen={onOpen}
        >
          {children}
        </PickersPopper>
      </CanAutoFocusContext.Provider>
    </WrapperVariantContext.Provider>
  );
};
