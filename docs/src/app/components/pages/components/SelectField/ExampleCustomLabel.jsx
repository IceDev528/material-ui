import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class SelectFieldExampleCustomLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <SelectField value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning"/>
        <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon"/>
        <MenuItem value={3} label="5 pm to 9 pm" primaryText="Evening"/>
        <MenuItem value={4} label="9 pm to 4 am" primaryText="Night"/>
      </SelectField>
    );
  }
}
