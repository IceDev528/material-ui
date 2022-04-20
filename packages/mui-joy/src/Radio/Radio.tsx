import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useId as useId } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled, useThemeProps } from '../styles';
import { getRadioUtilityClass } from './radioClasses';
import { RadioProps, RadioTypeMap } from './RadioProps';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';
import { TypographyContext } from '../Typography/Typography';

const useUtilityClasses = (ownerState: RadioProps & { focusVisible: boolean }) => {
  const { checked, disabled, disableIcon, focusVisible, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    radio: ['radio', disabled && 'disabled'], // disabled class is necessary for displaying global variant
    action: ['action', disableIcon && disabled && 'disabled', focusVisible && 'focusVisible'], // add disabled class to action element for displaying global variant
    input: ['input'],
    label: ['label'],
  };

  return composeClasses(slots, getRadioUtilityClass, {});
};

function areEqualValues(a: unknown, b: unknown) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

const RadioRoot = styled('span', {
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: RadioProps }>(({ ownerState, theme }) => {
  return [
    {
      '--Icon-fontSize': 'var(--Radio-size)',
      ...(ownerState.size === 'sm' && {
        '--Radio-size': '1rem',
        '--Radio-gap': '0.375rem',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'md' && {
        '--Radio-size': '1.25rem',
        '--Radio-gap': '0.5rem',
        fontSize: theme.vars.fontSize.md,
      }),
      ...(ownerState.size === 'lg' && {
        '--Radio-size': '1.5rem',
        '--Radio-gap': '0.625rem',
        fontSize: theme.vars.fontSize.lg,
      }),
      ...(ownerState.label &&
        !ownerState.disableIcon && {
          // add some space at the end to not have focus overlapping the label
          paddingInlineEnd: 'var(--Radio-gap)',
        }),
      position: ownerState.overlay ? 'initial' : 'relative',
      display: 'inline-flex',
      boxSizing: 'border-box',
      minWidth: 0,
      fontFamily: theme.vars.fontFamily.body,
      lineHeight: 'var(--Radio-size)', // prevent label from having larger height than the checkbox
      '&.Mui-disabled': {
        color: theme.vars.palette[ownerState.color!]?.textDisabledColor,
      },
      ...(ownerState.disableIcon && {
        color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
        '&.Mui-disabled': {
          color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}DisabledColor`],
        },
      }),
    },
  ];
});

const RadioRadio = styled('span', {
  name: 'MuiRadio',
  slot: 'Radio',
  overridesResolver: (props, styles) => styles.radio,
})<{ ownerState: RadioProps }>(({ ownerState, theme }) => [
  {
    margin: 0,
    boxSizing: 'border-box',
    width: 'var(--Radio-size)',
    height: 'var(--Radio-size)',
    borderRadius: 'var(--Radio-size)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    ...(ownerState.disableIcon && {
      display: 'contents',
    }),
  },
  ...(!ownerState.disableIcon
    ? [
        theme.variants[ownerState.variant!]?.[ownerState.color!],
        theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
        theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
      ]
    : []),
]);

const RadioAction = styled('span', {
  name: 'MuiRadio',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: RadioProps }>(({ theme, ownerState }) => [
  {
    position: 'absolute',
    borderRadius: `var(--Radio-action-radius, ${
      // Automatic radius adjustment when composing with ListItem
      ownerState.overlay ? 'var(--internal-action-radius, inherit)' : 'inherit'
    })`,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // The action element usually cover the area of nearest positioned parent
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    ...theme.focus.default,
  },
  ...(ownerState.disableIcon
    ? [
        theme.variants[ownerState.variant!]?.[ownerState.color!],
        theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
        theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
      ]
    : []),
]);

const RadioInput = styled('input', {
  name: 'MuiRadio',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: RadioProps }>(() => ({
  margin: 0,
  opacity: 0,
  position: 'absolute',
  height: '100%',
  width: '100%',
  cursor: 'pointer',
}));

const RadioLabel = styled('label', {
  name: 'MuiRadio',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})<{ ownerState: RadioProps }>(({ ownerState }) => ({
  flex: 1,
  minWidth: 0,
  ...(ownerState.disableIcon
    ? {
        zIndex: 1, // label should stay on top of the action.
        pointerEvents: 'none', // makes hover ineffect.
      }
    : {
        marginInlineStart: 'var(--Radio-gap)',
      }),
}));

/**
 * internal component
 */
const RadioIcon = styled('span', {
  name: 'MuiRadio',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon,
})<{ ownerState: RadioProps }>(({ ownerState }) => ({
  width: '50%',
  height: '50%',
  borderRadius: 'inherit',
  color: 'inherit',
  backgroundColor: 'currentColor',
  // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
  transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transform: ownerState.checked ? 'scale(1)' : 'scale(0)',
}));

const Radio = React.forwardRef(function Radio(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiRadio',
  });

  const {
    checked: checkedProp,
    checkedIcon,
    className,
    component,
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    disableIcon: disableIconProp = false,
    overlay: overlayProp = false,
    label,
    id: idOverride,
    name: nameProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    required,
    color: colorProp,
    variant: variantProp = 'outlined',
    size: sizeProp = 'md',
    uncheckedIcon,
    value,
    ...otherProps
  } = props;
  const id = useId(idOverride);
  const radioGroup = React.useContext(RadioGroupContext);
  const color = inProps.color || radioGroup.color || colorProp;
  const activeColor = color || 'primary';
  const inactiveColor = color || 'neutral';
  const variant = inProps.variant || radioGroup.variant || variantProp;
  const size = inProps.size || radioGroup.size || sizeProp;
  const name = inProps.name || radioGroup.name || nameProp;
  const disableIcon = inProps.disableIcon || radioGroup.disableIcon || disableIconProp;
  const overlay = inProps.overlay || radioGroup.overlay || overlayProp;

  const radioChecked =
    typeof checkedProp === 'undefined' && !!value
      ? areEqualValues(radioGroup.value, value)
      : checkedProp;
  const useRadioProps = {
    checked: radioChecked,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
  };

  const { getInputProps, checked, disabled, focusVisible } = useSwitch(useRadioProps);

  const ownerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    color: checked ? activeColor : inactiveColor,
    variant,
    size,
    disableIcon,
    overlay,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <RadioRoot
      ref={ref}
      {...otherProps}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      <RadioRadio
        {...componentsProps?.radio}
        ownerState={ownerState}
        className={clsx(classes.radio, componentsProps?.radio?.className)}
      >
        {checked && !disableIcon && checkedIcon}
        {!checked && !disableIcon && uncheckedIcon}
        {!checkedIcon && !uncheckedIcon && !disableIcon && <RadioIcon ownerState={ownerState} />}
        <RadioAction
          {...componentsProps?.action}
          ownerState={ownerState}
          className={clsx(classes.action, componentsProps?.action?.className)}
        >
          <RadioInput
            ownerState={ownerState}
            {...getInputProps({ ...componentsProps.input, onChange: radioGroup.onChange })}
            type="radio"
            id={id}
            name={name}
            value={String(value)}
            className={clsx(classes.input, componentsProps.input?.className)}
          />
        </RadioAction>
      </RadioRadio>
      {label && (
        <RadioLabel
          {...componentsProps?.label}
          htmlFor={id}
          ownerState={ownerState}
          className={clsx(classes.label, componentsProps?.label?.className)}
        >
          {/* Automatically adjust the Typography to render `span` */}
          <TypographyContext.Provider value>{label}</TypographyContext.Provider>
        </RadioLabel>
      )}
    </RadioRoot>
  );
}) as OverridableComponent<RadioTypeMap>;

Radio.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    action: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.object,
    radio: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the checked icon is removed and the selected variant is applied on the `action` element instead.
   * @default false
   */
  disableIcon: PropTypes.bool,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * The label element at the end the radio.
   */
  label: PropTypes.node,
  /**
   * The `name` attribute of the input.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
   * This prop is useful for composing Radio with ListItem component.
   * @default false;
   */
  overlay: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
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
   * The icon to display when the component is not checked.
   */
  uncheckedIcon: PropTypes.node,
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined']),
    PropTypes.string,
  ]),
} as any;

export default Radio;
