import React from 'react';
import moment from 'moment';
import { shallow } from '../test-utils';
import { TimePicker } from '../../src/TimePicker/TimePicker';

describe('TimePicker', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TimePicker
      classes={{}}
      theme={{}}
      date={moment('01-01-2017 12:00')}
    />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
