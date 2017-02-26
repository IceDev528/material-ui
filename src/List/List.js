// @flow weak

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiList', () => {
  return {
    root: {
      flex: '1 1 auto',
      overflow: 'auto',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    padding: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    subheader: {
      paddingTop: 0,
    },
  };
});

/**
 * A simple list component.
 */
export default function List(props, context) {
  const {
    className: classNameProp,
    component: ComponentProp,
    padding,
    children,
    subheader,
    rootRef,
    ...other
  } = props;
  const classes = context.styleManager.render(styleSheet);
  const className = classNames(classes.root, {
    [classes.padding]: padding,
    [classes.subheader]: subheader,
  }, classNameProp);

  return (
    <ComponentProp ref={rootRef} className={className} {...other}>
      {subheader}
      {children}
    </ComponentProp>
  );
}

List.propTypes = {
  children: PropTypes.node,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a ReactElement.
   */
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  padding: PropTypes.bool,
  /**
   * @ignore
   */
  rootRef: PropTypes.func,
  subheader: PropTypes.node,
};

List.defaultProps = {
  component: 'div',
  padding: true,
};

List.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
