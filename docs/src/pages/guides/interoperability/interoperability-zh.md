# 样式库的互通性

<p class="description">虽然使用由 Material-UI 提供的基于JSS的样式解决方案来设置您的应用程序样式比较简单，但您依旧可以在从纯 CSS 到任意数量的 CSS-in-JS 库的方案中选择，来实现您所偏好的样式方案。</p>

本指南旨在归档当前比较流行的一些替代方案，但是您应该可以发现在这里运用的法则也可以在其他库里适用。 There are examples for the following styling solutions:

- [纯 CSS](#plain-css)
- [全局 CSS](#global-css)
- [Styled Components](#styled-components)
- [CSS Modules](#css-modules)
- [Emotion](#css-modules)
- [React JSS](#emotion)
- [Glamor](#glamor)

## 纯 CSS

Nothing fancy, plain old CSS.

**PlainCssButton.css**

```css
.button {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**PlainCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

export default function PlainCssButton() {
  return (
    <div>
      <Button>Material-UI</Button>
      <Button className="button">Plain CSS</Button>
    </div>
  );
}
```

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/l5qv4y57vl)

**请注意：** JSS 在 `<head>` 底部注入其样式表。 如果您不想使用 **!important** 来标记样式属性，您则需要更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如上所示。

## 全局 CSS

明确向提组件提供类名是不是太大费周章了？ [您可以定位到由 Material-UI 生成的类名](/styles/advanced/#with-material-ui-core)。

**GlobalCssButton.css**

```css
.MuiButton-root {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**GlobalCssButton.js**

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';

export default function GlobalCssButton() {
  return (
    <div>
      <Button>Global CSS</Button>
    </div>
  );
}
```

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9yxopv4vmp)

**请注意：** JSS 在 `<head>` 底部注入其样式表。 如果您不想使用 **!important** 来标记样式属性，您则需要更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如上所示。

## Styled Components

![评星](https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/styled-components.svg?)

The `styled()` method works perfectly on all of the components.

{{"demo": "pages/guides/interoperability/StyledComponents.js", "defaultCodeOpen": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/k553lz1qrv)

### 控制的优先权

**请注意：** styled-components 和 JSS 都在 `<head>` 的底部注入其样式表。 若想要 styled-components 的样式在最后加载，我们推荐的最佳方法是更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如下演示：

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      样式化组件可以覆盖 Material-UI 的样式。 */}
</StylesProvider>
```

另外一个在 styled-components 中使用 `&&` 字符的方案则是通过重复类名来[增强特征](https://www.styled-components.com/docs/advanced#issues-with-specificity)。 Avoid the usage of `!important`.

### 更深层的元素

如果您尝试赋予Drawer（抽屉）组件以永久的变体的样式，您很可能会需要涉及抽屉组件的子纸张元素。 但是，这不是抽屉组件的根元素，因此上面的样式组件自定义将不起作用。 您则需要使用 Material-UI 的 API 中的 [`classes`](/styles/advanced/#overriding-styles-classes-prop) 来达到目的。

以下示例除了影响按钮本身的自定义样式外，还会覆盖 `Button` 的 `label` 样式。 通过”消耗”一些不应该传递到底层组件的属性，它还解决了[这个 styled-components 的问题](https://github.com/styled-components/styled-components/issues/439)。

{{"demo": "pages/guides/interoperability/StyledComponentsDeep.js", "defaultCodeOpen": true}}

以上的例子依赖于[默认的`类`的值](/styles/advanced/#with-material-ui-core)，但是您也可以提供自定义的类名：`.label`。

```jsx
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: 'label' }} {...other} />
))`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

  & .label {
    color: ${props => props.color};
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Material-UI</Button>
      <StyledButton color="papayawhip">Styled Components</StyledButton>
    </div>
  );
}
```

### 主题供应站

Material-UI 有着一个丰富的主题架构，而您可以利用它来做一些颜色的处理，过渡动画，媒体查询等等。

{{“demo”：“pages/guides/interoperability/StyledComponentsTheme.js”}}

### Portals（传送门组件）

[传送门组件](/components/portal/)提供了一种一流的方法，它将子元素渲染在其父组件的 DOM 层次结构之外的 DOM 节点中。 当您使用这样的 styled-components 规范其 CSS 的方式时，可能会遇到一些无法附着样式的问题。

例如，若您尝试用 `MenuProps` 属性来样式化 [Select](/components/selects/) 组件的 [Menu](/components/menus/)，您将需要将 `className` 属性传递到它的 DOM 层次结构之外渲染的元素当中。 下面的示例演示了一个变通办法：

```jsx
import React from 'react';
import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = styled(({ className, ...props }) => (
  <Menu {...props} classes={{ paper: className }} />
))`
  box-shadow: none;
  border: 1px solid #d3d4d5;

  li {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
```

{{"demo": "pages/guides/interoperability/StyledComponentsPortal.js"}}

## CSS Modules

![评星](https://img.shields.io/github/stars/css-modules/css-modules.svg?style=social&label=Star)

鉴于它全权依赖于大家使用的打包方案，我们很难得知[此种样式方案](https://github.com/css-modules/css-modules)的市场占有率。

**CssModulesButton.css**

```css
.button {
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
}
```

**CssModulesButton.js**

```jsx
import React from 'react';
// webpack, parcel or else will inject the CSS into the page
import styles from './CssModulesButton.css';
import Button from '@material-ui/core/Button';

export default function CssModulesButton() {
  return (
    <div>
      <Button>Material-UI</Button>
      <Button className={styles.button}>CSS Modules</Button>
    </div>
  );
}
```

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5km241l9xn)

**请注意：** JSS 在 `<head>` 底部注入其样式表。 如果您不想使用 **!important** 来标记样式属性，您则需要更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如上所示。

## Emotion

![评星](https://img.shields.io/github/stars/emotion-js/emotion.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/emotion.svg?)

### `css` 属性

Emotion的 **css()** 方法与Material-UI无缝协作。

{{"demo": "pages/guides/interoperability/EmotionCSS.js", "defaultCodeOpen": true}}

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/yw93kl7y0j)

**请注意：** JSS 在 `<head>` 底部注入其样式表。 如果您不想使用 **!important** 来标记样式属性，您则需要更改 [CSS 的注入顺序](/styles/advanced/#css-injection-order)，如上所示。

### `styled()` 的 API

它完全和 styled components 一样起作用。 您可以[使用相同的指南](/guides/interoperability/#styled-components) 。

## React JSS

![评星](https://img.shields.io/github/stars/cssinjs/jss.svg?style=social&label=Star) ![npm](https://img.shields.io/npm/dm/react-jss.svg?)

Material-UI 的样式方案与 [react-jss](https://github.com/cssinjs/react-jss) 共享了许多代码块。 A fork was needed in order to handle Material-UI's unique needs, but with the intent to merge the changes and fixes from Material-UI back to react-jss.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

function ReactJssButton(props) {
  return (
    <div>
      <Button>Material-UI</Button>
      <Button className={props.classes.button}>react-jss</Button>
    </div>
  );
}

ReactJssButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(ReactJssButton);
```

[![编辑按钮](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/24kllqxvmp)