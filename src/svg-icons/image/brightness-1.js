import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageBrightness1 = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10"/>
  </SvgIcon>
);
ImageBrightness1 = pure(ImageBrightness1);
ImageBrightness1.displayName = 'ImageBrightness1';
ImageBrightness1.muiName = 'SvgIcon';

export default ImageBrightness1;
