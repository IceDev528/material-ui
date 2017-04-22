// @flow weak

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import Layout, { styleSheet } from './Layout';

describe('<Layout />', () => {
  let shallow;
  let classes;

  before(() => {
    const shallowInner = createShallow();
    // Render deeper to bypass the LayoutWrapper.
    shallow = (node) => {
      return shallowInner(node).find('Layout').shallow({
        context: shallowInner.context,
      });
    };
    classes = shallowInner.context.styleManager.render(styleSheet);
  });

  it('should render', () => {
    const wrapper = shallow(<Layout className="woof" />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the user class');
  });

  describe('prop: container', () => {
    it('should apply the container class', () => {
      const wrapper = shallow(<Layout container />);
      assert.strictEqual(wrapper.hasClass(classes.typeContainer), true);
    });
  });

  describe('prop: item', () => {
    it('should apply the item class', () => {
      const wrapper = shallow(<Layout item />);
      assert.strictEqual(wrapper.hasClass(classes.typeItem), true);
    });
  });

  describe('prop: component', () => {
    it('should change the component', () => {
      const wrapper = shallow(<Layout component="span" />);
      assert.strictEqual(wrapper.name(), 'span');
    });
  });

  describe('prop: xs', () => {
    it('should apply the flex-grow class', () => {
      const wrapper = shallow(<Layout item xs />);
      assert.strictEqual(wrapper.hasClass(classes['grid-xs']), true);
    });

    it('should apply the flex size class', () => {
      const wrapper = shallow(<Layout item xs={3} />);
      assert.strictEqual(wrapper.hasClass(classes['grid-xs-3']), true);
    });
  });

  describe('prop: gutter', () => {
    it('should have a default gutter', () => {
      const wrapper = shallow(<Layout container />);
      assert.strictEqual(wrapper.hasClass(classes['gutter-xs-16']), true);
    });
  });

  describe('prop: other', () => {
    it('should spread the other properties to the root element', () => {
      const handleClick = () => {};
      const wrapper = shallow(<Layout component="span" onClick={handleClick} />);
      assert.strictEqual(wrapper.props().onClick, handleClick);
    });
  });
});
