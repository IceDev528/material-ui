import * as React from 'react';
import PropTypes from 'prop-types';
import { WithStyles, withStyles, useTheme, MuiStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PickersYear from './PickersYear';
import { useUtils, useNow } from '../internal/pickers/hooks/useUtils';
import { PickerOnChangeFn } from '../internal/pickers/hooks/useViews';
import { findClosestEnabledDate } from '../internal/pickers/date-utils';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';

export interface ExportedYearPickerProps<TDate> {
  /**
   * Callback firing on year change @DateIOType.
   */
  onYearChange?: (date: TDate) => void;
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear?: (day: TDate) => boolean;
}

export interface YearPickerProps<TDate> extends ExportedYearPickerProps<TDate> {
  allowKeyboardControl?: boolean;
  onFocusedDayChange?: (day: TDate) => void;
  date: TDate | null;
  disableFuture?: boolean | null;
  disablePast?: boolean | null;
  isDateDisabled: (day: TDate) => boolean;
  maxDate: TDate;
  minDate: TDate;
  onChange: PickerOnChangeFn<TDate>;
  className?: string;
}

export type YearPickerClassKey = 'root';

export const styles: MuiStyles<YearPickerClassKey> = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflowY: 'auto',
    height: '100%',
    margin: '0 4px',
  },
};

const YearPicker = React.forwardRef(function YearPicker<TDate>(
  props: YearPickerProps<TDate> & WithStyles<typeof styles>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    allowKeyboardControl,
    classes,
    className,
    date,
    disableFuture,
    disablePast,
    isDateDisabled,
    maxDate,
    minDate,
    onChange,
    onFocusedDayChange,
    onYearChange,
    shouldDisableYear,
  } = props;

  const now = useNow<TDate>();
  const theme = useTheme();
  const utils = useUtils<TDate>();

  const selectedDate = date || now;
  const currentYear = utils.getYear(selectedDate);
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const selectedYearRef = React.useRef<HTMLButtonElement>(null);
  const [focusedYear, setFocusedYear] = React.useState<number | null>(currentYear);

  const handleYearSelection = (
    event: React.SyntheticEvent,
    year: number,
    isFinish: PickerSelectionState = 'finish',
  ) => {
    const submitDate = (newDate: TDate) => {
      onChange(newDate, isFinish);

      if (onFocusedDayChange) {
        onFocusedDayChange(newDate || now);
      }

      if (onYearChange) {
        onYearChange(newDate);
      }
    };

    const newDate = utils.setYear(selectedDate, year);
    if (isDateDisabled(newDate)) {
      const closestEnabledDate = findClosestEnabledDate({
        utils,
        date: newDate,
        minDate,
        maxDate,
        disablePast: Boolean(disablePast),
        disableFuture: Boolean(disableFuture),
        shouldDisableDate: isDateDisabled,
      });

      submitDate(closestEnabledDate || now);
    } else {
      submitDate(newDate);
    }
  };

  const focusYear = React.useCallback(
    (year: number) => {
      if (!isDateDisabled(utils.setYear(selectedDate, year))) {
        setFocusedYear(year);
      }
    },
    [selectedDate, isDateDisabled, utils],
  );

  const yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;

  const handleKeyDown = (event: React.KeyboardEvent, year: number) => {
    if (!allowKeyboardControl) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
        focusYear(year - yearsInRow);
        event.preventDefault();
        break;
      case 'ArrowDown':
        focusYear(year + yearsInRow);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        focusYear(year + (theme.direction === 'ltr' ? -1 : 1));
        event.preventDefault();
        break;
      case 'ArrowRight':
        focusYear(year + (theme.direction === 'ltr' ? 1 : -1));
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={ref} className={clsx(classes.root, className)}>
      {utils.getYearRange(minDate, maxDate).map((year) => {
        const yearNumber = utils.getYear(year);
        const selected = yearNumber === currentYear;

        return (
          <PickersYear
            key={utils.format(year, 'year')}
            selected={selected}
            value={yearNumber}
            onClick={handleYearSelection}
            onKeyDown={handleKeyDown}
            autoFocus={allowKeyboardControl && yearNumber === focusedYear}
            ref={selected ? selectedYearRef : undefined}
            disabled={
              (disablePast && utils.isBeforeYear(year, now)) ||
              (disableFuture && utils.isAfterYear(year, now)) ||
              (shouldDisableYear && shouldDisableYear(year))
            }
          >
            {utils.format(year, 'year')}
          </PickersYear>
        );
      })}
    </div>
  );
});

YearPicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  allowKeyboardControl: PropTypes.bool,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  date: PropTypes.any,
  /**
   * @ignore
   */
  disableFuture: PropTypes.bool,
  /**
   * @ignore
   */
  disablePast: PropTypes.bool,
  /**
   * @ignore
   */
  isDateDisabled: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  maxDate: PropTypes.any.isRequired,
  /**
   * @ignore
   */
  minDate: PropTypes.any.isRequired,
  /**
   * @ignore
   */
  onChange: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  onFocusedDayChange: PropTypes.func,
  /**
   * Callback firing on year change @DateIOType.
   */
  onYearChange: PropTypes.func,
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear: PropTypes.func,
} as any;

/**
 *
 * API:
 *
 * - [YearPicker API](https://material-ui.com/api/year-picker/)
 */
export default withStyles(styles, { name: 'MuiYearPicker' })(YearPicker) as <TDate>(
  props: YearPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
