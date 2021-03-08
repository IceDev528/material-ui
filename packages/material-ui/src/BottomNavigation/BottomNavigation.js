import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getBottomNavigationUtilityClass } from './bottomNavigationClasses';

const overridesResolver = (props, styles) => styles.root || {};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getBottomNavigationUtilityClass, classes);
};

const BottomNavigationRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiBottomNavigation',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme }) => ({
  /* Styles applied to the root element. */
  display: 'flex',
  justifyContent: 'center',
  height: 56,
  backgroundColor: theme.palette.background.paper,
}));

const BottomNavigation = React.forwardRef(function BottomNavigation(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiBottomNavigation' });
  const {
    children,
    className,
    component = 'div',
    onChange,
    showLabels = false,
    value,
    ...other
  } = props;

  const styleProps = {
    ...props,
    component,
    showLabels,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <BottomNavigationRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {React.Children.map(children, (child, childIndex) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: The BottomNavigation component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        const childValue = child.props.value === undefined ? childIndex : child.props.value;

        return React.cloneElement(child, {
          selected: childValue === value,
          showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
          value: childValue,
          onChange,
        });
      })}
    </BottomNavigationRoot>
  );
});

BottomNavigation.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
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
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child.
   */
  onChange: PropTypes.func,
  /**
   * If `true`, all `BottomNavigationAction`s will show their labels.
   * By default, only the selected `BottomNavigationAction` will show its label.
   * @default false
   */
  showLabels: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The value of the currently selected `BottomNavigationAction`.
   */
  value: PropTypes.any,
};

export default BottomNavigation;
