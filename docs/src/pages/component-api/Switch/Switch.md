<!--- This documentation is automatically generated, do not try to edit it. -->

# Switch



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;bool<br>&nbsp;string<br> |  | If `true`, the component appears selected. |
| checkedClassName | string |  | The CSS class name of the root element when checked. |
| checkedIcon | node |  | The icon to display when the component is checked. If a string is provided, it will be used as a font ligature. |
| classes | object |  | Useful to extend the style applied to components. |
| disableRipple | bool |  | If `true`, the ripple effect will be disabled. |
| disabled | bool |  | If `true`, the switch will be disabled. |
| disabledClassName | string |  | The CSS class name of the root element when disabled. |
| icon | node |  | The icon to display when the component is unchecked. If a string is provided, it will be used as a font ligature. |
| inputProps | object |  | Properties applied to the `input` element. |
| name | string |  |  |
| onChange | function |  | Callback fired when the  is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback<br>*checked:* The `checked` value of the switch |
| value | string |  | The value of the component. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `bar`
- `icon`
- `default`
- `checked`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSwitch`.
