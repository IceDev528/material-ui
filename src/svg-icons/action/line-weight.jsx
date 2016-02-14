import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionLineWeight = (props) => (
  <SvgIcon {...props}>
    <path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"/>
  </SvgIcon>
);
ActionLineWeight = pure(ActionLineWeight)
ActionLineWeight.displayName = 'ActionLineWeight';

export default ActionLineWeight;
