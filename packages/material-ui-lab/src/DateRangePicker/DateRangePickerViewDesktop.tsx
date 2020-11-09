import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { DateRange } from './RangeTypes';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { calculateRangePreview } from './date-range-manager';
import PickersCalendar, { PickersCalendarProps } from '../DayPicker/PickersCalendar';
import DateRangeDay, { DateRangePickerDayProps } from '../DateRangePickerDay';
import { defaultMinDate, defaultMaxDate } from '../internal/pickers/constants/prop-types';
import ArrowSwitcher, {
  ExportedArrowSwitcherProps,
} from '../internal/pickers/PickersArrowSwitcher';
import {
  usePreviousMonthDisabled,
  useNextMonthDisabled,
} from '../internal/pickers/hooks/date-helpers-hooks';
import {
  isWithinRange,
  isStartOfRange,
  isEndOfRange,
  DateValidationProps,
} from '../internal/pickers/date-utils';
import { doNothing } from '../internal/pickers/utils';

export interface ExportedDesktopDateRangeCalendarProps<TDate> {
  /**
   * The number of calendars that render on **desktop**.
   * @default 2
   */
  calendars?: 1 | 2 | 3;
  /**
   * Custom renderer for `<DateRangePicker />` days. @DateIOType
   * @example (date, DateRangeDayProps) => <DateRangePickerDay {...DateRangeDayProps} />
   */
  renderDay?: (date: TDate, DateRangeDayProps: DateRangePickerDayProps<TDate>) => JSX.Element;
}

interface DesktopDateRangeCalendarProps<TDate>
  extends ExportedDesktopDateRangeCalendarProps<TDate>,
    Omit<PickersCalendarProps<TDate>, 'renderDay' | 'onFocusedDayChange'>,
    DateValidationProps<TDate>,
    ExportedArrowSwitcherProps {
  date: DateRange<TDate | null>;
  changeMonth: (date: TDate) => void;
  currentlySelectingRangeEnd: 'start' | 'end';
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    rangeCalendarContainer: {
      '&:not(:last-child)': {
        borderRight: `2px solid ${theme.palette.divider}`,
      },
    },
    calendar: {
      minWidth: 312,
      minHeight: 288,
    },
    arrowSwitcher: {
      padding: '16px 16px 8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

function getCalendarsArray(calendars: ExportedDesktopDateRangeCalendarProps<unknown>['calendars']) {
  switch (calendars) {
    case 1:
      return [0];
    case 2:
      return [0, 0];
    case 3:
      return [0, 0, 0];
    // this will not work in IE11, but allows to support any amount of calendars
    default:
      return new Array(calendars).fill(0);
  }
}

/**
 * @ignore - internal component.
 */
function DateRangePickerViewDesktop<TDate>(
  props: DesktopDateRangeCalendarProps<TDate> & WithStyles<typeof styles>,
) {
  const {
    date,
    classes,
    calendars = 2,
    changeMonth,
    leftArrowButtonProps,
    leftArrowButtonText = 'previous month',
    leftArrowIcon,
    rightArrowButtonProps,
    rightArrowButtonText = 'next month',
    rightArrowIcon,
    onChange,
    disableFuture,
    disablePast,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    minDate: __minDate,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    maxDate: __maxDate,
    currentlySelectingRangeEnd,
    currentMonth,
    renderDay = (_, dateRangeProps) => <DateRangeDay {...dateRangeProps} />,
    ...other
  } = props;

  const utils = useUtils<TDate>();
  const minDate = __minDate || utils.date(defaultMinDate);
  const maxDate = __maxDate || utils.date(defaultMaxDate);

  const [rangePreviewDay, setRangePreviewDay] = React.useState<TDate | null>(null);

  const isNextMonthDisabled = useNextMonthDisabled(currentMonth, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, { disablePast, minDate });

  const previewingRange = calculateRangePreview({
    utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd,
  });

  const handleDayChange = React.useCallback(
    (day: TDate | null) => {
      setRangePreviewDay(null);
      onChange(day);
    },
    [onChange],
  );

  const handlePreviewDayChange = (newPreviewRequest: TDate) => {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  const CalendarTransitionProps = React.useMemo(
    () => ({
      onMouseLeave: () => setRangePreviewDay(null),
    }),
    [],
  );

  const selectNextMonth = React.useCallback(() => {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  const selectPreviousMonth = React.useCallback(() => {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  return (
    <div className={classes.root}>
      {getCalendarsArray(calendars).map((_, index) => {
        const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);

        return (
          <div key={index} className={classes.rangeCalendarContainer}>
            <ArrowSwitcher
              className={classes.arrowSwitcher}
              onLeftClick={selectPreviousMonth}
              onRightClick={selectNextMonth}
              isLeftHidden={index !== 0}
              isRightHidden={index !== calendars - 1}
              isLeftDisabled={isPreviousMonthDisabled}
              isRightDisabled={isNextMonthDisabled}
              leftArrowButtonProps={leftArrowButtonProps}
              leftArrowButtonText={leftArrowButtonText}
              leftArrowIcon={leftArrowIcon}
              rightArrowButtonProps={rightArrowButtonProps}
              rightArrowButtonText={rightArrowButtonText}
              rightArrowIcon={rightArrowIcon}
              text={utils.format(monthOnIteration, 'monthAndYear')}
            />
            <PickersCalendar<TDate>
              {...other}
              key={index}
              date={date}
              onFocusedDayChange={doNothing}
              className={classes.calendar}
              onChange={handleDayChange}
              currentMonth={monthOnIteration}
              TransitionProps={CalendarTransitionProps}
              renderDay={(day, __, DayProps) =>
                renderDay(day, {
                  isPreviewing: isWithinRange(utils, day, previewingRange),
                  isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
                  isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
                  isHighlighting: isWithinRange(utils, day, date),
                  isStartOfHighlighting: isStartOfRange(utils, day, date),
                  isEndOfHighlighting: isEndOfRange(utils, day, date),
                  onMouseEnter: () => handlePreviewDayChange(day),
                  ...DayProps,
                })
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default withStyles(styles, { name: 'MuiPickersDesktopDateRangeCalendar' })(
  DateRangePickerViewDesktop,
) as <TDate>(props: DesktopDateRangeCalendarProps<TDate>) => JSX.Element;
