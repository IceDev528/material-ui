import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let DeviceWidgets = (props) => (
  <SvgIcon {...props}>
    <path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"/>
  </SvgIcon>
);
DeviceWidgets = pure(DeviceWidgets)
DeviceWidgets.displayName = 'DeviceWidgets';

export default DeviceWidgets;
