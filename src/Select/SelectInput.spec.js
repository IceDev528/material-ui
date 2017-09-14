// @flow

import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { ReactWrapper } from 'enzyme';
import keycode from 'keycode';
import { createShallow, createMount } from '../test-utils';
import { MenuItem } from '../Menu';
import consoleErrorMock from '../../test/utils/consoleErrorMock';
import SelectInput from './SelectInput';

describe('<SelectInput />', () => {
  let shallow;
  let mount;
  const props = {
    classes: {
      select: 'select',
    },
    value: 10,
    native: false,
    multiple: false,
    children: [
      <MenuItem key={1} value={10}>
        Ten
      </MenuItem>,
      <MenuItem key={2} value={20}>
        Twenty
      </MenuItem>,
      <MenuItem key={3} value={30}>
        Thirty
      </MenuItem>,
    ],
  };

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a correct top element', () => {
    const wrapper = shallow(<SelectInput {...props} />);
    assert.strictEqual(wrapper.name(), 'div');
  });

  it('should accept invalid child', () => {
    shallow(
      <SelectInput {...props}>
        {null}
        <MenuItem />
      </SelectInput>,
    );
  });

  describe('prop: readOnly', () => {
    it('should not trigger any event with readOnly', () => {
      const wrapper = shallow(<SelectInput {...props} readOnly />);
      wrapper.find(`.${props.classes.select}`).simulate('keyDown', { which: keycode('down') });
      assert.strictEqual(wrapper.state().open, false);
    });
  });

  describe('prop: MenuProps', () => {
    it('should apply additional properties to the Menu component', () => {
      const wrapper = mount(
        <SelectInput
          {...props}
          MenuProps={{
            transitionDuration: 100,
          }}
        />,
      );
      assert.strictEqual(wrapper.find('Menu').props().transitionDuration, 100);
    });
  });

  describe('prop: renderValue', () => {
    it('should use the property to render the value', () => {
      const renderValue = x => String(-x);
      const wrapper = shallow(<SelectInput {...props} renderValue={renderValue} />);
      assert.strictEqual(wrapper.find(`.${props.classes.select}`).props().children, '-10');
    });
  });

  describe('prop: native=false', () => {
    it('should provide a value', () => {
      assert.throw(() => {
        shallow(<SelectInput {...props} value={undefined} />);
      }, /the `value` property is required/);
    });

    describe('prop: onChange', () => {
      let wrapper;
      let handleChange;
      let instance;

      beforeEach(() => {
        handleChange = spy();
        wrapper = mount(
          <SelectInput
            {...props}
            onChange={handleChange}
            MenuProps={{
              transitionDuration: 0,
            }}
          />,
        );
        instance = wrapper.instance();
      });

      it('should call onChange when clicking an item', () => {
        wrapper.find(`.${props.classes.select}`).simulate('click');
        assert.strictEqual(wrapper.state().open, true);
        const portal = wrapper.find('Modal').node.mountNode.firstChild;
        const portalWrapper = new ReactWrapper(portal, portal);
        const menuItem = portalWrapper.find(MenuItem);
        menuItem.at(1).simulate('click');
        assert.strictEqual(wrapper.state().open, false);
        assert.strictEqual(handleChange.callCount, 1);
        assert.strictEqual(handleChange.args[0][0].target.value, 20);
      });

      it('should ignore onBlur the first time the menu is open', () => {
        const handleBlur = spy();
        wrapper.setProps({
          onBlur: handleBlur,
        });

        wrapper.find(`.${props.classes.select}`).simulate('click');
        assert.strictEqual(wrapper.state().open, true);
        assert.strictEqual(instance.ignoreNextBlur, true);
        wrapper.find(`.${props.classes.select}`).simulate('blur');
        assert.strictEqual(handleBlur.callCount, 0);
        assert.strictEqual(instance.ignoreNextBlur, false);
        wrapper.find(`.${props.classes.select}`).simulate('blur');
        assert.strictEqual(handleBlur.callCount, 1);
      });

      ['space', 'up', 'down'].forEach(key => {
        it(`'should open menu when pressed ${key} key on select`, () => {
          wrapper.find(`.${props.classes.select}`).simulate('keyDown', { which: keycode(key) });
          assert.strictEqual(wrapper.state().open, true);
          assert.strictEqual(instance.ignoreNextBlur, true);
        });
      });

      it('should call handleRequestClose', () => {
        wrapper.find(`.${props.classes.select}`).simulate('click');
        assert.strictEqual(wrapper.state().open, true);

        const portal = wrapper.find('Modal').node.mountNode.firstChild;
        const portalWrapper = new ReactWrapper(portal, portal);
        const backdrop = portalWrapper.find('Backdrop');

        backdrop.simulate('click');
        assert.strictEqual(wrapper.state().open, false);
      });
    });
  });

  describe('prop: native=true', () => {
    it('should render a native select', () => {
      const wrapper = shallow(
        <SelectInput {...props} native>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </SelectInput>,
      );
      assert.strictEqual(wrapper.find('select').props().value, 10);
    });

    it('should response to update event', () => {
      const handleChange = spy();
      const wrapper = mount(
        <SelectInput {...props} native onChange={handleChange}>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </SelectInput>,
      );

      wrapper.find('select').simulate('change', { target: { value: 20 } });
      assert.strictEqual(handleChange.callCount, 1);
      assert.strictEqual(handleChange.args[0][0].target.value, 20);
    });
  });

  describe('prop: multiple', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should serialize multiple select value', () => {
      const wrapper = shallow(<SelectInput {...props} value={[10, 30]} multiple />);
      assert.strictEqual(wrapper.find('input').props().value, '10,30');
      assert.deepEqual(wrapper.find(MenuItem).map(wrapper2 => wrapper2.props().selected), [
        true,
        false,
        true,
      ]);
    });

    it('should throw if non array', () => {
      assert.throw(() => {
        shallow(<SelectInput {...props} multiple />);
      }, /the `value` property must be an array/);
    });

    it('should warn if the input is invalid', () => {
      shallow(<SelectInput {...props} multiple native />);
      assert.match(
        consoleErrorMock.args()[0][0],
        /Material-UI: you can not use the `native` and `multiple`/,
      );
    });

    describe('prop: onChange', () => {
      let wrapper;
      let handleChange;

      beforeEach(() => {
        handleChange = spy();
        wrapper = mount(
          <SelectInput
            {...props}
            multiple
            value={[20, 30]}
            onChange={handleChange}
            MenuProps={{
              transitionDuration: 0,
            }}
          />,
        );
      });

      it('should call onChange when clicking an item', () => {
        wrapper.find(`.${props.classes.select}`).simulate('click');
        assert.strictEqual(wrapper.state().open, true);
        const portal = wrapper.find('Modal').node.mountNode.firstChild;
        const portalWrapper = new ReactWrapper(portal, portal);
        const menuItem = portalWrapper.find(MenuItem);

        menuItem.at(1).simulate('click');
        assert.strictEqual(wrapper.state().open, true);
        assert.strictEqual(handleChange.callCount, 1);
        assert.deepEqual(handleChange.args[0][0].target.value, [30]);
        wrapper.setProps({
          value: [30],
        });

        menuItem.at(0).simulate('click');
        assert.strictEqual(wrapper.state().open, true);
        assert.strictEqual(handleChange.callCount, 2);
        assert.deepEqual(handleChange.args[1][0].target.value, [30, 10]);
      });
    });
  });
});
