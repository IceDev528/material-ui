import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import arSaLocale from 'date-fns/locale/ar-SA';
import enLocale from 'date-fns/locale/en-US';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import TimePicker from '@material-ui/lab/TimePicker';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
  ar: arSaLocale,
};

export default function LocalizedTimePicker() {
  const [locale, setLocale] = React.useState<keyof typeof localeMap>('ru');
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

  const selectLocale = (newLocale: any) => {
    setLocale(newLocale);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ width: 300 }}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          locale={localeMap[locale]}
        >
          <TimePicker
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <ToggleButtonGroup value={locale} exclusive>
            {Object.keys(localeMap).map((localeItem) => (
              <ToggleButton
                key={localeItem}
                value={localeItem}
                onClick={() => selectLocale(localeItem)}
              >
                {localeItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </LocalizationProvider>
      </div>
    </LocalizationProvider>
  );
}
