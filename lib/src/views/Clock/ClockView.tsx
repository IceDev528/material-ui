import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Clock } from './Clock';
import { pipe } from '../../_helpers/utils';
import { useUtils, useNow } from '../../_shared/hooks/useUtils';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { useDefaultProps } from '../../_shared/withDefaultProps';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import { useMeridiemMode } from '../../TimePicker/TimePickerToolbar';
import { PickerSelectionState } from '../../_shared/hooks/usePickerState';
import { ArrowSwitcher, ExportedArrowSwitcherProps } from '../../_shared/ArrowSwitcher';
import {
  convertValueToMeridiem,
  createIsAfterIgnoreDatePart,
  TimeValidationProps,
} from '../../_helpers/time-utils';

export interface ExportedClockViewProps<TDate> extends TimeValidationProps<TDate> {
  /**
   * 12h/24h view for hour selection clock.
   *
   * @default true
   */
  ampm?: boolean;
  /**
   * Step over minutes.
   *
   * @default 1
   */
  minutesStep?: number;
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   *
   * @default false
   */
  ampmInClock?: boolean;
  /**
   * Enables keyboard listener for moving between days in calendar.
   *
   * @default currentWrapper !== 'static'
   */
  allowKeyboardControl?: boolean;
}

export interface ClockViewProps<TDate>
  extends ExportedClockViewProps<TDate>,
    ExportedArrowSwitcherProps {
  /**
   * Selected date @DateIOType.
   */
  date: TDate | null;
  /**
   * Clock type.
   */
  type: 'hours' | 'minutes' | 'seconds';
  /**
   * On change date without moving between views @DateIOType.
   */
  onDateChange: PickerOnChangeFn<TDate>;
  /**
   * On change callback @DateIOType.
   */
  onChange: PickerOnChangeFn<TDate>;
  /**
   * Get clock number aria-text for hours.
   */
  getHoursClockNumberText?: (hoursText: string) => string;
  /**
   * Get clock number aria-text for minutes.
   */
  getMinutesClockNumberText?: (minutesText: string) => string;
  /**
   * Get clock number aria-text for seconds.
   */
  getSecondsClockNumberText?: (secondsText: string) => string;
  openNextView: () => void;
  openPreviousView: () => void;
  nextViewAvailable: boolean;
  previousViewAvailable: boolean;
  showViewSwitcher?: boolean;
}

const muiPickersComponentConfig = { name: 'MuiPickersClockView' };

export const useStyles = makeStyles(
  () => ({
    arrowSwitcher: {
      position: 'absolute',
      right: 12,
      top: 15,
    },
  }),
  muiPickersComponentConfig
);

function getMinutesAriaText(minute: string) {
  return `${minute} minutes`;
}

const getHoursAriaText = (hour: string) => `${hour} hours`;

const getSecondsAriaText = (seconds: string) => `${seconds} seconds`;

export function ClockView<TDate>(props: ClockViewProps<TDate>) {
  const {
    allowKeyboardControl,
    ampm,
    ampmInClock,
    date,
    disableIgnoringDatePartForTimeValidation,
    getHoursClockNumberText = getHoursAriaText,
    getMinutesClockNumberText = getMinutesAriaText,
    getSecondsClockNumberText = getSecondsAriaText,
    leftArrowButtonProps,
    leftArrowButtonText = 'open previous view',
    leftArrowIcon,
    maxTime,
    minTime,
    minutesStep = 1,
    nextViewAvailable,
    onChange,
    onDateChange,
    openNextView,
    openPreviousView,
    previousViewAvailable,
    rightArrowButtonProps,
    rightArrowButtonText = 'open next view',
    rightArrowIcon,
    shouldDisableTime,
    showViewSwitcher,
    type,
  } = useDefaultProps(props, muiPickersComponentConfig);

  const now = useNow<TDate>();
  const utils = useUtils<TDate>();
  const classes = useStyles();
  const dateOrNow = date || now;

  const { meridiemMode, handleMeridiemChange } = useMeridiemMode<TDate>(
    dateOrNow,
    ampm,
    onDateChange
  );

  const isTimeDisabled = React.useCallback(
    (rawValue: number, type: 'hours' | 'minutes' | 'seconds') => {
      if (date === null) {
        return false;
      }

      const validateTimeValue = (getRequestedTimePoint: (when: 'start' | 'end') => TDate) => {
        const isAfterComparingFn = createIsAfterIgnoreDatePart(
          Boolean(disableIgnoringDatePartForTimeValidation),
          utils
        );

        return Boolean(
          (minTime && isAfterComparingFn(minTime, getRequestedTimePoint('end'))) ||
            (maxTime && isAfterComparingFn(getRequestedTimePoint('start'), maxTime)) ||
            (shouldDisableTime && shouldDisableTime(rawValue, type))
        );
      };

      switch (type) {
        case 'hours': {
          const hoursWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, Boolean(ampm));
          return validateTimeValue((when: 'start' | 'end') =>
            pipe(
              (currentDate) => utils.setHours(currentDate, hoursWithMeridiem),
              (dateWithHours) => utils.setMinutes(dateWithHours, when === 'start' ? 0 : 59),
              (dateWithMinutes) => utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59)
            )(date)
          );
        }

        case 'minutes':
          return validateTimeValue((when: 'start' | 'end') =>
            pipe(
              (currentDate) => utils.setMinutes(currentDate, rawValue),
              (dateWithMinutes) => utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59)
            )(date)
          );

        case 'seconds':
          return validateTimeValue(() => utils.setSeconds(date, rawValue));

        default:
          throw new Error('not supported');
      }
    },
    [
      ampm,
      date,
      disableIgnoringDatePartForTimeValidation,
      maxTime,
      meridiemMode,
      minTime,
      shouldDisableTime,
      utils,
    ]
  );

  const viewProps = React.useMemo(() => {
    switch (type) {
      case 'hours': {
        const handleHoursChange = (value: number, isFinish?: PickerSelectionState) => {
          const valueWithMeridiem = convertValueToMeridiem(value, meridiemMode, Boolean(ampm));
          onChange(utils.setHours(dateOrNow, valueWithMeridiem), isFinish);
        };

        return {
          onChange: handleHoursChange,
          value: utils.getHours(dateOrNow),
          children: getHourNumbers({
            date,
            utils,
            ampm: Boolean(ampm),
            onChange: handleHoursChange,
            getClockNumberText: getHoursClockNumberText,
            isDisabled: (value) => isTimeDisabled(value, 'hours'),
          }),
        };
      }

      case 'minutes': {
        const minutesValue = utils.getMinutes(dateOrNow);
        const handleMinutesChange = (value: number, isFinish?: PickerSelectionState) => {
          onChange(utils.setMinutes(dateOrNow, value), isFinish);
        };

        return {
          value: minutesValue,
          onChange: handleMinutesChange,
          children: getMinutesNumbers({
            utils,
            value: minutesValue,
            onChange: handleMinutesChange,
            getClockNumberText: getMinutesClockNumberText,
            isDisabled: (value) => isTimeDisabled(value, 'minutes'),
          }),
        };
      }

      case 'seconds': {
        const secondsValue = utils.getSeconds(dateOrNow);
        const handleSecondsChange = (value: number, isFinish?: PickerSelectionState) => {
          onChange(utils.setSeconds(dateOrNow, value), isFinish);
        };

        return {
          value: secondsValue,
          onChange: handleSecondsChange,
          children: getMinutesNumbers({
            utils,
            value: secondsValue,
            onChange: handleSecondsChange,
            getClockNumberText: getSecondsClockNumberText,
            isDisabled: (value) => isTimeDisabled(value, 'seconds'),
          }),
        };
      }

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [
    type,
    utils,
    date,
    ampm,
    getHoursClockNumberText,
    getMinutesClockNumberText,
    getSecondsClockNumberText,
    meridiemMode,
    onChange,
    dateOrNow,
    isTimeDisabled,
  ]);

  return (
    <React.Fragment>
      {showViewSwitcher && (
        <ArrowSwitcher
          className={classes.arrowSwitcher}
          leftArrowButtonProps={leftArrowButtonProps}
          rightArrowButtonProps={rightArrowButtonProps}
          leftArrowButtonText={leftArrowButtonText}
          rightArrowButtonText={rightArrowButtonText}
          leftArrowIcon={leftArrowIcon}
          rightArrowIcon={rightArrowIcon}
          onLeftClick={openPreviousView}
          onRightClick={openNextView}
          isLeftDisabled={previousViewAvailable}
          isRightDisabled={nextViewAvailable}
        />
      )}

      <Clock
        date={date}
        ampmInClock={ampmInClock}
        // @ts-expect-error FIX ME
        onDateChange={onDateChange}
        type={type}
        ampm={ampm}
        minutesStep={minutesStep}
        allowKeyboardControl={allowKeyboardControl}
        isTimeDisabled={isTimeDisabled}
        meridiemMode={meridiemMode}
        handleMeridiemChange={handleMeridiemChange}
        {...viewProps}
      />
    </React.Fragment>
  );
}

ClockView.propTypes = {
  ampm: PropTypes.bool,
  date: PropTypes.object,
  minutesStep: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['minutes', 'hours', 'seconds']).isRequired,
} as any;

ClockView.displayName = 'ClockView';
