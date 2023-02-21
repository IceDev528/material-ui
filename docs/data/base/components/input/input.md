---
product: base
title: Unstyled React Input component and hook
components: InputUnstyled
hooks: useInput
githubLabel: 'component: input'
---

# Unstyled Input

<p class="description">The Unstyled Input component provides users with a field to enter and edit text.</p>

## Introduction

An input is a UI element that accepts text data from the user.
The Unstyled Input component replaces the native HTML `<input>` tag, and offers expanded customization and accessibility features.
It can also be transformed into a `<textarea>` as needed.

{{"demo": "UnstyledInputIntroduction.js", "defaultCodeOpen": false, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import InputUnstyled from '@mui/base/InputUnstyled';

export default function MyApp() {
  return <InputUnstyled />;
}
```

### Basics

Unstyled Input behaves similarly to the native HTML `<input>`, except that it's nested inside of a root `<div>`—see [Anatomy](#anatomy) for details.

The following demo shows how to create and style an input component, including `placeholder` text:

{{"demo": "UnstyledInputBasic.js", "defaultCodeOpen": false}}

### Anatomy

The Unstyled Input component is composed of a root `<div>` slot that houses one interior `<input>` slot:

```html
<div class="MuiInput-root">
  <input class="MuiInput-input" />
</div>
```

### Slot props

:::info
The following props are available on all non-utility Base components.
See [Usage](/base/getting-started/usage/) for full details.
:::

Use the `component` prop to override the root slot with a custom element:

```jsx
<InputUnstyled component="aside" />
```

Use the `slots` prop to override any interior slots in addition to the root:

```jsx
<InputUnstyled slots={{ root: 'aside' }} />
```

:::warning
If the root element is customized with both the `component` and `slots` props, then `component` will take precedence.
:::

Use the `slotProps` prop to pass custom props to internal slots.
The following code snippet applies a CSS class called `my-input` to the input slot:

```jsx
<InputUnstyled slotProps={{ input: { className: 'my-input' } }} />
```

## Hook

```js
import useInput from '@mui/base/useInput';
```

The `useInput` hook lets you apply the functionality of an input to a fully custom component.
It returns props to be placed on the custom component, along with fields representing the component's internal state.

Hooks _do not_ support [slot props](#slot-props), but they do support [customization props](#customization).

:::info
Hooks give you the most room for customization, but require more work to implement.
With hooks, you can take full control over how your component is rendered, and define all the custom props and CSS classes you need.

You may not need to use hooks unless you find that you're limited by the customization options of their component counterparts—for instance, if your component requires significantly different [structure](#anatomy).
:::

The demo below shows how to use the `useInput` hook to create a custom input component that receives all the necessary props:

{{"demo": "UseInput.js", "defaultCodeOpen": false}}

## Customization

### Adornments

You can use the `startAdornment` and `endAdornment` props to add a prefix, suffix, or an action to an input.
Common use cases of adornments include:

- when an input receives a specific unit of measure (like weight or currency)
- when an icon button toggles hiding/showing a password

The following demo shows examples of both of these use cases:

{{"demo": "InputAdornments.js", "defaultCodeOpen": false}}

### Multiline

The `multiline` prop transforms the `<input>` field into a `<textarea>` element, as shown below:

{{"demo": "InputMultiline.js"}}

If you want the `<textarea>` to grow with the content, you can use the [Textarea Autosize](/base/react-textarea-autosize/) component within the input.

When using Textarea Autosize, the height of the `<textarea>` element dynamically matches its content unless you set the `rows` prop.
To set minimum and maximum sizes, add the `minRows` and `maxRows` props.

The following demo shows how to insert a Textarea Autosize component into an Unstyled Input so that its height grows with the length of the content:

{{"demo": "InputMultilineAutosize.js"}}
