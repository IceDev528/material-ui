import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let DeviceSignalWifi4Bar = (props) => (
  <SvgIcon {...props}>
    <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
  </SvgIcon>
);
DeviceSignalWifi4Bar = pure(DeviceSignalWifi4Bar)
DeviceSignalWifi4Bar.displayName = 'DeviceSignalWifi4Bar';

export default DeviceSignalWifi4Bar;
