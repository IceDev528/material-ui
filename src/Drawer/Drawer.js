// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import Modal from '../internal/Modal';
import customPropTypes from '../utils/customPropTypes';
import Slide from '../transitions/Slide';
import Paper from '../Paper';
import { duration } from '../styles/transitions';

function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  }
  // (anchor === 'bottom')
  return 'up';
}

export const styleSheet = createStyleSheet('MuiDrawer', (theme) => {
  return {
    paper: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flex: '1 0 auto',
      position: 'fixed',
      top: 0,
      zIndex: theme.zIndex.navDrawer,
      willChange: 'transform',
      '&:focus': {
        outline: 'none',
      },
      WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    },
    left: {
      left: 0,
      right: 'auto',
    },
    right: {
      left: 'auto',
      right: 0,
    },
    top: {
      top: 0,
      left: 0,
      bottom: 'auto',
      right: 0,
      height: 'auto',
      maxHeight: '100vh',
    },
    bottom: {
      top: 'auto',
      left: 0,
      bottom: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100vh',
    },
    docked: {
      flex: '0 0 auto',
      '& $paper': {
        borderRight: `1px solid ${theme.palette.text.divider}`,
      },
    },
    modal: {
    },
  };
});

/**
 * This is a drawer.
 */
export default class Drawer extends Component {
  static propTypes = {
    /**
     * Side which will the drawer will appear from.
     */
    anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    /**
     * The contents of the drawer.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If `true`, the drawer will dock itself
     * and will no longer slide in with an overlay.
     */
    docked: PropTypes.bool,
    /**
     * The elevation of the drawer.
     */
    elevation: PropTypes.number,
    /**
     * Customizes duration of enter animation (ms)
     */
    enterTransitionDuration: PropTypes.number,
    /**
     * Customizes duration of leave animation (ms)
     */
    leaveTransitionDuration: PropTypes.number,
    /**
     * Callback fired when the internal modal requests to be closed.
     */
    onRequestClose: PropTypes.func,
    /**
     * If `true`, the drawer is open.
     */
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper element.
     */
    paperClassName: PropTypes.string,
  };

  static defaultProps = {
    anchor: 'left',
    docked: false,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    open: false,
    elevation: 16,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      anchor: anchorProp,
      children,
      className,
      docked,
      enterTransitionDuration,
      leaveTransitionDuration,
      open,
      paperClassName,
      elevation,
      ...other
    } = this.props;

    const { theme: { dir }, render } = this.context.styleManager;
    const classes = render(styleSheet);
    const rtl = dir === 'rtl';
    let anchor = anchorProp;
    if (rtl && ['left', 'right'].includes(anchor)) {
      anchor = (anchor === 'left') ? 'right' : 'left';
    }

    const slideDirection = getSlideDirection(anchor);

    const drawer = (
      <Slide
        in={open}
        direction={slideDirection}
        enterTransitionDuration={enterTransitionDuration}
        leaveTransitionDuration={leaveTransitionDuration}
        transitionAppear
      >
        <Paper
          elevation={docked ? 0 : elevation}
          square
          className={classNames(classes.paper, classes[anchor], paperClassName)}
        >
          {children}
        </Paper>
      </Slide>
    );

    const containerProps = {
      className: classNames(classes.modal, className),
      ...other,
    };

    if (docked) {
      return (
        <div className={classNames(classes.docked, className)}>
          {drawer}
        </div>
      );
    }

    return (
      <Modal
        backdropTransitionDuration={open ? enterTransitionDuration : leaveTransitionDuration}
        {...containerProps}
        show={open}
      >
        {drawer}
      </Modal>
    );
  }
}
