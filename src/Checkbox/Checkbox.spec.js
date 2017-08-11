// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow, getClasses } from '../test-utils';
import Checkbox, { SwitchBase } from './Checkbox';

describe('<Checkbox />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = getClasses(<SwitchBase />);
  });

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      assert.strictEqual(typeof classes.default, 'string');
      assert.strictEqual(typeof classes.checked, 'string');
      assert.strictEqual(typeof classes.disabled, 'string');
    });
  });

  it('should render a div with a SwitchBase', () => {
    assert.strictEqual(Checkbox.name, 'Checkbox', 'set for debugging');
    const wrapper = shallow(<Checkbox />);
    assert.strictEqual(wrapper.name(), 'withStyles(withStyles(SwitchBase))');
  });
});
