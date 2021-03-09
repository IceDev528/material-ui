import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  act,
  createMount,
  fireEvent,
  createClientRender,
  describeConformance,
  screen,
} from 'test/utils';
import PropTypes, { checkPropTypes } from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer, { drawerClasses } from '@material-ui/core/Drawer';
import { backdropClasses } from '@material-ui/core/Backdrop';
import SwipeArea from './SwipeArea';
import useForkRef from '../utils/useForkRef';

function fireMouseEvent(name, element, properties = {}) {
  act(() => {
    const event = document.createEvent('MouseEvents');
    event.initEvent(name, true, true);
    Object.keys(properties).forEach((key) => {
      event[key] = properties[key];
    });
    if (element.dispatchEvent) {
      element.dispatchEvent(event);
    } else {
      element.getDOMNode().dispatchEvent(event);
    }
  });
}

function fireBodyMouseEvent(name, properties = {}) {
  fireMouseEvent(name, document.body, properties);
}

function fireSwipeAreaMouseEvent(wrapper, name, properties = {}) {
  let event;
  act(() => {
    event = document.createEvent('MouseEvents');
    event.initEvent(name, true, true);
    Object.keys(properties).forEach((key) => {
      event[key] = properties[key];
    });
    const swipeArea = wrapper.find(SwipeArea);
    if (swipeArea.length >= 1) {
      // if no SwipeArea is mounted, the body event wouldn't propagate to it anyway
      swipeArea.getDOMNode().dispatchEvent(event);
    }
  });
  return event;
}

const FakePaper = React.forwardRef(function FakeWidthPaper(props, ref) {
  const { style, ...other } = props;
  const paperRef = React.useRef(null);
  const handleRef = useForkRef(ref, paperRef);

  React.useEffect(() => {
    // JSDOM has no layout
    if (/jsdom/.test(window.navigator.userAgent)) {
      Object.defineProperty(paperRef.current, 'clientWidth', { value: 250 });
      Object.defineProperty(paperRef.current, 'clientHeight', { value: 250 });
    }
  });

  return (
    <div
      tabIndex={-1}
      ref={handleRef}
      style={{
        ...style,
        width: '250px',
        height: '250px',
      }}
      {...other}
    />
  );
});

const NullPaper = React.forwardRef(function NullPaper(props, ref) {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const handleTouchStart = () => {
      setHidden(true);
    };

    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  if (hidden) {
    return null;
  }

  return <div tabIndex={-1} ref={ref} />;
});

describe('<SwipeableDrawer />', () => {
  // test are mostly asserting on implementation details
  const mount = createMount({ strict: null });
  const render = createClientRender({ strict: false });

  describeConformance(<SwipeableDrawer onOpen={() => {}} onClose={() => {}} open />, () => ({
    classes: {},
    inheritComponent: Drawer,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
    ],
  }));

  it('should render a Drawer and a SwipeArea', () => {
    render(<SwipeableDrawer open onOpen={() => {}} onClose={() => {}} />);
    expect(document.querySelector('.MuiDrawer-root')).not.to.equal(null);
    expect(document.querySelector('[class*=PrivateSwipeArea-root]')).not.to.equal(null);
  });

  it('should hide the SwipeArea if swipe to open is disabled', () => {
    render(<SwipeableDrawer open onOpen={() => {}} onClose={() => {}} disableSwipeToOpen />);
    expect(document.querySelector('[class*=PrivateSwipeArea-root]')).to.equal(null);
  });

  it('should accept user custom style', () => {
    render(
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        open
        PaperProps={{ 'data-test': 'foo' }}
      />,
    );

    expect(document.querySelector('.MuiPaper-root')).to.have.attribute('data-test', 'foo');
  });

  // only run in supported browsers
  if (typeof Touch === 'undefined') {
    return;
  }

  describe('swipe to open', () => {
    const bodyWidth = document.body.offsetWidth;
    const windowHeight = window.innerHeight;
    const tests = [
      {
        anchor: 'left',
        openTouches: [
          { pageX: 0, clientY: 0 },
          { pageX: 20, clientY: 0 },
          { pageX: 180, clientY: 0 },
        ],
        closeTouches: [
          { pageX: 200, clientY: 0 },
          { pageX: 180, clientY: 0 },
          { pageX: 10, clientY: 0 },
        ],
        edgeTouch: { pageX: 10, clientY: 50 },
        ignoreTouch: { pageX: 100, clientY: 0 },
      },
      {
        anchor: 'right',
        openTouches: [
          { pageX: bodyWidth, clientY: 0 },
          { pageX: bodyWidth - 20, clientY: 0 },
          { pageX: bodyWidth - 180, clientY: 0 },
        ],
        closeTouches: [
          { pageX: bodyWidth - 200, clientY: 0 },
          { pageX: bodyWidth - 180, clientY: 0 },
          { pageX: bodyWidth - 10, clientY: 0 },
        ],
        edgeTouch: { pageX: bodyWidth - 10, clientY: 50 },
        ignoreTouch: { pageX: bodyWidth - 100, clientY: 0 },
      },
      {
        anchor: 'top',
        openTouches: [
          { pageX: 0, clientY: 0 },
          { pageX: 0, clientY: 20 },
          { pageX: 0, clientY: 180 },
        ],
        closeTouches: [
          { pageX: 0, clientY: 200 },
          { pageX: 0, clientY: 180 },
          { pageX: 0, clientY: 10 },
        ],
        edgeTouch: { pageX: 50, clientY: 10 },
        ignoreTouch: { pageX: 0, clientY: 100 },
      },
      {
        anchor: 'bottom',
        openTouches: [
          { pageX: 0, clientY: windowHeight },
          { pageX: 0, clientY: windowHeight - 20 },
          { pageX: 0, clientY: windowHeight - 180 },
        ],
        closeTouches: [
          { pageX: 0, clientY: windowHeight - 200 },
          { pageX: 0, clientY: windowHeight - 180 },
          { pageX: 0, clientY: windowHeight - 10 },
        ],
        edgeTouch: { pageX: 50, clientY: windowHeight - 10 },
        ignoreTouch: { pageX: 0, clientY: windowHeight - 100 },
      },
    ];

    tests.forEach((params) => {
      describe(`anchor=${params.anchor}`, () => {
        it('should open and close when swiping', () => {
          const handleClose = spy();
          const handleOpen = spy();
          const { setProps } = render(
            <SwipeableDrawer
              anchor={params.anchor}
              onOpen={handleOpen}
              onClose={handleClose}
              open={false}
              PaperProps={{ component: FakePaper }}
            >
              <div data-testid="drawer">SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[0] })],
          });
          fireEvent.touchMove(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[1] })],
          });
          fireEvent.touchMove(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[2] })],
          });
          fireEvent.touchEnd(swipeArea, {
            changedTouches: [
              new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[2] }),
            ],
          });
          expect(handleOpen.callCount).to.equal(1);

          setProps({ open: true });

          const drawer = screen.getByTestId('drawer');

          fireEvent.touchStart(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[0] })],
          });
          fireEvent.touchMove(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[1] })],
          });
          fireEvent.touchMove(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[2] })],
          });
          fireEvent.touchEnd(drawer, {
            changedTouches: [
              new Touch({ identifier: 0, target: drawer, ...params.closeTouches[2] }),
            ],
          });
          expect(handleClose.callCount).to.equal(1);
        });

        it('should stay closed when not swiping far enough', () => {
          // simulate open swipe that doesn't swipe far enough
          const handleOpen = spy();
          render(
            <SwipeableDrawer
              acnhor={params.anchor}
              onOpen={handleOpen}
              onClose={() => {}}
              open={false}
              PaperProps={{ component: FakePaper }}
            >
              <div>SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[0] })],
          });
          fireEvent.touchMove(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[1] })],
          });
          fireEvent.touchEnd(swipeArea, {
            changedTouches: [
              new Touch({ identifier: 0, target: swipeArea, ...params.openTouches[1] }),
            ],
          });
          expect(handleOpen.callCount).to.equal(0);
        });

        it('should stay opened when not swiping far enough', () => {
          // simulate close swipe that doesn't swipe far enough
          const handleClose = spy();
          render(
            <SwipeableDrawer
              anchor={params.anchor}
              onOpen={() => {}}
              onClose={handleClose}
              open
              PaperProps={{ component: FakePaper }}
            >
              <div data-testid="drawer">SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const drawer = screen.getByTestId('drawer');

          fireEvent.touchStart(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[0] })],
          });
          fireEvent.touchMove(drawer, {
            touches: [new Touch({ identifier: 0, target: drawer, ...params.closeTouches[1] })],
          });
          fireEvent.touchEnd(drawer, {
            changedTouches: [
              new Touch({ identifier: 0, target: drawer, ...params.closeTouches[1] }),
            ],
          });
          expect(handleClose.callCount).to.equal(0);
        });

        it('should slide in a bit when touching near the edge', () => {
          const handleOpen = spy();
          const handleClose = spy();
          render(
            <SwipeableDrawer
              anchor={params.anchor}
              onOpen={handleOpen}
              onClose={handleClose}
              open={false}
              PaperProps={{ component: FakePaper }}
            >
              <div data-testid="drawer">SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.edgeTouch })],
          });
          const drawer = screen.getByTestId('drawer');
          expect(drawer).not.to.equal(null);

          fireEvent.touchEnd(swipeArea, {
            changedTouches: [new Touch({ identifier: 0, target: swipeArea, ...params.edgeTouch })],
          });

          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });

        it('should let user scroll the page', () => {
          const handleOpen = spy();
          const handleClose = spy();
          render(
            <SwipeableDrawer
              anchor={params.anchor}
              disableDiscovery
              onOpen={handleOpen}
              onClose={handleClose}
              open={false}
              PaperProps={{ component: FakePaper }}
            >
              <div>SwipeableDrawer</div>
            </SwipeableDrawer>,
          );

          const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');

          fireEvent.touchStart(swipeArea, {
            touches: [new Touch({ identifier: 0, target: swipeArea, ...params.ignoreTouch })],
          });
          fireEvent.touchEnd(swipeArea, {
            changedTouches: [
              new Touch({ identifier: 0, target: swipeArea, ...params.ignoreTouch }),
            ],
          });
          expect(handleOpen.callCount).to.equal(0);
          expect(handleClose.callCount).to.equal(0);
        });
      });
    });

    it('should abort when the SwipeableDrawer is closed', () => {
      const handleClose = spy();
      const { setProps } = render(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={handleClose}
          open
          PaperProps={{ component: FakePaper }}
        >
          <div data-testid="drawer">SwipeableDrawer</div>
        </SwipeableDrawer>,
      );
      const drawer = screen.getByTestId('drawer');

      fireEvent.touchStart(drawer, {
        touches: [new Touch({ identifier: 0, target: drawer, pageX: 250, clientY: 0 })],
      });
      fireEvent.touchMove(drawer, {
        touches: [new Touch({ identifier: 0, target: drawer, pageX: 180, clientY: 0 })],
      });
      setProps({
        open: false,
      });
      fireEvent.touchEnd(drawer, {
        changedTouches: [new Touch({ identifier: 0, target: drawer, pageX: 10, clientY: 0 })],
      });
      expect(handleClose.callCount).to.equal(0);
    });

    it('removes event listeners on unmount', () => {
      const container = render(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          PaperProps={{ component: FakePaper }}
        >
          <div>SwipeableDrawer</div>
        </SwipeableDrawer>,
      );

      const swipeArea = document.querySelector('[class*=PrivateSwipeArea-root]');
      fireEvent.touchStart(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 250, clientY: 0 })],
      });
      container.unmount();
      //  trigger setState warning if listeners aren't cleaned.
      fireEvent.touchMove(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 180, clientY: 0 })],
      });
      //  trigger setState warning if swipe handling is not cleaned, too
      fireEvent.touchStart(swipeArea, {
        touches: [new Touch({ identifier: 0, target: swipeArea, pageX: 250, clientY: 0 })],
      });
    });

    it('toggles swipe handling when the variant is changed', () => {
      const { setProps } = render(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          PaperProps={{ component: FakePaper }}
        >
          <div>SwipeableDrawer</div>
        </SwipeableDrawer>,
      );

      // variant is 'temporary' by default
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).not.to.equal(null);
      setProps({ variant: 'persistent' });
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).to.equal(null);
      setProps({ variant: 'temporary' });
      expect(document.querySelector('[class*=PrivateSwipeArea-root]')).not.to.equal(null);
    });
  });

  describe('disableSwipeToOpen', () => {
    it('should not support swipe to open if disableSwipeToOpen is set', () => {
      const handleOpen = spy();
      const wrapper = mount(
        <SwipeableDrawer
          onOpen={handleOpen}
          onClose={() => {}}
          open={false}
          PaperProps={{ component: FakePaper }}
        >
          <div>SwipeableDrawer</div>
        </SwipeableDrawer>,
      );

      // simulate open swipe
      wrapper.setProps({ disableSwipeToOpen: true });
      expect(wrapper.find('[role="presentation"]').exists()).to.equal(false);
      fireBodyMouseEvent('touchstart', { touches: [{ pageX: 10, clientY: 0 }] });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 150, clientY: 0 }] });
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 250, clientY: 0 }] });
      expect(handleOpen.callCount).to.equal(0);
      expect(wrapper.find('[role="presentation"]').exists()).to.equal(false);
      wrapper.unmount();
    });

    it('should support swipe to close if disableSwipeToOpen is set', () => {
      const handleClose = spy();
      const wrapper = mount(
        <SwipeableDrawer
          onOpen={() => {}}
          onClose={handleClose}
          open
          PaperProps={{ component: FakePaper }}
        >
          <div>SwipeableDrawer</div>
        </SwipeableDrawer>,
      );

      // simulate close swipe
      wrapper.setProps({ disableSwipeToOpen: true });
      expect(wrapper.find('[role="presentation"]').exists()).to.equal(true);
      fireMouseEvent('touchstart', wrapper.find(FakePaper), {
        touches: [{ pageX: 250, clientY: 0 }],
      });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 150, clientY: 0 }] });
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 10, clientY: 0 }] });
      expect(handleClose.callCount).to.equal(1);
      wrapper.unmount();
    });
  });

  describe('lock', () => {
    it('should handle a single swipe at the time', () => {
      const handleOpen = spy();
      const wrapper = mount(
        <div>
          <SwipeableDrawer
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            PaperProps={{ component: FakePaper }}
          >
            <div>Drawer1</div>
          </SwipeableDrawer>
          <SwipeableDrawer
            onOpen={handleOpen}
            onClose={() => {}}
            open={false}
            PaperProps={{ component: FakePaper }}
          >
            <div>Drawer2</div>
          </SwipeableDrawer>
        </div>,
      );

      // use the same event object for both touch start events, one would propagate to the other swipe area in the browser
      const touchStartEvent = fireSwipeAreaMouseEvent(
        wrapper.find(SwipeableDrawer).at(0),
        'touchstart',
        {
          touches: [{ pageX: 0, clientY: 0 }],
        },
      );
      wrapper
        .find(SwipeableDrawer)
        .at(1)
        .find(SwipeArea)
        .getDOMNode()
        .dispatchEvent(touchStartEvent);
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 20, clientY: 0 }] });
      fireBodyMouseEvent('touchmove', { touches: [{ pageX: 180, clientY: 0 }] });
      fireBodyMouseEvent('touchend', { changedTouches: [{ pageX: 180, clientY: 0 }] });
      expect(handleOpen.callCount).to.equal(1);
    });
  });

  it('does not crash when updating the parent component while swiping', () => {
    const wrapper = mount(
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => {}}
        open={false}
        PaperProps={{ component: NullPaper }}
      >
        <div>SwipeableDrawer</div>
      </SwipeableDrawer>,
    );
    fireSwipeAreaMouseEvent(wrapper, 'touchstart', { touches: [{ pageX: 0, clientY: 0 }] });
    // simulate paper ref being null because of the drawer being updated
    fireBodyMouseEvent('touchmove', { touches: [{ pageX: 20, clientY: 0 }] });
  });

  describe('no backdrop', () => {
    it('should hide backdrop', () => {
      render(<SwipeableDrawer onClose={() => {}} onOpen={() => {}} open hideBackdrop />);
      expect(document.querySelector(`.${backdropClasses.root}`)).to.equal(null);
    });

    it('does not crash when backdrop is hidden while swiping', () => {
      render(<SwipeableDrawer onClose={() => {}} onOpen={() => {}} open hideBackdrop />);
      const drawer = document.querySelector(`.${drawerClasses.root}`);
      fireEvent.touchStart(drawer, {
        touches: [new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: 0 })],
      });
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns if a component for the Paper is used that cant hold a ref', () => {
      expect(() => {
        checkPropTypes(
          SwipeableDrawer.propTypes,
          {
            onOpen: () => {},
            onClose: () => {},
            open: false,
            PaperProps: { component: () => <div />, elevation: 4 },
          },
          'prop',
          'MockedSwipeableDrawer',
        );
      }).toErrorDev(
        'Warning: Failed prop type: Invalid prop `PaperProps.component` supplied to `MockedSwipeableDrawer`. Expected an element type that can hold a ref.',
      );
    });

    it('warns if a component for the Backdrop is used that cant hold a ref', () => {
      expect(() => {
        checkPropTypes(
          SwipeableDrawer.propTypes,
          {
            onOpen: () => {},
            onClose: () => {},
            open: false,
            ModalProps: { BackdropProps: { component: () => <div />, 'data-backdrop': true } },
          },
          'prop',
          'MockedSwipeableDrawer',
        );
      }).toErrorDev(
        'Warning: Failed prop type: Invalid prop `ModalProps.BackdropProps.component` supplied to `MockedSwipeableDrawer`. Expected an element type that can hold a ref.',
      );
    });
  });

  describe('native scroll', () => {
    it('should not drag is native scroll is available', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Need layout
        this.skip();
      }

      const handleClose = spy();
      render(
        <SwipeableDrawer onOpen={() => {}} onClose={handleClose} anchor="bottom" open>
          <div style={{ height: 10000, flexShrink: 0 }}>
            <div data-testid="drawer">SwipeableDrawer</div>
          </div>
        </SwipeableDrawer>,
      );

      const windowHeight = window.innerHeight;
      const drawer = screen.getByTestId('drawer');

      const Paper = document.querySelector('.MuiPaper-root');
      Paper.scrollTop = 10;

      // Perform a full swipe down to close sequence
      fireEvent.touchStart(drawer, {
        touches: [
          new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: windowHeight - 200 }),
        ],
      });
      fireEvent.touchMove(drawer, {
        touches: [
          new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: windowHeight - 180 }),
        ],
      });
      fireEvent.touchMove(drawer, {
        touches: [
          new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: windowHeight - 10 }),
        ],
      });
      fireEvent.touchEnd(drawer, {
        changedTouches: [
          new Touch({ identifier: 0, target: drawer, pageX: 0, clientY: windowHeight - 10 }),
        ],
      });
      expect(handleClose.callCount).to.equal(0);
    });
  });

  it('should not prevent scrolling a container', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // Need layouting
      this.skip();
    }

    const handleTouchMove = spy((event) => event.defaultPrevented);

    function Test() {
      React.useEffect(() => {
        document.addEventListener('touchmove', handleTouchMove);
        return () => {
          document.removeEventListener('touchmove', handleTouchMove);
        };
      }, []);

      return (
        <SwipeableDrawer anchor="top" open onOpen={() => {}} onClose={() => {}}>
          <div style={{ width: 1000, height: 100 }} data-testid="target" />
        </SwipeableDrawer>
      );
    }

    render(<Test />);
    const target = screen.getByTestId('target');
    // Perform a full swipe left to horizontally scroll
    fireEvent.touchStart(target, {
      touches: [new Touch({ identifier: 0, target, pageX: 100, clientY: 0 })],
    });
    fireEvent.touchMove(target, {
      touches: [new Touch({ identifier: 0, target, pageX: 50, clientY: 0 })],
    });
    expect(handleTouchMove.returnValues).to.deep.equal([false]);
  });

  it('should not ignore scroll container if parent is overflow hidden', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // Need layouting
      this.skip();
    }

    const handleTouchMove = spy((event) => event.defaultPrevented);

    function Test() {
      React.useEffect(() => {
        document.addEventListener('touchmove', handleTouchMove);
        return () => {
          document.removeEventListener('touchmove', handleTouchMove);
        };
      }, []);

      return (
        <SwipeableDrawer anchor="left" open onOpen={() => {}} onClose={() => {}}>
          <div style={{ overflow: 'hidden', width: 100 }}>
            <div style={{ overflow: 'auto' }}>
              <div style={{ width: 1000, height: 100 }} data-testid="target" />
            </div>
          </div>
        </SwipeableDrawer>
      );
    }

    render(<Test />);
    const target = screen.getByTestId('target');
    // Perform a full swipe left to horizontally scroll
    fireEvent.touchStart(target, {
      touches: [new Touch({ identifier: 0, target, pageX: 100, clientY: 0 })],
    });
    fireEvent.touchMove(target, {
      touches: [new Touch({ identifier: 0, target, pageX: 50, clientY: 0 })],
    });
    expect(handleTouchMove.returnValues).to.deep.equal([false]);
  });
});
