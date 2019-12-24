import React from 'react';
import { useFakeTimers } from 'sinon';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import TouchRipple, { DELAY_RIPPLE } from './TouchRipple';

const cb = () => {};

describe('<TouchRipple />', () => {
  let classes;
  let mount;
  const render = createClientRender();

  /**
   * @param {object} other props to spread to TouchRipple
   */
  function renderTouchRipple(other) {
    const touchRippleRef = React.createRef();
    const { container } = render(
      <TouchRipple
        ref={touchRippleRef}
        classes={{
          ripple: 'ripple',
          rippleVisible: 'ripple-visible',
          child: 'child',
          childLeaving: 'child-leaving',
        }}
        {...other}
      />,
    );

    return {
      instance: touchRippleRef.current,
      queryAllActiveRipples() {
        return container.querySelectorAll('.ripple-visible .child:not(.child-leaving)');
      },
      queryAllStoppingRipples() {
        return container.querySelectorAll('.ripple-visible .child-leaving');
      },
      queryRipple() {
        return container.querySelector('.ripple');
      },
    };
  }

  before(() => {
    classes = getClasses(<TouchRipple />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<TouchRipple />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: Object,
    skip: ['componentProp', 'refForwarding'],
  }));

  describe('prop: center', () => {
    it('should should compute the right ripple dimensions', () => {
      const { instance, queryRipple } = renderTouchRipple({ center: true });

      instance.start(
        {},
        {
          fakeElement: true,
        },
        cb,
      );
      expect(queryRipple().style).to.have.property('height', '1px');
      expect(queryRipple().style).to.have.property('width', '1px');
    });
  });

  it('should create individual ripples', () => {
    const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

    expect(queryAllActiveRipples()).to.have.lengthOf(0);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    instance.start({ clientX: 0, clientY: 0 }, cb);
    expect(queryAllActiveRipples()).to.have.lengthOf(1);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    instance.start({ clientX: 0, clientY: 0 }, cb);
    expect(queryAllActiveRipples()).to.have.lengthOf(2);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    instance.start({ clientX: 0, clientY: 0 }, cb);
    expect(queryAllActiveRipples()).to.have.lengthOf(3);
    expect(queryAllStoppingRipples()).to.have.lengthOf(0);

    instance.stop({ type: 'mouseup' });
    expect(queryAllActiveRipples()).to.have.lengthOf(2);
    expect(queryAllStoppingRipples()).to.have.lengthOf(1);

    instance.stop({ type: 'mouseup' });
    expect(queryAllActiveRipples()).to.have.lengthOf(1);
    expect(queryAllStoppingRipples()).to.have.lengthOf(2);

    instance.stop({ type: 'mouseup' });
    expect(queryAllActiveRipples()).to.have.lengthOf(0);
    expect(queryAllStoppingRipples()).to.have.lengthOf(3);
  });

  describe('creating unique ripples', () => {
    it('should create a ripple', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      instance.start(
        {},
        {
          pulsate: true,
          fakeElement: true,
        },
        cb,
      );
      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });

    it('should ignore a mousedown event after a touchstart event', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      instance.start({ type: 'touchstart' }, cb);
      instance.start({ type: 'mousedown' }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });

    it('should create a specific ripple', () => {
      const {
        instance,
        queryAllActiveRipples,
        queryAllStoppingRipples,
        queryRipple,
      } = renderTouchRipple({
        center: true,
      });
      const clientX = 1;
      const clientY = 1;

      instance.start({ clientX, clientY }, { fakeElement: true }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
      expect(queryRipple().style).to.have.property('top', '-0.5px');
      expect(queryRipple().style).to.have.property('left', '-0.5px');
    });
  });

  describe('mobile', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should delay the display of the ripples', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE);
      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE);
      instance.stop({ type: 'touchend' }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(1);
    });

    it('should trigger the ripple for short touch interactions', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE / 2);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.stop({ type: 'touchend', persist: () => {} }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(1);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(1);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(1);
    });

    it('should interrupt the ripple schedule', () => {
      const { instance, queryAllActiveRipples, queryAllStoppingRipples } = renderTouchRipple();

      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.start({ touches: [], clientX: 0, clientY: 0 }, { fakeElement: true }, cb);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      clock.tick(DELAY_RIPPLE / 2);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);

      instance.stop({ type: 'touchmove' });
      clock.tick(DELAY_RIPPLE);
      expect(queryAllActiveRipples()).to.have.lengthOf(0);
      expect(queryAllStoppingRipples()).to.have.lengthOf(0);
    });
  });
});
