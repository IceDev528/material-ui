// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

const styleSheet = createStyleSheet('CenteredGrid', theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function CenteredGrid(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Grid container gutter={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            xs=12
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            xs=6
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            xs=6
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            xs=3
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            xs=3
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            xs=3
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            xs=3
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(CenteredGrid);
