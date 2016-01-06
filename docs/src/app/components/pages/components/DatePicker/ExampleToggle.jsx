import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';

const optionsStyle = {
  width: 300,
  margin: '0 auto',
};

export default class DatePickerExampleToggle extends React.Component {

  constructor(props) {
    super(props);

    let minDate = new Date();
    let maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      disableYearSelection: false,
    };
  }

  handleChangeMinDate = (event) => {
    this.setState({
      minDate: new Date(event.target.value),
    });
  };

  handleChangeMaxDate = (event) => {
    this.setState({
      maxDate: new Date(event.target.value),
    });
  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  render() {
    return (
      <div>

        <DatePicker
          hintText="Ranged Date Picker"
          autoOk={this.state.autoOk}
          minDate={this.state.minDate}
          maxDate={this.state.maxDate}
          disableYearSelection={this.state.disableYearSelection} />


        <div style={optionsStyle}>
          <TextField
            floatingLabelText="Min Date"
            defaultValue={this.state.minDate.toDateString()}
            onChange={this.handleChangeMinDate} />

          <TextField
            floatingLabelText="Max Date"
            defaultValue={this.state.maxDate.toDateString()}
            onChange={this.handleChangeMaxDate} />

          <Toggle
            name="autoOk"
            value="autoOk"
            label="Auto Accept"
            defaultToggled={this.state.autoOk}
            onToggle={this.handleToggle} />

          <Toggle
            name="disableYearSelection"
            value="disableYearSelection"
            label="Disable Year Selection"
            defaultToggled={this.state.disableYearSelection}
            onToggle={this.handleToggle} />
        </div>
      </div>
    );
  }
}
