---
title: 弹出器 React 组件
components: Popper
---
# Popper

<p class="description">Popper 可以用来在其他元素之上显示一些内容。它是 react-popper 的替代品。</p>

`Popper` 组件的一些重要功能：

- 
- 
- 
- 子级元素是使用 [`Portal`](/utils/portal/) 组件，以避免在文档中出现问题。 您可以使用 `disablePortal` 禁用此行为。
- 和 [`Popver`](/utils/popover/) 不同，滚动和单击不会被阻止。 Popper组件会随着可视窗口中的可使用区域更新其位置。
- 将 `anchorEl` 作为引用对象传递以创建新的 `Popper.js` 实例。

## 简单 Popper

{{"demo": "pages/utils/popper/SimplePopper.js" }}

## 最小化的 Popper

你可以使用该组件而不需要任何附加依赖。

{{"demo": "pages/utils/popper/MinimalPopper.js" }}

## Scroll playground

{{"demo": "pages/utils/popper/ScrollPlayground.js", "hideHeader": true}}

## Positioned Popper

{{"demo": "pages/utils/popper/PositionedPopper.js"}}

## 没有过渡效果的 Popper

{{"demo": "pages/utils/popper/NoTransitionPopper.js"}}

## Faked reference object

The `anchorEl` property can be a reference to a fake DOM element. You just need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

Highlight part of the text to see the popper:

{{"demo": "pages/utils/popper/FakedReferencePopper.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### PopupState helper

在大多数情况下，一个第三方包 [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) 可以为你处理popper 的 state 。

{{"demo": "pages/utils/popper/PopperPopupState.js"}}