// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Paper from '../Paper';
import Modal from '../internal/Modal';
import Fade from '../transitions/Fade';

export const styleSheet = createStyleSheet('Dialog', () => {
  return {
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialog: {
      display: 'flex',
      flexDirection: 'column',
      flex: '0 1 auto',
      position: 'relative',
      width: '75%',
      maxWidth: 960,
      maxHeight: '90vh',
      '&:focus': {
        outline: 'none',
      },
    },
  };
});

/**
 * Dialogs are overlayed modal paper based components with a backdrop.
 *
 * ```jsx
 * <Dialog>
 *   <DialogContent>...</DialogContent>
 *   <DialogActions>...</DialogActions>
 * </Dialog>
 * ```
 */
export default class Dialog extends Component {

  static propTypes = {
    /**
     * Dialog children, usually the included sub-components.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, clicking the backdrop will fire the `onRequestClose` callback.
     */
    hideOnBackdropClick: PropTypes.bool,
    /**
     * If true, hitting escape will fire the `onRequestClose` callback.
     */
    hideOnEscapeKeyUp: PropTypes.bool,
    /**
     * Callback fires when the backdrop is clicked on.
     */
    onBackdropClick: PropTypes.func,
    /**
     * Callback fired before the dialog is entering.
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the dialog is entering.
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the dialog has entered.
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fires when the escape key is pressed and the modal is in focus.
     */
    onEscapeKeyUp: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the dialog is exiting.
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the dialog is exiting.
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the dialog has exited.
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired when the dialog requests to be closed.
     */
    onRequestClose: PropTypes.func,
    /**
     * Set to true to open the Dialog.
     */
    open: PropTypes.bool,
    /**
     * The CSS class name of the paper inner element.
     */
    paperClassName: PropTypes.string,
    /**
     * Transition component.
     */
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    /**
     * Length of the transition in ms.
     */
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    hideOnBackdropClick: true,
    hideOnEscapeKeyUp: true,
    open: false,
    transition: Fade,
    transitionDuration: 300,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      hideOnBackdropClick,
      hideOnEscapeKeyUp,
      open,
      onBackdropClick,
      onEscapeKeyUp,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onRequestClose,
      paperClassName,
      transition,
      transitionDuration,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const transitionProps = {
      in: open,
      transitionAppear: true,
      transitionDuration,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
    };

    let createTransitionFn;

    if (typeof transition === 'function') {
      createTransitionFn = React.createElement;
    } else {
      createTransitionFn = React.cloneElement;
    }

    return (
      <Modal
        className={classNames(classes.modal, className)}
        backdropTransitionDuration={transitionDuration}
        hideOnBackdropClick={hideOnBackdropClick}
        hideOnEscapeKeyUp={hideOnEscapeKeyUp}
        onBackdropClick={onBackdropClick}
        onEscapeKeyUp={onEscapeKeyUp}
        onRequestClose={onRequestClose}
        show={open}
        {...other}
      >
        {createTransitionFn(transition, transitionProps, (
          <Paper
            data-mui-test="Dialog"
            zDepth={24}
            className={classNames(classes.dialog, paperClassName)}
          >
            {children}
          </Paper>
        ))}
      </Modal>
    );
  }
}
