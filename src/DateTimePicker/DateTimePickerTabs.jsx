import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Tab, Tabs, Icon, withStyles, withTheme } from 'material-ui';
import * as viewType from '../constants/date-picker-view';

const viewToTabIndex = (openView) => {
  if (openView === viewType.DATE || openView === viewType.YEAR) {
    return 'date';
  }

  return 'time';
};

const tabIndexToView = (tab) => {
  if (tab === 'date') {
    return viewType.DATE;
  }

  return viewType.HOUR;
};

export const DateTimePickerTabs = (props) => {
  const {
    view, onChange, classes, theme,
  } = props;

  const indicatorColor = theme.palette.type === 'light' ? 'accent' : 'primary';
  const handleChange = (e, value) => {
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
        <Tab value="date" icon={<Icon> date_range </Icon>} />
        <Tab value="time" icon={<Icon> access_time </Icon>} />
      </Tabs>
    </Paper>
  );
};

DateTimePickerTabs.propTypes = {
  view: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const styles = theme => ({
  tabs: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.type === 'light'
      ? theme.palette.primary[500]
      : theme.palette.background.default,
  },
});

export default withTheme()(withStyles(styles, { name: 'MuiPickerDTTabs' })(DateTimePickerTabs));
