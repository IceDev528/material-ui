---
filename: /packages/material-ui/src/MenuItem/MenuItem.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# MenuItem API

<p class="description">The API documentation of the MenuItem React component. Learn more about the properties and the CSS customization points.</p>

```js
import MenuItem from '@material-ui/core/MenuItem';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |   | Menu item contents. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the left and right padding is removed. |

Any other properties supplied will be spread to the root element ([ListItem](/api/list-item/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">gutters</span> | Styles applied to the root element if `disableGutters={false}`.
| <span class="prop-name">selected</span> | Styles applied to the root element if `selected={true}`.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/MenuItem/MenuItem.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiMenuItem`.

## Inheritance

The properties of the [ListItem](/api/list-item/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Autocomplete](/demos/autocomplete/)
- [Menus](/demos/menus/)

