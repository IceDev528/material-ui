import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceNetworkCell = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z"/><path d="M17 7L2 22h15z"/>
  </SvgIcon>
);
DeviceNetworkCell = pure(DeviceNetworkCell);
DeviceNetworkCell.displayName = 'DeviceNetworkCell';
DeviceNetworkCell.muiName = 'SvgIcon';

export default DeviceNetworkCell;
