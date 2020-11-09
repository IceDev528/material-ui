import * as React from 'react';
import moment from 'moment';
import { TimePicker, ClockPicker } from '@material-ui/lab';

<TimePicker
  value={moment()}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={() => <input />}
/>;

// Allows inferring for side props
<TimePicker
  value={null}
  minTime={moment()}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={() => <input />}
/>;

// External components are generic as well
<ClockPicker<Date> view="hours" date={null} onChange={(date) => date?.getDate()} />;
