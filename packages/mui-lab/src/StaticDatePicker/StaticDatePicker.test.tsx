import * as React from 'react';
import { expect } from 'chai';
import { SinonFakeTimers, useFakeTimers } from 'sinon';
import TextField from '@mui/material/TextField';
import { fireEvent, screen } from 'test/utils';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { createPickerRenderer, adapterToUse } from '../internal/pickers/test-utils';

describe('<StaticDatePicker />', () => {
  let clock: SinonFakeTimers;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });
  const { render } = createPickerRenderer();

  it('render proper month', () => {
    render(
      <StaticDatePicker
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(screen.getByText('January')).toBeVisible();
    expect(screen.getByText('2019')).toBeVisible();
    expect(screen.getAllByMuiTest('day')).to.have.length(31);
  });

  it('switches between months', () => {
    render(
      <StaticDatePicker
        reduceAnimations
        value={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(screen.getByMuiTest('calendar-month-text')).to.have.text('January');

    const nextMonth = screen.getByLabelText('Next month');
    const previousMonth = screen.getByLabelText('Previous month');
    fireEvent.click(nextMonth);
    fireEvent.click(nextMonth);

    fireEvent.click(previousMonth);
    fireEvent.click(previousMonth);
    fireEvent.click(previousMonth);

    expect(screen.getByMuiTest('calendar-month-text')).to.have.text('December');
  });

  it('prop `shouldDisableYear` – disables years dynamically', () => {
    render(
      <StaticDatePicker
        renderInput={(params) => <TextField {...params} />}
        openTo="year"
        onChange={() => {}}
        // getByRole() with name attribute is too slow, so restrict the number of rendered years
        minDate={adapterToUse.date('2025-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2035-01-01T00:00:00.000')}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        shouldDisableYear={(year) => adapterToUse.getYear(year) === 2030}
      />,
    );

    const getYearButton = (year: number) =>
      screen.getByText(year.toString(), { selector: 'button' });

    expect(getYearButton(2029)).not.to.have.attribute('disabled');
    expect(getYearButton(2030)).to.have.attribute('disabled');
    expect(getYearButton(2031)).not.to.have.attribute('disabled');
  });
});
