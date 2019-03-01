import React, { PureComponent, useState, useCallback } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/ru';
import MomentUtils from '@date-io/moment';
import MoreIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

moment.locale('fr');

const localeMap = {
  en: 'en',
  fr: 'fr',
  ru: 'ru',
};

function MomentLocalizationExample() {
  const [locale, setLocale] = useState('fr');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMenuOpen = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback(locale => {
    moment.locale(locale);

    setLocale(locale);
    setAnchorEl(null);
  }, []);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={locale} moment={moment}>
      <div className="picker">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="Select locale"
                onClick={handleMenuOpen}
                aria-owns={anchorEl ? 'locale-menu' : null}
              >
                <MoreIcon />
              </IconButton>
            ),
          }}
        />
      </div>

      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(localeMap).map(localeItem => (
          <MenuItem
            key={localeItem}
            selected={localeItem === locale}
            onClick={() => selectLocale(localeItem)}
          >
            {localeItem}
          </MenuItem>
        ))}
      </Menu>
    </MuiPickersUtilsProvider>
  );
}

export default MomentLocalizationExample;
