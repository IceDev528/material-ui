---
product: joy-ui
title: React Stack component
githubLabel: 'component: stack'
---

# Stack

<p class="description">Stack is a container component for arranging elements vertically or horizontally.</p>

## Introduction

The Stack component manages the layout of its immediate children along the vertical or horizontal axis, with optional spacing and dividers between each child.

:::info
Stack is ideal for one-dimensional layouts, while Grid is preferable when you need both vertical _and_ hortizontal arrangement.
:::

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

```jsx
import Stack from '@mui/joy/Stack';
```

The Stack component acts as a generic container, wrapping around the elements to be arranged.

Use the `spacing` prop to control the space between children.
The spacing value can be any number, including decimals, or a string.
(The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.)

{{"demo": "BasicStack.js", "bg": true}}

## Customization

### Direction

By default, Stack arranges items vertically in a column.
Use the `direction` prop to position items horizontally in a row:

{{"demo": "DirectionStack.js", "bg": true}}

### Dividers

Use the `divider` prop to insert an element between each child.
This works particularly well with the [Divider](/joy-ui/react-divider/) component, as shown below:

{{"demo": "DividerStack.js", "bg": true}}

### Responsive values

You can switch the `direction` or `spacing` values based on the active breakpoint.

{{"demo": "ResponsiveStack.js", "bg": true}}

### System props

As a CSS utility component, Stack supports all [MUI System properties](/system/properties/).
You can use them as props directly on the component.
For instance, a margin-top:

```jsx
<Stack mt={2}>
```

## Interactive demo

Below is an interactive demo that lets you explore the visual results of the different settings:

{{"demo": "InteractiveStack.js", "hideToolbar": true, "bg": true}}

## Limitations

### Margin on the children

Customizing the margin on the children is not supported.

For instance, the top-margin on the `Button` component below will be ignored.

```jsx
<Stack>
  <Button sx={{ marginTop: '30px' }}>...</Button>
</Stack>
```

A [RFC](https://github.com/mui/material-ui/issues/33754) to address this issue is already open.

### white-space: nowrap

The initial setting on flex items is `min-width: auto`.
This causes a positioning conflict when children use `white-space: nowrap;`.
You can reproduce the issue with:

```jsx
<Stack direction="row">
  <Typography noWrap>
```

In order for the item to stay within the container you need to set `min-width: 0`.

```jsx
<Stack direction="row" sx={{ minWidth: 0 }}>
  <Typography noWrap>
```

{{"demo": "ZeroWidthStack.js", "bg": true}}

## Anatomy

The Stack component is composed of a single root `<div>` element:

```html
<div class="JoyStack-root">
  <!-- Stack contents -->
</div>
```
