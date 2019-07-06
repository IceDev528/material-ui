import * as React from 'react';
import Year from './Year';
import { DateType } from '@date-io/type';
import { makeStyles } from '@material-ui/core/styles';
import { useUtils } from '../../_shared/hooks/useUtils';
import { VariantContext } from '../../wrappers/Wrapper';
import { MaterialUiPickersDate } from '../../typings/date';

export interface YearSelectionProps {
  date: MaterialUiPickersDate;
  minDate: DateType;
  maxDate: DateType;
  onChange: (date: MaterialUiPickersDate, isFinish: boolean) => void;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
  animateYearScrolling?: boolean | null | undefined;
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export const useStyles = makeStyles(
  {
    container: {
      height: 300,
      overflowY: 'auto',
    },
  },
  { name: 'MuiPickersYearSelection' }
);

export const YearSelection: React.FC<YearSelectionProps> = ({
  date,
  onChange,
  onYearChange,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  animateYearScrolling,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const currentVariant = React.useContext(VariantContext);
  const selectedYearRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (selectedYearRef.current && selectedYearRef.current.scrollIntoView) {
      selectedYearRef.current.scrollIntoView({
        block: currentVariant === 'static' ? 'nearest' : 'center',
        behavior: animateYearScrolling ? 'smooth' : 'auto',
      });
    }
  }, []); // eslint-disable-line

  const currentYear = utils.getYear(date);
  const onYearSelect = React.useCallback(
    (year: number) => {
      const newDate = utils.setYear(date, year);
      if (onYearChange) {
        onYearChange(newDate);
      }

      onChange(newDate, true);
    },
    [date, onChange, onYearChange, utils]
  );

  return (
    <div className={classes.container}>
      {utils.getYearRange(minDate, maxDate).map(year => {
        const yearNumber = utils.getYear(year);
        const selected = yearNumber === currentYear;

        return (
          <Year
            key={utils.getYearText(year)}
            selected={selected}
            value={yearNumber}
            onSelect={onYearSelect}
            ref={selected ? selectedYearRef : undefined}
            disabled={Boolean(
              (disablePast && utils.isBeforeYear(year, utils.date())) ||
                (disableFuture && utils.isAfterYear(year, utils.date()))
            )}
          >
            {utils.getYearText(year)}
          </Year>
        );
      })}
    </div>
  );
};
