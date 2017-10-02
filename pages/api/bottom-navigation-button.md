<!--- This documentation is automatically generated, do not try to edit it. -->

---
filename: /src/BottomNavigation/BottomNavigationButton.js
---

# BottomNavigationButton



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | Object |  | Useful to extend the style applied to components. |
| icon | union:&nbsp;string<br>&nbsp;Element<any><br> |  | The icon element. If a string is provided, it will be used as a font ligature. |
| label | union:&nbsp;string<br>&nbsp;Element<any><br> |  | The label element. |
| showLabel | boolean |  | If `true`, the BottomNavigationButton will show its label. |
| value | any |  | You can provide your own value. Otherwise, we fallback to the child position index. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `selected`
- `selectedIconOnly`
- `wrapper`
- `label`
- `selectedLabel`
- `hiddenLabel`
- `icon`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/callemall/material-ui/tree/v1-beta/src/BottomNavigation/BottomNavigationButton.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBottomNavigationButton`.

## Inheritance

The properties of the [&lt;ButtonBase /&gt;](/api/button-base) component are also available.

## Demos

- [Bottom Navigation](/demos/bottom-navigation)

