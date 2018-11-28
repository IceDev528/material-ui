import { InlineDateTimePicker } from 'material-ui-pickers';
import React, { Fragment, PureComponent } from 'react';

export default class InlineDateTimePickerDemo extends PureComponent {
  state = {
    selectedDate: '2018-01-01T00:00:00.000Z',
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <InlineDateTimePicker label="Basic example" value={selectedDate} onChange={this.handleDateChange} />
        </div>

        <div className="picker">
          <InlineDateTimePicker
            keyboard
            label="With keyboard"
            value={selectedDate}
            onChange={this.handleDateChange}
            format="dd/MM/yyyy"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        </div>
      </Fragment>
    );
  }
}
