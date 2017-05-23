// @flow

import React from 'react';
import { assert } from 'chai';
import { createMount, createShallow } from '../test-utils';
import withWidth, { isWidthDown, isWidthUp } from './withWidth';

const Empty = () => <div />;
Empty.propTypes = {}; // Breaks the referencial transparency for testing purposes.
const EmptyWithWidth = withWidth()(Empty);

describe('withWidth', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('server side rendering', () => {
    it('should not render the children as the width is unkown', () => {
      const wrapper = shallow(<EmptyWithWidth />);
      assert.strictEqual(wrapper.type(), null, 'should render nothing');
    });
  });

  describe('prop: width', () => {
    it('should be able to override it', () => {
      const wrapper = mount(<EmptyWithWidth width="foo" />);

      assert.strictEqual(wrapper.find(Empty).props().width, 'foo');
    });
  });

  describe('browser', () => {
    it('should provide the right width to the child element', () => {
      const wrapper = mount(<EmptyWithWidth />);

      assert.strictEqual(wrapper.find(Empty).props().width, 'md');
    });
  });

  describe('isWidthUp', () => {
    it('should work as default inclusive', () => {
      assert.strictEqual(isWidthUp('md', 'lg'), true, 'should accept larger size');
      assert.strictEqual(isWidthUp('md', 'md'), true, 'should be inclusive');
      assert.strictEqual(isWidthUp('md', 'sm'), false, 'should reject smaller size');
    });
    it('should work as exclusive', () => {
      assert.strictEqual(isWidthUp('md', 'lg', false), true, 'should accept larger size');
      assert.strictEqual(isWidthUp('md', 'md', false), false, 'should be exclusive');
      assert.strictEqual(isWidthUp('md', 'sm', false), false, 'should reject smaller size');
    });
  });

  describe('isWidthDown', () => {
    it('should work as default inclusive', () => {
      assert.strictEqual(isWidthDown('md', 'lg', true), false, 'should reject larger size');
      assert.strictEqual(isWidthDown('md', 'md', true), true, 'should be inclusive');
      assert.strictEqual(isWidthDown('md', 'sm', true), true, 'should accept smaller size');
    });
    it('should work as exclusive', () => {
      assert.strictEqual(isWidthDown('md', 'lg', false), false, 'should reject larger size');
      assert.strictEqual(isWidthDown('md', 'md', false), false, 'should be exclusive');
      assert.strictEqual(isWidthDown('md', 'sm', false), true, 'should accept smaller size');
    });
  });

  describe('width computation', () => {
    it('should work as expected', () => {
      const wrapper = shallow(<EmptyWithWidth />);
      const instance = wrapper.instance();
      const updateWidth = instance.updateWidth.bind(instance);
      const breakpoints = wrapper.context().theme.breakpoints;

      breakpoints.keys.forEach(key => {
        updateWidth(breakpoints.getWidth(key));
        assert.strictEqual(wrapper.state().width, key, 'should return the matching width');
      });
    });
  });
});
