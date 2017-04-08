// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import warning from 'warning';
import keycode from 'keycode';
import canUseDom from 'dom-helpers/util/inDOM';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import addEventListener from '../utils/addEventListener';
import { createChainedFunction } from '../utils/helpers';
import Fade from '../transitions/Fade';
import customPropTypes from '../utils/customPropTypes';
import { createModalManager } from './modalManager';
import Backdrop from './Backdrop';
import Portal from './Portal';

/**
 * Modals don't open on the server so this won't break concurrency.
 * Could also put this on context.
 */
const modalManager = createModalManager();

export const styleSheet = createStyleSheet('MuiModal', (theme) => {
  return {
    modal: {
      display: 'flex',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: theme.zIndex.dialog,
      top: 0,
      left: 0,
    },
  };
});

/**
 * TODO: Still a WIP
 */
export default class Modal extends Component {
  static propTypes = {
    /**
     * The CSS class name of the backdrop element.
     */
    backdropClassName: PropTypes.string,
    /**
     * Pass a component class to use as the backdrop.
     */
    backdropComponent: PropTypes.func,
    /**
     * If `true`, the backdrop is invisible.
     */
    backdropInvisible: PropTypes.bool,
    /**
     * Duration in ms for the backgrop transition.
     */
    backdropTransitionDuration: PropTypes.number,
    /**
     * Content of the modal.
     */
    children: PropTypes.element,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If `true`, the backdrop is disabled.
     */
    disableBackdrop: PropTypes.bool,
    /**
     * If `true`, clicking the backdrop will not fire the `onRequestClose` callback.
     */
    ignoreBackdropClick: PropTypes.bool,
    /**
     * If `true`, hitting escape will not fire the `onRequestClose` callback.
     */
    ignoreEscapeKeyUp: PropTypes.bool,
    /**
     * @ignore
     */
    modalManager: PropTypes.object,
    /**
     * Callback fires when the backdrop is clicked on.
     */
    onBackdropClick: PropTypes.func,
    /**
     * Callback fired before the modal is entering.
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the modal is entering.
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the modal has entered.
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fires when the escape key is pressed and the modal is in focus.
     */
    onEscapeKeyUp: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the modal is exiting.
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the modal is exiting.
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the modal has exited.
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired when the modal requests to be closed.
     */
    onRequestClose: PropTypes.func,
    /**
     * If `true`, the Modal is visible.
     */
    show: PropTypes.bool,
  };

  static defaultProps = {
    backdropComponent: Backdrop,
    backdropTransitionDuration: 300,
    backdropInvisible: false,
    disableBackdrop: false,
    ignoreBackdropClick: false,
    ignoreEscapeKeyUp: false,
    modalManager,
    show: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    exited: false,
  };

  componentWillMount() {
    if (!this.props.show) {
      this.setState({ exited: true });
    }
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.show === true) {
      this.handleShow();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && this.state.exited) {
      this.setState({ exited: false });
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.checkForFocus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.handleShow();
    }
  }

  componentWillUnmount() {
    if (this.props.show || !this.state.exited) {
      this.handleHide();
    }
    this.mounted = false;
  }

  mounted = false;
  lastFocus = undefined;
  modal = null;
  mountNode = null;
  onDocumentKeyUpListener = undefined;
  onFocusListener = undefined;

  checkForFocus() {
    if (canUseDom) {
      this.lastFocus = activeElement();
    }
  }

  focus() {
    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && this.modal.lastChild;
    const focusInModal = currentFocus && contains(modalContent, currentFocus);

    if (modalContent && !focusInModal) {
      this.lastFocus = currentFocus;

      if (!modalContent.hasAttribute('tabIndex')) {
        modalContent.setAttribute('tabIndex', -1);
        warning(false, (
          'The modal content node does not accept focus. ' +
          'For the benefit of assistive technologies, ' +
          'the tabIndex of the node is being set to "-1".'
        ));
      }

      modalContent.focus();
    }
  }

  restoreLastFocus() {
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = undefined;
    }
  }

  handleShow() {
    const doc = ownerDocument(ReactDOM.findDOMNode(this));
    this.props.modalManager.add(this);
    this.onDocumentKeyUpListener = addEventListener(doc, 'keyup', this.handleDocumentKeyUp);
    this.onFocusListener = addEventListener(doc, 'focus', this.handleFocusListener, true);
    this.focus();
  }

  handleHide() {
    this.props.modalManager.remove(this);
    this.onDocumentKeyUpListener.remove();
    this.onFocusListener.remove();
    this.restoreLastFocus();
  }

  handleFocusListener = () => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && this.modal.lastChild;

    if (modalContent && modalContent !== currentFocus && !contains(modalContent, currentFocus)) {
      modalContent.focus();
    }
  };

  handleDocumentKeyUp = (event) => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    if (keycode(event) === 'esc') {
      const {
        onEscapeKeyUp,
        onRequestClose,
        ignoreEscapeKeyUp,
      } = this.props;

      if (onEscapeKeyUp) {
        onEscapeKeyUp(event);
      }

      if (onRequestClose && !ignoreEscapeKeyUp) {
        onRequestClose(event);
      }
    }
  };

  handleBackdropClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const {
      onBackdropClick,
      onRequestClose,
      ignoreBackdropClick,
    } = this.props;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onRequestClose && !ignoreBackdropClick) {
      onRequestClose(event);
    }
  };

  handleTransitionExited = (...args) => {
    this.setState({ exited: true });
    this.handleHide();
    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  };

  renderBackdrop(other = {}) {
    const {
      backdropComponent,
      backdropClassName,
      backdropTransitionDuration,
      backdropInvisible,
      show,
    } = this.props;

    return (
      <Fade
        in={show}
        transitionAppear
        enterTransitionDuration={backdropTransitionDuration}
        leaveTransitionDuration={backdropTransitionDuration}
        timeout={backdropTransitionDuration + 20}
        {...other}
      >
        {React.createElement(backdropComponent, {
          invisible: backdropInvisible,
          className: backdropClassName,
          onClick: this.handleBackdropClick,
        })}
      </Fade>
    );
  }

  render() {
    const {
      disableBackdrop,
      backdropComponent, // eslint-disable-line no-unused-vars
      backdropClassName, // eslint-disable-line no-unused-vars
      backdropTransitionDuration, // eslint-disable-line no-unused-vars
      backdropInvisible,
      ignoreBackdropClick, // eslint-disable-line no-unused-vars
      ignoreEscapeKeyUp, // eslint-disable-line no-unused-vars
      children,
      className,
      modalManager: modalManagerProp, // eslint-disable-line no-unused-vars
      onBackdropClick, // eslint-disable-line no-unused-vars
      onEscapeKeyUp, // eslint-disable-line no-unused-vars
      onRequestClose, // eslint-disable-line no-unused-vars
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited, // eslint-disable-line no-unused-vars
      show,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const mount = show || !this.state.exited;

    if (!mount) {
      return null;
    }

    const transitionCallbacks = {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited: this.handleTransitionExited,
    };

    let modalChild = React.Children.only(children);

    const { role, tabIndex } = modalChild.props;

    const childProps = {};
    let backdropProps;

    if (role === undefined) {
      childProps.role = role === undefined ? 'document' : role;
    }

    if (tabIndex === undefined) {
      childProps.tabIndex = tabIndex == null ? '-1' : tabIndex;
    }

    if (backdropInvisible && modalChild.props.hasOwnProperty('in')) {
      Object.keys(transitionCallbacks).forEach((key) => {
        childProps[key] = createChainedFunction(transitionCallbacks[key], modalChild.props[key]);
      });
    } else {
      backdropProps = transitionCallbacks;
    }

    if (Object.keys(childProps).length) {
      modalChild = React.cloneElement(modalChild, childProps);
    }

    return (
      <Portal open ref={(c) => { this.mountNode = c ? c.getLayer() : c; }}>
        <div
          data-mui-test="Modal"
          className={classNames(classes.modal, className)}
          ref={(c) => { this.modal = c; }}
          {...other}
        >
          {!disableBackdrop && this.renderBackdrop(backdropProps)}
          {modalChild}
        </div>
      </Portal>
    );
  }
}
