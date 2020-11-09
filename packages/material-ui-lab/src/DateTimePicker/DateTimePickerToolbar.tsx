import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import ToolbarText from '../internal/pickers/PickersToolbarText';
import PickerToolbar from '../internal/pickers/PickersToolbar';
import ToolbarButton from '../internal/pickers/PickersToolbarButton';
import DateTimePickerTabs from './DateTimePickerTabs';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { DateTimePickerView } from '../internal/pickers/typings/Views';

export const styles = createStyles({
  root: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-around',
  },
  separator: {
    margin: '0 4px 0 2px',
    cursor: 'default',
  },
  timeContainer: {
    display: 'flex',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  timeTypography: {},
  penIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export type DateTimePickerToolbarClassKey = keyof WithStyles<typeof styles>['classes'];

/**
 * @ignore - internal component.
 */
const DateTimePickerToolbar: React.FC<ToolbarComponentProps & WithStyles<typeof styles>> = (
  props,
) => {
  const {
    ampm,
    date,
    dateRangeIcon,
    classes,
    hideTabs,
    isMobileKeyboardViewOpen,
    onChange,
    openView,
    setOpenView,
    timeIcon,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle = 'SELECT DATE & TIME',
    ...other
  } = props;
  const utils = useUtils();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const showTabs =
    wrapperVariant === 'desktop'
      ? true
      : !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  const formatHours = (time: unknown) =>
    ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');

  const dateText = React.useMemo(() => {
    if (!date) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(date, toolbarFormat);
    }

    return utils.format(date, 'shortDate');
  }, [date, toolbarFormat, toolbarPlaceholder, utils]);

  return (
    <React.Fragment>
      {wrapperVariant !== 'desktop' && (
        <PickerToolbar
          toolbarTitle={toolbarTitle}
          penIconClassName={classes.penIcon}
          className={classes.root}
          isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
          toggleMobileKeyboardView={toggleMobileKeyboardView}
          {...other}
          isLandscape={false}
        >
          <div className={classes.dateContainer}>
            <ToolbarButton
              tabIndex={-1}
              variant="subtitle1"
              data-mui-test="datetimepicker-toolbar-year"
              onClick={() => setOpenView('year')}
              selected={openView === 'year'}
              value={date ? utils.format(date, 'year') : '–'}
            />
            <ToolbarButton
              tabIndex={-1}
              variant="h4"
              data-mui-test="datetimepicker-toolbar-date"
              onClick={() => setOpenView('date')}
              selected={openView === 'date'}
              value={dateText}
            />
          </div>
          <div className={classes.timeContainer}>
            <ToolbarButton
              tabIndex={-1}
              variant="h3"
              data-mui-test="hours"
              onClick={() => setOpenView('hours')}
              selected={openView === 'hours'}
              value={date ? formatHours(date) : '--'}
              typographyClassName={classes.timeTypography}
            />
            <ToolbarText variant="h3" value=":" className={classes.separator} />
            <ToolbarButton
              tabIndex={-1}
              variant="h3"
              data-mui-test="minutes"
              onClick={() => setOpenView('minutes')}
              selected={openView === 'minutes'}
              value={date ? utils.format(date, 'minutes') : '--'}
              typographyClassName={classes.timeTypography}
            />
          </div>
        </PickerToolbar>
      )}
      {showTabs && (
        <DateTimePickerTabs
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          view={openView as DateTimePickerView}
          onChange={setOpenView}
        />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles, { name: 'MuiDateTimePickerToolbar' })(DateTimePickerToolbar);
