import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { createStyles, WithStyles, withStyles, Theme, alpha } from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core';
import { ExtendMui } from '../internal/pickers/typings/helpers';
import { onSpaceOrEnter } from '../internal/pickers/utils';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { useCanAutoFocus } from '../internal/pickers/hooks/useCanAutoFocus';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...theme.typography.caption,
      width: DAY_SIZE,
      height: DAY_SIZE,
      borderRadius: '50%',
      padding: 0,
      // background required here to prevent collides with the other days when animating with transition group
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
      },
      '&:focus': {
        backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
        '&$selected': {
          willChange: 'background-color',
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '&$selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          willChange: 'background-color',
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '&$disabled': {
        color: theme.palette.text.secondary,
      },
    },
    dayWithMargin: {
      margin: `0 ${DAY_MARGIN}px`,
    },
    dayOutsideMonth: {
      color: theme.palette.text.secondary,
    },
    hiddenDaySpacingFiller: {
      visibility: 'hidden',
    },
    today: {
      '&:not($selected)': {
        border: `1px solid ${theme.palette.text.secondary}`,
      },
    },
    dayLabel: {
      // need for overrides
    },
    selected: {},
    disabled: {},
  });

export type PickersDayClassKey = keyof WithStyles<typeof styles>['classes'];

export interface PickersDayProps<TDate> extends ExtendMui<ButtonBaseProps> {
  /**
   * The date to show.
   */
  day: TDate;
  /**
   * If `true`, the day element will be focused during the first mount.
   */
  focused?: boolean;
  /**
   * If `true`, allows to focus by tabbing.
   */
  focusable?: boolean;
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: boolean;
  /**
   * If `true`, renders as today date.
   */
  today?: boolean;
  /**
   * If `true`, renders as disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, renders as selected.
   */
  selected?: boolean;
  /**
   * If `true`, keyboard control and focus management is enabled.
   */
  allowKeyboardControl?: boolean;
  /**
   * If `true`, days are rendering without margin. Useful for displaying linked range of days.
   */
  disableMargin?: boolean;
  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth?: boolean;
  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday?: boolean;
  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection?: boolean;
  isAnimating?: boolean;
  onDayFocus?: (day: TDate) => void;
  onDaySelect: (day: TDate, isFinish: PickerSelectionState) => void;
}

/**
 * @ignore - do not document.
 */
const PickersDay = React.forwardRef(function PickersDay<TDate>(
  props: PickersDayProps<TDate> & WithStyles<typeof styles>,
  forwardedRef: React.Ref<HTMLButtonElement>,
) {
  const {
    allowKeyboardControl,
    allowSameDateSelection = false,
    classes,
    className,
    day,
    disabled = false,
    disableHighlightToday = false,
    disableMargin = false,
    focusable = false,
    focused = false,
    hidden,
    isAnimating,
    onClick,
    onDayFocus,
    onDaySelect,
    onFocus,
    onKeyDown,
    outsideCurrentMonth,
    selected = false,
    showDaysOutsideCurrentMonth = false,
    today: isToday = false,
    ...other
  } = props;

  const utils = useUtils();
  const canAutoFocus = useCanAutoFocus();
  const ref = React.useRef<HTMLButtonElement>(null);
  const handleRef = useForkRef(ref, forwardedRef);

  React.useEffect(() => {
    if (
      focused &&
      !disabled &&
      !isAnimating &&
      !outsideCurrentMonth &&
      ref.current &&
      allowKeyboardControl &&
      canAutoFocus
    ) {
      ref.current.focus();
    }
  }, [allowKeyboardControl, canAutoFocus, disabled, focused, isAnimating, outsideCurrentMonth]);

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (!focused && onDayFocus) {
      onDayFocus(day);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!allowSameDateSelection && selected) return;

    if (!disabled) {
      onDaySelect(day, 'finish');
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = onSpaceOrEnter(() => {
    if (!disabled) {
      onDaySelect(day, 'finish');
    }
  }, onKeyDown);

  const dayClassName = clsx(
    classes.root,
    {
      [classes.selected]: selected,
      [classes.dayWithMargin]: !disableMargin,
      [classes.today]: !disableHighlightToday && isToday,
      [classes.dayOutsideMonth]: outsideCurrentMonth && showDaysOutsideCurrentMonth,
    },
    className,
  );

  if (outsideCurrentMonth && !showDaysOutsideCurrentMonth) {
    return <div aria-hidden className={clsx(dayClassName, classes.hiddenDaySpacingFiller)} />;
  }

  return (
    <ButtonBase
      ref={handleRef}
      centerRipple
      data-mui-test="day"
      disabled={disabled}
      aria-label={utils.format(day, 'fullDate')}
      tabIndex={focused || focusable ? 0 : -1}
      className={dayClassName}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...other}
    >
      <span className={classes.dayLabel}>{utils.format(day, 'dayOfMonth')}</span>
    </ButtonBase>
  );
});

export const areDayPropsEqual = (
  prevProps: PickersDayProps<any>,
  nextProps: PickersDayProps<any>,
) => {
  return (
    prevProps.focused === nextProps.focused &&
    prevProps.focusable === nextProps.focusable &&
    prevProps.isAnimating === nextProps.isAnimating &&
    prevProps.today === nextProps.today &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.selected === nextProps.selected &&
    prevProps.allowKeyboardControl === nextProps.allowKeyboardControl &&
    prevProps.disableMargin === nextProps.disableMargin &&
    prevProps.showDaysOutsideCurrentMonth === nextProps.showDaysOutsideCurrentMonth &&
    prevProps.disableHighlightToday === nextProps.disableHighlightToday &&
    prevProps.className === nextProps.className &&
    prevProps.outsideCurrentMonth === nextProps.outsideCurrentMonth &&
    prevProps.onDayFocus === nextProps.onDayFocus &&
    prevProps.onDaySelect === nextProps.onDaySelect
  );
};

(PickersDay as any).propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, keyboard control and focus management is enabled.
   */
  allowKeyboardControl: PropTypes.bool,
  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The date to show.
   */
  day: PropTypes.any.isRequired,
  /**
   * If `true`, renders as disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * If `true`, days are rendering without margin. Useful for displaying linked range of days.
   */
  disableMargin: PropTypes.bool,
  /**
   * If `true`, allows to focus by tabbing.
   */
  focusable: PropTypes.bool,
  /**
   * If `true`, the day element will be focused during the first mount.
   */
  focused: PropTypes.bool,
  /**
   * @ignore
   */
  hidden: PropTypes.bool,
  /**
   * @ignore
   */
  isAnimating: PropTypes.bool,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onDayFocus: PropTypes.func,
  /**
   * @ignore
   */
  onDaySelect: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,
  /**
   * If `true`, renders as selected.
   */
  selected: PropTypes.bool,
  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,
  /**
   * If `true`, renders as today date.
   */
  today: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiPickersDay' })(
  React.memo(PickersDay, areDayPropsEqual),
) as <TDate>(props: PickersDayProps<TDate> & React.RefAttributes<HTMLButtonElement>) => JSX.Element;
