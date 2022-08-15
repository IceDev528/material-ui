---
product: material-ui
title: React Portal（传送门）组件
components: Portal
githubLabel: 'component: Portal'
---

# Portal

<p class="description">传送门组件将其子节点渲染到当前 DOM 结构之外的新 "子类树" 当中。</p>

传送门组件的子节点将被添加到指定的 `container` 中。 The component is used internally by the [`Modal`](/material-ui/react-modal/) and [`Popper`](/material-ui/react-popper/) components.

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## 示例

{{"demo": "SimplePortal.js"}}

## 服务器端

React [不支持](https://github.com/facebook/react/issues/13097)服务端渲染的 [`createPortal()`](https://reactjs.org/docs/portals.html) API。 您必须等到客户端的注水渲染（hydration）之后才能见到子节点。

## Unstyled

- 📦 [970 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the Base package.

```js
import Portal from '@mui/base/Portal';
```
