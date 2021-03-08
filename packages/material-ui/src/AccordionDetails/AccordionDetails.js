import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getAccordionDetailsUtilityClass } from './accordionDetailsClasses';

const overridesResolver = (props, styles) => {
  return styles.root || {};
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAccordionDetailsUtilityClass, classes);
};

const AccordionDetailsRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiAccordionDetails',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme }) => ({
  /* Styles applied to the root element. */
  padding: theme.spacing(1, 2, 2),
}));

const AccordionDetails = React.forwardRef(function AccordionDetails(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAccordionDetails' });
  const { className, ...other } = props;
  // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed
  const styleProps = { ...props };

  const classes = useUtilityClasses(styleProps);

  return (
    <AccordionDetailsRoot
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    />
  );
});

AccordionDetails.propTypes /* remove-proptypes */ = {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default AccordionDetails;
