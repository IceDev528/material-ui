import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { spy, useFakeTimers } from 'sinon';
import { expect } from 'chai';
import { describeConformance, fireEvent, fireDiscreteEvent, screen } from 'test/utils';
import { TransitionProps } from '@material-ui/core/transitions';
import { TimePickerProps } from '@material-ui/lab/TimePicker';
import DesktopTimePicker from '@material-ui/lab/DesktopTimePicker';
import {
  createPickerMount,
  createPickerRender,
  adapterToUse,
} from '../internal/pickers/test-utils';

describe('<DesktopTimePicker />', () => {
  let clock: ReturnType<typeof useFakeTimers>;
  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  const render = createPickerRender();
  const mount = createPickerMount();

  describeConformance(
    <DesktopTimePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={null}
    />,
    () => ({
      classes: {},
      mount,
      // TODO: The `ref` on the `TimePicker` is forwarded as `inputRef` in the `renderInput` parameters.
      refInstanceof: window.HTMLInputElement,
      skip: ['componentProp', 'mergeClassName', 'propsSpread', 'rootClass', 'reactTestRenderer'],
    }),
  );

  const NoTransition = React.forwardRef(function NoTransition(
    props: TransitionProps & { children?: React.ReactNode },
    ref: React.Ref<HTMLDivElement>,
  ) {
    const { children, in: inProp } = props;

    if (!inProp) {
      return null;
    }
    return (
      <div ref={ref} tabIndex={-1}>
        {children}
      </div>
    );
  });

  it('opens on click', () => {
    const handleClose = spy();
    const handleOpen = spy();
    render(
      <DesktopTimePicker
        value={null}
        onChange={() => {}}
        onClose={handleClose}
        onOpen={handleOpen}
        renderInput={(params) => <TextField {...params} />}
        TransitionComponent={NoTransition}
      />,
    );

    fireDiscreteEvent.click(screen.getByLabelText(/choose time/i));

    expect(handleClose.callCount).to.equal(0);
    expect(handleOpen.callCount).to.equal(1);
  });

  it('closes on clickaway', () => {
    const handleClose = spy();
    render(
      <DesktopTimePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
      />,
    );

    fireEvent.click(document.body);

    expect(handleClose.callCount).to.equal(1);
  });

  it('does not close on clickaway when it is not open', () => {
    const handleClose = spy();
    render(
      <DesktopTimePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        onClose={handleClose}
      />,
    );

    fireEvent.click(document.body);

    expect(handleClose.callCount).to.equal(0);
  });

  it('does not close on click inside', () => {
    const handleClose = spy();
    render(
      <DesktopTimePicker
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
        value={null}
        open
        onClose={handleClose}
      />,
    );

    fireEvent.click(screen.getByLabelText('open next view'));

    expect(handleClose.callCount).to.equal(0);
  });

  it('allows to navigate between timepicker views using arrow switcher', () => {
    render(
      <DesktopTimePicker
        open
        views={['hours', 'minutes', 'seconds']}
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    const prevViewButton = screen.getByLabelText('open previous view');
    const nextViewButton = screen.getByLabelText('open next view');

    expect(screen.getByLabelText(/Select Hours/i)).toBeVisible();
    expect(prevViewButton).to.have.attribute('disabled');

    fireEvent.click(nextViewButton);
    expect(screen.getByLabelText(/Select minutes/)).toBeVisible();

    expect(prevViewButton).not.to.have.attribute('disabled');
    expect(nextViewButton).not.to.have.attribute('disabled');

    fireEvent.click(nextViewButton);
    expect(screen.getByLabelText(/Select seconds/)).toBeVisible();
    expect(nextViewButton).to.have.attribute('disabled');
  });

  context('input validation', () => {
    const shouldDisableTime: TimePickerProps['shouldDisableTime'] = (value) => value === 10;

    [
      { expectedError: 'invalidDate', props: {}, input: 'invalidText' },
      {
        expectedError: 'minTime',
        props: { minTime: adapterToUse.date(`2000-01-01T08:00:00.000`) },
        input: '03:00',
      },
      {
        expectedError: 'maxTime',
        props: { maxTime: adapterToUse.date(`2000-01-01T08:00:00.000`) },
        input: '12:00',
      },
      { expectedError: 'shouldDisableTime-hours', props: { shouldDisableTime }, input: '10:00' },
      { expectedError: 'shouldDisableTime-minutes', props: { shouldDisableTime }, input: '00:10' },
    ].forEach(({ props, input, expectedError }) => {
      it(`should dispatch "${expectedError}" error`, () => {
        const onErrorMock = spy();

        // we are running validation on value change
        function TimePickerInput() {
          const [time, setTime] = React.useState(null);

          return (
            <DesktopTimePicker
              ampm={false}
              value={time}
              onError={onErrorMock}
              onChange={(newTime) => setTime(newTime)}
              renderInput={(inputProps) => <TextField {...inputProps} />}
              {...props}
            />
          );
        }

        render(<TimePickerInput />);

        fireEvent.change(screen.getByRole('textbox'), {
          target: {
            value: input,
          },
        });

        expect(onErrorMock.callCount).to.equal(1);
        expect(onErrorMock.args[0][0]).to.equal(expectedError);
      });
    });
  });

  describe('prop: PopperProps', () => {
    it('forwards onClick and onTouchStart', () => {
      const handleClick = spy();
      const handleTouchStart = spy();
      render(
        <DesktopTimePicker
          open
          onChange={() => {}}
          PopperProps={{
            onClick: handleClick,
            onTouchStart: handleTouchStart,
            // @ts-expect-error `data-*` attributes are not recognized in props objects
            'data-testid': 'popper',
          }}
          renderInput={(params) => <TextField {...params} />}
          value={null}
        />,
      );
      const popper = screen.getByTestId('popper');

      fireEvent.click(popper);
      fireEvent.touchStart(popper);

      expect(handleClick.callCount).to.equal(1);
      expect(handleTouchStart.callCount).to.equal(1);
    });
  });
});
