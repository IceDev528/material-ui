import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let AvFastForward = (props) => (
  <SvgIcon {...props}>
    <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
  </SvgIcon>
);
AvFastForward = pure(AvFastForward)
AvFastForward.displayName = 'AvFastForward';

export default AvFastForward;
