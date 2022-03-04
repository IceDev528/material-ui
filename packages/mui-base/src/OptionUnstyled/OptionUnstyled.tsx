import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { OptionState } from '../ListboxUnstyled';
import composeClasses from '../composeClasses';
import OptionUnstyledProps, { OptionUnstyledOwnerState } from './OptionUnstyledProps';
import { SelectUnstyledContext } from '../SelectUnstyled/SelectUnstyledContext';
import { getOptionUnstyledUtilityClass } from './optionUnstyledClasses';
import appendOwnerState from '../utils/appendOwnerState';

function useUtilityClasses(ownerState: OptionState) {
  const { disabled, highlighted, selected } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted', selected && 'selected'],
  };

  return composeClasses(slots, getOptionUnstyledUtilityClass, {});
}

/**
 * An unstyled option to be used within a SelectUnstyled.
 */
const OptionUnstyled = React.forwardRef(function OptionUnstyled<TValue>(
  props: OptionUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  const {
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled,
    value,
    ...other
  } = props;

  const selectContext = React.useContext(SelectUnstyledContext);
  if (!selectContext) {
    throw new Error('OptionUnstyled must be used within a SelectUnstyled');
  }

  const Root = component || components.Root || 'li';

  const selectOption = {
    value,
    label: children,
    disabled,
  };

  const optionState = selectContext.getOptionState(selectOption);
  const optionProps = selectContext.getOptionProps(selectOption);
  const listboxRef = selectContext.listboxRef;

  const ownerState: OptionUnstyledOwnerState<TValue> = {
    ...props,
    ...optionState,
  };

  const optionRef = React.useRef<HTMLLIElement>(null);
  const handleRef = useForkRef(ref, optionRef);

  React.useEffect(() => {
    // Scroll to the currently highlighted option
    if (optionState.highlighted) {
      if (!listboxRef.current || !optionRef.current) {
        return;
      }
      const listboxClientRect = listboxRef.current.getBoundingClientRect();
      const optionClientRect = optionRef.current.getBoundingClientRect();

      if (optionClientRect.top < listboxClientRect.top) {
        listboxRef.current.scrollTop -= listboxClientRect.top - optionClientRect.top;
      } else if (optionClientRect.bottom > listboxClientRect.bottom) {
        listboxRef.current.scrollTop += optionClientRect.bottom - listboxClientRect.bottom;
      }
    }
  }, [optionState.highlighted, listboxRef]);

  const classes = useUtilityClasses(ownerState);

  const rootProps = appendOwnerState(
    Root,
    {
      ...other,
      ...optionProps,
      ...componentsProps.root,
      ref: handleRef,
      className: clsx(classes.root, className, componentsProps.root?.className),
    },
    ownerState,
  );

  return <Root {...rootProps}>{children}</Root>;
});

OptionUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to components.Root.
   * If both are provided, the component is used.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the OptionUnstyled.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object,
  }),
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The value of the option.
   */
  value: PropTypes.any.isRequired,
} as any;

/**
 * An unstyled option to be used within a SelectUnstyled.
 *
 * Demos:
 *
 * - [Selects](https://mui.com/components/selects/)
 *
 * API:
 *
 * - [OptionUnstyled API](https://mui.com/api/option-unstyled/)
 */
export default React.memo(OptionUnstyled) as <TValue>(
  props: OptionUnstyledProps<TValue> & React.RefAttributes<HTMLElement>,
) => JSX.Element | null;
