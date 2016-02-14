import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ContentContentCopy = (props) => (
  <SvgIcon {...props}>
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </SvgIcon>
);
ContentContentCopy = pure(ContentContentCopy)
ContentContentCopy.displayName = 'ContentContentCopy';

export default ContentContentCopy;
