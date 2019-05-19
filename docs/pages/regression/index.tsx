import React, { useState, useContext } from 'react';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import { Grid, Typography } from '@material-ui/core';
import { MuiPickersContext } from '@material-ui/pickers';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { createRegressionDay as createRegressionDayRenderer } from './RegressionDay';

function Regression() {
  const utils = useContext(MuiPickersContext);
  const [date, changeDate] = useState<Date | null>(new Date('2019-01-01T00:00:00.000'));

  const sharedProps = {
    value: date,
    onChange: changeDate,
    style: { margin: '0 10px' },
    format: 'MMMM d',
    leftArrowIcon: <LeftArrowIcon data-arrow="left" />,
    rightArrowIcon: <RightArrowIcon data-arrow="right" />,
    renderDay: createRegressionDayRenderer(utils!),
    KeyboardButtonProps: {
      className: 'keyboard-btn',
    },
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Typography align="center" variant="h5" gutterBottom>
        This page is using for the automate regression of @material-ui/pickers.
      </Typography>

      <Typography align="center" variant="h4" component="span" gutterBottom>
        DatePicker
      </Typography>

      <Grid container justify="center" wrap="wrap">
        <DatePicker id="basic-datepicker" {...sharedProps} />
        <DatePicker id="clearable-datepicker" clearable {...sharedProps} />
        <KeyboardDatePicker
          id="keyboard-mask-datepicker"
          {...sharedProps}
          onChange={changeDate}
          format="MM/dd/yyyy"
        />
        <DatePicker disabled id="disabled" {...sharedProps} />
      </Grid>
    </div>
  );
}

export default Regression;
