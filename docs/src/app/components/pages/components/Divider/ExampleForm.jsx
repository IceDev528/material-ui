import React from 'react';
import Divider from 'material-ui/lib/Divider';
import Paper from 'material-ui/lib/Paper';
import TextField from 'material-ui/lib/TextField';

const style = {
  marginLeft: 20,
};

const DividerExampleForm = () => (
  <Paper zDepth={2}>
    <TextField hintText="First name" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Middle name" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Last name" style={style} underlineShow={false} />
    <Divider />
    <TextField hintText="Email address" style={style} underlineShow={false} />
    <Divider />
  </Paper>
);

export default DividerExampleForm;
