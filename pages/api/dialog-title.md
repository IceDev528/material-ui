---
filename: /packages/material-ui/src/DialogTitle/DialogTitle.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# DialogTitle API

<p class="description">The API documentation of the DialogTitle React component. Learn more about the properties and the CSS customization points.</p>

```js
import DialogTitle from '@material-ui/core/DialogTitle';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">node</span> |   | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">disableTypography</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the children won't be wrapped by a typography component. For instance, this can be useful to render an h4 instead of the default h2. |

Any other properties supplied will be spread to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/DialogTitle/DialogTitle.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiDialogTitle`.

## Demos

- [Dialogs](/demos/dialogs/)

