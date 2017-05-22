# MenuItem



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Menu item contents. |
| classes | object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;func<br> |  | The component used for the root node. Either a string to use a DOM element or a component. |
| selected | bool | false | Use to apply selected styling. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `selected`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiMenuItem`.
