// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('RaisedButtons', theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
}));

function RaisedButtons(props) {
  const classes = props.classes;
  return (
    <div>
      <Button raised className={classes.button}>Default</Button>
      <Button raised primary className={classes.button}>Primary</Button>
      <Button raised accent className={classes.button}>Accent</Button>
      <Button raised contrast className={classes.button}>Contrast</Button>
      <Button raised disabled accent className={classes.button}>
        Disabled
      </Button>
      <input accept="jpg,jpeg,JPG,JPEG" className={classes.input} id="file" multiple type="file" />
      <label htmlFor="file">
        <Button component="span" className={classes.button}>Upload</Button>
      </label>
    </div>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(RaisedButtons);
