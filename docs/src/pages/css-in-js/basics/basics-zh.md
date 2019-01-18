# 基础

<p class="description">即使您没有使用我们的组件, 您也可以利用我们的样式解决方案。</p>

> ⚠️ `@material-ui/styles` is unstable (alpha version). Hopefully, we will make it the default style implementation for the core components in Material-UI v4. [Follow this path](/customization/css-in-js/) to read the documentation of the default style implementation.

Material-UI 旨在为构建动态 UI 提供强大的基础。 为了简单起见, **我们向用户公开我们的样式解决方案 **。 你可以使用它，但是你不需要这样做。 该样式解决方案可[与所有其他主要解决方案](/guides/interoperability/)互操作

## Material-UI 的样式解决方案

在以前的版本中，Material-UI 使用 LESS，然后是自定义内嵌式的解决方案来编写组件的样式，但是这些方法已被证明是有限制的。 最近，我们[迁移](https://github.com/oliviertassinari/a-journey-toward-better-style)到*CSS-in-JS*的解决方案中去。 它**解锁了许多很棒的功能**（主题嵌套、动态样式、自我支持等...） We think that this is the future:

- [统一的样式语言](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [将SCSS（Sass）转换为CSS-in-JS](https://egghead.io/courses/convert-scss-sass-to-css-in-js)

Material-UI's styling solution is inspired by many other CSS-in-JS libraries like [styled-components](https://www.styled-components.com/) and [emotion](https://emotion.sh/).

- 💅 You can expect [the same advantages](https://www.styled-components.com/docs/basics#motivation) as styled-components.
- 🚀 Is [blazing fast](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-benchmark/README.md#material-uistyles). x2.6 faster than emotion on the server for rendering static style sheets.
- 🧩 Is extensible via a [plugins](https://github.com/cssinjs/jss/blob/master/docs/plugins.md) API.
- ⚡️ It uses [JSS](https://github.com/cssinjs/jss) at its core. It's a [high performance](https://github.com/cssinjs/jss/blob/master/docs/performance.md) JavaScript to CSS compiler which works at runtime and server-side.
- 📦 Less than [15 KB gzipped](https://bundlephobia.com/result?p=@material-ui/styles).

## 安装

下载并保存到你的 `package.json` 依赖，运行

```sh
// with npm
npm install @material-ui/styles

// with yarn
yarn add @material-ui/styles
```

> Please note that it depends on *react@next* and *react-dom@next*.

### Migration for `@material-ui/core` users

To switch from the default style implementation to this newest version, you need to execute the following code **before importing any** Material-UI's components:

```js
import { install } from '@material-ui/styles';

install();
```

It is **recommended** to place the above code in a separate file (e.g. `bootstrap.js`) and to import it in your application's entry point (e.g. `index.js`). This ensures that the installation is executed before anything else, because ECMAScript imports are hoisted to the top of the module. If the installation step is not performed correctly the resulting build could have conflicting class names.

We will make `@material-ui/styles` the default style implementation for the core components in Material-UI v4. This installation step is **temporary**. Behind the scenes, the `install()` function switches the styling engine the core components use.

Also, the `@material-ui/core/MuiThemeProvider` component can be replaced with `@material-ui/styles/ThemeProvider`. We will remove this component in v4.

## Getting started

We provide 3 different APIs. They all share the same underlying logic.

### Hook API

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}
```

{{"demo": "pages/css-in-js/basics/Hook.js", "react": "next"}}

### Styled components API

```jsx
import React from 'react';
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}
```

{{"demo": "pages/css-in-js/basics/StyledComponents.js", "react": "next"}}

### Higher-order component API

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function HigherOrderComponent(props) {
  const { classes } = props;
  return <Button className={classes.root}>Higher-order component</Button>;
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
```

{{"demo": "pages/css-in-js/basics/HigherOrderComponent.js", "react": "next"}}

## Adapting based on props

You can pass a function ("interpolations") to a style property to adapt it based on its props. This button component has a color property that changes its color:

### Adapting hook API

{{"demo": "pages/css-in-js/basics/AdaptingHook.js", "react":"next"}}

### Adapting styled components API

{{"demo": "pages/css-in-js/basics/AdaptingStyledComponents.js", "react": "next"}}

### Adapting higher-order component API

{{"demo": "pages/css-in-js/basics/AdaptingHOC.js", "react": "next"}}