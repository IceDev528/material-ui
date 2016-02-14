import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionViewStream = (props) => (
  <SvgIcon {...props}>
    <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"/>
  </SvgIcon>
);
ActionViewStream = pure(ActionViewStream)
ActionViewStream.displayName = 'ActionViewStream';

export default ActionViewStream;
