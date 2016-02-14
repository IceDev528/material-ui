import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let HardwareKeyboardBackspace = (props) => (
  <SvgIcon {...props}>
    <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
  </SvgIcon>
);
HardwareKeyboardBackspace = pure(HardwareKeyboardBackspace)
HardwareKeyboardBackspace.displayName = 'HardwareKeyboardBackspace';

export default HardwareKeyboardBackspace;
