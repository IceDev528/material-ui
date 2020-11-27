import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { isWeekend } from 'date-fns';
import { screen, fireEvent } from 'test/utils';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { DateRange } from '@material-ui/lab/DateRangePicker';
import DesktopDateRangePicker from '@material-ui/lab/DesktopDateRangePicker';
import StaticDateRangePicker from '@material-ui/lab/StaticDateRangePicker';
import {
  createPickerRender,
  FakeTransitionComponent,
  adapterToUse,
  getAllByMuiTest,
  queryByMuiTest,
} from '../internal/pickers/test-utils';

const defaultRangeRenderInput = (startProps: TextFieldProps, endProps: TextFieldProps) => (
  <React.Fragment>
    <TextField {...startProps} />
    <TextField {...endProps} />
  </React.Fragment>
);

describe('<DateRangePicker />', () => {
  const render = createPickerRender({ strict: false });

  before(function beforeHook() {
    if (!/jsdom/.test(window.navigator.userAgent)) {
      // FIXME This test suite is extremely flaky in test:karma
      this.skip();
    }
  });

  it('allows to select date range end-to-end', () => {
    function RangePickerTest() {
      const [range, changeRange] = React.useState<DateRange<Date>>([
        adapterToUse.date('2019-01-01T00:00:00.000'),
        adapterToUse.date('2019-01-01T00:00:00.000'),
      ]);

      return (
        <DesktopDateRangePicker
          open
          reduceAnimations
          renderInput={defaultRangeRenderInput}
          onChange={(date) => changeRange(date)}
          value={range}
          TransitionComponent={FakeTransitionComponent}
        />
      );
    }

    render(<RangePickerTest />);

    fireEvent.click(screen.getByLabelText('Jan 1, 2019'));
    fireEvent.click(screen.getByLabelText('Jan 24, 2019'));

    expect(getAllByMuiTest('DateRangeHighlight')).to.have.length(24);
  });

  it('allows a single day range', () => {
    render(
      <DesktopDateRangePicker
        renderInput={defaultRangeRenderInput}
        onChange={() => {}}
        value={[
          adapterToUse.date('2018-01-01T00:00:00.000'),
          adapterToUse.date('2018-01-01T00:00:00.000'),
        ]}
      />,
    );
    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes[0]).to.have.attribute('aria-invalid', 'false');
    expect(textboxes[1]).to.have.attribute('aria-invalid', 'false');
  });

  it('highlights the selected range of dates', () => {
    render(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        onChange={() => {}}
        value={[
          adapterToUse.date('2018-01-01T00:00:00.000'),
          adapterToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />,
    );

    expect(getAllByMuiTest('DateRangeHighlight')).to.have.length(31);
  });

  it('selects the range from the next month', () => {
    const onChangeMock = spy();
    render(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        onChange={onChangeMock}
        value={[adapterToUse.date('2019-01-01T00:00:00.000'), null]}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 1, 2019'));
    fireEvent.click(
      screen.getByLabelText('next month', { selector: ':not([aria-hidden="true"])' }),
    );
    fireEvent.click(screen.getByLabelText('Mar 19, 2019'));

    expect(onChangeMock.callCount).to.equal(2);
    const [changedRange] = onChangeMock.lastCall.args;
    expect(changedRange[0]).to.toEqualDateTime(adapterToUse.date('2019-01-01T00:00:00.000'));
    expect(changedRange[1]).to.toEqualDateTime(adapterToUse.date('2019-03-19T00:00:00.000'));
  });

  it('continues start selection if selected "end" date is before start', () => {
    const onChangeMock = spy();
    render(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        onChange={onChangeMock}
        defaultCalendarMonth={adapterToUse.date('2019-01-01T00:00:00.000')}
        value={[null, null]}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 30, 2019'));
    fireEvent.click(screen.getByLabelText('Jan 19, 2019'));

    expect(queryByMuiTest(document.body, 'DateRangeHighlight')).to.equal(null);

    fireEvent.click(screen.getByLabelText('Jan 30, 2019'));

    expect(onChangeMock.callCount).to.equal(3);
    const [changedRange] = onChangeMock.lastCall.args;
    expect(changedRange[0]).to.toEqualDateTime(adapterToUse.date('2019-01-19T00:00:00.000'));
    expect(changedRange[1]).to.toEqualDateTime(adapterToUse.date('2019-01-30T00:00:00.000'));
  });

  it('starts selection from end if end text field was focused', function test() {
    const onChangeMock = spy();
    render(
      <DesktopDateRangePicker
        renderInput={defaultRangeRenderInput}
        onChange={onChangeMock}
        defaultCalendarMonth={adapterToUse.date('2019-01-01T00:00:00.000')}
        value={[null, null]}
      />,
    );

    fireEvent.focus(screen.getAllByRole('textbox')[1]);

    fireEvent.click(screen.getByLabelText('Jan 30, 2019'));
    fireEvent.click(screen.getByLabelText('Jan 19, 2019'));

    expect(getAllByMuiTest('DateRangeHighlight')).to.have.length(12);
    expect(onChangeMock.callCount).to.equal(2);
    const [changedRange] = onChangeMock.lastCall.args;
    expect(changedRange[0]).toEqualDateTime(adapterToUse.date('2019-01-19T00:00:00.000'));
    expect(changedRange[1]).toEqualDateTime(adapterToUse.date('2019-01-30T00:00:00.000'));
  });

  it('closes on focus out of fields', () => {
    render(
      <React.Fragment>
        <DesktopDateRangePicker
          value={[null, null]}
          renderInput={defaultRangeRenderInput}
          onChange={() => {}}
          TransitionComponent={FakeTransitionComponent}
        />
        <button type="button"> focus me </button>
      </React.Fragment>,
    );

    fireEvent.focus(screen.getAllByRole('textbox')[0]);
    expect(screen.getByRole('tooltip')).toBeVisible();

    fireEvent.focus(screen.getByText('focus me'));
    expect(screen.getByRole('tooltip')).not.toBeVisible();
  });

  // TODO
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('allows pure keyboard selection of range', () => {
    const onChangeMock = spy();
    render(
      <DesktopDateRangePicker
        reduceAnimations
        value={[null, null]}
        renderInput={defaultRangeRenderInput}
        onChange={onChangeMock}
        TransitionComponent={FakeTransitionComponent}
      />,
    );

    fireEvent.focus(screen.getAllByRole('textbox')[0]);
    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: {
        value: '06/06/2019',
      },
    });

    fireEvent.change(screen.getAllByRole('textbox')[1], {
      target: {
        value: '08/08/2019',
      },
    });

    expect(
      onChangeMock.calledWith([
        adapterToUse.date('2019-06-06T00:00:00.000'),
        adapterToUse.date('2019-06-06T00:00:00.000'),
      ]),
    ).to.equal(true);
  });

  it('scrolls current month to the active selection on focusing appropriate field', () => {
    render(
      <DesktopDateRangePicker
        reduceAnimations
        value={[
          adapterToUse.date('2019-05-19T00:00:00.000'),
          adapterToUse.date('2019-10-30T00:00:00.000'),
        ]}
        renderInput={defaultRangeRenderInput}
        onChange={() => {}}
        TransitionComponent={FakeTransitionComponent}
      />,
    );

    fireEvent.focus(screen.getAllByRole('textbox')[0]);
    expect(screen.getByText('May 2019')).toBeVisible();

    fireEvent.focus(screen.getAllByRole('textbox')[1]);
    expect(screen.getByText('October 2019')).toBeVisible();

    // scroll back
    fireEvent.focus(screen.getAllByRole('textbox')[0]);
    expect(screen.getByText('May 2019')).toBeVisible();
  });

  it('allows disabling dates', () => {
    render(
      <StaticDateRangePicker
        renderInput={defaultRangeRenderInput}
        minDate={adapterToUse.date('2005-01-01T00:00:00.000')}
        shouldDisableDate={isWeekend}
        onChange={() => {}}
        value={[
          adapterToUse.date('2018-01-01T00:00:00.000'),
          adapterToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />,
    );

    expect(
      getAllByMuiTest('DateRangeDay').filter((day) => day.getAttribute('disabled') !== undefined),
    ).to.have.length(31);
  });

  it(`doesn't crash if opening picker with invalid date input`, async () => {
    render(
      <DesktopDateRangePicker
        renderInput={defaultRangeRenderInput}
        calendars={3}
        onChange={() => {}}
        TransitionComponent={FakeTransitionComponent}
        value={[adapterToUse.date(NaN), adapterToUse.date('2018-01-31T00:00:00.000')]}
      />,
    );

    fireEvent.focus(screen.getAllByRole('textbox')[0]);
    expect(screen.getByRole('tooltip')).toBeVisible();
  });

  it('prop – `renderDay` should be called and render days', async () => {
    render(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        onChange={() => {}}
        renderDay={(day) => <div key={String(day)} data-testid="renderDayCalled" />}
        value={[null, null]}
      />,
    );

    expect(screen.getAllByTestId('renderDayCalled')).not.to.have.length(0);
  });

  it('prop – `calendars` renders provided amount of calendars', () => {
    render(
      <DesktopDateRangePicker
        open
        renderInput={defaultRangeRenderInput}
        calendars={3}
        onChange={() => {}}
        value={[
          adapterToUse.date('2018-01-01T00:00:00.000'),
          adapterToUse.date('2018-01-31T00:00:00.000'),
        ]}
      />,
    );

    expect(getAllByMuiTest('pickers-calendar')).to.have.length(3);
  });
});
