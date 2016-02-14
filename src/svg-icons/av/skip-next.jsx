import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let AvSkipNext = (props) => (
  <SvgIcon {...props}>
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </SvgIcon>
);
AvSkipNext = pure(AvSkipNext)
AvSkipNext.displayName = 'AvSkipNext';

export default AvSkipNext;
