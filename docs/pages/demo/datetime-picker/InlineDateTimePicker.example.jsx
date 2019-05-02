import React, { useState } from 'react';
import { DateTimePicker, KeyboardDateTimePicker } from '@material-ui/pickers';

function InlineDateTimePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <>
      <DateTimePicker
        variant="inline"
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
      />

      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="With keyboard"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD HH:mm',
          dateFns: 'yyyy/MM/dd HH:mm',
        })}
      />
    </>
  );
}

export default InlineDateTimePickerDemo;
