import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageDetails = (props) => (
  <SvgIcon {...props}>
    <path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z"/>
  </SvgIcon>
);
ImageDetails = pure(ImageDetails);
ImageDetails.displayName = 'ImageDetails';
ImageDetails.muiName = 'SvgIcon';

export default ImageDetails;
