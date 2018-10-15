import React from 'react';
import { shallow, utilsToUse } from '../test-utils';
import { TimePickerView } from '../../TimePicker/components/TimePickerView';

describe('TimePickerView', () => {
  let component;
  let onChangeMock;

  beforeEach(() => {
    onChangeMock = jest.fn();
    component = shallow(<TimePickerView
      classes={{}}
      type="seconds"
      onSecondsChange={onChangeMock}
      onMinutesChange={onChangeMock}
      date={utilsToUse.date('01-01-2017 12:00')}
    />);
  });

  it('Should renders', () => {
    expect(component).toBeTruthy();
  });

  if (process.env.UTILS !== 'moment') {
    it('Should dispatch onChange onSecondsChange', () => {
      component.instance().handleSecondsChange(45, true);
      expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('01-01-2017 12:00:45'), true);
    });

    it('Should dispatch onChange on', () => {
      component.instance().handleMinutesChange(45, true);
      expect(onChangeMock).toHaveBeenCalledWith(utilsToUse.date('01-01-2017 12:45'), true);
    });
  }
});
