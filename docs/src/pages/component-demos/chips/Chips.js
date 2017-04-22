// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FaceIcon from 'material-ui-icons/Face';
import { grey } from 'material-ui/styles/colors';
import uxecoImage from 'docs/src/assets/images/uxceo-128.jpg';

const styleSheet = createStyleSheet('Chips', (theme) => ({
  chip: {
    margin: theme.spacing.unit,
  },
  svgIcon: {
    color: grey[800],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

function handleRequestDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

export default function Chips(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Chip
        label="Basic Chip"
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Clickable Chip"
        onClick={handleClick}
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar src={uxecoImage} />}
        label="Deletable Chip"
        onRequestDelete={handleRequestDelete}
        className={classes.chip}
      />
      <Chip
        avatar={<Avatar><FaceIcon className={classes.svgIcon} /></Avatar>}
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onRequestDelete={handleRequestDelete}
        className={classes.chip}
      />
    </div>
  );
}

Chips.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
