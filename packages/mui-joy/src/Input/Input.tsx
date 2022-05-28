import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { appendOwnerState } from '@mui/base/utils';
import { useInput, InputUnstyledOwnerState } from '@mui/base/InputUnstyled';
import { styled, useThemeProps } from '../styles';
import { InputTypeMap, InputProps } from './InputProps';
import inputClasses, { getInputUtilityClass } from './inputClasses';

const useUtilityClasses = (ownerState: InputProps) => {
  const { classes, disabled, fullWidth, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    input: ['input'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getInputUtilityClass, classes);
};

const InputRoot = styled('div', {
  name: 'JoyInput',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: InputProps & InputUnstyledOwnerState }>(({ theme, ownerState }) => [
  {
    '--Input-radius': theme.vars.radius.sm, // radius is used by the decorator children
    '--Input-gap': '0.5rem',
    '--Input-placeholderOpacity': 0.5,
    '--Input-decorator-offset': 'calc(var(--Input-paddingInline) / 4)', // negative margin of the start/end adornment
    '--Input-focusedThickness': 'calc(var(--variant-borderWidth, 1px) + 1px)',
    '--Input-focusedHighlight':
      theme.vars.palette[ownerState.color === 'neutral' ? 'primary' : ownerState.color!]?.[500],
    ...(ownerState.size === 'sm' && {
      '--Input-minHeight': '2rem',
      '--Input-paddingInline': '0.5rem',
      '--Input-decorator-childHeight': 'min(1.5rem, var(--Input-minHeight))',
      '--Icon-fontSize': '1.25rem',
    }),
    ...(ownerState.size === 'md' && {
      '--Input-minHeight': '2.5rem',
      '--Input-paddingInline': '0.75rem', // gutter is the padding-x
      '--Input-decorator-childHeight': 'min(2rem, var(--Input-minHeight))',
      '--Icon-fontSize': '1.5rem',
    }),
    ...(ownerState.size === 'lg' && {
      '--Input-minHeight': '3rem',
      '--Input-paddingInline': '1rem',
      '--Input-gap': '0.75rem',
      '--Input-decorator-childHeight': 'min(2.25rem, var(--Input-minHeight))',
      '--Icon-fontSize': '1.75rem',
    }),
    // variables for controlling child components
    '--Input-decorator-childOffset':
      'min(calc(var(--Input-paddingInline) - var(--Input-decorator-offset) - (var(--Input-minHeight) - 2 * var(--variant-borderWidth) - var(--Input-decorator-childHeight)) / 2), var(--Input-paddingInline) - var(--Input-decorator-offset))',
    '--internal-paddingBlock':
      'max((var(--Input-minHeight) - 2 * var(--variant-borderWidth) - var(--Input-decorator-childHeight)) / 2)',
    '--Input-decorator-childRadius':
      'max((var(--Input-radius) - var(--variant-borderWidth)) - var(--internal-paddingBlock), min(var(--internal-paddingBlock) / 2, (var(--Input-radius) - var(--variant-borderWidth)) / 2))',
    '--Button-minHeight': 'var(--Input-decorator-childHeight)',
    '--IconButton-size': 'var(--Input-decorator-childHeight)',
    '--Button-radius': 'var(--Input-decorator-childRadius)',
    '--IconButton-radius': 'var(--Input-decorator-childRadius)',
    boxSizing: 'border-box',
    minWidth: 0, // forces the Input to stay inside a container by default
    minHeight: 'var(--Input-minHeight)',
    ...(ownerState.fullWidth && {
      width: '100%',
    }),
    cursor: 'text',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    paddingInline: `var(--Input-paddingInline)`,
    borderRadius: 'var(--Input-radius)',
    fontFamily: theme.vars.fontFamily.body,
    fontSize: theme.vars.fontSize.md,
    ...(ownerState.size === 'sm' && {
      fontSize: theme.vars.fontSize.sm,
    }),
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:before': {
      boxSizing: 'border-box',
      content: '""',
      display: 'block',
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      margin: 'calc(var(--variant-borderWidth) * -1)', // for outlined variant
    },
  },
  theme.variants[`${ownerState.variant!}`]?.[ownerState.color!],
  { '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!] },
  {
    [inputClasses.disabled]: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  },
  ownerState.variant !== 'solid' && {
    [`&.${inputClasses.focused}`]: {
      backgroundColor: 'initial',
      '&:before': {
        boxShadow: `inset 0 0 0 var(--Input-focusedThickness) var(--Input-focusedHighlight)`,
      },
    },
  },
  {
    // override pointer cursor from variantHover
    cursor: 'text',
  },
]);

const InputInput = styled('input', {
  name: 'JoyInput',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: InputProps & InputUnstyledOwnerState }>(({ theme, ownerState }) => ({
  border: 'none', // remove the native input width
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  flex: 1,
  alignSelf: 'stretch',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  '&:-webkit-autofill': {
    WebkitBackgroundClip: 'text', // remove autofill background
    WebkitTextFillColor: theme.vars.palette[ownerState.color!]?.overrideTextPrimary,
  },
  '&::-webkit-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' },
  '&::-moz-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // Firefox 19+
  '&:-ms-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // IE11
  '&::-ms-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // Edge
}));

const InputStartDecorator = styled('span', {
  name: 'JoyInput',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: InputProps & InputUnstyledOwnerState }>(({ theme, ownerState }) => ({
  '--Button-margin': '0 0 0 calc(var(--Input-decorator-childOffset) * -1)',
  '--IconButton-margin': '0 0 0 calc(var(--Input-decorator-childOffset) * -1)',
  pointerEvents: 'none', // to make the input focused when click on the element because start element usually is an icon
  display: 'inherit',
  marginInlineStart: 'calc(var(--Input-decorator-offset) * -1)',
  marginInlineEnd: 'var(--Input-gap)',
  color: theme.vars.palette.text.tertiary,
  ...(ownerState.focused && {
    color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
  }),
}));

const InputEndDecorator = styled('span', {
  name: 'JoyInput',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: InputProps & InputUnstyledOwnerState }>(({ theme, ownerState }) => ({
  '--Button-margin': '0 calc(var(--Input-decorator-childOffset) * -1) 0 0',
  '--IconButton-margin': '0 calc(var(--Input-decorator-childOffset) * -1) 0 0',
  display: 'inherit',
  marginInlineStart: 'var(--Input-gap)',
  marginInlineEnd: 'calc(var(--Input-decorator-offset) * -1)',
  color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
}));

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyInput',
  });

  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    color = 'neutral',
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endDecorator,
    fullWidth = false,
    error,
    id,
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
    type = 'text',
    startDecorator,
    size = 'md',
    value,
    variant = 'outlined',
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

  const ownerState = {
    ...props,
    fullWidth,
    color: errorState ? 'danger' : color,
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext: formControlContext!,
    type,
    size,
    variant,
  };

  const rootStateClasses = {
    [inputClasses.disabled]: disabledState,
    [inputClasses.error]: errorState,
    [inputClasses.focused]: focused,
    [inputClasses.formControl]: Boolean(formControlContext),
  };

  const inputStateClasses = {
    [inputClasses.disabled]: disabledState,
  };

  const classes = useUtilityClasses(ownerState);

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

  const Root = component ?? InputRoot;
  const rootProps = appendOwnerState(
    Root,
    {
      ...getRootProps({ ...other, ...componentsProps.root }),
      className: clsx(classes.root, rootStateClasses, className, componentsProps.root?.className),
    },
    ownerState,
  );

  rootProps.ref = useForkRef(ref, useForkRef(rootProps.ref, componentsProps.root?.ref));

  const InputComponent = components.Input ?? InputInput;
  const inputProps = appendOwnerState(
    InputComponent,
    {
      ...getInputProps({ ...componentsProps.input, ...propsToForward }),
      className: clsx(classes.input, inputStateClasses, componentsProps.input?.className),
    },
    ownerState,
  );

  inputProps.ref = useForkRef(componentsProps.input?.ref, inputProps.ref);

  return (
    <Root {...rootProps}>
      {startDecorator && (
        <InputStartDecorator className={classes.startDecorator} ownerState={ownerState}>
          {startDecorator}
        </InputStartDecorator>
      )}

      <InputComponent {...inputProps} />
      {endDecorator && (
        <InputEndDecorator className={classes.endDecorator} ownerState={ownerState}>
          {endDecorator}
        </InputEndDecorator>
      )}
    </Root>
  );
}) as OverridableComponent<InputTypeMap>;

Input.propTypes /* remove-proptypes */ = {
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
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
  endDecorator: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
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
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * Leading adornment for this input.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'plain'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Input;
