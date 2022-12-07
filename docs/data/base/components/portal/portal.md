---
product: base
title: React Portal component
components: Portal
githubLabel: 'component: Portal'
---

# Portal

<p class="description">The Portal component lets you render its children into a DOM node that exists outside of the Portal's own DOM hierarchy.</p>

## Introduction

Portal is a utility component built around [React's `createPortal()` API](https://reactjs.org/docs/portals.html).
It gives you the functionality of `createPortal()` in a convenient component form.

The Portal component is used internally by the [Unstyled Modal](/base/react-modal/) and [Unstyled Popper](/base/react-popper/) components.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

### Usage

After [installation](/base/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Portal from '@mui/base/Portal';

export default function MyApp() {
  return (
    <Portal>{/* children to be rendered outside of the current DOM node */}</Portal>
  );
}
```

### Basics

Normally, children of a component are rendered within that component's DOM tree.
But sometimes it's necessary to mount a child at a different location in the DOM.

:::info
According to [the React docs](https://reactjs.org/docs/portals.html), portals are useful when "you need the child element to visually 'break out' of its container"—for instance, modals and tooltips, which need to exist outside of the normal flow of the document.
:::

The Portal component accepts a `container` prop that passes a `ref` to the DOM node where its children will be mounted.

The following demo shows how a `<span>` nested within a Portal can be appended to a node outside of the Portal's DOM hierarchy—click **Mount children** to see how it behaves:

{{"demo": "SimplePortal.js"}}

### Server-side

:::error
React doesn't support the [`createPortal()` API](https://reactjs.org/docs/portals.html) on the server.
See [this GitHub issue](https://github.com/facebook/react/issues/13097) for details.
:::

The Portal component cannot be used to render child elements on the server—client-side hydration is necessary.
