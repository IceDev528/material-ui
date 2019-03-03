---
filename: /packages/material-ui-lab/src/SpeedDialIcon/SpeedDialIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SpeedDialIcon API

<p class="description">The API documentation of the SpeedDialIcon React component. Learn more about the properties and the CSS customization points.</p>

```js
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |   | The icon to display in the SpeedDial Floating Action Button. |
| <span class="prop-name">openIcon</span> | <span class="prop-type">node</span> |   | The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open. |

Any other properties supplied will be spread to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">icon</span> | Styles applied to the icon component.
| <span class="prop-name">iconOpen</span> | Styles applied to the icon component if `open={true}`.
| <span class="prop-name">iconWithOpenIconOpen</span> | Styles applied to the icon when and `openIcon` is provided & if `open={true}`.
| <span class="prop-name">openIcon</span> | Styles applied to the `openIcon` if provided.
| <span class="prop-name">openIconOpen</span> | Styles applied to the `openIcon` if provided & if `open={true}`.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui-lab/src/SpeedDialIcon/SpeedDialIcon.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiSpeedDialIcon`.

## Demos

- [Speed Dial](/lab/speed-dial/)

