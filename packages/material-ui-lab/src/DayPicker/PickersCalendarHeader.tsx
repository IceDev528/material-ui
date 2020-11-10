import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Fade from '@material-ui/core/Fade';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { SlideDirection } from './PickersSlideTransition';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import FadeTransitionGroup from './PickersFadeTransitionGroup';
import { DateValidationProps } from '../internal/pickers/date-utils';
// tslint:disable-next-line no-relative-import-in-test
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import ArrowSwitcher, {
  ExportedArrowSwitcherProps,
} from '../internal/pickers/PickersArrowSwitcher';
import {
  usePreviousMonthDisabled,
  useNextMonthDisabled,
} from '../internal/pickers/hooks/date-helpers-hooks';
import { DatePickerView } from '../internal/pickers/typings/Views';

export type ExportedCalendarHeaderProps<TDate> = Pick<
  PickersCalendarHeaderProps<TDate>,
  | 'leftArrowIcon'
  | 'rightArrowIcon'
  | 'leftArrowButtonProps'
  | 'rightArrowButtonProps'
  | 'leftArrowButtonText'
  | 'rightArrowButtonText'
  | 'getViewSwitchingButtonText'
>;

export interface PickersCalendarHeaderProps<TDate>
  extends ExportedArrowSwitcherProps,
    Omit<DateValidationProps<TDate>, 'shouldDisableDate'> {
  openView: DatePickerView;
  views: DatePickerView[];
  currentMonth: TDate;
  /**
   * Get aria-label text for switching between views button.
   */
  getViewSwitchingButtonText?: (currentView: DatePickerView) => string;
  reduceAnimations: boolean;
  onViewChange?: (view: DatePickerView) => void;
  onMonthChange: (date: TDate, slideDirection: SlideDirection) => void;
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      paddingLeft: 24,
      paddingRight: 12,
      // prevent jumping in safari
      maxHeight: 30,
      minHeight: 30,
    },
    yearSelectionSwitcher: {
      marginRight: 'auto',
    },
    previousMonthButton: {
      marginRight: 24,
    },
    switchViewDropdown: {
      willChange: 'transform',
      transition: theme.transitions.create('transform'),
      transform: 'rotate(0deg)',
    },
    switchViewDropdownDown: {
      transform: 'rotate(180deg)',
    },
    monthTitleContainer: {
      display: 'flex',
      maxHeight: 30,
      overflow: 'hidden',
      cursor: 'pointer',
      marginRight: 'auto',
    },
    monthText: {
      marginRight: 4,
    },
  });

export type PickersCalendarHeaderClassKey = keyof WithStyles<typeof styles>['classes'];

function getSwitchingViewAriaText(view: DatePickerView) {
  return view === 'year'
    ? 'year view is open, switch to calendar view'
    : 'calendar view is open, switch to year view';
}

/**
 * @ignore - do not document.
 */
function PickersCalendarHeader<TDate>(
  props: PickersCalendarHeaderProps<TDate> & WithStyles<typeof styles>,
) {
  const {
    onViewChange,
    classes,
    currentMonth: month,
    disableFuture,
    disablePast,
    getViewSwitchingButtonText = getSwitchingViewAriaText,
    leftArrowButtonProps,
    leftArrowButtonText = 'previous month',
    leftArrowIcon,
    maxDate,
    minDate,
    onMonthChange,
    reduceAnimations,
    rightArrowButtonProps,
    rightArrowButtonText = 'next month',
    rightArrowIcon,
    openView: currentView,
    views,
  } = props;

  const utils = useUtils<TDate>();

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isNextMonthDisabled = useNextMonthDisabled(month, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(month, { disablePast, minDate });

  const toggleView = () => {
    if (views.length === 1 || !onViewChange) {
      return;
    }

    if (views.length === 2) {
      onViewChange(views.find((view) => view !== currentView) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div role="presentation" className={classes.monthTitleContainer} onClick={toggleView}>
          <FadeTransitionGroup
            reduceAnimations={reduceAnimations}
            transKey={utils.format(month, 'month')}
          >
            <Typography
              aria-live="polite"
              data-mui-test="calendar-month-text"
              align="center"
              variant="subtitle1"
              className={classes.monthText}
            >
              {utils.format(month, 'month')}
            </Typography>
          </FadeTransitionGroup>
          <FadeTransitionGroup
            reduceAnimations={reduceAnimations}
            transKey={utils.format(month, 'year')}
          >
            <Typography
              aria-live="polite"
              data-mui-test="calendar-year-text"
              align="center"
              variant="subtitle1"
            >
              {utils.format(month, 'year')}
            </Typography>
          </FadeTransitionGroup>
          {views.length > 1 && (
            <IconButton
              size="small"
              data-mui-test="calendar-view-switcher"
              onClick={toggleView}
              className={classes.yearSelectionSwitcher}
              aria-label={getViewSwitchingButtonText(currentView)}
            >
              <ArrowDropDownIcon
                className={clsx(classes.switchViewDropdown, {
                  [classes.switchViewDropdownDown]: currentView === 'year',
                })}
              />
            </IconButton>
          )}
        </div>
        <Fade in={currentView === 'date'}>
          <ArrowSwitcher
            leftArrowButtonProps={leftArrowButtonProps}
            rightArrowButtonProps={rightArrowButtonProps}
            leftArrowButtonText={leftArrowButtonText}
            rightArrowButtonText={rightArrowButtonText}
            leftArrowIcon={leftArrowIcon}
            rightArrowIcon={rightArrowIcon}
            onLeftClick={selectPreviousMonth}
            onRightClick={selectNextMonth}
            isLeftDisabled={isPreviousMonthDisabled}
            isRightDisabled={isNextMonthDisabled}
          />
        </Fade>
      </div>
    </React.Fragment>
  );
}

PickersCalendarHeader.propTypes = {
  leftArrowButtonText: PropTypes.string,
  leftArrowIcon: PropTypes.node,
  rightArrowButtonText: PropTypes.string,
  rightArrowIcon: PropTypes.node,
};

export default withStyles(styles, { name: 'MuiPickersCalendarHeader' })(PickersCalendarHeader) as <
  TDate
>(
  props: PickersCalendarHeaderProps<TDate>,
) => JSX.Element;
