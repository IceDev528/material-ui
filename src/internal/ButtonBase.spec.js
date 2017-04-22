// @flow weak

import React from 'react';
import keycode from 'keycode';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { createShallow, createMount } from 'src/test-utils';
import ButtonBase, { styleSheet } from './ButtonBase';

describe('<ButtonBase />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    mount = createMount();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  after(() => {
    mount.cleanUp();
  });

  describe('root node', () => {
    it('should render a button with type="button" by default', () => {
      const wrapper = shallow(<ButtonBase>Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'button');
      assert.strictEqual(wrapper.childAt(0).equals('Hello'), true, 'should say Hello');
      assert.strictEqual(wrapper.props().type, 'button', 'should be type button');
    });

    it('should change the button type', () => {
      const wrapper = shallow(<ButtonBase type="submit">Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'button');
      assert.strictEqual(wrapper.props().type, 'submit', 'should be type submit');
    });

    it('should change the button component and add accessibility requirements', () => {
      const wrapper = shallow(<ButtonBase component="span" role="checkbox" aria-checked={false} />);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.props().role, 'checkbox', 'should be role checkbox');
      assert.strictEqual(wrapper.props().tabIndex, '0', 'should be 0');
    });

    it('should spread props on button', () => {
      const wrapper = shallow(<ButtonBase data-test="hello">Hello</ButtonBase>);
      assert.strictEqual(wrapper.prop('data-test'), 'hello', 'should be spread on the button');
    });

    it('should render the custom className and the buttonBase class', () => {
      const wrapper = shallow(
        <ButtonBase className="test-class-name" />,
      );
      assert.strictEqual(wrapper.hasClass('test-class-name'), true,
        'should pass the test className');
      assert.strictEqual(wrapper.hasClass(classes.buttonBase), true,
        'should have the buttonBase class');
    });

    it('should change the button type to span and set role="button"', () => {
      const wrapper = shallow(<ButtonBase component="span">Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'span');
      assert.strictEqual(wrapper.props().type, undefined, 'should not set a type');
      assert.strictEqual(wrapper.props().role, 'button', 'should role to button');
    });

    it('should automatically change the button to an a element when href is provided', () => {
      const wrapper = shallow(<ButtonBase href="http://google.com">Hello</ButtonBase>);
      assert.strictEqual(wrapper.name(), 'a');
      assert.strictEqual(wrapper.props().href, 'http://google.com', 'should have the href property');
    });
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = [
        'onClick',
        'onFocus',
        'onBlur',
        'onKeyUp',
        'onKeyDown',
        'onMouseDown',
        'onMouseLeave',
        'onMouseUp',
        'onTouchEnd',
        'onTouchStart',
      ];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<ButtonBase {...handlers} />);

      events.forEach((n) => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, { persist: () => {} });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('ripple', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<ButtonBase>Hello</ButtonBase>);
    });

    it('should be enabled by default', () => {
      const ripple = wrapper.find('TouchRipple');
      assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });

    it('should not have a focus ripple by default', () => {
      wrapper.instance().ripple = { pulsate: spy() };
      wrapper.setState({ keyboardFocused: true });

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        0,
        'should not call pulsate on the ripple',
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple',
      );
    });

    it('should stop the ripple when the mouse is released', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseUp', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple',
      );
    });

    it('should stop the ripple when the button blurs', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('blur', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );
    });

    it('should start the ripple when the mouse is pressed', () => {
      wrapper.instance().ripple = { start: spy() };
      wrapper.simulate('mouseDown', {});

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple',
      );
    });

    it('should stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseLeave', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );
    });

    it('should center the ripple', () => {
      assert.strictEqual(wrapper.find('TouchRipple').prop('center'), false,
        'should not be centered by default');
      wrapper.setProps({ centerRipple: true });
      assert.strictEqual(wrapper.find('TouchRipple').prop('center'), true,
        'should be centered');
    });
  });

  describe('focusRipple', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<ButtonBase focusRipple>Hello</ButtonBase>);
    });

    it('should be enabled by default', () => {
      const ripple = wrapper.find('TouchRipple');
      assert.strictEqual(ripple.length, 1, 'should have one TouchRipple');
    });

    it('should pulsate the ripple when keyboardFocused', () => {
      wrapper.instance().ripple = { pulsate: spy() };
      wrapper.setState({ keyboardFocused: true });

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        1,
        'should call pulsate on the ripple',
      );
    });

    it('should not stop the ripple when the mouse leaves', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('mouseLeave', {
        defaultPrevented: false,
        preventDefault() {
          this.defaultPrevented = true;
        },
      });

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        0,
        'should not call stop on the ripple',
      );
    });

    it('should stop pulsate and start a ripple when the space button is pressed', () => {
      wrapper.instance().ripple = { stop: spy((event, cb) => cb()), start: spy() };
      wrapper.simulate('keyDown', { which: 32, keyCode: 32, key: ' ', persist: () => {} });

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );

      assert.strictEqual(
        wrapper.instance().ripple.start.callCount,
        1,
        'should call start on the ripple',
      );
    });

    it('should stop and re-pulsate when space bar is released', () => {
      wrapper.instance().ripple = { stop: spy((event, cb) => cb()), pulsate: spy() };
      wrapper.simulate('keyUp', { which: 32, keyCode: 32, key: ' ', persist: () => {} });

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );

      assert.strictEqual(
        wrapper.instance().ripple.pulsate.callCount,
        1,
        'should call pulsate on the ripple',
      );
    });

    it('should stop on blur and set keyboardFocused to false', () => {
      wrapper.instance().ripple = { stop: spy() };
      wrapper.simulate('blur', {});

      assert.strictEqual(
        wrapper.instance().ripple.stop.callCount,
        1,
        'should call stop on the ripple',
      );
      assert.strictEqual(wrapper.state('keyboardFocused'), false, 'should not be keyboardFocused');
    });
  });

  describe('mounted tab press listener', () => {
    let wrapper;
    let instance;
    let button;
    let clock;

    before(() => {
      clock = useFakeTimers();
      wrapper = mount(
        <ButtonBase id="test-button">Hello</ButtonBase>,
      );
      instance = wrapper.instance();

      button = document.getElementById('test-button');

      if (!button) {
        throw new Error('missing button');
      }
      button.focus();

      const event = new window.Event('keyup');
      event.which = keycode('tab');
      window.dispatchEvent(event);
    });

    after(() => {
      clock.restore();
    });

    it('should not set keyboard focus before time has passed', () => {
      assert.strictEqual(wrapper.state('keyboardFocused'), false, 'should not be keyboardFocused');
    });

    it('should listen for tab presses and set keyboard focus', () => {
      clock.tick(instance.keyboardFocusCheckTime * instance.keyboardFocusMaxCheckTimes);
      assert.strictEqual(wrapper.state('keyboardFocused'), true, 'should be keyboardFocused');
    });
  });

  describe('prop: disabled', () => {
    it('should apply the right tabIndex', () => {
      const wrapper = shallow(<ButtonBase disabled>Hello</ButtonBase>);
      assert.strictEqual(wrapper.props().tabIndex, '-1', 'should not receive the focus');
    });
  });

  describe('prop: component', () => {
    it('should allow to use a link component', () => {
      const Link = (props) => <div {...props} />;
      const wrapper = shallow(<ButtonBase component={Link}>Hello</ButtonBase>);
      assert.strictEqual(wrapper.is(Link), true);
    });
  });

  describe('handleKeyDown()', () => {
    let wrapper;
    let instance;
    let event;

    describe('avoids multiple keydown presses', () => {
      let eventPersistSpy;

      before(() => {
        wrapper = mount(<ButtonBase>Hello</ButtonBase>);
        wrapper.setProps({
          focusRipple: true,
        });
        wrapper.setState({
          keyboardFocused: true,
        });

        eventPersistSpy = spy();
        event = { persist: eventPersistSpy, keyCode: keycode('space') };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.ripple = {
          stop: spy(),
        };
        instance.handleKeyDown(event);
      });

      it('should mark keydown as true', () => {
        assert.strictEqual(instance.keyDown, true);
      });

      it('should call event.persist exactly once', () => {
        assert.strictEqual(event.persist.callCount, 1);
      });

      it('should call stop exactly once', () => {
        assert.strictEqual(instance.ripple.stop.callCount, 1);
      });

      it('should call stop with event', () => {
        assert.strictEqual(instance.ripple.stop.calledWith(event), true);
      });
    });

    describe('prop: onKeyDown', () => {
      let eventPersistSpy;
      let onKeyDownSpy;

      before(() => {
        wrapper = mount(<ButtonBase>Hello</ButtonBase>);
        onKeyDownSpy = spy();
        wrapper.setProps({
          onKeyDown: onKeyDownSpy,
        });

        eventPersistSpy = spy();
        event = { persist: eventPersistSpy, keyCode: undefined };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.handleKeyDown(event);
      });

      it('should not change keydown', () => {
        assert.strictEqual(instance.keyDown, false);
      });

      it('should not call event.persist', () => {
        assert.strictEqual(event.persist.callCount, 0);
      });

      it('should call onKeyDown', () => {
        assert.strictEqual(onKeyDownSpy.callCount, 1);
      });

      it('should call onKeyDown with event', () => {
        assert.strictEqual(onKeyDownSpy.calledWith(event), true);
      });
    });

    describe('Keyboard accessibility for non interactive elements', () => {
      let eventTargetMock;
      let onClickSpy;

      before(() => {
        wrapper = mount(<ButtonBase>Hello</ButtonBase>);
        onClickSpy = spy();
        wrapper.setProps({
          onClick: onClickSpy,
          component: 'woof',
        });

        eventTargetMock = 'woof';
        event = {
          persist: spy(),
          preventDefault: spy(),
          keyCode: keycode('space'),
          target: eventTargetMock,
        };

        instance = wrapper.instance();
        instance.keyDown = false;
        instance.button = eventTargetMock;
        instance.handleKeyDown(event);
      });

      it('should not change keydown', () => {
        assert.strictEqual(instance.keyDown, false);
      });

      it('should not call event.persist', () => {
        assert.strictEqual(event.persist.callCount, 0);
      });

      it('should call event.preventDefault', () => {
        assert.strictEqual(event.preventDefault.callCount, 1);
      });

      it('should call onClick', () => {
        assert.strictEqual(onClickSpy.callCount, 1);
      });

      it('should call onClick with event', () => {
        assert.strictEqual(onClickSpy.calledWith(event), true);
      });
    });
  });
});
