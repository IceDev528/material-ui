import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getCardActionsUtilityClass } from './cardActionsClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...(!styleProps.disableSpacing && styles.spacing),
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { classes, disableSpacing } = styleProps;

  const slots = {
    root: ['root', !disableSpacing && 'spacing'],
  };

  return composeClasses(slots, getCardActionsUtilityClass, classes);
};

const CardActionsRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiCardActions',
    slot: 'Root',
    overridesResolver,
  },
)(({ styleProps }) => ({
  /* Styles applied to the root element. */
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  /* Styles applied to the root element unless `disableSpacing={true}`. */
  ...(!styleProps.disableSpacing && {
    '& > :not(:first-of-type)': {
      marginLeft: 8,
    },
  }),
}));

const CardActions = React.forwardRef(function CardActions(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCardActions',
  });

  const { disableSpacing = false, className, ...other } = props;

  const styleProps = { ...props, disableSpacing };

  const classes = useUtilityClasses(styleProps);

  return (
    <CardActionsRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

CardActions.propTypes /* remove-proptypes */ = {
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default CardActions;
