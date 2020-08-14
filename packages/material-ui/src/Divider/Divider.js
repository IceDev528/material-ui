import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useThemeVariants } from '@material-ui/styles';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    margin: 0, // Reset browser default style.
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    borderBottomWidth: 'thin',
  },
  /* Styles applied to the root element if `absolute={true}`. */
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  /* Styles applied to the root element if `variant="inset"`. */
  inset: {
    marginLeft: 72,
  },
  /* Styles applied to the root element if `variant="fullWidth"`. */
  fullWidth: {},
  /* Styles applied to the root element if `light={true}`. */
  light: {
    borderColor: fade(theme.palette.divider, 0.08),
  },
  /* Styles applied to the root element if `variant="middle"`. */
  middle: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    height: '100%',
    borderBottomWidth: 0,
    borderRightWidth: 'thin',
  },
  /* Styles applied to the root element if `flexItem={true}`. */
  flexItem: {
    alignSelf: 'stretch',
    height: 'auto',
  },
});

const Divider = React.forwardRef(function Divider(props, ref) {
  const {
    absolute = false,
    classes,
    className,
    component: Component = 'hr',
    flexItem = false,
    light = false,
    orientation = 'horizontal',
    role = Component !== 'hr' ? 'separator' : undefined,
    variant = 'fullWidth',
    ...other
  } = props;

  const themeVariantsClasses = useThemeVariants(
    {
      ...props,
      absolute,
      component: Component,
      flexItem,
      light,
      orientation,
      role,
      variant,
    },
    'MuiDivider',
  );

  return (
    <Component
      className={clsx(
        classes.root,
        classes[variant],
        {
          [classes.absolute]: absolute,
          [classes.flexItem]: flexItem,
          [classes.light]: light,
          [classes.vertical]: orientation === 'vertical',
        },
        themeVariantsClasses,
        className,
      )}
      role={role}
      ref={ref}
      {...other}
    />
  );
});

Divider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Absolutely position the element.
   */
  absolute: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   */
  flexItem: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: PropTypes.bool,
  /**
   * The divider orientation.
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * The variant to use.
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['fullWidth', 'inset', 'middle']),
    PropTypes.string,
  ]),
};

export default withStyles(styles, { name: 'MuiDivider' })(Divider);
