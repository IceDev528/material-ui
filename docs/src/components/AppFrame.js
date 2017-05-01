// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { createStyleSheet } from 'jss-theme-reactor';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import MenuIcon from 'material-ui-icons/Menu';
import LightbulbOutlineIcon from 'material-ui-icons/LightbulbOutline';
import customPropTypes from 'material-ui/utils/customPropTypes';
import AppDrawer from 'docs/src/components/AppDrawer';
import DemoButton from 'docs/src/components/DemoButton';
import AppSearch from 'docs/src/components/AppSearch';
import ApiMenu from 'docs/src/components/ApiMenu';

function getTitle(routes) {
  for (let i = routes.length - 1; i >= 0; i -= 1) {
    if (routes[i].hasOwnProperty('title')) {
      return routes[i].title;
    }
  }

  return null;
}

const styleSheet = createStyleSheet('AppFrame', (theme) => {
  return {
    '@global': {
      html: {
        boxSizing: 'border-box',
      },
      '*, *:before, *:after': {
        boxSizing: 'inherit',
      },
      body: {
        margin: 0,
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        lineHeight: '1.2',
        overflowX: 'hidden',
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        width: 'auto',
      },
    },
    appFrame: {
      display: 'flex',
      alignItems: 'stretch',
      minHeight: '100vh',
      width: '100%',
    },
    grow: {
      flex: '1 1 auto',
    },
    title: {
      marginLeft: 24,
      flex: '0 1 auto',
    },
    appBar: {
      left: 'auto',
      right: 0,
      transition: theme.transitions.create('width'),
    },
    appBarHome: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      drawer: {
        width: '250px',
      },
      appBarShift: {
        width: 'calc(100% - 250px)',
      },
      navIconHide: {
        display: 'none',
      },
    },
  };
});

class AppFrame extends Component {
  state = {
    drawerOpen: false,
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleToggleShade = () => {
    this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
  };

  render() {
    const {
      children,
      routes,
      width,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const title = getTitle(routes);

    let drawerDocked = isWidthUp('lg', width);
    let navIconClassName = classes.icon;
    let appBarClassName = classes.appBar;

    if (title === null) { // home route, don't shift app bar or dock drawer
      drawerDocked = false;
      appBarClassName += ` ${classes.appBarHome}`;
    } else {
      navIconClassName += ` ${classes.navIconHide}`;
      appBarClassName += ` ${classes.appBarShift}`;
    }

    return (
      <div className={classes.appFrame}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            <IconButton contrast onClick={this.handleDrawerToggle} className={navIconClassName}>
              <MenuIcon />
            </IconButton>
            {title !== null && (
              <Typography
                className={classes.title}
                type="title"
                colorInherit
                noWrap
              >
                {title}
              </Typography>
            )}
            <div className={classes.grow} />
            <AppSearch />
            <DemoButton routes={routes} />
            <ApiMenu routes={routes} />
            <IconButton contrast onClick={this.handleToggleShade}>
              <LightbulbOutlineIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          docked={drawerDocked}
          routes={routes}
          onRequestClose={this.handleDrawerClose}
          open={drawerDocked || this.state.drawerOpen}
        />
        {children}
      </div>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
};

AppFrame.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default compose(
  withWidth(),
  connect(),
)(AppFrame);
