import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let FileFileUpload = (props) => (
  <SvgIcon {...props}>
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
  </SvgIcon>
);
FileFileUpload = pure(FileFileUpload)
FileFileUpload.displayName = 'FileFileUpload';

export default FileFileUpload;
