<!--- This documentation is automatically generated, do not try to edit it. -->

# FormControl

Provides context such as dirty/focused/error/required for form inputs.
Relying on the context provides high flexibilty and ensures that the state always stay
consitent across the children of the `FormControl`.
This context is used by the following components:
 - FormLabel
 - FormHelperText
 - Input
 - InputLabel

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | $ReadOnlyArray |  | The contents of the form control. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;ComponentType<*><br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| disabled | boolean | false | If `true`, the label, input and helper text should be displayed in a disabled state. |
| error | boolean | false | If `true`, the label should be displayed in an error state. |
| fullWidth | boolean | false | If `true`, the label will take up the full width of its container. |
| margin | union:&nbsp;'none'<br>&nbsp;'dense'<br>&nbsp;'normal'<br> | 'none' | If `dense` or `normal`, will adjust vertical spacing of this and contained components. |
| required | boolean | false | If `true`, the label will indicate that the input is required. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `marginNormal`
- `marginDense`
- `fullWidth`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormControl`.

## Demos

- [Selection Controls](/demos/selection-controls)
- [Text Fields](/demos/text-fields)

