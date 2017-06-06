# IconButton

Refer to the [Icons](/style/icons) section of the documentation
regarding the available icon options.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| accent | bool | false | If `true`, will use the theme's accent color. |
| children | node |  | The icon element. If a string is provided, it will be used as an icon font ligature. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'inherit'<br> |  | Determines the color of the `IconButton`. |
| contrast | bool | false | If `true`, the icon button will use the theme's contrast color. |
| disabled | bool | false | If `true`, the button will be disabled. |
| disableRipple | bool | false | If `true`, the ripple will be disabled. |
| rootRef | function |  | Use that property to pass a ref callback to the root component. |

Any other properties supplied will be spread to the root element.

## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `disabled`
- `accent`
- `contrast`
- `color-inherit`
- `label`
- `icon`
- `keyboardFocused`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiIconButton`.
