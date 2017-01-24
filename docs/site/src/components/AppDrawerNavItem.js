// @flow weak

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { ListItem } from 'material-ui/List';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';

export const styleSheet = createStyleSheet('AppDrawerNavItem', (theme) => {
  return {
    button: theme.mixins.gutters({
      borderRadius: 0,
      justifyContent: 'flex-start',
      textTransform: 'none',
      width: '100%',
      '&:hover': {
        textDecoration: 'none',
      },
    }),
    navItem: {
      ...theme.typography.body2,
      display: 'block',
      paddingTop: 0,
      paddingBottom: 0,
    },
    navLink: {
      fontWeight: theme.typography.fontWeightRegular,
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0,
    },
    navLinkButton: {
      color: theme.palette.text.secondary,
      textIndent: 24,
      fontSize: 13,
    },
    activeButton: {
      color: theme.palette.text.primary,
    },
  };
});

export default class AppDrawerNavItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    openImmediately: PropTypes.bool,
    title: PropTypes.string.isRequired,
    to: PropTypes.string,
  };

  static defaultProps = {
    openImmediately: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    open: false,
  };

  componentWillMount() {
    if (this.props.openImmediately) {
      this.setState({ open: true });
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { children, title, to } = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    if (to) {
      return (
        <ListItem
          className={classes.navLink}
          gutters={false}
        >
          <Button
            component={Link}
            to={to}
            className={classNames(classes.button, classes.navLinkButton)}
            activeClassName={classes.activeButton}
            ripple={false}
            onClick={this.props.onClick}
          >
            {title}
          </Button>
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.navItem} gutters={false}>
        <Button className={classes.button} onClick={this.handleClick}>
          {title}
        </Button>
        <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
          {children}
        </Collapse>
      </ListItem>
    );
  }
}
