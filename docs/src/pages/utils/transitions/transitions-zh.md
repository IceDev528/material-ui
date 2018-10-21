---
title: Transition React component
components: Collapse, Fade, Grow, Slide, Zoom
---
# 过渡动画

<p class="description">过渡有助于使UI富有表现力且易于使用。</p>

Material-UI提供了一系列过渡效果, 使一些 [动作](https://material.io/design/motion/) 可以被添加到你的组件中.

为了更好地支持服务端渲染, Material-UI 为某些过渡组件 (Fade, Grow, Zoom, Slide) 的子级提供了 `style` 属性 。 为了使动画按预期实现, 必须添加`style`属性到DOM上.

```jsx
// props对象包含一个style属性.
// 你需要将其提供给 "div" 元素, 如下所示。
function MyComponent(props) {
  return (
    <div {...props}>
      Fade
    </div>
  );
}

export default Main() {
  return (
    <Fade>
      <MyComponent />
    </Fade>
  );
}
```

## 折叠

从子元素的顶部垂直展开。 `collapsedHeight` 属性可用于设置未展开时的最小高度。

{{"demo": "pages/utils/transitions/SimpleCollapse.js"}}

## 淡入

从透明淡入至不透明

{{"demo": "pages/utils/transitions/SimpleFade.js"}}

## 扩展

从子元素的中心向外扩展, 同时从透明淡入至不透明。

第二个示例演示如何更改 `transform-origin`属性, 和有条件地使用 `timeout` 属性来更改元素进入的速度。

{{"demo": "pages/utils/transitions/SimpleGrow.js"}}

## 滑动

从屏幕的边缘滑入。`direction` 属性控制动画开始时，元素从哪个方向出现。

The Transition component's `mountOnEnter` property prevents the child component from being mounted until `in` is `true`. This prevents the relatively positioned component from scrolling into view from it's off-screen position. Similarly the `unmountOnExit` property removes the component from the DOM after it has been transition off screen.

{{"demo": "pages/utils/transitions/SimpleSlide.js"}}

## 放大

从子元素的中心向外扩展。

此示例还演示如何延迟输入过渡。

{{"demo": "pages/utils/transitions/SimpleZoom.js"}}