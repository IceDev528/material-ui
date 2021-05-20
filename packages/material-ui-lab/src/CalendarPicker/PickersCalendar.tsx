import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import PickersDay, { PickersDayProps } from '../PickersDay/PickersDay';
import { useUtils, useNow } from '../internal/pickers/hooks/useUtils';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
import SlideTransition, { SlideDirection, SlideTransitionProps } from './PickersSlideTransition';

export interface ExportedCalendarProps<TDate>
  extends Pick<
    PickersDayProps<TDate>,
    'disableHighlightToday' | 'showDaysOutsideCurrentMonth' | 'allowSameDateSelection'
  > {
  /**
   * Enables keyboard listener for moving between days in calendar.
   * Defaults to `true` unless the `ClockPicker` is used inside a `Static*` picker component.
   */
  allowKeyboardControl?: boolean;
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading?: boolean;
  /**
   * Calendar onChange.
   */
  onChange: PickerOnChangeFn<TDate>;
  /**
   * Custom renderer for day. Check the [PickersDay](https://material-ui.com/api/pickers-day/) component.
   */
  renderDay?: (
    day: TDate,
    selectedDates: Array<TDate | null>,
    pickersDayProps: PickersDayProps<TDate>,
  ) => JSX.Element;
  /**
   * Component displaying when passed `loading` true.
   * @default () => "..."
   */
  renderLoading?: () => React.ReactNode;
}

export interface PickersCalendarProps<TDate> extends ExportedCalendarProps<TDate> {
  className?: string;
  currentMonth: TDate;
  date: TDate | [TDate | null, TDate | null] | null;
  focusedDay: TDate | null;
  isDateDisabled: (day: TDate) => boolean;
  isMonthSwitchingAnimating: boolean;
  onFocusedDayChange: (newFocusedDay: TDate) => void;
  onMonthSwitchingAnimationEnd: () => void;
  reduceAnimations: boolean;
  slideDirection: SlideDirection;
  TransitionProps?: Partial<SlideTransitionProps>;
}

const weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 4) * 6;

const PickersCalendarDayHeader = styled('div', { skipSx: true })({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const PickersCalendarWeekDayLabel = styled(Typography, { skipSx: true })(({ theme }) => ({
  width: 36,
  height: 40,
  margin: '0 2px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary,
}));

const PickersCalendarLoadingContainer = styled('div', { skipSx: true })({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight,
});

const PickersCalendarSlideTransition = styled(SlideTransition, { skipSx: true })({
  minHeight: weeksContainerHeight,
});

const PickersCalendarWeekContainer = styled('div', { skipSx: true })({ overflow: 'hidden' });

const PickersCalendarWeek = styled('div', { skipSx: true })({
  margin: `${DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center',
});

/**
 * @ignore - do not document.
 */
function PickersCalendar<TDate>(props: PickersCalendarProps<TDate>) {
  const {
    allowKeyboardControl,
    allowSameDateSelection,
    onFocusedDayChange: changeFocusedDay,
    className,
    currentMonth,
    date,
    disableHighlightToday,
    focusedDay,
    isDateDisabled,
    isMonthSwitchingAnimating,
    loading,
    onChange,
    onMonthSwitchingAnimationEnd,
    reduceAnimations,
    renderDay,
    renderLoading = () => <span data-mui-test="loading-progress">...</span>,
    showDaysOutsideCurrentMonth,
    slideDirection,
    TransitionProps,
  } = props;

  const now = useNow<TDate>();
  const utils = useUtils<TDate>();
  const handleDaySelect = React.useCallback(
    (day: TDate, isFinish: PickerSelectionState = 'finish') => {
      // TODO possibly buggy line figure out and add tests
      const finalDate = Array.isArray(date) ? day : utils.mergeDateAndTime(day, date || now);

      onChange(finalDate, isFinish);
    },
    [date, now, onChange, utils],
  );

  const currentMonthNumber = utils.getMonth(currentMonth);
  const selectedDates = (Array.isArray(date) ? date : [date])
    .filter(Boolean)
    .map((selectedDateItem) => selectedDateItem && utils.startOfDay(selectedDateItem));

  return (
    <React.Fragment>
      <PickersCalendarDayHeader>
        {utils.getWeekdays().map((day, i) => (
          <PickersCalendarWeekDayLabel aria-hidden key={day + i.toString()} variant="caption">
            {day.charAt(0).toUpperCase()}
          </PickersCalendarWeekDayLabel>
        ))}
      </PickersCalendarDayHeader>

      {loading ? (
        <PickersCalendarLoadingContainer>{renderLoading()}</PickersCalendarLoadingContainer>
      ) : (
        <PickersCalendarSlideTransition
          transKey={currentMonthNumber}
          onExited={onMonthSwitchingAnimationEnd}
          reduceAnimations={reduceAnimations}
          slideDirection={slideDirection}
          className={className}
          {...TransitionProps}
        >
          <PickersCalendarWeekContainer data-mui-test="pickers-calendar" role="grid">
            {utils.getWeekArray(currentMonth).map((week) => (
              <PickersCalendarWeek role="row" key={`week-${week[0]}`}>
                {week.map((day) => {
                  const pickersDayProps: PickersDayProps<TDate> = {
                    key: (day as any)?.toString(),
                    day,
                    isAnimating: isMonthSwitchingAnimating,
                    disabled: isDateDisabled(day),
                    allowKeyboardControl,
                    allowSameDateSelection,
                    autoFocus:
                      allowKeyboardControl &&
                      focusedDay !== null &&
                      utils.isSameDay(day, focusedDay),
                    today: utils.isSameDay(day, now),
                    outsideCurrentMonth: utils.getMonth(day) !== currentMonthNumber,
                    selected: selectedDates.some(
                      (selectedDate) => selectedDate && utils.isSameDay(selectedDate, day),
                    ),
                    disableHighlightToday,
                    showDaysOutsideCurrentMonth,
                    onDayFocus: changeFocusedDay,
                    onDaySelect: handleDaySelect,
                  };

                  return renderDay ? (
                    renderDay(day, selectedDates, pickersDayProps)
                  ) : (
                    <div role="cell" key={pickersDayProps.key}>
                      <PickersDay {...pickersDayProps} />
                    </div>
                  );
                })}
              </PickersCalendarWeek>
            ))}
          </PickersCalendarWeekContainer>
        </PickersCalendarSlideTransition>
      )}
    </React.Fragment>
  );
}

export default PickersCalendar;
