// @flow weak

import React from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import Avatar from 'material-ui/Avatar';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { pink, green } from 'material-ui/styles/colors';
import FolderIcon from 'material-ui-icons/Folder';
import PageviewIcon from 'material-ui-icons/Pageview';
import AssignmentIcon from 'material-ui-icons/Assignment';

const styleSheet = createStyleSheet('IconAvatars', () => ({
  avatar: {
    margin: 10,
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function IconAvatars(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.row}>
      <Avatar className={classes.avatar}>
        <FolderIcon />
      </Avatar>
      <Avatar className={classes.pinkAvatar}>
        <PageviewIcon />
      </Avatar>
      <Avatar className={classes.greenAvatar}>
        <AssignmentIcon />
      </Avatar>
    </div>
  );
}

IconAvatars.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
