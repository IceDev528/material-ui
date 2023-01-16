import SliderUnstyled, {
  sliderUnstyledClasses as classes,
  SliderUnstyledRootSlotProps,
} from '@mui/base/SliderUnstyled';
import { expect } from 'chai';
import * as React from 'react';
import { spy, stub } from 'sinon';
import {
  createRenderer,
  createMount,
  describeConformanceUnstyled,
  fireEvent,
  screen,
} from 'test/utils';

type Touches = Array<Pick<Touch, 'identifier' | 'clientX' | 'clientY'>>;

function createTouches(touches: Touches) {
  return {
    changedTouches: touches.map(
      (touch) =>
        new Touch({
          target: document.body,
          ...touch,
        }),
    ),
  };
}

describe('<SliderUnstyled />', () => {
  before(function beforeHook() {
    if (typeof Touch === 'undefined') {
      this.skip();
    }
  });

  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<SliderUnstyled value={0} />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    mount,
    refInstanceof: window.HTMLSpanElement,
    testComponentPropWith: 'div',
    muiName: 'MuiSlider',
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      thumb: {
        expectedClassName: classes.thumb,
      },
      track: {
        expectedClassName: classes.track,
      },
      rail: {
        expectedClassName: classes.rail,
      },
    },
  }));

  it('forwards style props on the Root component', () => {
    let ownerState = null;
    let theme = null;

    const Root = React.forwardRef(
      (
        {
          ownerState: ownerStateProp,
          theme: themeProp,
          ...other
        }: SliderUnstyledRootSlotProps & {
          theme: any;
        },
        ref: React.ForwardedRef<HTMLSpanElement>,
      ) => {
        ownerState = ownerStateProp;
        theme = themeProp;
        return <span {...other} ref={ref} />;
      },
    );

    render(<SliderUnstyled slots={{ root: Root }} />);

    expect(ownerState).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef<HTMLSpanElement>();
    render(
      <SliderUnstyled
        slots={{
          root: 'span',
        }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    if (element !== null) {
      expect(element.getAttribute('ownerState')).to.equal(null);
      expect(element.getAttribute('theme')).to.equal(null);
    }
  });

  describe('prop: marks', () => {
    it('does not cause unknown-prop error', () => {
      const marks = [
        {
          value: 33,
        },
      ];
      expect(() => {
        render(<SliderUnstyled marks={marks} />);
      }).not.to.throw();
    });
  });

  describe('prop: orientation', () => {
    it('sets the orientation via ARIA', () => {
      render(<SliderUnstyled orientation="vertical" />);

      const slider = screen.getByRole('slider');
      expect(slider).to.have.attribute('aria-orientation', 'vertical');
    });

    it('does not set the orientation via appearance for WebKit browsers', function test() {
      if (/jsdom/.test(window.navigator.userAgent) || !/WebKit/.test(window.navigator.userAgent)) {
        this.skip();
      }

      render(<SliderUnstyled orientation="vertical" />);

      const slider = screen.getByRole('slider');

      expect(slider).to.have.property('tagName', 'INPUT');
      expect(slider).to.have.property('type', 'range');
      // Only relevant if we implement `[role="slider"]` with `input[type="range"]`
      // We're not setting this by default because it changes horizontal keyboard navigation in WebKit: https://bugs.chromium.org/p/chromium/issues/detail?id=1162640
      expect(slider).not.toHaveComputedStyle({ webkitAppearance: 'slider-vertical' });
    });
  });

  describe('prop: valueLabelDisplay', () => {
    it('renders a slider', () => {
      render(<SliderUnstyled value={30} valueLabelDisplay="auto" />);

      expect(screen.getByRole('slider')).to.have.attribute('aria-valuenow', '30');
    });
  });

  type Values = Array<[string, number[]]>;

  const values = [
    ['readonly range', Object.freeze([2, 1])],
    ['range', [2, 1]],
  ] as Values;
  values.forEach(([valueLabel, value]) => {
    it(`calls onChange even if the ${valueLabel} did not change`, () => {
      const handleChange = spy();

      render(
        <SliderUnstyled
          min={0}
          max={5}
          onChange={handleChange}
          value={value}
          data-testid="slider-root"
        />,
      );

      const sliderRoot = screen.getByTestId('slider-root');

      stub(sliderRoot, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
        x: 0,
        y: 0,
        right: 0,
        top: 0,
        toJSON() {},
      }));

      // pixel:  0   20  40  60  80  100
      // slider: |---|---|---|---|---|
      // values: 0   1   2   3   4   5
      // value:      ↑   ↑
      // mouse:           ↑

      fireEvent.mouseDown(sliderRoot, {
        buttons: 1,
        clientX: 41,
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).not.to.equal(value);
      expect(handleChange.args[0][1]).to.deep.equal(value.slice().sort((a, b) => a - b));
    });
  });

  describe('prop: disabled', () => {
    it('should render the disabled classes', () => {
      const { container, getByRole } = render(<SliderUnstyled disabled value={0} />);
      expect(container.firstChild).to.have.class(classes.disabled);
      expect(getByRole('slider')).not.to.have.attribute('tabIndex');
    });

    it('should not respond to drag events after becoming disabled', function test() {
      // TODO: Don't skip once a fix for https://github.com/jsdom/jsdom/issues/3029 is released.
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { getByRole, setProps, getByTestId } = render(
        <SliderUnstyled defaultValue={0} data-testid="slider-root" />,
      );

      const sliderRoot = getByTestId('slider-root');

      stub(sliderRoot, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
        x: 0,
        y: 0,
        top: 0,
        right: 0,
        toJSON() {},
      }));
      fireEvent.touchStart(sliderRoot, createTouches([{ identifier: 1, clientX: 21, clientY: 0 }]));

      const thumb = getByRole('slider');

      expect(thumb).to.have.attribute('aria-valuenow', '21');
      expect(thumb).toHaveFocus();

      setProps({ disabled: true });
      expect(thumb).not.toHaveFocus();
      expect(thumb).not.to.have.class(classes.active);

      fireEvent.touchMove(sliderRoot, createTouches([{ identifier: 1, clientX: 30, clientY: 0 }]));

      expect(thumb).to.have.attribute('aria-valuenow', '21');
    });

    it('should not respond to drag events if disabled', function test() {
      // TODO: Don't skip once a fix for https://github.com/jsdom/jsdom/issues/3029 is released.
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { getByRole, getByTestId } = render(
        <SliderUnstyled disabled defaultValue={21} data-testid="slider-root" />,
      );

      const thumb = getByRole('slider');
      const sliderRoot = getByTestId('slider-root');

      stub(sliderRoot, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
        x: 0,
        y: 0,
        top: 0,
        right: 0,
        toJSON() {},
      }));

      fireEvent.touchStart(sliderRoot, createTouches([{ identifier: 1, clientX: 21, clientY: 0 }]));

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 30, clientY: 0 }]),
      );

      fireEvent.touchEnd(
        document.body,
        createTouches([{ identifier: 1, clientX: 30, clientY: 0 }]),
      );

      expect(thumb).to.have.attribute('aria-valuenow', '21');
    });
  });

  describe('marks', () => {
    it('should not render marks that are out of min&max bounds', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { container } = render(
        <SliderUnstyled
          marks={[
            {
              value: -1,
              label: -1,
            },
            {
              value: 0,
              label: 0,
            },
            {
              value: 100,
              label: 100,
            },
            {
              value: 120,
              label: 120,
            },
          ]}
        />,
      );

      expect(container.querySelectorAll(`.${classes.markLabel}`).length).to.equal(2);
      expect(container.querySelectorAll(`.${classes.mark}`).length).to.equal(2);
      expect(container.querySelectorAll(`.${classes.markLabel}`)[0].textContent).to.equal('0');
      expect(container.querySelectorAll(`.${classes.markLabel}`)[1].textContent).to.equal('100');
    });
  });

  describe('ARIA', () => {
    it('should have the correct aria attributes', () => {
      const { getByRole, container } = render(
        <SliderUnstyled
          value={50}
          valueLabelDisplay="auto"
          marks={[
            {
              value: 0,
              label: 0,
            },
            {
              value: 50,
              label: 50,
            },
            {
              value: 100,
              label: 100,
            },
          ]}
          aria-label="a slider"
          aria-labelledby="a slider label"
        />,
      );

      const sliderWrapperElement = container.firstChild;
      const slider = getByRole('slider');
      const markLabels = container.querySelectorAll(`.${classes.markLabel}`);
      const input = container.querySelector('input');
      expect(slider).to.have.attribute('aria-valuemin', '0');
      expect(slider).to.have.attribute('aria-valuemax', '100');
      expect(slider).to.have.attribute('aria-valuenow', '50');
      expect(slider).to.have.attribute('aria-labelledby');

      expect(markLabels[0]).to.have.attribute('aria-hidden', 'true');

      expect(sliderWrapperElement).not.to.have.attribute('aria-labelledby');
      expect(input).to.have.attribute('aria-labelledby', 'a slider label');
      expect(input).to.have.attribute('aria-label', 'a slider');
      expect(input).to.have.attribute('aria-valuenow', '50');
    });
  });
});
