import * as React from 'react';
import PropTypes from 'prop-types';
import { deepmerge, refType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import SwitchBase from '../internal/SwitchBase';
import useThemeProps from '../styles/useThemeProps';
import RadioButtonIcon from './RadioButtonIcon';
import { alpha } from '../styles/colorManipulator';
import capitalize from '../utils/capitalize';
import createChainedFunction from '../utils/createChainedFunction';
import useRadioGroup from '../RadioGroup/useRadioGroup';
import { getRadioUtilityClass } from './radioClasses';
import experimentalStyled, { shouldForwardProp } from '../styles/experimentalStyled';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, styles[`color${capitalize(styleProps.color)}`]);
};

const useUtilityClasses = (styleProps) => {
  const { classes, color } = styleProps;

  const slots = {
    root: ['root', `color${capitalize(color)}`],
  };

  return {
    ...classes,
    ...composeClasses(slots, getRadioUtilityClass, classes),
  };
};

const RadioRoot = experimentalStyled(
  SwitchBase,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiRadio',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  color: theme.palette.text.secondary,
  /* Styles applied to the root element unless `color="default"`. */
  ...(styleProps.color !== 'default' && {
    '&.Mui-checked': {
      color: theme.palette[styleProps.color].main,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette[styleProps.color].main,
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    },
  }),
  '&.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));

const defaultCheckedIcon = <RadioButtonIcon checked />;
const defaultIcon = <RadioButtonIcon />;

const Radio = React.forwardRef(function Radio(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiRadio' });
  const {
    checked: checkedProp,
    color = 'secondary',
    name: nameProp,
    onChange: onChangeProp,
    size = 'medium',
    ...other
  } = props;
  const styleProps = {
    ...props,
    color,
    size,
  };

  const classes = useUtilityClasses(styleProps);
  const radioGroup = useRadioGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return (
    <RadioRoot
      color={color}
      type="radio"
      icon={React.cloneElement(defaultIcon, { fontSize: size === 'small' ? 'small' : 'medium' })}
      checkedIcon={React.cloneElement(defaultCheckedIcon, {
        fontSize: size === 'small' ? 'small' : 'medium',
      })}
      styleProps={styleProps}
      classes={classes}
      name={name}
      checked={checked}
      onChange={onChange}
      ref={ref}
      {...other}
    />
  );
});

Radio.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
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
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'secondary'
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
};

export default Radio;
