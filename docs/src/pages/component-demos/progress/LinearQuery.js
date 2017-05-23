// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('LinearQuery', theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
}));

function LinearQuery(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <LinearProgress mode="query" />
    </div>
  );
}

LinearQuery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(LinearQuery);
