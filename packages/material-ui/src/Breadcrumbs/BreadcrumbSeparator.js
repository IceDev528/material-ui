import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

const styles = {
  root: {
    display: 'flex',
    userSelect: 'none',
    marginLeft: 8,
    marginRight: 8,
  },
};

/**
 * @ignore - internal component.
 */
function BreadcrumbSeparator(props) {
  const { children, classes, className, ...other } = props;

  return (
    <li aria-hidden="true" className={clsx(classes.root, className)} {...other}>
      {children}
    </li>
  );
}

BreadcrumbSeparator.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiPrivateBreadcrumbSeparator' })(BreadcrumbSeparator);
