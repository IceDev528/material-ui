---
title: 气泡卡片 React 组件
components: Grow, Popover
---
# 气泡卡片

<p class="description">弹出框可用于在元素边缘显示某些内容。</p>

Things to know when using the `Popover` component:

- The component is built on top of the [`Modal`](/utils/modal/) component.
- The scroll and click away are blocked unlike with the [`Popper`](/utils/popper/) component.

## Simple Popover

{{"demo": "pages/utils/popover/SimplePopover.js" }}

## Anchor playground

Use the radio buttons to adjust the `anchorOrigin` and `transformOrigin` positions. You can also set the `anchorReference` to `anchorPosition` or `anchorEl`. When it is `anchorPosition`, the component will, instead of `anchorEl`, refer to the `anchorPosition` prop which you can adjust to set the position of the popover.

{{"demo": "pages/utils/popover/AnchorPlayground.js"}}

## Mouse over interaction

We demonstrate how to use the `Popover` component to implement a popover behavior based on the mouse over event.

{{"demo": "pages/utils/popover/MouseOverPopover.js"}}

## Render Props

It is a [render props](https://reactjs.org/docs/render-props.html) demo that keeps track of the local state for a single popover.

{{"demo": "pages/utils/popover/RenderPropsPopover.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popover state for you in most cases.

{{"demo": "pages/utils/popover/PopoverPopupState.js"}}