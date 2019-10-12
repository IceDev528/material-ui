---
title: Rating React component
components: Rating
---

# Rating

<p class="description">Ratings provide insight regarding others’ opinions and experiences with a product. Users can also rate products they’ve purchased.</p>

## Simple ratings

{{"demo": "pages/components/rating/SimpleRating.js"}}

## Customized ratings

这是一些自定义样式开关的例子 您可以在[重写文档页](/customization/components/)中了解有关此内容的更多信息。

{{"demo": "pages/components/rating/CustomizedRatings.js"}}

## Hover feedback

You can display a label on hover to help users pick the correct rating value. The first demo uses the `onChangeActive` prop while the last one uses the `IconContainerComponent` prop.

{{"demo": "pages/components/rating/HoverRating.js"}}

## Half ratings

The rating can display any float number with the `value` prop. Use the `precision` prop to define the minimum increment value change allowed.

{{"demo": "pages/components/rating/HalfRating.js"}}

## 尺寸

Fancy larger or smaller ratings? Use the `size` prop.

{{"demo": "pages/components/rating/RatingSize.js"}}

## 可访问性

(WAI tutorial: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating)

这个组件的可访问性依赖于：

- A radio group is used with its fields visually hidden. It contains six radio buttons, one for each star and another for 0 stars, which is checked by default. Make sure you are providing a `name` prop that is unique to the parent form.
- The labels for the radio buttons contain actual text (“1 Star”, “2 Stars”, …), make sure you provide a `getLabelText` prop when the page language is not English.