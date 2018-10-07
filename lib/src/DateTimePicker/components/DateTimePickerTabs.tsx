import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withTheme from '@material-ui/core/styles/withTheme';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import DateTimePickerView from '../../constants/DateTimePickerView';

const viewToTabIndex = (openView: DateTimePickerView) => {
  if (openView === DateTimePickerView.DATE || openView === DateTimePickerView.YEAR) {
    return 'date';
  }

  return 'time';
};

const tabIndexToView = (tab: DateTimePickerView) => {
  if (tab === 'date') {
    return DateTimePickerView.DATE;
  }

  return DateTimePickerView.HOUR;
};

export interface DateTimePickerTabsProps extends WithStyles<typeof styles, true> {
  view: DateTimePickerView;
  onChange: (view: DateTimePickerView) => void;
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
}

export const DateTimePickerTabs: React.SFC<DateTimePickerTabsProps> = (props) => {
  const {
    view,
    onChange,
    classes,
    theme,
    dateRangeIcon,
    timeIcon,
  } = props;

  const indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
  const handleChange = (e, value: DateTimePickerView) => {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return (
    <Paper>
      <Tabs
        fullWidth
        value={viewToTabIndex(view)}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor={indicatorColor}
      >
        <Tab value="date" icon={<Icon>{dateRangeIcon}</Icon>} />
        <Tab value="time" icon={<Icon>{timeIcon}</Icon>} />
      </Tabs>
    </Paper>
  );
};

(DateTimePickerTabs as any).propTypes = {
  view: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  dateRangeIcon: PropTypes.node.isRequired,
  timeIcon: PropTypes.node.isRequired,
};

const styles = theme => ({
  tabs: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.type === 'light'
      ? theme.palette.primary.main
      : theme.palette.background.default,
  },
});

export default withTheme()(withStyles(styles, { name: 'MuiPickerDTTabs' })(DateTimePickerTabs));
