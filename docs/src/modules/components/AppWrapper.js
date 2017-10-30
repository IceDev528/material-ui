// @flow weak
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider } from 'material-ui/styles';
import getContext, { getTheme } from 'docs/src/modules/styles/getContext';
import AppFrame from 'docs/src/modules/components/AppFrame';
import { lightTheme, darkTheme, setPrismTheme } from 'docs/src/modules/utils/prism';
import config from 'docs/src/config';

// Injected the insertion-point-jss after docssearch
if (process.browser && !global.__INSERTION_POINT__) {
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');
  const docsearchStylesSheet = document.querySelector('#insertion-point-jss');

  if (document.head && docsearchStylesSheet) {
    document.head.insertBefore(styleNode, docsearchStylesSheet.nextSibling);
  }
}

class AppWrapper extends React.Component<any, any> {
  componentWillMount() {
    this.styleContext = getContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    if (this.props.uiTheme.paletteType === 'light') {
      setPrismTheme(lightTheme);
    } else {
      setPrismTheme(darkTheme);
    }

    if (document.body) {
      document.body.dir = this.props.uiTheme.direction;
    }

    // Wait for the title to be updated.
    this.googleTimer = setTimeout(() => {
      window.gtag('config', config.google.id, {
        page_path: window.location.pathname,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uiTheme.paletteType !== this.props.uiTheme.paletteType ||
      nextProps.uiTheme.direction !== this.props.uiTheme.direction
    ) {
      this.styleContext.theme = getTheme(nextProps.uiTheme);

      if (nextProps.uiTheme.paletteType === 'light') {
        setPrismTheme(lightTheme);
      } else {
        setPrismTheme(darkTheme);
      }

      if (document.body) {
        document.body.dir = nextProps.uiTheme.direction;
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.googleTimer);
  }

  styleContext = null;
  googleTimer = null;

  render() {
    const { children, sheetsRegistry } = this.props;

    return (
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppFrame>{children}</AppFrame>
        </MuiThemeProvider>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  sheetsRegistry: PropTypes.object,
  uiTheme: PropTypes.object.isRequired,
};

export default connect(state => ({
  uiTheme: state.theme,
}))(AppWrapper);
