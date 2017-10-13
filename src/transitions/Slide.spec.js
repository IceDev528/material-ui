// @flow

import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { findDOMNode } from 'react-dom';
import { createShallow, createMount } from '../test-utils';
import Slide, { setTranslateValue } from './Slide';
import transitions, { easing } from '../styles/transitions';
import createMuiTheme from '../styles/createMuiTheme';

describe('<Slide />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render a Transition', () => {
    const wrapper = shallow(<Slide />);
    assert.strictEqual(wrapper.name(), 'EventListener');
    assert.strictEqual(wrapper.childAt(0).name(), 'Transition');
  });

  describe('event callbacks', () => {
    it('should fire event callbacks', () => {
      const events = ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];

      const handlers = events.reduce((result, n) => {
        result[n] = spy();
        return result;
      }, {});

      const wrapper = shallow(<Slide {...handlers} />).childAt(0);

      events.forEach(n => {
        const event = n.charAt(2).toLowerCase() + n.slice(3);
        wrapper.simulate(event, {
          fakeTransform: 'none',
          style: {},
          getBoundingClientRect: () => ({}),
        });
        assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
      });
    });
  });

  describe('props: transitionDuration', () => {
    let wrapper;
    let instance;
    let element;
    const enterDuration = 556;
    const leaveDuration = 446;

    beforeEach(() => {
      wrapper = shallow(
        <Slide
          transitionDuration={{
            enter: enterDuration,
            exit: leaveDuration,
          }}
        />,
      );
      instance = wrapper.instance();
      element = { fakeTransform: 'none', getBoundingClientRect: () => ({}), style: {} };
    });

    it('should create proper easeOut animation onEntering', () => {
      instance.handleEntering(element);
      const animation = transitions.create('transform', {
        duration: enterDuration,
        easing: easing.easeOut,
      });
      assert.strictEqual(element.style.transition, animation);
    });

    it('should create proper sharp animation onExit', () => {
      instance.handleExit(element);
      const animation = transitions.create('transform', {
        duration: leaveDuration,
        easing: easing.sharp,
      });
      assert.strictEqual(element.style.transition, animation);
    });
  });

  describe('transition lifecycle', () => {
    let wrapper;
    let instance;

    before(() => {
      wrapper = shallow(<Slide />);
      instance = wrapper.instance();
    });

    describe('handleEnter()', () => {
      let element;

      beforeEach(() => {
        element = {
          fakeTransform: 'none',
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: 200,
            bottom: 500,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(100vw) translateX(-300px)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(-824px)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-200px)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -500px, 0)');
      });

      it('should reset the previous transition if needed', () => {
        element.style.transform = 'translateX(-824px)';
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(-824px)');
      });
    });

    describe('handleEntering()', () => {
      let element;

      before(() => {
        element = { style: {} };
        instance.handleEntering(element);
      });

      it('should reset the translate3d', () => {
        assert.strictEqual(element.style.transform, 'translate3d(0, 0, 0)');
      });
    });

    describe('handleExiting()', () => {
      let element;

      before(() => {
        element = {
          fakeTransform: 'none',
          getBoundingClientRect: () => ({
            width: 500,
            height: 300,
            left: 300,
            right: 800,
            top: 200,
            bottom: 500,
          }),
          style: {},
        };
      });

      it('should set element transform and transition according to the direction', () => {
        wrapper.setProps({ direction: 'left' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(100vw) translateX(-300px)');
        wrapper.setProps({ direction: 'right' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateX(-824px)');
        wrapper.setProps({ direction: 'up' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-200px)');
        wrapper.setProps({ direction: 'down' });
        instance.handleEnter(element);
        assert.strictEqual(element.style.transform, 'translate3d(0, -500px, 0)');
      });
    });
  });

  describe('mount', () => {
    it('should work when initially hidden', () => {
      const wrapper = mount(
        // $FlowFixMe - HOC is hoisting of static Naked, not sure how to represent that
        <Slide.Naked theme={createMuiTheme()} in={false}>
          <div>Foo</div>
        </Slide.Naked>,
      );
      const transition = findDOMNode(wrapper.instance().transition);
      // $FlowFixMe
      assert.notStrictEqual(transition.style.transform, undefined);
    });
  });

  describe('resize', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should recompute the correct position', () => {
      const wrapper = mount(
        // $FlowFixMe - HOC is hoisting of static Naked, not sure how to represent that
        <Slide.Naked theme={createMuiTheme()} direction="up" in={false}>
          <div>Foo</div>
        </Slide.Naked>,
      );
      const instance = wrapper.instance();
      instance.handleResize();
      clock.tick(166);
      const transition = findDOMNode(instance.transition);
      // $FlowFixMe
      assert.notStrictEqual(transition.style.transform, undefined);
    });

    it('should take existing transform into account', () => {
      const props = {
        direction: 'up',
      };
      const element = {
        fakeTransform: 'transform matrix(1, 0, 0, 1, 0, 420)',
        getBoundingClientRect: () => ({
          width: 500,
          height: 300,
          left: 300,
          right: 800,
          top: 1200,
          bottom: 1500,
        }),
        style: {},
      };
      setTranslateValue(props, element);
      assert.strictEqual(element.style.transform, 'translateY(100vh) translateY(-780px)');
    });

    it('should do nothing when visible', () => {
      const wrapper = shallow(<Slide in />);
      const instance = wrapper.instance();
      instance.handleResize();
      clock.tick(166);
    });
  });
});
