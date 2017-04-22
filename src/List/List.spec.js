// @flow weak

import React from 'react';
import { assert } from 'chai';
import { createShallow } from 'src/test-utils';
import List, { styleSheet } from './List';
import ListSubheader from './ListSubheader';

describe('<List />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div', () => {
    const wrapper = shallow(
      <List />,
    );
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should render a ul', () => {
    const wrapper = shallow(
      <List component="ul" />,
    );
    assert.strictEqual(wrapper.name(), 'ul');
  });

  it('should render with the user, root and padding classes', () => {
    const wrapper = shallow(<List className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.padding), true, 'should have the padding class');
  });

  it('should disable the padding', () => {
    const wrapper = shallow(<List disablePadding />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.hasClass(classes.padding), false,
      'should not have the padding class');
  });

  describe('prop: subheader', () => {
    it('should render with subheader class', () => {
      const wrapper = shallow(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
      assert.strictEqual(wrapper.hasClass(classes.subheader), true,
        'should have the subheader class');
    });

    it('should render ListSubheader', () => {
      const wrapper = shallow(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      assert.strictEqual(wrapper.find(ListSubheader).length, 1, 'should render ListSubheader');
    });
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      const wrapper1 = shallow(<List />);
      assert.strictEqual(wrapper1.instance().getChildContext().dense, false,
        'dense should be false by default');

      const wrapper2 = shallow(<List dense />);
      assert.strictEqual(wrapper2.instance().getChildContext().dense, true,
        'dense should be true when set');
    });
  });
});
