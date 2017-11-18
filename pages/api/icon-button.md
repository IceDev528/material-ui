---
filename: /src/IconButton/IconButton.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# IconButton

Refer to the [Icons](/style/icons) section of the documentation
regarding the available icon options.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| buttonRef | Function |  | Use that property to pass a ref callback to the native button component. |
| children | Node |  | The icon element. If a string is provided, it will be used as an icon font ligature. |
| classes | Object |  | Useful to extend the style applied to components. |
| <span style="color: #31a148">color *</span> | union:&nbsp;'default', 'inherit', 'primary', 'contrast', 'accent'<br> | 'default' | The color of the component. It's using the theme palette when that makes sense. |
| <span style="color: #31a148">disableRipple *</span> | boolean | false | If `true`, the ripple will be disabled. |
| <span style="color: #31a148">disabled *</span> | boolean | false | If `true`, the button will be disabled. |
| rootRef | Function |  | Use that property to pass a ref callback to the root component. |
| theme | Object |  |  |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `colorAccent`
- `colorContrast`
- `colorPrimary`
- `colorInherit`
- `disabled`
- `label`
- `icon`
- `keyboardFocused`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/callemall/material-ui/tree/v1-beta/src/IconButton/IconButton.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiIconButton`.

## Inheritance

The properties of the [&lt;ButtonBase /&gt;](/api/button-base) component are also available.

## Demos

- [Buttons](/demos/buttons)
- [Grid List](/demos/grid-list)

