<!--- This documentation is automatically generated, do not try to edit it. -->

# Input



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| autoComplete | string |  | This property helps users to fill forms faster, especially on mobile devices. The name can be confusion, it's more like an autofill. You can learn about it with that article https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill |
| autoFocus | boolean |  | If `true`, the input will be focused during the first mount. |
| className | string |  | The CSS class name of the wrapper element. |
| classes | Object |  | Useful to extend the style applied to components. |
| defaultValue | union:&nbsp;string<br>&nbsp;number<br> |  | The default input value, useful when not controlling the component. |
| disableUnderline | boolean | false | If `true`, the input will not have an underline. |
| disabled | boolean |  | If `true`, the input will be disabled. |
| error | boolean |  | If `true`, the input will indicate an error. This is normally obtained via context from FormControl. |
| fullWidth | boolean | false | If `true`, the input will take up the full width of its container. |
| id | string |  | The id of the `input` element. |
| inputComponent | union:&nbsp;string<br>&nbsp;ComponentType<*><br> |  | The component used for the input node. Either a string to use a DOM element or a component. It's an `input` by default. |
| inputProps | Object |  | Properties applied to the `input` element. |
| inputRef | Function |  | Use that property to pass a ref callback to the native input component. |
| margin | union:&nbsp;'dense'<br>&nbsp;'none'<br> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| multiline | boolean | false | If `true`, a textarea element will be rendered. |
| name | string |  | Name attribute of the `input` element. |
| onChange | signature |  | TODO |
| onClean | signature |  | TODO |
| onDirty | signature |  | TODO |
| placeholder | string |  | TODO |
| rows | union:&nbsp;string<br>&nbsp;number<br> |  | Number of rows to display when multiline option is set to true. |
| rowsMax | union:&nbsp;string<br>&nbsp;number<br> |  | Maximum number of rows to display when multiline option is set to true. |
| type | string | 'text' | Type of the input element. It should be a valid HTML5 input type. |
| value | union:&nbsp;string<br>&nbsp;number<br>&nbsp;Array<string<br>&nbsp;number><br> |  | The input value, required for a controlled component. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `formControl`
- `inkbar`
- `error`
- `input`
- `inputDense`
- `disabled`
- `focused`
- `underline`
- `multiline`
- `inputDisabled`
- `inputSingleline`
- `inputSearch`
- `inputMultiline`
- `fullWidth`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiInput`.

## Demos

- [Text Fields](/demos/text-fields)

