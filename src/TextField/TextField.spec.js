// @flow weak
/* eslint-env mocha */

import React from 'react';
import { assert } from 'chai';
import { createShallowWithContext } from 'test/utils';
import TextField from './TextField';

describe('<TextField />', () => {
  let shallow;
  let wrapper;

  before(() => {
    shallow = createShallowWithContext();
  });

  beforeEach(() => {
    wrapper = shallow(<TextField />);
  });

  describe('structure', () => {
    it('should be a FormControl', () => {
      assert.strictEqual(wrapper.is('FormControl'), true);
    });

    it('should pass className to the FormControl', () => {
      wrapper.setProps({ className: 'foo' });
      assert.strictEqual(wrapper.hasClass('foo'), true);
    });

    it('should have an Input as the only child', () => {
      assert.strictEqual(wrapper.children().length, 1);
      assert.strictEqual(wrapper.childAt(0).is('Input'), true);
    });

    it('should pass inputClassName to the Input as className', () => {
      wrapper.setProps({ inputClassName: 'foo' });
      assert.strictEqual(wrapper.find('Input').hasClass('foo'), true);
    });
  });

  describe('with a label', () => {
    beforeEach(() => {
      wrapper.setProps({ label: 'Foo bar' });
    });

    it('should have 2 children', () => {
      assert.strictEqual(wrapper.children().length, 2);
    });

    it('should have an InputLabel as the first child', () => {
      assert.strictEqual(wrapper.childAt(0).is('InputLabel'), true);
    });

    it('should pass labelClassName to the InputLabel as className', () => {
      wrapper.setProps({ labelClassName: 'foo' });
      assert.strictEqual(wrapper.find('InputLabel').hasClass('foo'), true);
    });

    it('should have an Input as the second child', () => {
      assert.strictEqual(wrapper.childAt(1).is('Input'), true);
    });
  });

  describe('prop: inputProps', () => {
    it('should apply additional properties to the Input component', () => {
      wrapper.setProps({
        inputProps: {
          inputClassName: 'fullWidth',
        },
      });
      assert.strictEqual(wrapper.find('Input').props().inputClassName, 'fullWidth');
    });
  });
});
