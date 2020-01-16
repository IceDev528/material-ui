import React, { Fragment, useState } from 'react';
import { DateTimePicker } from '@material-ui/pickers';

function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DateTimePicker
        mask="____/__/__ __:__"
        label="DateTimePicker"
        variant="outlined"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default BasicDateTimePicker;
