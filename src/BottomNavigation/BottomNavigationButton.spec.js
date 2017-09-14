// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, getClasses } from '../test-utils';
import Icon from '../Icon';
import BottomNavigationButton from './BottomNavigationButton';

describe('<BottomNavigationButton />', () => {
  let shallow;
  let classes;
  const icon = <Icon>restore</Icon>;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<BottomNavigationButton />);
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<BottomNavigationButton icon={icon} />);
    assert.strictEqual(wrapper.name(), 'withStyles(ButtonBase)');
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<BottomNavigationButton icon={icon} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(
      <BottomNavigationButton className="woofBottomNavigationButton" icon={icon} />,
    );
    assert.strictEqual(wrapper.hasClass('woofBottomNavigationButton'), true);
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the selected and root classes', () => {
    const wrapper = shallow(<BottomNavigationButton icon={icon} selected />);
    assert.strictEqual(wrapper.hasClass(classes.selected), true, 'should have the selected class');
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render with the selectedIconOnly and root classes', () => {
    const wrapper = shallow(<BottomNavigationButton icon={icon} showLabel={false} />);
    assert.strictEqual(
      wrapper.hasClass(classes.selectedIconOnly),
      true,
      'should have the selectedIconOnly class',
    );
    assert.strictEqual(wrapper.hasClass(classes.root), true);
  });

  it('should render icon with the icon class', () => {
    const wrapper = shallow(<BottomNavigationButton icon={icon} />);
    const iconWrapper = wrapper.childAt(0).childAt(0);
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true, 'should have the icon class');
  });

  it('should render icon with the user and icon classes', () => {
    const wrapper = shallow(<BottomNavigationButton icon={icon} />);

    const iconWrapper = wrapper.childAt(0).childAt(0);
    assert.strictEqual(iconWrapper.is(Icon), true, 'should be an Icon');
    assert.strictEqual(iconWrapper.hasClass(classes.icon), true, 'should have the icon class');

    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(labelWrapper.hasClass(classes.label), true, 'should have the label class');
  });

  it('should render label with the selectedLabel class', () => {
    const wrapper = shallow(<BottomNavigationButton icon={icon} selected />);
    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(labelWrapper.hasClass(classes.selectedLabel), true);
    assert.strictEqual(labelWrapper.hasClass(classes.label), true);
  });

  it('should render label with the hiddenLabel class', () => {
    const wrapper = shallow(<BottomNavigationButton icon={icon} showLabel={false} />);
    const labelWrapper = wrapper.childAt(0).childAt(1);
    assert.strictEqual(
      labelWrapper.hasClass(classes.hiddenLabel),
      true,
      'should have the hiddenLabel class',
    );
    assert.strictEqual(labelWrapper.hasClass(classes.label), true, 'should have the label class');
  });

  it('should render a font icon if a icon string is provided', () => {
    const wrapper = shallow(<BottomNavigationButton icon="book" />);
    const iconWrapper = wrapper.childAt(0).childAt(0);
    assert.strictEqual(iconWrapper.is(Icon), true, 'should be an Icon');
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(
        <BottomNavigationButton icon="book" onClick={handleClick} onChange={() => {}} />,
      );
      wrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the onClick');
    });
  });
});
