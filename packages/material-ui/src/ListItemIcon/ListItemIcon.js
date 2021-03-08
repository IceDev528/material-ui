import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getListItemIconUtilityClass } from './listItemIconClasses';
import ListContext from '../List/ListContext';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...(styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart),
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { alignItems, classes } = styleProps;

  const slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart'],
  };

  return composeClasses(slots, getListItemIconUtilityClass, classes);
};

const ListItemIconRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiListItemIcon',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  minWidth: 56,
  color: theme.palette.action.active,
  flexShrink: 0,
  display: 'inline-flex',
  /* Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  ...(styleProps.alignItems === 'flex-start' && {
    marginTop: 8,
  }),
}));

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
const ListItemIcon = React.forwardRef(function ListItemIcon(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemIcon',
  });

  const { className, ...other } = props;
  const context = React.useContext(ListContext);
  const styleProps = { ...props, alignItems: context.alignItems };
  const classes = useUtilityClasses(styleProps);

  return (
    <ListItemIconRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

ListItemIcon.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@material-ui/icons` SVG icon element.
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

export default ListItemIcon;
