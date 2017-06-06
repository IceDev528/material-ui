// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('MuiCard', {
  root: {
    overflow: 'hidden',
  },
});

function Card(props) {
  const { classes, className, raised, ...other } = props;

  return (
    <Paper className={classNames(classes.root, className)} elevation={raised ? 8 : 2} {...other} />
  );
}

Card.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the card will use raised styling.
   */
  raised: PropTypes.bool,
};

Card.defaultProps = {
  raised: false,
};

export default withStyles(styleSheet)(Card);
