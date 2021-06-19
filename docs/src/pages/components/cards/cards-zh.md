---
title: React Card（卡片）组件
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: Card'
materialDesign: https://material.io/components/cards
---

# Card 卡片

<p class="description">卡片组件能够承载与单个主题相关的内容和操作。</p>

卡片是一个显示与单个主题相关的内容和可被操作的容器。

通过卡片组件，扫描相关的和可操作的信息更为便捷了。 像文本和图像这样的元素，则应按照清晰的布局来排列，以此呈现结构层次。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic card

尽管卡片支持多操作、多个 UI 控件和一个加长的菜单，但请不要滥用它，切记，卡片只能作为那些复杂且详细信息的一个入口。

{{"demo": "pages/components/cards/BasicCard.js", "bg": true}}

### 描边卡片

通过设置 `variant="outlined"` 来渲染一个描边卡片。

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## 复杂的交互情况

在桌面上，卡片内容是可以展开的。 （点击向下箭头的按钮来查看配方。）

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## Media 多媒体内容

下面的例子则一个使用图像来增强内容的卡片。

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

默认情况下，我们结合 `<div>` 元素和一张 _背景图片_ 来展示多媒体元素。 在某些情况下它也可能会出现问题，例如，你想要显示一个视频或一张响应式的图片。 使用 `component` 属性可以解决这样的情况：

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ 当 `component="img"` 时，CardMedia 通过 `object-fit` 来居中图像。 这个用法不兼容 IE11。

## 主要（Primary）操作

通常情况下，卡片允许用户与它的整个表面进行交互，以触发它的主要动作，无论是扩展，链接到另一个屏幕或使用其他行为。 卡片的操作区域可以通过将其内容包裹在 `CardActionArea` 组件中来指定。

{{"demo": "pages/components/cards/ActionAreaCard.js", "bg": true}}

卡片还可以提供额外的操作功能，这些功能应该脱离主操作区域，以避免事件重叠。

{{"demo": "pages/components/cards/MultiActionAreaCard.js", "bg": true}}

## UI 控件

卡片内部的一些补充操作可使用图标、文本和 UI 控件显式调用，我们通常将其放在卡片组件的底部。

以下是一个多媒体内容控制的卡片的例子。

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

## Customization 个性化

🎨 如果您还在寻找灵感，您可以看看 [MUI Treasury 特别定制的一些例子](https://mui-treasury.com/components/card)。
