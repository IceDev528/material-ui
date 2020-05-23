---
title: 气泡卡片 React 组件
components: Grow, Popover
---

# Popover 弹出框

<p class="description">弹出框可用于在元素边缘显示某些内容。</p>

使用 `Popover` 组件时需要了解的事项：

- 该组件构建在 [`Modal`](/components/modal/) 组件之上。
- 不同于 [`Popper`](/components/popper/) 组件，滚动和 click away 行为会被阻止。

## 简单的弹出框

{{"demo": "pages/components/popover/SimplePopover.js" }}

## 锚点测试

使用单选按钮调整 `anchorOrigin` 和 `transformOrigin` 位置。 您还可以将 `anchorReference` 设置为 `anchorPosition` 或 `anchorEl`。 当它是 `anchorPosition` 时，该组件将代替 `anchorEl`， 指向 `anchorPosition` prop，其可以调整设置 弹出框的位置。

{{"demo": "pages/components/popover/AnchorPlayground.js", "hideToolbar": true}}

## 鼠标悬停在互动上

这表明如何使用 `Popover` 组件来实现基于鼠标事件的弹出窗口行为。

{{"demo": "pages/components/popover/MouseOverPopover.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

在大多数情况下，一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你处理popper 的 state 。

{{"demo": "pages/components/popover/PopoverPopupState.js"}}