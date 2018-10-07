import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import { convertToMeridiem } from '../_helpers/time-utils';
import withUtils, { WithUtilsProps } from '../_shared/WithUtils';
import TimePickerView from './components/TimePickerView';
import { MaterialUiPickersDate } from '../typings/date';
import ClockType from '../constants/ClockType'
import { createStyles, WithStyles } from '@material-ui/core';
import { MeridiemMode } from '../DateTimePicker/components/DateTimePickerHeader';

export interface BaseTimePickerProps {
  ampm?: boolean;
  seconds?: boolean;
}

export interface TimePickerProps extends BaseTimePickerProps, WithUtilsProps, WithStyles<typeof styles, true> {
  date: MaterialUiPickersDate;
  onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
}

interface TimePickerState {
  openView: ClockType;
  meridiemMode: MeridiemMode;
}

export class TimePicker extends React.Component<TimePickerProps> {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
    seconds: PropTypes.bool,
    innerRef: PropTypes.any
  }

  static defaultProps = {
    children: null,
    ampm: true,
    seconds: false,
  }

  state: TimePickerState = {
    openView: ClockType.HOURS,
    meridiemMode: this.props.utils.getHours(this.props.date) >= 12 ? 'pm' : 'am',
  }

  setMeridiemMode = (mode: MeridiemMode) => () => {
    this.setState(
      { meridiemMode: mode },
      () => this.handleChange({
        time: this.props.date,
        isFinish: false,
        openMinutes: false,
        openSeconds: false,
      }),
    );
  }

  handleChange = ({
    time, isFinish, openMinutes, openSeconds,
  }: {
    time: MaterialUiPickersDate, isFinish?: boolean, openMinutes: boolean, openSeconds: boolean
  }) => {
    const withMeridiem = convertToMeridiem(
      time,
      this.state.meridiemMode,
      Boolean(this.props.ampm),
      this.props.utils,
    );

    if (isFinish) {
      if (!openMinutes && !openSeconds) {
        this.props.onChange(withMeridiem, isFinish);
        return;
      }

      if (openMinutes) {
        this.openMinutesView();
      }

      if (openSeconds) {
        this.openSecondsView();
      }
    }

    this.props.onChange(withMeridiem, false);
  }

  handleHourChange = (time: MaterialUiPickersDate, isFinish?: boolean) => {
    this.handleChange({
      time,
      isFinish,
      openMinutes: true,
      openSeconds: false,
    });
  }

  handleMinutesChange = (time: MaterialUiPickersDate, isFinish?: boolean) => {
    this.handleChange({
      time,
      isFinish,
      openMinutes: false,
      openSeconds: Boolean(this.props.seconds),
    });
  }

  handleSecondsChange = (time: MaterialUiPickersDate, isFinish?: boolean) => {
    this.handleChange({
      time,
      isFinish,
      openMinutes: false,
      openSeconds: false,
    });
  }

  openSecondsView = () => {
    this.setState({ openView: ClockType.SECONDS });
  }

  openMinutesView = () => {
    this.setState({ openView: ClockType.MINUTES });
  }

  openHourView = () => {
    this.setState({ openView: ClockType.HOURS });
  }

  render() {
    const {
      classes, theme, date, utils, ampm, seconds,
    } = this.props;

    const { meridiemMode, openView } = this.state;

    const rtl = theme.direction === 'rtl';
    const hourMinuteClassName = rtl
      ? classes.hourMinuteLabelReverse
      : classes.hourMinuteLabel;

    return (
      <React.Fragment>
        <PickerToolbar
          className={classnames(
            classes.toolbar,
            { [classes.toolbarLeftPadding]: ampm },
          )}
        >
          <div className={hourMinuteClassName}>
            <ToolbarButton
              variant="display3"
              onClick={this.openHourView}
              selected={openView === ClockType.HOURS}
              label={utils.getHourText(date, Boolean(ampm))}
            />

            <ToolbarButton
              variant="display3"
              label=":"
              selected={false}
              className={classes.separator}
            />

            <ToolbarButton
              variant="display3"
              onClick={this.openMinutesView}
              selected={openView === ClockType.MINUTES}
              label={utils.getMinuteText(date)}
            />

            {
              seconds
                && (
                <React.Fragment>
                  <ToolbarButton
                    variant="display3"
                    label=":"
                    selected={false}
                    className={classes.separator}
                  />

                  <ToolbarButton
                    variant="display3"
                    onClick={this.openSecondsView}
                    selected={openView === ClockType.SECONDS}
                    label={utils.getSecondText(date)}
                  />
                </React.Fragment>
                )
            }
          </div>

          {
            ampm
              && (
              <div className={seconds ? classes.ampmSelectionWithSeconds : classes.ampmSelection}>
                <ToolbarButton
                  className={classes.ampmLabel}
                  selected={meridiemMode === 'am'}
                  variant="subheading"
                  label={utils.getMeridiemText('am')}
                  onClick={this.setMeridiemMode('am')}
                />

                <ToolbarButton
                  className={classes.ampmLabel}
                  selected={meridiemMode === 'pm'}
                  variant="subheading"
                  label={utils.getMeridiemText('pm')}
                  onClick={this.setMeridiemMode('pm')}
                />
              </div>
            )
          }
        </PickerToolbar>

        {this.props.children}

        <TimePickerView
          date={date}
          type={this.state.openView}
          ampm={ampm}
          onHourChange={this.handleHourChange}
          onMinutesChange={this.handleMinutesChange}
          onSecondsChange={this.handleSecondsChange}
        />
      </React.Fragment>
    );
  }
}

const styles = () => createStyles({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarLeftPadding: {
    paddingLeft: 50,
  },
  separator: {
    margin: '0 4px 0 2px',
    cursor: 'default',
  },
  ampmSelection: {
    marginLeft: 20,
    marginRight: -20,
  },
  ampmSelectionWithSeconds: {
    marginLeft: 15,
    marginRight: 10,
  },
  ampmLabel: {
    fontSize: 18,
  },
  hourMinuteLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  hourMinuteLabelReverse: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
});

export default withStyles(styles, {
  withTheme: true,
  name: 'MuiPickersTimePicker'
})(withUtils()(TimePicker as React.ComponentType<TimePickerProps>));
