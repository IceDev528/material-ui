---
filename: /packages/material-ui/src/TableBody/TableBody.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TableBody API

<p class="description">The API documentation of the TableBody React component. Learn more about the properties and the CSS customization points.</p>

```js
import TableBody from '@material-ui/core/TableBody';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |   | The content of the component, normally `TableRow`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'tbody'</span> | The component used for the root node. Either a string to use a DOM element or a component. |

Any other properties supplied will be spread to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/TableBody/TableBody.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTableBody`.

## Demos

- [Tables](/demos/tables/)

