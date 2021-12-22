---
title: React Backdrop（背景暗化）组件
components: Backdrop, BackdropUnstyled
githubLabel: '组件：背景暗化'
---

# 蒙版

<p class="description">蒙版组件用于特定元素或其部分的强调。</p>

蒙版组件可以用来提醒用户当前应用状态的变化，同时它也可以用来创建加载遮罩层、对话框等等。 在最简单的情况下，背景暗化组件将在您的应用程序上添加一个暗淡的图层。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 示例

{{"demo": "pages/components/backdrop/SimpleBackdrop.js"}}

## 素颜模式

The backdrop also comes with the Base package. The backdrop also comes with the unstyled package. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import BackdropUnstyled from '@mui/base/BackdropUnstyled';
```
