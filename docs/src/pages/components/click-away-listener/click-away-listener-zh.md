---
title: 检测 React 组件外部的单击事件
components: ClickAwayListener
---

# Click away listener（他处点击监听器）

<p class="description">用于检测点击事件是否发生在元素之外。 它可以监听文档中某处发生的点击事件。</p>

- 📦 [1.5 kB gzipped](/size-snapshot).

## 示例

例如，当用户在点击页面除菜单外的任何一处，您可能想隐藏一个下拉的菜单：

{{"demo": "pages/components/click-away-listener/ClickAway.js"}}

Notice that the component only accepts one child element. You can find a more advanced demo on the [menu documentation section](/components/menus/#menulist-composition).