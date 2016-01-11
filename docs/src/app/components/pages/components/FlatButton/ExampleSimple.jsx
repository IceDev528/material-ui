import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';

const FlatButtonExampleSimple = () => (
  <div>
    <FlatButton label="Default" />
    <FlatButton label="Primary" primary={true} />
    <FlatButton label="Secondary" secondary={true} />
  </div>
);

export default FlatButtonExampleSimple;
