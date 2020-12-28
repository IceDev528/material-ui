import { ParsableDate } from './constants/prop-types';
import { CLOCK_WIDTH } from './constants/dimensions';
import { MuiPickersAdapter } from './hooks/useUtils';

type Meridiem = 'am' | 'pm' | null;

export const getMeridiem = (date: unknown, utils: MuiPickersAdapter): Meridiem => {
  if (!date) {
    return null;
  }

  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};

export const convertValueToMeridiem = (value: number, meridiem: Meridiem, ampm: boolean) => {
  if (ampm) {
    const currentMeridiem = value >= 12 ? 'pm' : 'am';
    if (currentMeridiem !== meridiem) {
      return meridiem === 'am' ? value - 12 : value + 12;
    }
  }

  return value;
};

export const convertToMeridiem = <TDate>(
  time: TDate,
  meridiem: 'am' | 'pm',
  ampm: boolean,
  utils: MuiPickersAdapter<TDate>,
) => {
  const newHoursAmount = convertValueToMeridiem(utils.getHours(time), meridiem, ampm);
  return utils.setHours(time, newHoursAmount);
};

const clockCenter = {
  x: CLOCK_WIDTH / 2,
  y: CLOCK_WIDTH / 2,
};

const baseClockPoint = {
  x: clockCenter.x,
  y: 0,
};

const cx = baseClockPoint.x - clockCenter.x;
const cy = baseClockPoint.y - clockCenter.y;

const rad2deg = (rad: number) => rad * 57.29577951308232;

const getAngleValue = (step: number, offsetX: number, offsetY: number) => {
  const x = offsetX - clockCenter.x;
  const y = offsetY - clockCenter.y;

  const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

  let deg = rad2deg(atan);
  deg = Math.round(deg / step) * step;
  deg %= 360;

  const value = Math.floor(deg / step) || 0;
  const delta = x ** 2 + y ** 2;
  const distance = Math.sqrt(delta);

  return { value, distance };
};

export const getMinutes = (offsetX: number, offsetY: number, step = 1) => {
  const angleStep = step * 6;
  let { value } = getAngleValue(angleStep, offsetX, offsetY);
  value = (value * step) % 60;

  return value;
};

export const getHours = (offsetX: number, offsetY: number, ampm: boolean) => {
  const { value, distance } = getAngleValue(30, offsetX, offsetY);
  let hour = value || 12;

  if (!ampm) {
    if (distance < 90) {
      hour += 12;
      hour %= 24;
    }
  } else {
    hour %= 12;
  }

  return hour;
};

export function getSecondsInDay(date: unknown, utils: MuiPickersAdapter) {
  return utils.getHours(date) * 3600 + utils.getMinutes(date) * 60 + utils.getSeconds(date);
}

export const createIsAfterIgnoreDatePart = (
  disableIgnoringDatePartForTimeValidation: boolean,
  utils: MuiPickersAdapter,
) => (dateLeft: unknown, dateRight: unknown) => {
  if (disableIgnoringDatePartForTimeValidation) {
    return utils.isAfter(dateLeft, dateRight);
  }

  return getSecondsInDay(dateLeft, utils) > getSecondsInDay(dateRight, utils);
};

export interface TimeValidationProps<TDate> {
  /**
   * Min time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  minTime?: TDate;
  /**
   * Max time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  maxTime?: TDate;
  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime?: (timeValue: number, clockType: 'hours' | 'minutes' | 'seconds') => boolean;
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation?: boolean;
}

export const validateTime = <TDate>(
  utils: MuiPickersAdapter,
  value: TDate | ParsableDate<TDate>,
  {
    minTime,
    maxTime,
    shouldDisableTime,
    disableIgnoringDatePartForTimeValidation,
  }: TimeValidationProps<TDate>,
) => {
  const date = utils.date(value);
  const isAfterComparingFn = createIsAfterIgnoreDatePart(
    Boolean(disableIgnoringDatePartForTimeValidation),
    utils,
  );

  if (value === null) {
    return null;
  }

  switch (true) {
    case !utils.isValid(value):
      return 'invalidDate';

    case Boolean(minTime && isAfterComparingFn(minTime, date)):
      return 'minTime';

    case Boolean(maxTime && isAfterComparingFn(date, maxTime)):
      return 'maxTime';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getHours(date), 'hours')):
      return 'shouldDisableTime-hours';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getMinutes(date), 'minutes')):
      return 'shouldDisableTime-minutes';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getSeconds(date), 'seconds')):
      return 'shouldDisableTime-seconds';

    default:
      return null;
  }
};

export type TimeValidationError = ReturnType<typeof validateTime>;
