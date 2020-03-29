---
title: React Card 卡片组件
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
---

# Card 卡片

<p class="description">卡片包含有关单个主题的内容和操作。</p>

[卡片](https://material.io/design/components/cards.html) 是显示单个主题下内容和操作的容器。

通过卡片，我们应便捷地扫描相关的和可操作的信息。 像文本和图像这样的元素，则应按照清晰的布局来排列，以此呈现结构层次。

## 简单的卡片

尽管卡片支持多操作、多个 UI 控件和一个加长的菜单，但请不要滥用它，切记，卡片只是那些复杂且详细信息的一个入口。

{{"demo": "pages/components/cards/SimpleCard.js", "bg": true}}

### 描边卡片

将 variant 的值设置为 outlined 以渲染描边卡片：`variant="outlined"` 

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## 复杂交互

在桌面上, 卡片内容可以展开。

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## 多媒体内容

下面是一个使用图像来增强内容的卡片示例。

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

默认情况下，我们使用给`<div>` 元素加一个 *背景图片* 的方式来显示多媒体元素。 但在某些情况下，可能会产生一些不可预知的问题。 例如，您可能希望显示一段视频或一张响应式图片。 对于这些用例，请使用 `component` 属性：

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> ⚠️ 当 `component="img"` 时，CardMedia 会依靠 `object-fit` 来居中图像。 但 IE 11不支持它。

## UI 控件

卡片中的次要操作由图标、文本或 UI 控件呈现。次要操作的按钮通常位于卡片底部。

下面是一个媒体控制卡片的例子。

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

## Customization 个性化

👑如果您还在寻找灵感，请查看 [MUI Treasury 的自定义案例](https://mui-treasury.com/components/card)。