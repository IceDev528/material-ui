import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@material-ui/core/TextField';
import { StaticDatePicker } from '@material-ui/pickers';
import { makeJSDateObject } from '../../../utils/helpers';

function disableWeekends(date: Date) {
  // TODO: replace with implementation for your date library
  return isWeekend(makeJSDateObject(date));
}

export default function StaticDatePickerExample() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="year"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
      <StaticDatePicker
        orientation="landscape"
        openTo="date"
        value={value}
        // @ts-expect-error Waiting for making all inner components generics
        shouldDisableDate={disableWeekends}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
    </React.Fragment>
  );
}
