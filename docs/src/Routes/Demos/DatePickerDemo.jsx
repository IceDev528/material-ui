import React from 'react'
import SourcablePanel from '_shared/SourcablePanel'
import { Typography } from 'material-ui';

const DatePickerDemoDemo = () => (
  <div>
    <Typography variant="display1" gutterBottom>
      Date picker
    </Typography>
    <Typography variant="body1" gutterBottom>
      Date pickers use a dialog window to select a single date.
    </Typography>
    <Typography variant="body1">
      The selected day is indicated by a filled circle. The current day is indicated by a different color and type weight.
    </Typography>

    <SourcablePanel
      title="Basic usage"
      sourceFile="Demo/BasicDatePicker.jsx"
    />

    <SourcablePanel
      title="Keyboard input"
      sourceFile="Demo/KeyboardDatePicker.jsx"
    />

    <SourcablePanel
      title="Custom day element"
      sourceFile="Demo/CustomElementsDatePicker.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          Customization performing by overriding render method for Day component
        </Typography>
      }
    />
  </div>
)

export default DatePickerDemoDemo