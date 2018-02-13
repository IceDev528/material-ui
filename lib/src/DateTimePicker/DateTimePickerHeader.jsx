import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import defaultUtils from '../utils/utils';
import * as viewType from '../constants/date-picker-view';

export const DateTimePickerHeader = (props) => {
  const {
    date, classes, openView, meridiemMode, onOpenViewChange, setMeridiemMode,
    theme, utils, ampm,
  } = props;

  const changeOpenView = view => () => onOpenViewChange(view);

  const rtl = theme.direction === 'rtl';
  const hourMinuteClassName = rtl
    ? classes.hourMinuteLabelReverse
    : classes.hourMinuteLabel;

  return (
    <PickerToolbar className={classes.toolbar}>
      <div className={classes.dateHeader}>
        <ToolbarButton
          variant="subheading"
          onClick={changeOpenView(viewType.YEAR)}
          selected={openView === viewType.YEAR}
          label={utils.format(date, 'YYYY')}
        />

        <ToolbarButton
          variant="display1"
          onClick={changeOpenView(viewType.DATE)}
          selected={openView === viewType.DATE}
          label={utils.format(date, 'MMM D')}
        />
      </div>

      <div className={classes.timeHeader}>
        <div className={hourMinuteClassName}>
          <ToolbarButton
            variant="display2"
            onClick={changeOpenView(viewType.HOUR)}
            selected={openView === viewType.HOUR}
            label={utils.format(date, ampm ? 'hh' : 'HH')}
          />

          <ToolbarButton
            variant="display2"
            label=":"
            selected={false}
            className={classes.separator}
          />

          <ToolbarButton
            variant="display2"
            onClick={changeOpenView(viewType.MINUTES)}
            selected={openView === viewType.MINUTES}
            label={utils.format(date, 'mm')}
          />
        </div>

        {
          ampm &&
            <div className={classes.ampmSelection}>
              <ToolbarButton
                className={classes.ampmLabel}
                selected={meridiemMode === 'am'}
                type="subheading"
                label={utils.getMeridiemText('am')}
                onClick={setMeridiemMode('am')}
              />
              <ToolbarButton
                className={classes.ampmLabel}
                selected={meridiemMode === 'pm'}
                type="subheading"
                label={utils.getMeridiemText('pm')}
                onClick={setMeridiemMode('pm')}
              />
            </div>
        }
      </div>
    </PickerToolbar>
  );
};

DateTimePickerHeader.propTypes = {
  date: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  meridiemMode: PropTypes.string.isRequired,
  openView: PropTypes.string.isRequired,
  onOpenViewChange: PropTypes.func.isRequired,
  setMeridiemMode: PropTypes.func.isRequired,
  utils: PropTypes.func,
  ampm: PropTypes.bool,
};

DateTimePickerHeader.defaultProps = {
  utils: defaultUtils,
  ampm: true,
};

const styles = () => ({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  separator: {
    margin: '0 4px 0 2px',
    cursor: 'default',
  },
  ampmSelection: {
    marginLeft: 10,
    marginRight: -10,
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
  dateHeader: {
    width: '42%',
    height: 65,
  },
  timeHeader: {
    height: 65,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default withStyles(styles, { withTheme: true })(DateTimePickerHeader);
