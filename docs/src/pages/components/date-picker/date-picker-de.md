---
title: React Date Picker component
components: DatePicker, PickersDay
githubLabel: 'component: DatePicker'
packageName: '@material-ui/lab'
materialDesign: https://material.io/components/date-pickers
---

# Date Picker

<p class="description">Date pickers let the user select a date.</p>

Date pickers let the user select a date. Date pickers are displayed with:

- Dialogs on mobile
- Text field dropdowns on desktop

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Requirements

This component relies on the date management library of your choice. It supports [date-fns](https://date-fns.org/), [luxon](https://moment.github.io/luxon/), [dayjs](https://github.com/iamkun/dayjs), [moment](https://momentjs.com/) and any other library via a public `dateAdapter` interface.

Please install any of these libraries and set up the right date engine by wrapping your root (or the highest level you wish the pickers to be available) with `LocalizationProvider`:

```jsx
// or @material-ui/lab/Adapter{DayJS,Luxon,Moment} or any valid date-io adapter
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>...</LocalizationProvider>
  );
}
```

## Basic usage

The date picker will be rendered as a modal dialog on mobile, and a textfield with a popover on desktop.

{{"demo": "pages/components/date-picker/BasicDatePicker.js"}}

## Responsiveness

The date picker component is designed and optimized for the device it runs on.

- The "Mobile" version works best for touch devices and small screens.
- The "Desktop" version works best for mouse devices and large screens.

By default, the `DatePicker` component uses a `@media (pointer: fine)` media query to determine which version to use. This can be customized with the `desktopModeMediaQuery` prop.

{{"demo": "pages/components/date-picker/ResponsiveDatePickers.js"}}

## Lokalisierung

Use `LocalizationProvider` to change the date-engine locale that is used to render the date picker. Here is an example of changing the locale for the `date-fns` adapter:

{{"demo": "pages/components/date-picker/LocalizedDatePicker.js"}}

## Views playground

It's possible to combine `year`, `month`, and `date` selection views. Views will appear in the order they're included in the `views` array.

{{"demo": "pages/components/date-picker/ViewsDatePicker.js"}}

## Static mode

It's possible to render any picker without the modal/popover and text field. This can be helpful when building custom popover/modal containers.

{{"demo": "pages/components/date-picker/StaticDatePickerDemo.js", "bg": true}}

## Landscape orientation

For ease of use the date picker will automatically change the layout between portrait and landscape by subscription to the `window.orientation` change. You can force a specific layout using the `orientation` prop.

{{"demo": "pages/components/date-picker/StaticDatePickerLandscape.js", "bg": true}}

## Sub-components

Some lower level sub-components (`DayPicker`, `MonthPicker` and `YearPicker`) are also exported. These are rendered without a wrapper or outer logic (masked input, date values parsing and validation, etc.).

{{"demo": "pages/components/date-picker/InternalPickers.js"}}

## Custom input component

You can customize rendering of the input with the `renderInput` prop. Make sure to spread `ref` and `inputProps` correctly to the custom input component.

{{"demo": "pages/components/date-picker/CustomInput.js"}}

## Customized day rendering

The displayed days are customizable with the `renderDay` function prop. You can take advantage of the internal [PickersDay](/api/pickers-day) component.

{{"demo": "pages/components/date-picker/CustomDay.js"}}

## Dynamic data

Sometimes it may be necessary to display additional info right in the calendar. Here's an example of prefetching and displaying server-side data using the `onMonthChange`, `loading`, and `renderDay` props.

{{"demo": "pages/components/date-picker/ServerRequestDatePicker.js"}}
