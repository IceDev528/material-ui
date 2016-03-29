import React from 'react';
import ReactDOM from 'react-dom';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

const SlideInChild = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    direction: React.PropTypes.string,
    enterDelay: React.PropTypes.number,
    // This callback is needed bacause the direction could change when leaving the DOM
    getLeaveDirection: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      enterDelay: 0,
    };
  },

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  },

  componentWillEnter(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    const x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    const y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    autoPrefix.set(style, 'transform', `translate3d(${x}, ${y}, 0)`);

    this.enterTimer = setTimeout(callback, this.props.enterDelay);
  },

  componentDidEnter() {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    autoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
  },

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    const direction = this.props.getLeaveDirection();
    const x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    const y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    autoPrefix.set(style, 'transform', `translate3d(${x}, ${y}, 0)`);

    this.leaveTimer = setTimeout(callback, 450);
  },

  render() {
    const {
      children,
      enterDelay, // eslint-disable-line no-unused-vars
      getLeaveDirection, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: transitions.easeOut(null, ['transform', 'opacity']),
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedRootStyles)}>
        {children}
      </div>
    );
  },

});

export default SlideInChild;
