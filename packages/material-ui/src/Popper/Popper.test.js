import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Grow from '../Grow';
import Popper from './Popper';

describe('<Popper />', () => {
  let shallow;
  let mount;
  let anchorEl;
  let defaultProps;

  before(() => {
    anchorEl = window.document.createElement('div');
    window.document.body.appendChild(anchorEl);
    shallow = createShallow();
    mount = createMount();
    defaultProps = {
      anchorEl,
      children: <span>Hello World</span>,
      open: true,
    };
  });

  after(() => {
    mount.cleanUp();
    window.document.body.removeChild(anchorEl);
  });

  it('should render the correct structure', () => {
    const wrapper = shallow(<Popper {...defaultProps} />);
    assert.strictEqual(wrapper.name(), 'Portal');
    assert.strictEqual(wrapper.childAt(0).name(), 'div');
  });

  describe('prop: placement', () => {
    before(() => {
      document.body.setAttribute('dir', 'rtl');
    });

    after(() => {
      document.body.removeAttribute('dir');
    });

    it('should have top placement', () => {
      const renderSpy = spy();
      shallow(
        <Popper {...defaultProps} placement="top">
          {({ placement }) => {
            renderSpy(placement);
            return null;
          }}
        </Popper>,
      );
      assert.strictEqual(renderSpy.callCount, 1);
      assert.strictEqual(renderSpy.args[0][0], 'top');
    });

    [
      {
        in: 'bottom-end',
        out: 'bottom-start',
      },
      {
        in: 'bottom-start',
        out: 'bottom-end',
      },
      {
        in: 'top-end',
        out: 'top-start',
      },
      {
        in: 'top-start',
        out: 'top-end',
      },
      {
        in: 'top',
        out: 'top',
      },
    ].forEach(test => {
      it(`should flip ${test.in} when direction=rtl is used`, () => {
        const renderSpy = spy();
        shallow(
          <Popper {...defaultProps} placement={test.in}>
            {({ placement }) => {
              renderSpy(placement);
              return null;
            }}
          </Popper>,
        );
        assert.strictEqual(renderSpy.callCount, 1);
        assert.strictEqual(renderSpy.args[0][0], test.out);
      });
    });
  });

  describe('mount', () => {
    it('should mount without any issue', () => {
      const wrapper = mount(<Popper {...defaultProps} open={false} />);
      assert.strictEqual(wrapper.find('span').length, 0);
      wrapper.setProps({ open: true });
      wrapper.update();
      assert.strictEqual(wrapper.find('span').length, 1);
      assert.strictEqual(wrapper.find('span').text(), 'Hello World');
      wrapper.setProps({ open: false });
      assert.strictEqual(wrapper.find('span').length, 0);
    });

    it('should position the popper when opening', () => {
      const wrapper = mount(<Popper {...defaultProps} open={false} />);
      const instance = wrapper.instance();
      assert.strictEqual(instance.popper == null, true);
      wrapper.setProps({ open: true });
      assert.strictEqual(instance.popper !== null, true);
    });

    it('should not position the popper when closing', () => {
      const wrapper = mount(<Popper {...defaultProps} open />);
      const instance = wrapper.instance();
      assert.strictEqual(instance.popper !== null, true);
      wrapper.setProps({ open: false });
      assert.strictEqual(instance.popper, null);
    });
  });

  describe('prop: transition', () => {
    it('should work', () => {
      const wrapper = mount(
        <Popper {...defaultProps} open transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <span>Hello World</span>
            </Grow>
          )}
        </Popper>,
      );
      const instance = wrapper.instance();
      assert.strictEqual(wrapper.find('span').length, 1);
      assert.strictEqual(wrapper.find('span').text(), 'Hello World');
      assert.strictEqual(instance.popper !== null, true);
      wrapper.setProps({ anchorEl: null, open: false });
      wrapper
        .find(Grow)
        .props()
        .onExited();
      assert.strictEqual(instance.popper, null);
    });
  });

  describe('prop: onExited', () => {
    it('should update the exited state', () => {
      const wrapper = mount(
        <Popper {...defaultProps} open transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <span>Hello World</span>
            </Grow>
          )}
        </Popper>,
      );
      wrapper.setProps({
        open: false,
      });
      wrapper
        .find(Grow)
        .props()
        .onExited();
      assert.strictEqual(wrapper.state().exited, true);
    });
  });
});
