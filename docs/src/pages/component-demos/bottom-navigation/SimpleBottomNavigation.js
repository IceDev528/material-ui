// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';

const styleSheet = createStyleSheet('SimpleBottomNavigation', {
  root: {
    width: 500,
  },
});

class SimpleBottomNavigation extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const classes = this.props.classes;
    const { index } = this.state;

    return (
      <div className={classes.root}>
        <BottomNavigation index={index} onChange={this.handleChange} showLabels>
          <BottomNavigationButton label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationButton label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationButton label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleBottomNavigation);
