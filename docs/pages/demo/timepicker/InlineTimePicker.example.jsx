import React, { Fragment, useState } from 'react';
import { TimePicker, KeyboardTimePicker } from '@material-ui/pickers';

function InlineTimePickerDemo() {
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  return (
    <Fragment>
      <TimePicker
        variant="inline"
        label="Inline mode"
        value={selectedDate}
        onChange={handleDateChange}
      />

      <KeyboardTimePicker
        ampm={false}
        variant="inline"
        label="With keyboard"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default InlineTimePickerDemo;
