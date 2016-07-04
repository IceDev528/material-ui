import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import createFragment from 'react-addons-create-fragment';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import addEventListener from '../utils/addEventListener';
import keycode from 'keycode';
import {TouchRipple, createRippleHandler} from '../Ripple';

let listening = false;
let tabPressed = false;

function listenForTabPresses() {
  if (!listening) {
    addEventListener(window, 'keydown', (event) => {
      tabPressed = keycode(event) === 'tab';
    });
    listening = true;
  }
}

export const styleSheet = createStyleSheet('ButtonBase', () => {
  return {
    root: {
      position: 'relative',
      outline: 'none',
      border: 0,
      cursor: 'pointer',
      userSelect: 'none',
      appearance: 'none',
      textDecoration: 'none',
    },
  };
});

export default class ButtonBase extends Component {
  static propTypes = {
    centerRipple: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    disabled: PropTypes.bool,
    focusRipple: PropTypes.bool,
    keyboardFocusedClassName: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,
    ripple: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    type: PropTypes.string,
  };

  static defaultProps = {
    centerRipple: false,
    component: 'button',
    focusRipple: false,
    ripple: true,
    type: 'button',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    keyboardFocused: false,
  };

  componentDidMount() {
    listenForTabPresses();
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

  handleKeyDown = (event) => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (this.props.focusRipple && !this.keyDown && this.state.keyboardFocused && keycode(event) === 'space') {
      this.keyDown = true;
      event.persist();
      this.ripple.stop(event, () => {
        this.ripple.start(event);
      });
    }
  };

  handleKeyUp = (event) => {
    if (this.props.focusRipple && keycode(event) === 'space' && this.state.keyboardFocused) {
      this.keyDown = false;
      event.persist();
      this.ripple.stop(event, () => this.ripple.pulsate(event));
    }
  };

  handleMouseDown = createRippleHandler(this, 'MouseDown', 'start', () => {
    clearTimeout(this.keyboardFocusTimeout);
    tabPressed = false;
    if (this.state.keyboardFocused) {
      this.setState({keyboardFocused: false});
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
    this.setState({keyboardFocused: false});
  });

  handleFocus = (event) => {
    if (event) event.persist();
    if (!this.props.disabled) {
      // setTimeout is needed because the focus event fires first
      // Wait so that we can capture if this was a keyboard focus
      // or touch focus
      this.keyboardFocusTimeout = setTimeout(() => {
        if (tabPressed && document.activeElement === ReactDOM.findDOMNode(this.button)) {
          this.keyDown = false;
          tabPressed = false;
          this.setState({keyboardFocused: true});
        }
      }, 150);

      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    }
  };

  renderRipple(ripple, center) {
    if (ripple === true) {
      return <TouchRipple ref={(c) => this.ripple = c} center={center} />;
    }

    return null;
  }

  render() {
    const {
      centerRipple,
      children,
      className,
      component,
      disabled,
      focusRipple, // eslint-disable-line no-unused-vars
      keyboardFocusedClassName,
      onBlur, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      onKeyUp, // eslint-disable-line no-unused-vars
      onMouseDown, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onMouseUp, // eslint-disable-line no-unused-vars
      onTouchEnd, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      ripple,
      type,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const classNames = ClassNames(classes.root, className, {
      [keyboardFocusedClassName]: this.state.keyboardFocused,
    });

    const buttonProps = {
      ref: (c) => this.button = c,
      onClick: this.handleClick,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleTouchEnd,
      onTouchStart: this.handleTouchStart,
      className: classNames,
      ...other,
    };

    let element = component;

    if (other.href) {
      element = 'a';
    }

    if (element === 'button') {
      buttonProps.type = type;
      buttonProps.disabled = disabled;
    }

    return React.createElement(
      element,
      buttonProps,
      createFragment({
        children: children,
        ripple: this.renderRipple(ripple, centerRipple),
      })
    );
  }
}
