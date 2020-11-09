import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToolbarText from '../_shared/ToolbarText';
import PickerToolbar from '../_shared/PickerToolbar';
import { ToolbarButton } from '../_shared/ToolbarButton';
import DateTimePickerTabs from './DateTimePickerTabs';
import { useUtils } from '../_shared/hooks/useUtils';
import { DateTimePickerView } from './DateTimePicker';
import { withDefaultProps } from '../_shared/withDefaultProps';
import { ToolbarComponentProps } from '../Picker/SharedPickerProps';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';

const muiComponentConfig = { name: 'MuiDateTimePickerToolbar' };

export const useStyles = makeStyles(
  {
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
  },
  muiComponentConfig
);

export const DateTimePickerToolbar: React.FC<ToolbarComponentProps> = withDefaultProps(
  muiComponentConfig,
  (props) => {
    const {
      ampm,
      date,
      dateRangeIcon,
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
    const classes = useStyles();
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
  }
);
