import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let NavigationArrowDropDownCircle = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"/>
  </SvgIcon>
);
NavigationArrowDropDownCircle = pure(NavigationArrowDropDownCircle);
NavigationArrowDropDownCircle.displayName = 'NavigationArrowDropDownCircle';
NavigationArrowDropDownCircle.muiName = 'SvgIcon';

export default NavigationArrowDropDownCircle;
