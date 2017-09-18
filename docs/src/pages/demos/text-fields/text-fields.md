---
components: Input, InputLabel, TextField, FormHelperText, FormControl
---

# Text Fields

[Text fields](https://material.google.com/components/text-fields.html) allow users to input text and usually appear in forms.
Users may enter text, numbers, or mixed-format types of input.

## TextField

The `<TextField>` wrapper component is a complete form control including a label, input and help text.

{{demo='pages/demos/text-fields/TextFields.js'}}

## Components

`TextField` is composed of smaller components (`FormControl`, `InputLabel`, `Input`, and `FormHelperText`) that you can leverage directly to significantly customize your form inputs.

You might also have noticed that some native HTML input properties are missing from the `TextField` component.
This is on purpose.
The component takes care of the most used properties, then it's up to the user to use the underlying component shown in the following demo. Still, you can use `inputProps` (and `InputProps`, `InputLabelProps` properties) if you want to avoid some boilerplate.

{{demo='pages/demos/text-fields/ComposedTextField.js'}}

## Layout

`TextField`, `FormControl` allow the specification of `margin` to alter the vertical spacing of inputs. Using
`none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will as well as alter
other styles to meet the specification.

{{demo='pages/demos/text-fields/TextFieldMargins.js'}}

## Inputs

{{demo='pages/demos/text-fields/Inputs.js'}}
