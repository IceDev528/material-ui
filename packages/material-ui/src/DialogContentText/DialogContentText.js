import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge } from '@material-ui/utils';
import experimentalStyled, { shouldForwardProp } from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import Typography from '../Typography';
import { getDialogContentTextUtilityClass } from './dialogContentTextClasses';

const overridesResolver = (props, styles) => {
  return deepmerge(styles.root || {}, {});
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  const composedClasses = composeClasses(slots, getDialogContentTextUtilityClass, classes);

  return {
    ...classes, // forward classes to the Typography
    ...composedClasses,
  };
};

const DialogContentTextRoot = experimentalStyled(
  Typography,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiDialogContentText',
    slot: 'Root',
    overridesResolver,
  },
)({ marginBottom: 12 });

const DialogContentText = React.forwardRef(function DialogContentText(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiDialogContentText' });
  const { children, ...styleProps } = props;
  const classes = useUtilityClasses(styleProps);

  return (
    <DialogContentTextRoot
      component="p"
      variant="body1"
      color="text.secondary"
      ref={ref}
      styleProps={styleProps}
      {...props}
      classes={classes}
    />
  );
});

DialogContentText.propTypes /* remove-proptypes */ = {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default DialogContentText;
