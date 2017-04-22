// @flow weak

import React, { cloneElement, Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { FormGroup } from 'material-ui/Form';
import { LabelCheckbox } from 'material-ui/Checkbox';
import Layout from 'material-ui/Layout';
import Typography from 'material-ui/Typography';
import FolderIcon from 'material-ui-icons/Folder';
import DeleteIcon from 'material-ui-icons/Delete';

const styleSheet = createStyleSheet('InteractiveList', (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    background: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
}));

function generate(element) {
  return Array.from(Array(3)).map((value, index) => (
    cloneElement(element, {
      key: index,
    })
  ));
}

class InteractiveList extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    dense: false,
    secondary: false,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>
        <FormGroup row>
          <LabelCheckbox
            checked={dense}
            onChange={(event, checked) => this.setState({ dense: checked })}
            label="Enable dense"
            value="dense"
          />
          <LabelCheckbox
            checked={secondary}
            onChange={(event, checked) => this.setState({ secondary: checked })}
            label="Enable secondary text"
            value="secondary"
          />
        </FormGroup>
        <Layout container>
          <Layout item xs={12} md={6}>
            <Typography type="title" className={classes.title}>
              Text only
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate((
                  <ListItem button>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Layout>
          <Layout item xs={12} md={6}>
            <Typography type="title" className={classes.title}>
              Icon with text
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate((
                  <ListItem button>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Layout>
        </Layout>
        <Layout container>
          <Layout item xs={12} md={6}>
            <Typography type="title" className={classes.title}>
              Avatar with text
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate((
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Layout>
          <Layout item xs={12} md={6}>
            <Typography type="title" className={classes.title}>
              Avatar with text and icon
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate((
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default InteractiveList;
