import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

export default function PrimaryActionCheckboxListItem() {
  return (
    <div style={{ backgroundColor: '#fff', width: 300 }}>
      <List>
        <ListItem button>
          <Checkbox tabIndex={-1} disableRipple />
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <IconButton>
              <Icon>comment</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button dense>
          <Checkbox tabIndex={-1} disableRipple />
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <IconButton>
              <Icon>comment</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button selected>
          <Checkbox tabIndex={-1} disableRipple />
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <IconButton>
              <Icon>comment</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
