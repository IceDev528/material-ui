import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ImageStraighten = (props) => (
  <SvgIcon {...props}>
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/>
  </SvgIcon>
);
ImageStraighten = pure(ImageStraighten)
ImageStraighten.displayName = 'ImageStraighten';

export default ImageStraighten;
