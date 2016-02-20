import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextFieldExampleDisabled = () => (
  <div>
    <TextField
      disabled={true}
      hintText="Disabled Hint Text"
    /><br />
    <TextField
      disabled={true}
      defaultValue="Disabled Value"
    /><br />
    <TextField
      disabled={true}
      hintText="Disabled Hint Text"
      floatingLabelText="Floating Label Text"
    /><br />
    <TextField
      disabled={true}
      hintText="Disabled Hint Text"
      defaultValue="Disabled With Floating Label"
      floatingLabelText="Floating Label Text"
    />
  </div>
);

export default TextFieldExampleDisabled;
