import React from 'react';
import propTypes from '../utils/propTypes';
import transitions from '../styles/transitions';

function getStyles(props, context) {
  const {
    circle,
    rounded,
    transitionEnabled,
    zDepth,
  } = props;

  const {
    baseTheme,
    paper,
  } = context.muiTheme;

  return {
    root: {
      color: paper.color,
      backgroundColor: paper.backgroundColor,
      transition: transitionEnabled && transitions.easeOut(),
      boxSizing: 'border-box',
      fontFamily: baseTheme.fontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      boxShadow: paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
      borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
    },
  };
}

const Paper = React.createClass({

  propTypes: {
    /**
     * Children passed into the paper element.
     */
    children: React.PropTypes.node,

    /**
     * Set to true to generate a circlular paper container.
     */
    circle: React.PropTypes.bool,

    /**
     * By default, the paper container will have a border radius.
     * Set this to false to generate a container with sharp corners.
     */
    rounded: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Set to false to disable CSS transitions for the paper element.
     */
    transitionEnabled: React.PropTypes.bool,

    /**
     * This number represents the zDepth of the paper shadow.
     */
    zDepth: propTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      circle: false,
      rounded: true,
      transitionEnabled: true,
      zDepth: 1,
    };
  },

  render() {
    const {
      children,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {children}
      </div>
    );
  },
});

export default Paper;
