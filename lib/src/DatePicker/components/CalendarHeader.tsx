import { Theme } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { withUtils, WithUtilsProps } from '../../_shared/WithUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import SlideTransition, { SlideDirection } from './SlideTransition';

export interface CalendarHeaderProps extends WithUtilsProps, WithStyles<typeof styles, true> {
  currentMonth: object;
  onMonthChange: (date: MaterialUiPickersDate, direction: SlideDirection) => void;
  leftArrowIcon?: React.ReactNode;
  rightArrowIcon?: React.ReactNode;
  disablePrevMonth?: boolean;
  disableNextMonth?: boolean;
  slideDirection: SlideDirection;
}

export const CalendarHeader: React.SFC<CalendarHeaderProps> = ({
  classes,
  theme,
  currentMonth,
  onMonthChange,
  leftArrowIcon,
  rightArrowIcon,
  disablePrevMonth,
  disableNextMonth,
  utils,
  slideDirection,
}) => {
  const rtl = theme.direction === 'rtl';

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(currentMonth), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(currentMonth), 'right');

  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton
          disabled={disablePrevMonth}
          onClick={selectPreviousMonth}
          className={classes.iconButton}
        >
          <Icon>{rtl ? rightArrowIcon : leftArrowIcon}</Icon>
        </IconButton>

        <SlideTransition
          slideDirection={slideDirection}
          transKey={currentMonth.toString()}
          className={classes.transitionContainer}
        >
          <Typography align="center" variant="body1">
            {utils.getCalendarHeaderText(currentMonth)}
          </Typography>
        </SlideTransition>

        <IconButton
          disabled={disableNextMonth}
          onClick={selectNextMonth}
          className={classes.iconButton}
        >
          <Icon>{rtl ? leftArrowIcon : rightArrowIcon}</Icon>
        </IconButton>
      </div>

      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, index) => (
          <Typography
            key={index} // eslint-disable-line react/no-array-index-key
            variant="caption"
            className={classes.dayLabel}
          >
            {day}
          </Typography>
        ))}
      </div>
    </div>
  );
};

(CalendarHeader as any).propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  disablePrevMonth: PropTypes.bool,
  disableNextMonth: PropTypes.bool,
  utils: PropTypes.object.isRequired,
  slideDirection: PropTypes.oneOf(['right', 'left']).isRequired,
  innerRef: PropTypes.any,
};

CalendarHeader.defaultProps = {
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  disablePrevMonth: false,
  disableNextMonth: false,
};

export const styles = (theme: Theme) =>
  createStyles({
    switchHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.unit / 2,
      marginBottom: theme.spacing.unit,
    },
    transitionContainer: {
      width: '100%',
      height: 20,
    },
    iconButton: {
      zIndex: 2,
      backgroundColor: theme.palette.background.paper,
      '& > *': {
        // label
        backgroundColor: theme.palette.background.paper,
        '& > *': {
          // icon
          zIndex: 1,
          overflow: 'visible',
        },
      },
    },
    daysHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: 16,
    },
    dayLabel: {
      width: 36,
      margin: '0 2px',
      textAlign: 'center',
      color: theme.palette.text.hint,
    },
  });

export default withStyles(styles, {
  withTheme: true,
  name: 'MuiPickersCalendarHeader',
})(withUtils()(CalendarHeader));
