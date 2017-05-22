# Toolbar



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Can be a `ToolbarGroup` to render a group of related items. |
| classes | object |  | Useful to extend the style applied to components. |
| disableGutters | bool | false | If `true`, disables gutter padding. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `gutters`
- `@media (min-width:600px)`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiToolbar`.
