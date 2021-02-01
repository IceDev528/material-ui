import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { MuiStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import PickersToolbar from '../internal/pickers/PickersToolbar';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import PickersToolbarButton from '../internal/pickers/PickersToolbarButton';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { DateRange, CurrentlySelectingRangeEndProps } from './RangeTypes';

export const styles: MuiStyles<'root' | 'penIcon' | 'dateTextContainer'> = {
  root: {},
  penIcon: {
    position: 'relative',
    top: 4,
  },
  dateTextContainer: {
    display: 'flex',
  },
};

interface DateRangePickerToolbarProps
  extends CurrentlySelectingRangeEndProps,
    Pick<
      ToolbarComponentProps,
      'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView' | 'toolbarTitle' | 'toolbarFormat'
    > {
  date: DateRange<unknown>;
  startText: React.ReactNode;
  endText: React.ReactNode;
  currentlySelectingRangeEnd: 'start' | 'end';
  setCurrentlySelectingRangeEnd: (newSelectingEnd: 'start' | 'end') => void;
}

/**
 * @ignore - internal component.
 */
const DateRangePickerToolbar: React.FC<DateRangePickerToolbarProps & WithStyles<typeof styles>> = ({
  classes,
  currentlySelectingRangeEnd,
  date: [start, end],
  endText,
  isMobileKeyboardViewOpen,
  setCurrentlySelectingRangeEnd,
  startText,
  toggleMobileKeyboardView,
  toolbarFormat,
  toolbarTitle = 'SELECT DATE RANGE',
}) => {
  const utils = useUtils();

  const startDateValue = start
    ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate)
    : startText;

  const endDateValue = end
    ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate)
    : endText;

  return (
    <PickersToolbar
      className={classes.root}
      toolbarTitle={toolbarTitle}
      isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
      toggleMobileKeyboardView={toggleMobileKeyboardView}
      isLandscape={false}
      penIconClassName={classes.penIcon}
    >
      <div className={classes.dateTextContainer}>
        <PickersToolbarButton
          variant={start !== null ? 'h5' : 'h6'}
          value={startDateValue}
          selected={currentlySelectingRangeEnd === 'start'}
          onClick={() => setCurrentlySelectingRangeEnd('start')}
        />
        <Typography variant="h5">&nbsp;{'–'}&nbsp;</Typography>
        <PickersToolbarButton
          variant={end !== null ? 'h5' : 'h6'}
          value={endDateValue}
          selected={currentlySelectingRangeEnd === 'end'}
          onClick={() => setCurrentlySelectingRangeEnd('end')}
        />
      </div>
    </PickersToolbar>
  );
};

export default withStyles(styles, { name: 'MuiDateRangePickerToolbar' })(DateRangePickerToolbar);
