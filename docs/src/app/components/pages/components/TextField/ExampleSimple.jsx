import React from 'react';
import TextField from 'material-ui/lib/text-field';

const TextFieldExampleSimple = () => (
  <div>
    <TextField
      hintText="Hint Text"
    /><br />
    <br />
    <TextField
      hintText="The hint text can be as long as you want, it will wrap."
    /><br />
    <TextField
      defaultValue="Default Value"
    /><br />
    <TextField
      hintText="Hint Text"
      floatingLabelText="Floating Label Text"
    /><br />
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
    /><br />
    <TextField
      hintText="MultiLine with rows: 2 and rowsMax: 4"
      multiLine={true}
      rows={2}
      rowsMax={4}
    /><br />
    <TextField
      hintText="Message Field"
      floatingLabelText="MultiLine and FloatingLabel"
      multiLine={true}
      rows={2}
    />
  </div>
);

export default TextFieldExampleSimple;
