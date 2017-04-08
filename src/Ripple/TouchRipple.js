// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import shallowEqual from 'recompose/shallowEqual';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import Ripple, { styleSheet as rippleStyleSheet } from './Ripple';

export const styleSheet = createStyleSheet('MuiTouchRipple', () => ({
  root: {
    display: 'block',
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
}));

export default class TouchRipple extends Component {
  static propTypes = {
    /**
     * If `true`, the ripple starts at the center of the component
     * rather than at the point of interaction.
     */
    center: PropTypes.bool,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    center: false,
  };

  static contextTypes = {
    theme: customPropTypes.muiRequired,
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    nextKey: 0,
    ripples: [],
  };

  componentWillMount() {
    // Pre-render the ripple styles
    this.context.styleManager.render(rippleStyleSheet);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context.theme, nextContext.theme)
    );
  }

  // Used to filter out mouse emulated events on mobile.
  ignoringMouseDown = false;

  pulsate = () => {
    this.start({}, { pulsate: true });
  };

  start = (event = {}, options = {}, cb) => {
    const {
      pulsate = false,
      center = this.props.center || options.pulsate,
    } = options;

    if (event.type === 'mousedown' && this.ignoringMouseDown) {
      this.ignoringMouseDown = false;
      return;
    }

    if (event.type === 'touchstart') {
      this.ignoringMouseDown = true;
    }

    let ripples = this.state.ripples;

    const element = ReactDOM.findDOMNode(this);
    // $FlowFixMe
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    };

    // Get the size of the ripple
    let rippleX;
    let rippleY;
    let rippleSize;

    if (
      center ||
      (event.clientX === 0 && event.clientY === 0) ||
      (!event.clientX && !event.touches)
    ) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
      const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }

    if (center) {
      rippleSize = Math.sqrt(((2 * Math.pow(rect.width, 2)) + Math.pow(rect.height, 2)) / 3);

      // For some reason the animation is broken on Mobile Chrome if the size if even.
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = (Math.max(
        // $FlowFixMe
        Math.abs((element ? element.clientWidth : 0) - rippleX),
        rippleX,
      ) * 2) + 2;
      const sizeY = (Math.max(
        // $FlowFixMe
        Math.abs((element ? element.clientHeight : 0) - rippleY),
        rippleY,
      ) * 2) + 2;
      rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
    }

    // Add a ripple to the ripples array
    ripples = [...ripples, (
      <Ripple
        key={this.state.nextKey}
        event={event}
        pulsate={pulsate}
        rippleX={rippleX}
        rippleY={rippleY}
        rippleSize={rippleSize}
      />
    )];

    this.setState({
      nextKey: this.state.nextKey + 1,
      ripples,
    }, cb);
  };

  stop = (event, cb) => {
    const { ripples } = this.state;
    if (ripples && ripples.length) {
      this.setState({
        ripples: ripples.slice(1),
      }, cb);
    }
  };

  render() {
    const {
      center, // eslint-disable-line no-unused-vars
      className,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <ReactTransitionGroup
        component="span"
        transitionEnterTimeout={550}
        transitionLeaveTimeout={550}
        className={classNames(classes.root, className)}
        {...other}
      >
        {this.state.ripples}
      </ReactTransitionGroup>
    );
  }
}
