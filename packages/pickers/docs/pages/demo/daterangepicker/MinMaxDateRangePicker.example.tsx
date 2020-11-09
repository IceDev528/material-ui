import * as React from 'react';
import addWeeks from 'date-fns/addWeeks';
import TextField from '@material-ui/core/TextField';
import { Dayjs } from 'dayjs';
import { Moment } from 'moment';
import { DateTime } from 'luxon';
import { DateRangePicker, DateRangeDelimiter, DateRange } from '@material-ui/pickers';
// TODO remove relative import
import { makeJSDateObject } from '../../../utils/helpers';

function getWeeksAfter(date: Moment | DateTime | Dayjs | Date, amount: number) {
  // TODO: replace with implementation for your date library
  return date ? addWeeks(makeJSDateObject(date), amount) : undefined;
}

export default function MinMaxDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <DateRangePicker
      disablePast
      value={value}
      // @ts-ignore
      maxDate={getWeeksAfter(value[0], 4)}
      onChange={(newValue) => setValue(newValue)}
      renderInput={(startProps, endProps) => (
        <React.Fragment>
          <TextField {...startProps} />
          <DateRangeDelimiter> to </DateRangeDelimiter>
          <TextField {...endProps} />
        </React.Fragment>
      )}
    />
  );
}
