import React from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

class CircleRipple extends React.Component {
  static propTypes = {
    aborted: React.PropTypes.bool,
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    opacity: 0.1,
    aborted: false,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillAppear(callback) {
    this.initializeAnimation(callback);
  }

  componentWillEnter(callback) {
    this.initializeAnimation(callback);
  }

  componentDidAppear() {
    this.animate();
  }

  componentDidEnter() {
    this.animate();
  }

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = 0;
    // If the animation is aborted, remove from the DOM immediately
    const removeAfter = this.props.aborted ? 0 : 2000;
    this.enterTimer = setTimeout(callback, removeAfter);
  }

  animate() {
    const style = ReactDOM.findDOMNode(this).style;
    const transitionValue = `${transitions.easeOut('2s', 'opacity')}, ${
      transitions.easeOut('1s', 'transform')}`;
    autoPrefix.set(style, 'transition', transitionValue);
    autoPrefix.set(style, 'transform', 'scale(1)');
  }

  initializeAnimation(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = this.props.opacity;
    autoPrefix.set(style, 'transform', 'scale(0)');
    this.leaveTimer = setTimeout(callback, 0);
  }

  render() {
    const {
      color,
      opacity, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedStyles = Object.assign({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      backgroundColor: color,
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedStyles)} />
    );
  }
}

export default CircleRipple;
