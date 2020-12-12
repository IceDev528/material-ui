---
title: React Date Time Picker component
components: DateTimePicker
githubLabel: 'component: DateTimePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Time Picker

<p class="description">Combined date & time picker.</p>

This component combines the date & time pickers. It allows the user to select both date and time with the same control.

Note that this component is the [DatePicker](/components/date-picker/) and [TimePicker](/components/time-picker/) component combined, so any of these components' props can be passed to the DateTimePicker.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

```jsx
// or @material-ui/lab/Adapter{Dayjs,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Basic usage

Allows choosing date then time. There are 4 steps available (year, date, hour and minute), so tabs are required to visually distinguish date/time steps.

{{"demo": "pages/components/date-time-picker/BasicDateTimePicker.js"}}

## Responsiveness

The `DateTimePicker` component is designed and optimized for the device it runs on.

- The "Mobile" version works best for touch devices and small screens.
- The "Desktop" version works best for mouse devices and large screens.

By default, the `DateTimePicker` component uses a `@media (pointer: fine)` media query to determine which version to use. This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/date-time-picker/ResponsiveDateTimePickers.js"}}

## Date and time validation

It is possible to restrict date and time selection in two ways:

- by using `minDateTime`/`maxDateTime` its possible to restrict time selection to before or after a particular moment in time
- using `minTime`/`maxTime`, you can disable selecting times before or after a certain time each day respectively

{{"demo": "pages/components/date-time-picker/DateTimeValidation.js"}}

## カスタマイズ

Here are some examples of heavily customized date & time pickers:

{{"demo": "pages/components/date-time-picker/CustomDateTimePicker.js"}}
