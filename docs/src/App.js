import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';

import dateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

import { create } from 'jss';
import preset from 'jss-preset-default';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

// import Demo from './Demo/Demo';
import { setPrismTheme } from './utils/prism';
import Layout from './layout/Layout';
import Routes from './Routes/Routes';

const jss = create({ plugins: [...preset().plugins, rtl()] });
jss.options.createGenerateClassName = createGenerateClassName;

export default class App extends Component {
  static propTypes = {
    toggleFrench: PropTypes.func.isRequired,
  }

  state = {
    type: 'light',
    direction: 'ltr',
  }

  componentWillMount = () => {
    setPrismTheme(this.state.type);
  }

  getMuiTheme = () => createMuiTheme({
    direction: this.state.direction,
    palette: {
      type: this.state.type, // Switching the dark mode on is a single property value change.
    },
  })

  toggleDirection = () => {
    const direction = this.state.direction === 'ltr' ? 'rtl' : 'ltr';

    document.body.dir = direction;

    this.setState({ direction });
  }

  toggleThemeType = () => {
    const type = this.state.type === 'light' ? 'dark' : 'light';

    setPrismTheme(type);
    this.setState({ type });
  }

  render() {
    return (
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MuiPickersUtilsProvider utils={dateFnsUtils}>
            <Layout
              toggleDirection={this.toggleDirection}
              toggleThemeType={this.toggleThemeType}
              toggleFrench={this.props.toggleFrench}
            >
              <Routes />
            </Layout>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}
