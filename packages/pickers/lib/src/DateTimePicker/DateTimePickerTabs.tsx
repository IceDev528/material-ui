import * as React from 'react';
import clsx from 'clsx';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TimeIcon } from '../_shared/icons/Time';
import { DateTimePickerView } from './DateTimePicker';
import { DateRangeIcon } from '../_shared/icons/DateRange';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';

const viewToTabIndex = (openView: DateTimePickerView) => {
  if (openView === 'date' || openView === 'year') {
    return 'date';
  }

  return 'time';
};

const tabIndexToView = (tab: DateTimePickerView) => {
  if (tab === 'date') {
    return 'date';
  }

  return 'hours';
};

export interface DateTimePickerTabsProps {
  dateRangeIcon?: React.ReactNode;
  onChange: (view: DateTimePickerView) => void;
  timeIcon?: React.ReactNode;
  view: DateTimePickerView;
}

export const useStyles = makeStyles(
  (theme) => {
    const tabsBackground =
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.background.default;

    return {
      root: {},
      modeDesktop: {
        order: 1,
      },
      tabs: {
        color: theme.palette.getContrastText(tabsBackground),
        backgroundColor: tabsBackground,
      },
    };
  },
  { name: 'MuiDateTimePickerTabs' }
);

const DateTimePickerTabs: React.FC<DateTimePickerTabsProps> = (props) => {
  const { dateRangeIcon = <DateRangeIcon />, onChange, timeIcon = <TimeIcon />, view } = props;
  const classes = useStyles();
  const theme = useTheme();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';

  const handleChange = (e: React.ChangeEvent<{}>, value: DateTimePickerView) => {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return (
    <Paper className={clsx(classes.root, { [classes.modeDesktop]: wrapperVariant === 'desktop' })}>
      <Tabs
        variant="fullWidth"
        value={viewToTabIndex(view)}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor={indicatorColor}
      >
        <Tab
          value="date"
          aria-label="pick date"
          icon={<React.Fragment>{dateRangeIcon}</React.Fragment>}
        />
        <Tab
          value="time"
          aria-label="pick time"
          icon={<React.Fragment>{timeIcon}</React.Fragment>}
        />
      </Tabs>
    </Paper>
  );
};

export default DateTimePickerTabs;
