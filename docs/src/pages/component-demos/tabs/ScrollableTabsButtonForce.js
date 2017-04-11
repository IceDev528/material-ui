// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';
import HelpIcon from 'material-ui-icons/Help';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';

const TabContainer = (props) => (
  <div style={{ padding: 20 }}>
    {props.children}
  </div>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet('ScrollableTabsButtonForce', (theme) => ({
  root: {
    marginTop: 30,
    width: '100%',
  },
  appBar: {
    backgroundColor: theme.palette.background.appBar,
  },
}));

export default class ScrollableTabsButtonForce extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Paper className={classes.root}>
        <div className={classes.appBar}>
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            textColor="accent"
          >
            <Tab label="Item One" icon={<PhoneIcon />} />
            <Tab label="Item Two" icon={<FavoriteIcon />} />
            <Tab label="Item Three" icon={<PersonPinIcon />} />
            <Tab label="Item Four" icon={<HelpIcon />} />
            <Tab label="Item Five" icon={<ShoppingBasket />} />
            <Tab label="Item Six" icon={<ThumbDown />} />
            <Tab label="Item Seven" icon={<ThumbUp />} />
          </Tabs>
        </div>
        {this.state.index === 0 && <TabContainer>{'Item One'}</TabContainer>}
        {this.state.index === 1 && <TabContainer>{'Item Two'}</TabContainer>}
        {this.state.index === 2 && <TabContainer>{'Item Three'}</TabContainer>}
        {this.state.index === 3 && <TabContainer>{'Item Four'}</TabContainer>}
        {this.state.index === 4 && <TabContainer>{'Item Five'}</TabContainer>}
        {this.state.index === 5 && <TabContainer>{'Item Six'}</TabContainer>}
        {this.state.index === 6 && <TabContainer>{'Item Seven'}</TabContainer>}
      </Paper>
    );
  }
}
