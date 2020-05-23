---
title: React Snackbar 消息条组件
components: Snackbar, SnackbarContent
---

# Snackbar 消息条

<p class="description">Snackbars 提供了关于应用流程的简短信息。 该组件也被称为 toast。</p>

[消息条](https://material.io/design/components/snackbars.html) 将应用程序已执行或即将执行的进程通知用户。 它们会从屏幕底部短暂地出现。 它们不应中断用户体验，也不要求任何用户的操作来关闭。

Snackbars 包含一行直接与所执行操作相关的文本。 它们可能包含一些文本操作，但没有图标。 您可以使用它们来显示通知。

#### 频率

我们规定一次只能显示一个消息条。

## 简单的消息条

一个简单的消息条旨在重现谷歌 Keep 消息条的行为。

{{"demo": "pages/components/snackbars/SimpleSnackbar.js"}}

## 自定义的消息条

以下是自定义组件的一些例子。 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/snackbars/CustomizedSnackbars.js"}}

## 定位的消息条

In wide layouts, snackbars can be left-aligned or center-aligned if they are consistently placed on the same spot at the bottom of the screen, however there may be circumstances where the placement of the snackbar needs to be more flexible. You can control the position of the snackbar by specifying the `anchorOrigin` prop.

{{"demo": "pages/components/snackbars/PositionedSnackbar.js"}}

## 消息的长度

有些消息条会有不同的长度。

{{"demo": "pages/components/snackbars/LongTextSnackbar.js"}}

## 过渡动画

### 连续的消息条

当需要显示多个消息条的时候，一次应该只显示一个。

{{"demo": "pages/components/snackbars/ConsecutiveSnackbars.js"}}

### Snackbars（消息条）和 FABs（悬浮按钮）

消息条应当显示在悬浮按钮的上方（这是在移动设备上）。

{{"demo": "pages/components/snackbars/FabIntegrationSnackbar.js", "iframe": true, "maxWidth": 400}}

### 更改过渡动画

[Grow](/components/transitions/#grow)是默认的过渡动画但你可以使用不同的过渡动画。

{{"demo": "pages/components/snackbars/TransitionsSnackbar.js"}}

### 控制滑动的方向

你可以修改 [Slide](/components/transitions/#slide) 过渡的方向 。

{{"demo": "pages/components/snackbars/DirectionSnackbar.js"}}

## 补充项目

对于更高级的用例，您可以利用：

### notistack

![评星](https://img.shields.io/github/stars/iamhosseindhv/notistack.svg?style=social&label=Stars) ![npm下载](https://img.shields.io/npm/dm/notistack.svg)

以下例子演示了如何使用 [notistack](https://github.com/iamhosseindhv/notistack)。 notistack has an **imperative API** 可以轻松地显示一串消息条，而无需处理其打开/关闭状态。 It also enables you to **stack** them on top of one another (尽管 Material Design 规范并不鼓励这样做).

{{"demo": "pages/components/snackbars/IntegrationNotistack.js", "defaultCodeOpen": false}}

## 可及性

(WAI-ARIA: https://www.w3.org/TR/wai-aria-1.1/#alert)

- By default, the snackbar won't auto-hide. However, if you decide to use the `autoHideDuration` prop, it's recommended to give the user [sufficient time](https://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits.html) to respond.