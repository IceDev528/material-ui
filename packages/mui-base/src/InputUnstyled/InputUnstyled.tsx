import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import isHostComponent from '../utils/isHostComponent';
import classes from './inputUnstyledClasses';
import {
  InputUnstyledInputSlotProps,
  InputUnstyledOwnerState,
  InputUnstyledProps,
  InputUnstyledRootSlotProps,
  InputUnstyledTypeMap,
} from './InputUnstyled.types';
import useInput from './useInput';
import { EventHandlers, useSlotProps, WithOptionalOwnerState } from '../utils';

/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/base/react-input/)
 *
 * API:
 *
 * - [InputUnstyled API](https://mui.com/base/api/input-unstyled/)
 */
const InputUnstyled = React.forwardRef(function InputUnstyled(
  props: InputUnstyledProps,
  forwardedRef: React.ForwardedRef<any>,
) {
  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    error,
    id,
    maxRows,
    minRows,
    multiline = false,
    name,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    rows,
    type = 'text',
    startAdornment,
    value,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState,
  } = useInput({
    disabled,
    defaultValue,
    error,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value,
  });

  const ownerState: InputUnstyledOwnerState = {
    ...props,
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type,
  };

  const rootStateClasses = {
    [classes.disabled]: disabledState,
    [classes.error]: errorState,
    [classes.focused]: focused,
    [classes.formControl]: Boolean(formControlContext),
    [classes.multiline]: multiline,
    [classes.adornedStart]: Boolean(startAdornment),
    [classes.adornedEnd]: Boolean(endAdornment),
  };

  const inputStateClasses = {
    [classes.disabled]: disabledState,
    [classes.multiline]: multiline,
  };

  const propsToForward = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type,
  };

  const Root = component ?? components.Root ?? 'div';
  const rootProps: WithOptionalOwnerState<InputUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: [classes.root, rootStateClasses, className],
  });

  let Input = components.Input ?? 'input';
  let inputProps: WithOptionalOwnerState<InputUnstyledInputSlotProps> = useSlotProps({
    elementType: Input,
    getSlotProps: (otherHandlers: EventHandlers) =>
      getInputProps({ ...otherHandlers, ...propsToForward }),
    externalSlotProps: componentsProps.input,
    ownerState,
    className: [classes.input, inputStateClasses],
  });

  if (multiline) {
    const hasHostTextarea = isHostComponent(components.Textarea ?? 'textarea');

    const { ownerState: ownerStateInputProps, ...inputPropsWithoutOwnerState } = inputProps;

    if (rows) {
      if (process.env.NODE_ENV !== 'production') {
        if (minRows || maxRows) {
          console.warn(
            'MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.',
          );
        }
      }
    }

    inputProps = {
      ...(!hasHostTextarea && { minRows: rows || minRows, maxRows: rows || maxRows }),
      ...(hasHostTextarea ? inputPropsWithoutOwnerState : inputProps),
      type: undefined,
    };

    Input = components.Textarea ?? 'textarea';
  }

  return (
    <Root {...rootProps}>
      {startAdornment}
      <Input {...inputProps} />
      {endAdornment}
    </Root>
  );
}) as OverridableComponent<InputUnstyledTypeMap>;

InputUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * @ignore
   */
  'aria-labelledby': PropTypes.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
    Textarea: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for this input.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.number,
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.number,
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.number,
  /**
   * Leading adornment for this input.
   */
  startAdornment: PropTypes.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes /* @typescript-to-proptypes-ignore */.oneOf([
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
} as any;

export default InputUnstyled;
