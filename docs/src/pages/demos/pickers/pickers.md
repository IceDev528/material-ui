---
title: Date Picker, Time Picker React component
components: TextField
---

# Pickers

<p class="description">Pickers provide a simple way to select a single value from a pre-determined set.</p>

- On mobile, pickers are best suited for display in confirmation dialog.
- For inline display, such as on a form, consider using compact controls such as segmented dropdown buttons.

#### Notice

We are currently falling back to **native input controls**.
If you are interested in implementing or have implemented a rich Material Design Picker with an awesome UX, please, let us know on [#4787](https://github.com/mui-org/material-ui/issues/4787) and [#4796](https://github.com/mui-org/material-ui/issues/4796)! We could add a link to or a demo of your project in the documentation.
Here are some components that are **promising**:
- [material-ui-pickers](https://github.com/dmtrKovalenko/material-ui-pickers)
- [material-ui-time-picker](https://github.com/TeamWertarbyte/material-ui-time-picker)

⚠️ Native input controls support by browsers [isn't perfect](https://caniuse.com/#feat=input-datetime).

## Date pickers

{{"demo": "pages/demos/pickers/DatePickers.js"}}

## Time pickers

{{"demo": "pages/demos/pickers/TimePickers.js"}}

## Date & Time pickers

{{"demo": "pages/demos/pickers/DateAndTimePickers.js"}}
