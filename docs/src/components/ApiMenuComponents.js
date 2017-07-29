// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { kebabCase } from 'docs/src/utils/helpers';

class ApiMenuComponents extends Component {
  state = {
    anchorEl: undefined,
    open: false,
  };

  handleMenuClick = event => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleMenuRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <IconButton
          color="contrast"
          onClick={this.handleMenuClick}
          aria-label="open menu api"
          aria-owns={this.state.open ? 'api-menu' : null}
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="api-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleMenuRequestClose}
        >
          {this.props.components.map(component =>
            <MenuItem
              key={component}
              component={Link}
              to={`/component-api/${kebabCase(component)}`}
              button={false}
              onClick={this.handleMenuRequestClose}
            >
              {component}
            </MenuItem>,
          )}
        </Menu>
      </div>
    );
  }
}

ApiMenuComponents.propTypes = {
  components: PropTypes.array.isRequired,
};

export default ApiMenuComponents;
