import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { shallow, utilsToUse } from '../test-utils';
import { DateTextField } from '../../src/_shared/DateTextField';

describe('DateTextField', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTextField
      value={utilsToUse.date()}
      format="dd/MM/yyyy"
      classes={{}}
    />);
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });

  it('Should disable the TextField when disabled is true', () => {
    component.setProps({ disabled: true });
    expect(component.find('TextField').props().disabled).toBe(true);
  });
});

describe('DateTextField keyboard mode', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateTextField
      value={utilsToUse.date()}
      format="dd/MM/yyyy"
      classes={{}}
      keyboard
      clearable
      onClear={jest.fn()}
    />);
  });

  it('Should dispatch onClear if value is empty', () => {
    component.find('TextField').simulate('blur', {
      target: { value: '' },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    });

    expect(component.instance().props.onClear).toHaveBeenCalled();
  });

  it('Should disable the IconButton and TextField when disabled and keyboard are true', () => {
    component.setProps({ disabled: true });

    expect(component.find('TextField').props().disabled).toBe(true);
    expect(component.find('TextField').props().InputProps.endAdornment.props.children.props.disabled).toBe(true);
  });
});

describe('DateTextField with custom TextField', () => {
  it('Should handle a component function', () => {
    function CustomTextField(props) {
      return (
        <li {...props} />
      );
    }

    const component = shallow(<DateTextField
      value={utilsToUse.date()}
      classes={{}}
      TextFieldComponent={CustomTextField}
      format="dd/MM/yyyy"
    />);

    // Check InputProps to make sure DateTextField is passing props to the custom component
    expect(component.props('InputProps')).toBeTruthy();
    expect(component.find('li')).toBeTruthy();
  });

  it('Should handle a component string', () => {
    const component = shallow(<DateTextField
      value={utilsToUse.date()}
      classes={{}}
      TextFieldComponent="li"
      format="dd/MM/yyyy"
    />);

    expect(component.props('InputProps')).toBeTruthy();
    expect(component.find('li')).toBeTruthy();
  });

  it('Should not handle a node', () => {
    const mount = createMount();
    expect(() => {
      mount(<DateTextField
        classes={{}}
        value={utilsToUse.date()}
        utils={utilsToUse}
        TextFieldComponent={<div />}
        format="dd/MM/yyyy"
      />);
    }).toThrow();
  });
});
