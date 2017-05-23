// @flow weak

import React from 'react';
import Paper from 'material-ui/Paper';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Grid from 'material-ui/Grid';

const styleSheet = createStyleSheet('StressGrid', theme => ({
  root: {
    width: 400,
    backgroundColor: theme.palette.primary.A400,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
}));

export default function StressGrid(props, context) {
  const classes = context.styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <Grid container gutter={24} direction="column">
        <Grid container item gutter={8}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              xs=3
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              xs=9
            </Paper>
          </Grid>
        </Grid>
        <Grid container item gutter={8} direction="row-reverse">
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              first
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              last
            </Paper>
          </Grid>
        </Grid>
        <Grid container item gutter={8} justify="space-between">
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              space
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              between
            </Paper>
          </Grid>
        </Grid>
        <Grid container item gutter={8} align="stretch" direction="column-reverse">
          <Grid item>
            <Paper className={classes.paper}>
              reverse
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              column
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

StressGrid.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
