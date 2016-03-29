import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import SlideInChild from './SlideInChild';

const SlideIn = React.createClass({

  propTypes: {
    childStyle: React.PropTypes.object,
    children: React.PropTypes.node,
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down']),
    enterDelay: React.PropTypes.number,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      enterDelay: 0,
      direction: 'left',
    };
  },

  _getLeaveDirection() {
    return this.props.direction;
  },

  render() {
    const {
      enterDelay,
      children,
      childStyle,
      direction,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }, style);

    const newChildren = React.Children.map(children, (child) => {
      return (
        <SlideInChild
          key={child.key}
          direction={direction}
          enterDelay={enterDelay}
          getLeaveDirection={this._getLeaveDirection}
          style={childStyle}
        >
          {child}
        </SlideInChild>
      );
    }, this);

    return (
      <ReactTransitionGroup
        {...other}
        style={prepareStyles(mergedRootStyles)}
        component="div"
      >
        {newChildren}
      </ReactTransitionGroup>
    );
  },

});

export default SlideIn;
