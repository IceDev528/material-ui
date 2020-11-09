import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { ReactWrapper } from 'enzyme';
import { clickOKButton } from './commands';
import { mount, utilsToUse, toHaveBeenCalledExceptMoment } from './test-utils';
import { MobileDateTimePicker, DateTimePickerProps } from '../DateTimePicker/DateTimePicker';

describe('e2e - DateTimePicker', () => {
  let component: ReactWrapper<DateTimePickerProps>;
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(
      <MobileDateTimePicker
        ampm
        open
        openTo="hours"
        value={utilsToUse.date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        leftArrowIcon="keyboard_arrow_left"
        rightArrowIcon="keyboard_arrow_right"
        dateRangeIcon="date_range"
        timeIcon="access_time"
        renderInput={(props) => <TextField {...props} />}
      />
    );
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  it('Should display year view', () => {
    component.find('ToolbarButton').first().simulate('click');

    expect(component.find('[data-mui-test="year"]').length).toBe(200);
    component.find('[data-mui-test="year"]').at(1).simulate('click');

    clickOKButton(component);
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('Should render hour view', () => {
    component.find('ToolbarButton').at(2).simulate('click');

    expect(component.find('ClockView').props().type).toBe('hours');
  });

  it('Should render minutes view', () => {
    component.find('ToolbarButton').at(3).simulate('click');
    expect(component.find('ClockView').props().type).toBe('minutes');
  });

  it('Should change meridiem', () => {
    component.find('button[data-mui-test="in-clock-pm-btn"]').simulate('click');

    clickOKButton(component);
    toHaveBeenCalledExceptMoment(onChangeMock, [utilsToUse.date('2018-01-01T12:00:00.000Z')]);
  });
});
