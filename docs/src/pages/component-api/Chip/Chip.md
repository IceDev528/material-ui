# Chip

Chips represent complex entities in small blocks, such as a contact.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| avatar | node |  | Avatar element. |
| classes | object |  | Useful to extend the style applied to components. |
| deleteIconClassName | string |  | The CSS class name of the delete icon element. |
| label | node |  | The content of the label. |
| labelClassName | string |  | The CSS `className` of the label. |
| onRequestDelete | function |  | Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* `onClick` event targeting the delete icon element. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `clickable`
- `deletable`
- `avatar`
- `avatarChildren`
- `label`
- `deleteIcon`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiChip`.
