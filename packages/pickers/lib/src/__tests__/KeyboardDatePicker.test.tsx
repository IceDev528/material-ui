import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { ReactWrapper } from 'enzyme';
import { mount } from './test-utils';
import { DesktopDatePicker, DatePickerProps } from '../DatePicker/DatePicker';

describe('e2e -- DatePicker keyboard input', () => {
  // Doesn't work
  if (process.env.UTILS === 'dayjs') {
    it('noop', () => {});
    return;
  }

  const onChangeMock = jest.fn();
  let component: ReactWrapper<DatePickerProps>;

  beforeEach(() => {
    component = mount(
      <DesktopDatePicker
        renderInput={(props) => (
          <TextField
            placeholder="10/10/2018"
            InputLabelProps={{
              htmlFor: 'your-id',
            }}
            {...props}
          />
        )}
        label="Masked input"
        inputFormat={process.env.UTILS === 'moment' ? 'DD/MM/YYYY' : 'dd/MM/yyyy'}
        value={new Date('2018-01-01T00:00:00.000Z')}
        onChange={onChangeMock}
        InputAdornmentProps={{
          disableTypography: true,
        }}
      />
    );
  });

  it('Should properly set value on change keyboard', () => {
    const e = { target: { value: '10/11/2018' } };

    component.find('input').simulate('change', e);
    expect(component.find('input').prop('value')).toBe('10/11/2018');

    component.find('input').simulate('blur');
    expect(onChangeMock).toBeCalled();
  });
});
