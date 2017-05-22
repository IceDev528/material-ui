# ListItemAvatar

It's a simple wrapper to apply the `dense` mode styles to `Avatar`.

## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | element |  | The content of the component, normally `Avatar`. |
| classes | object |  | Useful to extend the style applied to components. |

Any other properties supplied will be spread to the root element.
## Classes

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `denseAvatar`
- `denseAvatarIcon`

Have a look at [overriding with class names](/customization/overrides#overriding-with-class-names)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListItemAvatar`.
