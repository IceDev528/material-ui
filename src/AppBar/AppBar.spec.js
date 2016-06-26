/* eslint-env mocha */
import React from 'react';
import {assert} from 'chai';
import AppBar, {styleSheet} from './AppBar';
import {createShallowWithContext} from 'test/utils';

describe('<AppBar>', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallowWithContext();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a Paper component', () => {
    const wrapper = shallow(
      <AppBar>Hello World</AppBar>
    );
    assert.strictEqual(wrapper.is('Paper'), true, 'should be <Paper>');
    assert.strictEqual(wrapper.prop('zDepth'), 4, 'should render with a 4dp shadow');
  });

  it('should render with the root class and primary', () => {
    const wrapper = shallow(
      <AppBar>Hello World</AppBar>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.primary), true, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render the custom className and the root class', () => {
    const wrapper = shallow(
      <AppBar className="test-class-name" />
    );
    assert.strictEqual(wrapper.is('.test-class-name'), true, 'should pass the test className');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.primary), true, 'should not have the primary class');
  });

  it('should render a primary app bar', () => {
    const wrapper = shallow(
      <AppBar primary={true}>Hello World</AppBar>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.primary), true, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), false, 'should not have the accent class');
  });

  it('should render an accent app bar', () => {
    const wrapper = shallow(
      <AppBar accent={true}>Hello World</AppBar>
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.primary), false, 'should not have the primary class');
    assert.strictEqual(wrapper.hasClass(classes.accent), true, 'should not have the accent class');
  });
});
