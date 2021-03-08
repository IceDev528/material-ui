import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from '../List/ListContext';
import { getListItemSecondaryActionClassesUtilityClass } from './listItemSecondaryActionClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...(styleProps.disableGutters && styles.disableGutters),
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { disableGutters, classes } = styleProps;

  const slots = {
    root: ['root', disableGutters && 'disableGutters'],
  };

  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};

const ListItemSecondaryActionRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiListItemSecondaryAction',
    slot: 'Root',
    overridesResolver,
  },
)(({ styleProps }) => ({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  ...(styleProps.disableGutters && {
    right: 0,
  }),
}));

/**
 * Must be used as the last child of ListItem to function properly.
 */
const ListItemSecondaryAction = React.forwardRef(function ListItemSecondaryAction(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiListItemSecondaryAction' });
  const { className, ...other } = props;
  const context = React.useContext(ListContext);
  const styleProps = { ...props, disableGutters: context.disableGutters };
  const classes = useUtilityClasses(styleProps);

  return (
    <ListItemSecondaryActionRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

ListItemSecondaryAction.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `IconButton` or selection control.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default ListItemSecondaryAction;
