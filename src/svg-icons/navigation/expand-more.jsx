import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let NavigationExpandMore = (props) => (
  <SvgIcon {...props}>
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
  </SvgIcon>
);
NavigationExpandMore = pure(NavigationExpandMore)
NavigationExpandMore.displayName = 'NavigationExpandMore';

export default NavigationExpandMore;
