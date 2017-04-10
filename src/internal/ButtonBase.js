/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import keycode from 'keycode';
import customPropTypes from '../utils/customPropTypes';
import { listenForFocusKeys, detectKeyboardFocus, focusKeyPressed } from '../utils/keyboardFocus';
import { TouchRipple, createRippleHandler } from '../Ripple';

export const styleSheet = createStyleSheet('MuiButtonBase', () => {
  return {
    buttonBase: {
      position: 'relative',
      WebkitTapHighlightColor: 'rgba(0,0,0,0.0)',
      outline: 'none',
      border: 0,
      cursor: 'pointer',
      userSelect: 'none',
      appearance: 'none',
      textDecoration: 'none',
    },
    disabled: {
      cursor: 'not-allowed',
    },
  };
});

export default class ButtonBase extends Component {
  static propTypes = {
    centerRipple: PropTypes.bool,
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    /**
     * If `true`, the base button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the base button will have a keyboard focus ripple.
     * `ripple` must also be true.
     */
    focusRipple: PropTypes.bool,
    keyboardFocusedClassName: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,
    /**
     * If `false`, the base button will not have a ripple when clicked.
     */
    ripple: PropTypes.bool,
    role: PropTypes.string,
    tabIndex: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = {
    centerRipple: false,
    component: 'button',
    focusRipple: false,
    ripple: true,
    tabIndex: '0',
    type: 'button',
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    keyboardFocused: false,
  };

  componentDidMount() {
    listenForFocusKeys();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.focusRipple) {
      if (nextState.keyboardFocused && !this.state.keyboardFocused) {
        this.ripple.pulsate();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.keyboardFocusTimeout);
  }

  ripple = undefined;
  keyDown = false; // Used to help track keyboard activation keyDown
  button = null;
  keyboardFocusTimeout = undefined;
  keyboardFocusCheckTime = 40;
  keyboardFocusMaxCheckTimes = 5;

  focus = () => this.button.focus();

  handleKeyDown = (event) => {
    const { component, focusRipple, onKeyDown, onClick } = this.props;
    const key = keycode(event);

    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !this.keyDown && this.state.keyboardFocused && key === 'space') {
      this.keyDown = true;
      event.persist();
      this.ripple.stop(event, () => {
        this.ripple.start(event);
      });
    }

    if (onKeyDown) {
      onKeyDown(event);
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === this.button &&
      onClick &&
      component !== 'a' &&
      component !== 'button' &&
      (key === 'space' || key === 'enter')
    ) {
      event.preventDefault();
      onClick(event);
    }
  };

  handleKeyUp = (event) => {
    if (this.props.focusRipple && keycode(event) === 'space' && this.state.keyboardFocused) {
      this.keyDown = false;
      event.persist();
      this.ripple.stop(event, () => this.ripple.pulsate(event));
    }
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  };

  handleMouseDown = createRippleHandler(this, 'MouseDown', 'start', () => {
    clearTimeout(this.keyboardFocusTimeout);
    focusKeyPressed(false);
    if (this.state.keyboardFocused) {
      this.setState({ keyboardFocused: false });
    }
  });

  handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop');

  handleMouseLeave = createRippleHandler(this, 'MouseLeave', 'stop', (event) => {
    if (this.state.keyboardFocused) {
      event.preventDefault();
    }
  });

  handleTouchStart = createRippleHandler(this, 'TouchStart', 'start');
  handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop');

  handleBlur = createRippleHandler(this, 'Blur', 'stop', () => {
    this.setState({ keyboardFocused: false });
  });

  handleFocus = (event) => {
    if (this.props.disabled) {
      return;
    }

    event.persist();

    detectKeyboardFocus(this, findDOMNode(this.button), () => {
      this.keyDown = false;
      this.setState({ keyboardFocused: true });

      if (this.props.onKeyboardFocus) {
        this.props.onKeyboardFocus(event);
      }
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  renderRipple(ripple, center) {
    if (ripple === true && !this.props.disabled) {
      return <TouchRipple ref={(c) => { this.ripple = c; }} center={center} />;
    }

    return null;
  }

  render() {
    const {
      centerRipple,
      children,
      className: classNameProp,
      component,
      disabled,
      focusRipple, // eslint-disable-line no-unused-vars
      keyboardFocusedClassName,
      onBlur, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      onKeyUp, // eslint-disable-line no-unused-vars
      onMouseDown, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onMouseUp, // eslint-disable-line no-unused-vars
      onTouchEnd, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      ripple,
      tabIndex,
      type,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const className = classNames(classes.buttonBase, {
      [classes.disabled]: disabled,
      [keyboardFocusedClassName]: keyboardFocusedClassName && this.state.keyboardFocused,
    }, classNameProp);

    const buttonProps = {
      ref: (c) => { this.button = c; },
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchStart: this.handleTouchStart,
      tabIndex: disabled ? '-1' : tabIndex,
      className,
      ...other,
    };

    let Element = component;

    if (other.href) {
      Element = 'a';
    }

    if (Element === 'button') {
      buttonProps.type = type;
      buttonProps.disabled = disabled;
    } else if (Element !== 'a') {
      buttonProps.role = this.props.hasOwnProperty('role') ? this.props.role : 'button';
    }

    return (
      <Element {...buttonProps}>
        {children}
        {this.renderRipple(ripple, centerRipple)}
      </Element>
    );
  }
}
