import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ContentAddCircle = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
  </SvgIcon>
);
ContentAddCircle = pure(ContentAddCircle)
ContentAddCircle.displayName = 'ContentAddCircle';

export default ContentAddCircle;
