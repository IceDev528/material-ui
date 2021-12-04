# 从 v4 迁移到 v5 版本

<p class="description">是的，我们已经发布了 v5 版本！</p>

如果你在寻找v4版本的文档，可以在这里 [查看最近版本](https://mui.com/versions/)。

## 简介

这是一个将您的网站从MUI core v4版本升级到v5版本的参考。 您可能不需要将本篇文章涵盖的所有内容运用到你的站点上。 我们将尽最大努力使文档易于理解，并尽可能有序地向您介绍，以便您可以快速上手 v5！

## 为什么您需要迁移呢

能够获得对之前版本bug的修复，并增加了很多改进：如使用了新的样式引擎。 这个文档包含 **如何**将v4版本迁移到v5版。 关于迁移的**原因**，我们 [发布了一篇博客](/blog/mui-core-v5/)来详细解说。

## 迁移步骤

- [更新 React & TypeScript](#update-react-amp-typescript-version)
- [安装 ThemeProvider](#themeprovider-setup)
- [更新 MUI](#update-material-ui-version)
- [运行代码模块（codemods）](#run-codemods)
  - [preset-safe](#preset-safe)
  - [variant-prop (可选)](#variant-prop)
  - [link-underline-hover (可选)](#link-underline-hover)
- [处理重大变更](#handling-breaking-changes)
- [将theme的 `styleOverrides`迁移至emotion](#migrate-themes-styleoverrides-to-emotion)
- [从 JSS 迁移](#migrate-from-jss)
- [故障排除（Troubleshooting）](#troubleshooting)

> 💡 目标是创建最小的更改，使迁移更顺利。 如果您遇到任何问题，请检查 [疑难解答](#troubleshooting) 部分。 对于其它没有在此文档描述的错误，请以此格式`[Migration] Summary of your issue`[创建问题](https://github.com/mui-org/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.yml)。

## 更新 React & TypeScript 版本

- 支持**React**的最低版本从 v16.8.0 提高至 v17.0.0。
- 支持**TypeScript** 的最低版本从 v3.2 提高至 v3.5.

  > 我们尝试尽可能的与发布在 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) 中的类型保持一致（如：发布于npm中`@types`命名空间内的包）。 我们不会在主要版本的MUI中更改支持的最低版本。 然而，我们通常建议不要使用低于 [DefinitelyTyped支持的最低版本](https://github.com/DefinitelyTyped/DefinitelyTyped#older-versions-of-typescript-33-and-earlier)的TypeScript 版本。

**注意：** 如果您的项目包含以下包，请将它们升级到`最新`版本。

- `react-scripts`
- `@types/react`
- `@types/react-dom`

> 📝 请确保在继续下一步之前您的应用能够 **正常运行**没有报错并且 **应用了** 更改。

## 安装 `ThemeProvider`

在升级到v5前，请确保 `ThemeProvider` 应用在您程序的根节点（即使您正在使用**default theme**）并且在`<ThemeProvider>`之前**没有**调用`useStyles`。 这是因为我们将要使用 `@mui/styles` **临时的** (JSS style-engine), 他需要使用 `ThemeProvider`。

```js
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // 一些能够访问到theme的CSS代码
  }
});

function App() {
  const classes = useStyles(); // ❌ 如果您用到这段代码，请考虑将它移动到包裹在<ThemeProvider>的组件内，
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

> 📝 在进行下一步前，请确保您的程序仍然可以正确**运行**没有报错并且已经**应用了**更改。

## 升级 MUI 版本

为了使用 `v5` 版本的 MUI Core，您首选需要升级下面的软件包：

```sh
npm install @mui/material @mui/styles

// or with `yarn`
yarn add @mui/material @mui/styles
```

**可选**：如果您使用了下面的软件包，单独安装新的软件包：

- `@material-ui/lab`，对应 `@mui/lab`
- `@material-ui/icons`，对应 `@mui/icons-material`

<details>
<summary>查看所有软件包更改</summary>

```text
@material-ui/core -> @mui/material
@material-ui/system -> @mui/system
@material-ui/unstyled -> @mui/base
@material-ui/styles -> @mui/styles
@material-ui/icons -> @mui/icons-material
@material-ui/lab -> @mui/lab
@material-ui/types -> @mui/types
@material-ui/styled-engine -> @mui/styled-engine
@material-ui/styled-engine-sc ->@mui/styled-engine-sc
@material-ui/private-theming -> @mui/private-theming
@material-ui/codemod -> @mui/codemod
@material-ui/docs -> @mui/docs
@material-ui/envinfo -> @mui/envinfo
```

作为品牌重塑工作的一部分，组织名和程序包名称已经从`@material-ui` 变更为 [`@mui`](https://www.npmjs.com/org/mui)。 您可以在这里[blog post](/blog/material-ui-is-now-mui/) 或者这里 [#27803](https://github.com/mui-org/material-ui/discussions/27803)查看更多细节。

</details>

然后，您需要添加新的对等依赖 - emotion 软件包：

```sh
npm install @emotion/react @emotion/styled

// or with `yarn`
yarn add @emotion/react @emotion/styled
```

> 💡 如果您想要使用 MUI Core v5 的同时使用 **styled-components** 而不是 emotion，请查看[安装指引](/getting-started/installation/#npm)。

如果您使用 `@material-ui/pickers`，必须将其迁移到 `@mui/lab`。 您可以参考 [这些步骤](#material-ui-pickers)。

至此，您应该已经安装了 `@mui/styles` 。 它包含与emotion冗余的JSS， 这意味着您可以渐进式地升级到v5。 您可以依照[这些步骤](#migrate-from-jss)移除依赖。

> 📝 在进行下一步前，请确保您的程序仍然可以正确**运行**没有报错并且已经**应用了**更改。

一旦您的应用完全迁移到MUI v5，您可以通过执行 `yarn remove` 或者 `npm uninstall` 移除旧的`@material-ui/*`软件包。

## 运行codemods

我们准备了一些codemods，提高您的迁移体验。

### preset-safe

这个codemods包含了大部分的有助于迁移的转换器。 （**这个codemod在每个目录下仅应当应用一次**）

```sh
npx @mui/codemod v5.0.0/preset-safe <path>
```

> 如果您想逐一运行此转换器，请查看这个文档 [preset-safe codemod](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md#-preset-safe) 。

### variant-prop

如果`<TextField/>, <FormControl/>, <Select/>` 这些组件没有定义variant属性，则需要应用 `variant="standard"` （因为属性variant的默认值从**v4** 的`standard` 变为**v5**的 `outlined` ）。

> ❗️ 如果您已经在主题中定义了默认值`variant: "outlined"`，那么您**不应该**应用此codemod。

```js
// 如果您的主题像这样设置，❌请不要运行此codemod。
// 这些默认属性可以在之后移除，因为`outlined`在v5里面是默认值。
createMuiTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

但是，如果您想要在组件中保留`variant="standard"`，请执行此codemod或在主题中配置默认属性。

```sh
npx @mui/codemod v5.0.0/variant-prop <path>
```

更多技术细节请参考此链接 [variant-prop codemod](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md#variant-prop)。

### link-underline-hover

如果没有在 `<Link/>`组件中定义`underline`属性，请应用 `underline="hover"` 。（因为`underline`属性的默认值从v4的 `"hover"` 变更为**v5**的 `"always"`）。

> ❗️ 如果您已经在主题中定义了`underline: "always"`，那么您**不应该**使用此codemod。

```js
// 如果您的主题像这样设置，❌请不要运行此codemod。
// 这些默认属性可以在之后移除，因为`always`在v5里面是默认值。
createMuiTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'always',
      },
    },
  },
});
```

但是，如果您想要在组件中保留`variant="hover"`，请执行此codemod或在主题中配置默认属性。

```sh
npx @mui/codemod v5.0.0/link-underline-hover <path>
```

更多技术细节请参考此链接 [link-underline-hover codemod](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md#link-underline-hover)。

一旦您完成了codemod步骤，请尝试再次运行您的应用程序。 此刻，您的程序应该可以运行并没有报错。 否则查看 [故障排除](#troubleshooting)章节。 下一步，处理各组件中不兼容的改动。

## 处理变化带来的系统崩溃

### 支持的浏览器和node版本

默认捆绑包的目标已更改。 实际支持的版本将在发布时从浏览器列表中查询 `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`。

默认捆绑包支持以下最小版本：

<!-- #stable-snapshot -->

- Node 12（最低兼容到 8）
- Chrome 84（最低兼容到 49）
- Edge 91（最低兼容到 14）
- Firefox 78（最低兼容到 52）
- Safari 14 (macOS) 和 12.5 (iOS)（最低兼容到 10）
- 更多内容请（参阅 [.browserslistrc (`stable` entry)](https://github.com/mui-org/material-ui/blob/HEAD/.browserslistrc#L11)）

不再支持 IE 11。 如果你需要对 IE 11 进行兼容性支持，请查看我们的 [旧版本包](/guides/minimizing-bundle-size/#legacy-bundle)。

### 非转发类（non-ref-forwarding class）组件

对 `component` 属性中的非转发（non-ref-forwarding）类组件或作为直接 `子类（children）` 的支持已被放弃。 如果你使用了 `unstable_createStrictModeTheme` 或者在 `React.StrictMode` 中没有看到任何与 `findDOMNode` 相关的任何警告，那么你不需要做任何事情。 否则请查看我们指南中的 [“注意事项与参考文献”部分](/guides/composition/#caveat-with-refs) 来了解如何迁移。 这个变化几乎影响了所有使用 `component` 属性的组件或者将 `children` 传递给要求 `children` 作为元素的组件（例如 `<MenuList><CustomMenuItem /></MenuList>`）

### 样式库

v5版默认使用 [`emotion`](https://github.com/emotion-js/emotion)样式库。 从JSS向emotion迁移时，如果您正在使用JSS样式渲染您的组件（例如使用`makeStyles`创建的渲染），您需要注意CSS注入顺序。 为了做到这点，您需要在**组件树的顶部**包含`StyledEngineProvider`，并且包含`injectFirst`属性。

> ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

下面是一个示例：

```jsx
import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

export default function GlobalCssPriority() {
  return (
    {/* 在JSS前注入emotion */}
    <StyledEngineProvider injectFirst>
      {/* 您的组件树 现在您可以覆盖 Material-UI 的样式。 */}
    </StyledEngineProvider>
  );
}
```

> **注意：** 如果您使用emotion样式库渲染您的应用，并且有一个自定义缓存，它会覆盖MUI提供的缓存。 为了使注入顺序仍然正确，您需要添加 `prepend` 选项到 `createCache` 中。
> 
> ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

下面是一个示例：

```diff
 import * as React from 'react';
 import { CacheProvider } from '@emotion/react';
 import createCache from '@emotion/cache';

 const cache = createCache({
   key: 'css',
+  prepend: true,
 });

 export default function PlainCssPriority() {
   return (
     <CacheProvider value={cache}>
       {/* 您的组件树。 现在您可以覆盖 Material-UI 的样式。 */}
     </CacheProvider>
   );
 }
```

> **注意：** 如果您正在使用 styled-components 并且有带有自定义 `target`属性的`StyleSheetManager` ，请确保目标是HTML `<head>`中的第一个元素。 如果想了解更多细节，请查阅`@mui/styled-engine-sc`程序包中的[`StyledEngineProvider` implementation](https://github.com/mui-org/material-ui/blob/master/packages/mui-styled-engine-sc/src/StyledEngineProvider/StyledEngineProvider.js)。

### 主题结构

主题的结构在v5段中发生了变化。 您需要更新它的结构。 为了更顺畅的过渡， `adaptV4Theme` 助手允许您逐渐升级一些主题更改到新主题结构。

> ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

```diff
-import { createMuiTheme } from '@mui/material/styles';
+import { createTheme, adaptV4Theme } from '@mui/material/styles';

-const theme = createMuiTheme({
+const theme = createTheme(adaptV4Theme({
   // v4 版主题代码
-});
+}));
```

> ⚠️ 此适配器只处理 `createTheme`的输入参数， 在创建主题后修改的样式需要手动迁移。

以下更改由适配器支持：

- 事实证明，“水槽（gutters）”这个抽象的概念还没有被频繁使用，所以是没有价值的。

  ```diff
  -theme.mixins.gutters(),
  +paddingLeft: theme.spacing(2),
  +paddingRight: theme.spacing(2),
  +[theme.breakpoints.up('sm')]],
  + paddingLeft: theme.spacing(3),
  + paddingRights: theme.spacing(3),
+},
  ```

- `theme.spacing` 现在默认返回以 px 为单位的单个数值。 这一改动改善了与 styled-components & emotion 的整合。

  > ✅ 这已经在 [preset-safe codemod](#preset-safe) 中得到解决，方式是从带有`theme.spacing`的字符串模板中移除 'px' 后缀。

  之前：

  ```js
  `${theme.spacing(2)}px`
  ```

  之后：

  ```js
  `${theme.spacing(2)}`
  ```

- `theme.platette.type` 关键字已重命名为 `theme.pallette.mode`, 以便更好地遵循通常用于描述此功能的“深色模式”术语。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    import { createTheme } from '@mui/material/styles';
  >   -const theme = createTheme({palette: { type: 'dark' }}),
  >   +const theme = createTheme({palette: { mode: 'dark' }}),
  > ```

- `theme.palette.info`的默认颜色更改为依照AA标准对比度的颜色值，同时包括浅色模式和深色模式。

  ```diff
   info = {
  -  main: cyan[500],
  +  main: lightBlue[700], // lightBlue[400] 在“深色模式”中

  -  light: cyan[300],
  +  light: lightBlue[500], // lightBlue[300] 在“深色模式”中

  -  dark: cyan[700],
  +  dark: lightBlue[900], // lightBlue[700] 在“深色模式”中

   }
  ```

- `theme.palette.success`的默认颜色更改为依照AA标准对比度的颜色值，同时包括浅色模式和深色模式。

  ```diff
   success = {
  -  main: green[500],
  +  main: green[800], // green[400] 在“深色模式”中

  -  light: green[300],
  +  light: green[500], // green[300] 在“深色模式”中

  -  dark: green[700],
  +  dark: green[900], // green[700] 在“深色模式”中
   }
  ```

- `theme.palette.warning`的默认颜色更改为依照AA标准对比度的颜色值，同时包括浅色模式和深色模式。

  ```diff
   warning = {
  -  main: orange[500],
  +  main: "#ED6C02", // orange[400]  在“深色模式”中

  -  light: orange[300],
  +  light: orange[500], // orange[300]  在“深色模式”中

  -  dark: orange[700],
  +  dark: orange[900], // orange[700]  在“深色模式”中
   }
  ```

- `theme.palette.text.hint` 在MUI组件中未被使用，已经被删除。 如果仍需要使用它，您可以添加回去：

  ```diff
   import { createTheme } from '@mui/material/styles';

  -const theme = createTheme(),
  +const theme = createTheme({
  +  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  +});
  ```

- 组件的样式在主题中的结构调整为在 `components` 关键字内，为了更容易识别组件相关的样式定义。

  1. `属性`

  ```diff
   import { createTheme } from '@mui/material/styles';

   const theme = createTheme({
  -  props: {
  -    MuiButton: {
  -      disableRipple: true,
  -    },
  -  },
  +  components: {
  +    MuiButton: {
  +      defaultProps: {
  +        disableRipple: true,
  +      },
  +    },
  +  },
   });
  ```

  2. `覆盖`

  ```diff
   import { createTheme } from '@mui/material/styles';

   const theme = createTheme({
  -  overrides: {
  -    MuiButton: {
  -      root: { padding: 0 },
  -    },
  -  },
  +  components: {
  +    MuiButton: {
  +      styleOverrides: {
  +        root: { padding: 0 },
  +      },
  +    },
  +  },
   });
  ```

### Styles（样式表单）

- 为更好地描述功能，我们将 `fade` 重命名为 `alpha`。 当输入颜色已经有一个 alpha 值时，以前的名称会导致混乱。 **overrides** 助手覆盖了颜色的 alpha 值。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   - import { fade } from '@mui/material/styles';
  >   + import { alpha } from '@mui/material/styles';
  > 
  >   const classes = makeStyles(theme => ({
  >   -  backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   +  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  >   }));
  > ```

- `createStyles` 方法从 `@mui/material/styles` 移动到 `@mui/styles`。 这对于移除核心包对 `@mui/styles` 的依赖性是必要的。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { createStyles } from '@mui/material/styles';
  >   +import { createStyles } from '@mui/styles';
  > ```

### @mui/styles

#### ThemeProvider

如果您正在使用 `@mui/styles` 以及 `@mui/material`的工具集，您应该将`ThemeProvider` 的引用从 `@mui/styles` 改为 `@mui/material/styles`。 这样做，才能让 `@mui/styles`中的`makeStyles`、`withStyles`等函数，以及MUI组件能够使用context中的 `theme`。

```diff
-import { ThemeProvider } from '@mui/styles';
+import { ThemeProvider } from '@mui/material/styles';
```

请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。

#### Default theme (TypeScript)

`@mui/styles` 包不再是 `@mui/material/styles` 的一部分。 如果您正在使用 `@mui/styles` 以及 `@mui/materials` 您需要为 `DefaultTheme` 添加模块扩充。

> ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

```ts
// 在您的主题文件中调用 `createTheme()`
import { Theme } from '@mui/material/styles';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}
```

### @mui/material/colors

- 超过1级嵌套导入是私有的。 您不能从 `@mui/material/colors/red` 导入颜色。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import red from '@mui/material/colors/red';
  >   +import { red } from '@mui/material/colors';
  > ```

### @mui/material/styles

#### createGenerateClassName

- `createGenerateClassName` 功能不再从 `@mui/material/styles` 导出。 你应该直接从 `@mui/styles` 导入它。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { createGenerateClassName } from '@mui/material/styles';
  >   +import { createGenerateClassName } from '@mui/styles';
  > ```

  **不使用**`@mui/styles`生成自定义类名称，请参考[ClassNameGenerator](/guides/classname-generator/)。

#### createMuiTheme

- 函数 `createMuiTheme` 被重命名为 `createTheme` 以使其更加直观地使用 `ThemeProvider`。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { createMuiTheme } from '@mui/material/styles';
  >   +import { createTheme } from '@mui/material/styles';
  > 
  >   -const theme = createMuiTheme({
  >   +const theme = createTheme({
  > ```

#### jssPreset

- `jssPreset` 对象不再从 `@mui/material/styles`导出。 你应该直接从 `@mui/styles` 导入它。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { jssPreset } from '@mui/material/styles';
  >   +import { jssPreset } from '@mui/styles';
  > ```

#### makeStyles

- `makeStyles` 对象不再从 `@mui/material/styles`导出。 你可以使用 `@mui/styles/ makeStyles`导入。 请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。 如果您正在使用此工具与 `@mui/materials`, 建议您使用 `@mui/material/styles` 的 `ThemeProvider` 组件代替。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { makeStyles } from '@mui/material/styles';
  >   +import { makeStyles } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
  > 
  >   +const theme = createTheme();
  >    const useStyles = makeStyles((theme) => ({
  >      background: theme.palette.primary.main,
  >    }));
  >    function Component() {
  >      const classes = useStyles();
  >      return <div className={classes.root} />
  >    }
  > 
  >    // 在您程序的根节点
  >    function App(props) {
  >   -  return <Component />;
  >   +  return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
  >    }
  > ```

#### MuiThemeProvider

- `MuiThemeProvider` 组件不再从 `@mui/material/styles` 导出。 使用 `ThemeProvider` 代替。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { MuiThemeProvider } from '@mui/material/styles';
  >   +import { ThemeProvider } from '@mui/material/styles';
  > ```

#### ServerStyleSheets

- `ServerStyleSheets` 组件不再从 `@mui/material/styles` 导出。 你应该直接从 `@mui/styles` 导入它。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { ServerStyleSheets } from '@mui/material/styles';
  >   +import { ServerStyleSheets } from '@mui/styles';
  > ```

#### styled

- `styled` JSS 工具集不再从 `@mui/material/styles` 导出。 您可以从 `@mui/styles` 导出。 请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。 如果您正在使用此工具与 `@mui/materials`, 建议您使用 `@mui/material/styles` 的 `ThemeProvider` 组件代替。

  ```diff
  -import { styled } from '@mui/material/styles';
  +import { styled } from '@mui/styles';
  +import { createTheme, ThemeProvider } from '@mui/material/styles';

  +const theme = createTheme();
   const MyComponent = styled('div')(({ theme }) => ({ background: theme.palette.primary.main }));

   function App(props) {
  -  return <MyComponent />;
  +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
   }
  ```

#### StylesProvider

- `stylesProvider` 组件不再从 `@mui/material/styles` 导出。 你应该直接从 `@mui/styles` 导入它。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { StylesProvider } from '@mui/material/styles';
  >   +import { StylesProvider } from '@mui/styles';
  > ```

#### useThemeVariants

- `useThemeVariants` 钩子函数不再从 `@mui/material/styles` 导出。 你应该直接从 `@mui/styles` 导入它。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { useThemeVariants } from '@mui/material/styles';
  >   +import { useThemeVariants } from '@mui/styles';
  > ```

#### withStyles

- 用 `ref` prop替换 `innerRef` prop。 Refs现在自动转发到内部组件。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    import * as React from 'react';
  >    import { withStyles } from '@mui/styles';
  > 
  >    const MyComponent = withStyles({
  >      root: {
  >        backgroundColor: 'red',
  >      },
  >    })(({ classes }) => <div className={classes.root} />);
  > 
  >    function MyOtherComponent(props) {
  >      const ref = React.useRef();
  >   -  return <MyComponent innerRef={ref} />;
  >   +  return <MyComponent ref={ref} />;
  >    }
  > ```

- `withStyles` JSS工具集不再从 `@mui/material/styles` 导出。 你可以使用 `@mui/styles/withStyles`代替。 请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。 如果你正在使用此工具集与 `@mui/materials`, 你应该使用 `@mui/material/styles` 的`ThemeProvider` 组件代替。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { withStyles } from '@mui/material/styles';
  >   +import { withStyles } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
  > 
  >   +const defaultTheme = createTheme();
  >    const MyComponent = withStyles((props) => {
  >      const { classes, className, ...other } = props;
  >      return <div className={clsx(className, classes.root)} {...other} />
  >    })(({ theme }) => ({ root: { background: theme.palette.primary.main }}));
  > 
  >    function App() {
  >   -  return <MyComponent />;
  >   +  return <ThemeProvider theme={defaultTheme}><MyComponent /></ThemeProvider>;
  >    }
  > ```

#### withTheme

- `withTheme` HOC工具集已经从 `@mui/material/styles` 软件包中删除。 您可以使用 `@mui/styles/withTheme` 代替。 请确保在您的应用程序的根节点添加一个 `ThemeProvider` ，因为 `defaultTheme` 已不可用。 如果您正在使用此工具与 `@mui/materials`, 建议您使用 `@mui/material/styles` 的 `ThemeProvider` 组件代替。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import { withTheme } from '@mui/material/styles';
  >   +import { withTheme } from '@mui/styles';
  >   +import { createTheme, ThemeProvider } from '@mui/material/styles';
  > 
  >   +const theme = createTheme();
  >    const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);
  > 
  >    function App(props) {
  >   -  return <MyComponent />;
  >   +  return <ThemeProvider theme={theme}><MyComponent {...props} /></ThemeProvider>;
  >    }
  > ```

- 用 `ref` prop替换 `innerRef` prop。 Refs现在自动转发到内部组件。

  ```diff
  import * as React from 'react';
  import { withTheme } from '@mui/styles';

  const MyComponent = withTheme(({ theme }) => <div>{props.theme.direction}</div>);

  function MyOtherComponent(props) {
    const ref = React.useRef();
  - return <MyComponent innerRef={ref} />;
  + return <MyComponent ref={ref} />;
  }
  ```

#### withWidth

- HOC已被移除。 有一个使用 [`useMediaQuery` 钩子函数](/components/use-media-query/#migrating-from-withwidth) 的替代方法。

  > ✅ 这是在 [preset-safe codemod](#preset-safe) 中通过应用硬编码函数来处理的，以防止应用程序崩溃。

### @mui/icons-material

#### GitHub

`GitHub` 图标的大小已从24px 缩小到22px 宽，以与其他图标的大小相匹配。

### @material-ui/pickers

我们有一个 [专用页面](/guides/pickers-migration/) 用于迁移 `@material-ui/pickers` 到 v5

### System 系统

- 以下系统函数(和属性)因被视为废弃的CSS而更名：

  - `gridGap` 更改为 `gap`
  - `gridRowGap` 更改为 `rowGap`
  - `gridColumnGap` 更改为 `columnGap`

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

- 在  `gap`，`rowGap` 和 `columnGap` 中使用间距单位。 如果你先前使用了一个数字，你需要添加px后缀来绕过 `theme.spaming` 的新转换。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Box
  >   -  gap={2}
  >   +  gap="2px"
  >    >
  > ```

- 将 `css` 属性替换为 `sx` 以避免与emotion的styled-components的 `css` 属性发生冲突。.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Box css={{ color: 'primary.main' }} />
  >   +<Box sx={{ color: 'primary.main' }} />
  > ```

  > 请注意，grid 函数未在v4系统中还未被使用。

### 核心组件

由于核心组件使用emotion作为其样式引擎，emotion使用的属性不会被截获。 在下面的代码片段中 `as` 属性将不会被传递到`SomeOtherComponent`.

```jsx
<MuiComponent component={SomeOtherComponent} as="button" />
```

### AppBar 应用栏组件

- 当位置静态和相对位置时移除z-index。 这就避免了建立堆积性环境和渲染问题。
- `color` 属性在深色模式下不再有任何影响。 AppBar的背景颜色遵循 [Material设计指南](https://material.io/design/color/dark-theme.html)。 使用 `enableColorOnDark` 来恢复v4的行为。

  ```jsx
  <AppBar enableColorOnDark />
  ```

### Alert 警告提示

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import Alert from '@mui/lab/Alert';
  >   -import AlertTitle from '@mui/lab/AlertTitle';
  >   +import Alert from '@mui/material/Alert';
  >   +import AlertTitle from '@mui/material/AlertTitle';
  > ```

### Autocomplete 自动补全组件

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import Autocomplete from '@mui/lab/Autocomplete';
  >   -import useAutocomplete  from '@mui/lab/useAutocomplete';
  >   +import Autocomplete from '@mui/material/Autocomplete';
  >   +import useAutoComplete from '@mui/material/useAutocomplete';
  > ```

- 移除 `debug` 属性。 有几个更简单的方式来使用它：`open={true}`，Chrome 开发者调试工具 [“Emulate focused”](https://twitter.com/sulco/status/1305841873945272321)，或者使用 React 开发工具的属性设置器（prop setter）。
- `renderOption` 现在应该返回选项的完整 DOM 结构。 这样做可以让定制组件变得更加容易。 你可以通过下面方法进行修复：

  ```diff
   <Autocomplete
  -  renderOption={(option, { selected }) => (
  -    <React.Fragment>
  +  renderOption={(props, option, { selected }) => (
  +    <li {...props}>
         <Checkbox
           icon={icon}
           checkedIcon={checkedIcon}
           style={{ marginRight: 8 }}
           checked={selected}
         />
         {option.title}
  -    </React.Fragment>
  +    </li>
     )}
   />
  ```

- 将 `closeIcon` 属性重命名为 `clearIcon` 以避免混淆。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Autocomplete closeIcon={defaultClearIcon} />
  >   +<Autocomplete clearIcon={defaultClearIcon} />
  > ```

- The following values of the reason argument in `onChange` and `onClose` were renamed for consistency:

  1. `create-option` to `createOption`
  2. `select-option` to `selectOption`
  3. `remove-option` to `removeOption`

- Change the CSS rules that use `[data-focus="true"]` to use `.Mui-focused`. The `data-focus` attribute is not set on the focused option anymore, instead, global class names are used.

  ```diff
  -'.MuiAutocomplete-option[data-focus="true"]': {
  +'.MuiAutocomplete-option.Mui-focused': {
  ```

- Rename `getOptionSelected` to `isOptionEqualToValue` to better describe its purpose.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Autocomplete
  >   -  getOptionSelected={(option, value) => option.title === value.title}
  >   +  isOptionEqualToValue={(option, value) => option.title === value.title}
  > ```

### Avatar 头像组件

- Rename `circle` to `circular` for consistency:

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Avatar variant="circle">
  >   -<Avatar classes={{ circle: 'className' }}>
  >   +<Avatar variant="circular">
  >   +<Avatar classes={{ circular: 'className' }}>
  > ```

  Since `circular` is the default value, the variant prop can be deleted:

  ```diff
  -<Avatar variant="circle">
  +<Avatar>
  ```

- Move the AvatarGroup from the lab to the core.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import AvatarGroup from '@mui/lab/AvatarGroup';
  >   +import AvatarGroup from '@mui/material/AvatarGroup';
  > ```

### Badge 徽章

- Rename `circle` to `circular` and `rectangle` to `rectangular` for consistency.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Badge overlap="circle">
  >   -<Badge overlap="rectangle">
  >   +<Badge overlap="circular">
  >   +<Badge overlap="rectangular">
  > ```

  ```diff
   <Badge classes={{
  -  anchorOriginTopRightRectangle: 'className',
  -  anchorOriginBottomRightRectangle: 'className',
  -  anchorOriginTopLeftRectangle: 'className',
  -  anchorOriginBottomLeftRectangle: 'className',
  -  anchorOriginTopRightCircle: 'className',
  -  anchorOriginBottomRightCircle: 'className',
  -  anchorOriginTopLeftCircle: 'className',
  +  anchorOriginTopRightRectangular: 'className',
  +  anchorOriginBottomRightRectangular: 'className',
  +  anchorOriginTopLeftRectangular: 'className',
  +  anchorOriginBottomLeftRectangular: 'className',
  +  anchorOriginTopRightCircular: 'className',
  +  anchorOriginBottomRightCircular: 'className',
  +  anchorOriginTopLeftCircular: 'className',
   }}>
  ```

### BottomNavigation

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
  +<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
  ```

### BottomNavigationAction

- Remove the `span` element that wraps the children. Remove the `wrapper` classKey too. More details about [this change](https://github.com/mui-org/material-ui/pull/26923).

  ```diff
   <button class="MuiBottomNavigationAction-root">
  -  <span class="MuiBottomNavigationAction-wrapper">
       {icon}
       <span class="MuiBottomNavigationAction-label">
         {label}
       </span>
  -  </span>
   </button>
  ```

### Box 分组

- The `borderRadius` system prop value transformation has been changed. If it receives a number, it multiplies this value with the `theme.shape.borderRadius` value. Use a string to provide an explicit `px` value.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Box borderRadius="borderRadius">
  >   +<Box borderRadius={1}>
  > ```

  ```diff
  -<Box borderRadius={16}>
  +<Box borderRadius="16px">
  ```

- The Box system props have an optional alternative API in v5, using the `sx` prop. You can [read this section](/system/basics/#api-tradeoff) for the "why" behind this new API.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```jsx
  >   <Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
  >   <Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
  > ```

- The following properties have been renamed because they are considered deprecated CSS properties by the CSS specification:

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

  1. `gridGap` 更改为 `gap`
  2. `gridColumnGap` 更改为 `columnGap`
  3. `gridRowGap` 更改为 `rowGap`

  ```diff
  -<Box gridGap={1}>
  -<Box gridColumnGap={2}>
  -<Box gridRowGap={3}>
  +<Box gap={1}>
  +<Box columnGap={2}>
  +<Box rowGap={3}>
  ```

  (Note that the system grid function wasn't documented in v4.)

- The `clone` prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a MUI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }} clone>
  -  <Button>Save</Button>
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

- The ability to pass a render prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a MUI component.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <Button {...props}>Save</Button>}
  -</Box>
  +<Button sx={{ border: '1px dashed grey' }}>Save</Button>
  ```

  For non-MUI components, use the `component` prop.

  ```diff
  -<Box sx={{ border: '1px dashed grey' }}>
  -  {(props) => <button {...props}>Save</button>}
  -</Box>
  +<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
  ```

### Button 按钮

- The button `color` prop is now "primary" by default, and "default" has been removed. This makes the button closer to the Material Design guidelines and simplifies the API.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Button color="default">
  >   +<Button>
  > ```

  If you prefer to use the `default` color in v4, take a look at this [CodeSandbox](https://codesandbox.io/s/mimic-v4-button-default-color-bklx8?file=/src/Demo.tsx)

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
   <button class="MuiButton-root">
  -  <span class="MuiButton-label">
       children
  -  </span>
   </button>
  ```

### Chip

- Rename `default` variant to `filled` for consistency.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

  Since `filled` is the default value, the variant prop can be deleted:

  ```diff
  -<Chip variant="default">
  +<Chip>
  ```

### Checkbox 选择框

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### CircularProgress

- The `static` variant has been renamed to `determinate`, and the previous appearance of `determinate` has been replaced by that of `static`. It was an exception to Material Design, and was removed from the specification.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<CircularProgress variant="static" classes={{ static: 'className' }} />
  >   +<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
  > ```

> NB: If you had previously customized determinate, your customizations are probably no longer valid. Please remove them.

### Collapse 折叠

- The `collapsedHeight` prop was renamed `collapsedSize` to support the horizontal direction.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Collapse collapsedHeight={40}>
  >   +<Collapse collapsedSize={40}>
  > ```

- The `classes.container` key was changed to match the convention of the other components.

  ```diff
  -<Collapse classes={{ container: 'collapse' }}>
  +<Collapse classes={{ root: 'collapse' }}>
  ```

### CssBaseline

- The component was migrated to use the `@mui/styled-engine` (`emotion` or `styled-components`) instead of `jss`. You should remove the `@global` key when defining the style overrides for it. You could also start using the CSS template syntax over the JavaScript object syntax.

  ```diff
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
  -     styleOverrides: {
  -       '@global': {
  -         html: {
  -           WebkitFontSmoothing: 'auto',
  -         },
  -       },
  -     },
  +     styleOverrides: `
  +       html {
  +         -webkit-font-smoothing: auto;
  +       }
  +     `
      },
    },
  });
  ```

- The `body` font size has changed from `theme.typography.body2` (`0.875rem`) to `theme.typography.body1` (`1rem`). To return to the previous size, you can override it in the theme:

  ```js
  const theme = createMuiTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
            letterSpacing: '0.01071em',
          },
        },
      },
    },
  });
  ```

### Dialog 对话框

- The onE\* transition props were removed. Use TransitionProps instead.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Dialog
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

- Remove the `disableBackdropClick` prop because it is redundant. Ignore close events from `onClose` when `reason === 'backdropClick'` instead.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Dialog
  >   -  disableBackdropClick
  >   -  onClose={handleClose}
  >   +  onClose={(event, reason) => {
  >   +    if (reason !== 'backdropClick') {
  >   +      handleClose(event, reason);
  >   +    }
  >   +  }}
  >    />
  > ```

- Remove the `withMobileDialog` higher-order component. The hook API allows a simpler and more flexible solution:

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying hard-coded function to prevent application crash, further fixes are required. 
  > 
  > ```diff
  >   -import withMobileDialog from '@mui/material/withMobileDialog';
  >   +import { useTheme, useMediaQuery } from '@mui/material';
  > 
  >   function ResponsiveDialog(props) {
  >   - const { fullScreen } = props;
  >   + const theme = useTheme();
  >   + const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  >     const [open, setOpen] = React.useState(false);
  > 
  >   // ...
  > 
  >   -export default withMobileDialog()(ResponsiveDialog);
  >   +export default ResponsiveDialog;
  > ```

- Flatten DialogTitle DOM structure, remove `disableTypography` prop

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<DialogTitle disableTypography>
  >   -  <Typography variant="h4" component="h2">
  >   +<DialogTitle>
  >   +  <Typography variant="h4" component="span">
  >        My header
  >      </Typography>
  > ```

### Divider

- Use border instead of background color. It prevents inconsistent height on scaled screens. If you have customized the color of the border, you will need to update the CSS property override:

  ```diff
  .MuiDivider-root {
  - background-color: #f00;
  + border-color: #f00;
  }
  ```

### ExpansionPanel（扩展面板）

- Rename the `ExpansionPanel` components to `Accordion` to use a more common naming convention:

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import ExpansionPanel from '@mui/material/ExpansionPanel';
  >   -import ExpansionPanelSummary from '@mui/material/ExpansionPanelSummary';
  >   -import ExpansionPanelDetails from '@mui/material/ExpansionPanelDetails';
  >   -import ExpansionPanelActions from '@mui/material/ExpansionPanelActions';
  >   +import Accordion from '@mui/material/Accordion';
  >   +import AccordionSummary from '@mui/material/AccordionSummary';
  >   +import AccordionDetails from '@mui/material/AccordionDetails';
  >   +import AccordionActions from '@mui/material/AccordionActions';
  > 
  >   -<ExpansionPanel>
  >   +<Accordion>
  >   -  <ExpansionPanelSummary>
  >   +  <AccordionSummary>
  >        <Typography>Location</Typography>
  >        <Typography>Select trip destination</Typography>
  >   -  </ExpansionPanelSummary>
  >   +  </AccordionSummary>
  >   -  <ExpansionPanelDetails>
  >   +  <AccordionDetails>
  >        <Chip label="Barbados" onDelete={() => {}} />
  >        <Typography variant="caption">Select your destination of choice</Typography>
  >   -  </ExpansionPanelDetails>
  >   +  </AccordionDetails>
  >      <Divider />
  >   -  <ExpansionPanelActions>
  >   +  <AccordionActions>
  >        <Button size="small">Cancel</Button>
  >        <Button size="small">Save</Button>
  >   -  </ExpansionPanelActions>
  >   +  </AccordionActions>
  >   -</ExpansionPanel>
  >   +</Accordion>
  > ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Accordion onChange={(event: React.ChangeEvent<{}>, expanded: boolean) => {}} />
  +<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
  ```

### ExpansionPanelDetails

- Remove `display: flex` from `AccordionDetails` (formerly `ExpansionPanelDetails`) as its too opinionated. Most developers expect a display block.

### ExpansionPanelSummary

- Rename `focused` to `focusVisible` for consistency:

  ```diff
   <AccordionSummary
     classes={{
  -    focused: 'custom-focus-visible-classname',
  +    focusVisible: 'custom-focus-visible-classname',
     }}
    />
  ```

- Remove `IconButtonProps` prop from `AccordionSummary` (formerly `ExpansionPanelSummary`). The component renders a `<div>` element instead of an `IconButton`. The prop is no longer necessary.

### Fab

- Rename `round` to `circular` for consistency:

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Fab variant="round">
  >   +<Fab variant="circular">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/27112).

  ```diff
   <button class="MuiFab-root">
  -  <span class="MuiFab-label">
       {children}
  -  </span>
   </button>
  ```

### FormControl

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design guidelines.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<FormControl value="Standard" />
  >   -<FormControl value="Outlined" variant="outlined" />
  >   +<FormControl value="Standard" variant="standard" />
  >   +<FormControl value="Outlined" />
  > ```

### FormControlLabel

- The `label` prop is now required. If you were using a `FormControlLabel` without a `label`, you can replace it with just the value of the `control` prop.

```diff
-<FormControlLabel control={<Checkbox />} />
+<Checkbox />
```

### Grid

- Rename `justify` prop to `justifyContent` to align with the CSS property name.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Grid justify="center">
  >   +<Grid justifyContent="center">
  > ```

- The props: `alignItems` `alignContent` and `justifyContent` and their `classes` and style overrides keys were removed: "align-items-xs-center", "align-items-xs-flex-start", "align-items-xs-flex-end", "align-items-xs-baseline", "align-content-xs-center", "align-content-xs-flex-start", "align-content-xs-flex-end", "align-content-xs-space-between", "align-content-xs-space-around", "justify-content-xs-center", "justify-content-xs-flex-end", "justify-content-xs-space-between", "justify-content-xs-space-around" and "justify-content-xs-space-evenly". These props are now considered part of the system, not on the `Grid` component itself. If you still wish to add overrides for them, you can use the `theme.components.MuiGrid.variants` options.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   const theme = createTheme({
  >     components: {
  >       MuiGrid: {
  >   -     styleOverrides: {
  >   -       "align-items-xs-flex-end": {
  >   -         marginTop: '20px',
  >   -       },
  >   -     },
  >   +     variants: {
  >   +       props: { alignItems: "flex-end" },
  >   +       style: {
  >   +         marginTop: '20px',
  >   +       },
  >   +     }],
  >       },
  >     },
  >   });
  > ```

### GridList

- Rename the `GridList` components to `ImageList` to align with the current Material Design naming.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

- Rename the GridList `spacing` prop to `gap` to align with the CSS attribute.
- Rename the GridList `cellHeight` prop to `rowHeight`.
- Add the `variant` prop to GridList.
- Rename the GridListItemBar `actionPosition` prop to `position`. (Note also the related classname changes.)
- Use CSS object-fit. For IE11 support either use a polyfill such as https://www.npmjs.com/package/object-fit-images, or continue to use the v4 component.

  ```diff
  -import GridList from '@mui/material/GridList';
  -import GridListTile from '@mui/material/GridListTile';
  -import GridListTileBar from '@mui/material/GridListTileBar';
  +import ImageList from '@mui/material/ImageList';
  +import ImageListItem from '@mui/material/ImageListItem';
  +import ImageListItemBar from '@mui/material/ImageListItemBar';

  -<GridList spacing={8} cellHeight={200}>
  -  <GridListTile>
  +<ImageList gap={8} rowHeight={200}>
  +  <ImageListItem>
      <img src="file.jpg" alt="Image title" />
  -    <GridListTileBar
  +    <ImageListItemBar
        title="Title"
        subtitle="Subtitle"
      />
  -  </GridListTile>
  -</GridList>
  +  </ImageListItem>
  +</ImageList>
  ```

### Hidden 隐藏组件

- This component is deprecated because its functionality can be created with the [`sx`](/system/basics/#the-sx-prop) prop or the [`useMediaQuery`](/components/use-media-query/) hook.

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake `Hidden` component to prevent application crash, further fixes are required.

  Use the `sx` prop to replace `implementation="css"`:

  ```diff
  -<Hidden implementation="css" xlUp><Paper /></Hidden>
  -<Hidden implementation="css" xlUp><button /></Hidden>
  +<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
  +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} />
  ```

  ```diff
  -<Hidden implementation="css" mdDown><Paper /></Hidden>
  -<Hidden implementation="css" mdDown><button /></Hidden>
  +<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
  +<Box component="button" sx={{ display: { xs: 'none', md: 'block' } }} />
  ```

  Use the `useMediaQuery` hook to replace `implementation="js"`:

  ```diff
  -<Hidden implementation="js" xlUp><Paper /></Hidden>
  +const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
  +return hidden ? null : <Paper />;
  ```

### 图标

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikely event that you were using the value `default`, the prop can be removed:

  ```diff
  -<Icon fontSize="default">icon-name</Icon>
  +<Icon>icon-name</Icon>
  ```

### IconButton

- The default size's padding is reduced to `8px` which makes the default IconButton size of `40px`. To get the old default size (`48px`), use `size="large"`. The change was done to better match Google's products when Material Design stopped documenting the icon button pattern.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   - <IconButton>
  >   + <IconButton size="large">
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666).

  ```diff
   <button class="MuiIconButton-root">
  -  <span class="MuiIconButton-label">
       <svg />
  -  </span>
   </button>
  ```

### React Link（链接）组件

- The default `underline` prop is changed from `"hover"` to `"always"`. To get the same behavior as in v4, apply `defaultProps` in theme

  > ✅ This is handled in [link-underline-hover codemod](#link-underline-hover), read the details before running this codemod. 
  > 
  > ```js
  >   createTheme({
  >     components: {
  >       MuiLink: {
  >         defaultProps: {
  >           underline: 'hover',
  >         },
  >       },
  >     },
  >   });
  > ```

### Menu

- The onE\* transition props were removed. Use TransitionProps instead.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Menu
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

  > Note: The `selectedMenu` variant will no longer vertically align the selected item with the anchor.

- Change the default value of `anchorOrigin.vertical` to follow the Material Design guidelines. The menu now displays below the anchor instead of on top of it. You can restore the previous behavior with:

  ```diff
   <Menu
  +  anchorOrigin={{
  +    vertical: 'top',
  +    horizontal: 'left',
  +  }}
  ```

### MenuItem

- The `MenuItem` component inherits the `ButtonBase` component instead of `ListItem`. The class names related to "MuiListItem-\*" are removed and theming `ListItem` is no longer affecting `MenuItem`.

  ```diff
  -<li className="MuiButtonBase-root MuiMenuItem-root MuiListItem-root">
  +<li className="MuiButtonBase-root MuiMenuItem-root">
  ```

- prop `listItemClasses` is removed, use `classes` instead.

  ```diff
  -<MenuItem listItemClasses={{...}}>
  +<MenuItem classes={{...}}>
  ```

  Read more about [MenuItem CSS API](/api/menu-item/#css)

### Modal 模态框组件

- Remove the `disableBackdropClick` prop because it is redundant. Use `onClose` with `reason === 'backdropClick'` instead.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Modal
  >   -  disableBackdropClick
  >   -  onClose={handleClose}
  >   +  onClose={(event, reason) => {
  >   +    if (reason !== 'backdropClick') {
  >   +      handleClose(event, reason);
  >   +    }
  >   +  }}
  >    />
  > ```

- Remove the `onEscapeKeyDown` prop because it is redundant. Use `onClose` with `reason === "escapeKeyDown"` instead.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Modal
  >   -  onEscapeKeyDown={handleEscapeKeyDown}
  >   +  onClose={(event, reason) => {
  >   +    if (reason === 'escapeKeyDown') {
  >   +      handleEscapeKeyDown(event);
  >   +    }
  >   +  }}
  >    />
  > ```

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### NativeSelect

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<NativeSelect classes={{ select: 'class1 class2 class3' }} />
  ```

### OutlinedInput

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined.

  ```diff
  -<OutlinedInput labelWidth={20} />
  +<OutlinedInput label="First Name" />
  ```

### Paper

- Change the background opacity based on the elevation in dark mode. This change was done to follow the Material Design guidelines. You can revert it in the theme:

  ```diff
  const theme = createTheme({
    components: {
      MuiPaper: {
  +     styleOverrides: { root: { backgroundImage: 'unset' } },
      },
    },
  });
  ```

### Pagination 分页

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import Pagination from '@mui/lab/Pagination';
  >   -import PaginationItem from '@mui/lab/PaginationItem';
  >   -import { usePagination } from '@mui/lab/Pagination';
  >   +import Pagination from '@mui/material/Pagination';
  >   +import PaginationItem from '@mui/material/PaginationItem';
  >   +import usePagination from '@mui/material/usePagination';
  > ```

- Rename `round` to `circular` for consistency:

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Pagination shape="round">
  >   -<PaginationItem shape="round">
  >   +<Pagination shape="circular">
  >   +<PaginationItem shape="circular">
  > ```

### 弹出框 (Popover)

- The onE\* transition props were removed. Use TransitionProps instead.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Popover
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

- The `getContentAnchorEl` prop was removed to simplify the positioning logic.

### Popper 弹出提示

- Upgrade [Popper.js](https://github.com/popperjs/popper-core) from v1 to v2. This third-party library has introduced a lot of changes.<br /> You can read [their migration guide](https://popper.js.org/docs/v2/migration-guide/) or the following summary:

  - The CSS prefixes have changed:
    ```diff
    popper: {
      zIndex: 1,
    - '&[x-placement*="bottom"] .arrow': {
    + '&[data-popper-placement*="bottom"] .arrow': {
    ```
  - Method names have changed:

    ```diff
    -popperRef.current.scheduleUpdate()
    +popperRef.current.update()
    ```

    ```diff
    -popperRef.current.update()
    +popperRef.current.forceUpdate()
    ```

  - Modifiers' API has changed a lot. There are too many changes to be covered here.

### Portal

- Remove `onRendered` prop. Depending on your use case either use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) on the child element or an effect hook in the child component.

### Radio 单选框组件

- The radio color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the radio closer to the Material Design guidelines.

  ```diff
  -<Radio />
  +<Radio color="secondary />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
  - <span class="MuiIconButton-root MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  -   <span class="MuiIconButton-label">
  -     <input class="PrivateSwitchBase-input">
  + <span class="MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
  +   <span class="PrivateSwitchBase-input">
  ```

### Rating 评分

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import Rating from '@mui/lab/Rating';
  >   +import Rating from '@mui/material/Rating';
  > ```

- Change the default empty icon to improve accessibility. If you have a custom `icon` prop but no `emptyIcon` prop, you can restore the previous behavior with:

  ```diff
   <Rating
     icon={customIcon}
  +  emptyIcon={null}
   />
  ```

- Rename `visuallyhidden` to `visuallyHidden` for consistency:

  ```diff
   <Rating
     classes={{
  -    visuallyhidden: 'custom-visually-hidden-classname',
  +    visuallyHidden: 'custom-visually-hidden-classname',
     }}
   />
  ```

### RootRef

- This component was removed. You can get a reference to the underlying DOM node of our components via `ref` prop. The component relied on [`ReactDOM.findDOMNode`](https://reactjs.org/docs/react-dom.html#finddomnode) which is [deprecated in `React.StrictMode`](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

  > ✅ This is handled in the [preset-safe codemod](#preset-safe) by applying fake `RootRef` component to prevent application crash, further fixes are required. 
  > 
  > ```diff
  >   -<RootRef rootRef={ref}>
  >   -  <Button />
  >   -</RootRef>
  >   +<Button ref={ref} />
  > ```

### Select 选择属性

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design guidelines. If you are composing the Select with a form control component, you only need to update `FormControl`, the select inherits the variant from its context.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<Select value="Standard" />
  >   -<Select value="Outlined" variant="outlined" />
  >   +<Select value="Standard" variant="standard" />
  >   +<Select value="Outlined" />
  > ```

- Remove the `labelWidth` prop. The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined. The TextField already handles it by default.

  ```diff
  -<Select variant="outlined" labelWidth={20} />
  +<Select variant="outlined" label="Gender" />
  ```

- Merge the `selectMenu` slot into `select`. Slot `selectMenu` was redundant. The `root` slot is no longer applied to the select, but to the root.

  ```diff
  -<Select classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
  +<Select classes={{ select: 'class1 class2 class3' }} />
  ```

- The `event` in `onChange` is now a synthetic, native `Event` not a React event.

  ```diff
  -<Select onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  +<Select onChange={(event: Event, value: unknown) => {}} />
  ```

  This was necessary to prevent overriding of `event.target` of the events that caused the change.

### Skeleton 骨架屏

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import Skeleton from '@mui/lab/Skeleton';
  >   +import Skeleton from '@mui/material/Skeleton';
  > ```

- Rename `circle` to `circular` and `rect` to `rectangular` for consistency:

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Skeleton variant="circle" />
  >   -<Skeleton variant="rect" />
  >   -<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
  >   +<Skeleton variant="circular" />
  >   +<Skeleton variant="rectangular" />
  >   +<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
  > ```

### Slider 滑块控件

- The `event` in `onChange` is now a synthetic, native `Event`, not a React event.

  ```diff
  -<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  +<Slider onChange={(event: Event, value: unknown) => {}} />
  ```

  This was necessary to prevent overriding of `event.target` of the events that caused the change.

- The `ValueLabelComponent` and `ThumbComponent` prop is now part of the `components` prop.

  ```diff
   <Slider
  -  ValueLabelComponent={CustomValueLabel}
  -  ThumbComponent={CustomThumb}
  +  components={{
  +    ValueLabel: CustomValueLabel,
  +    Thumb: CustomThumb,
  +  }}
   />
  ```

- Rework the CSS to match the latest [Material Design guidelines](https://material.io/components/sliders) and make custom styles more intuitive. [See documentation](/components/slider/). <a href="/components/slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

  You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](/components/slider/#sizes).

### Snackbar（消息条）

- The notification now displays at the bottom left on large screens. This better matches the behavior of Gmail, Google Keep, material.io, etc. You can restore the previous behavior with:

  ```diff
  -<Snackbar />
  +<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
  ```

- The onE\* transition props were removed. Use TransitionProps instead.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <Snackbar
  >   -  onEnter={onEnter}
  >   -  onEntered={onEntered}
  >   -  onEntering={onEntering}
  >   -  onExit={onExit}
  >   -  onExited={onExited}
  >   -  onExiting={onExiting}
  >   +  TransitionProps={{
  >   +    onEnter,
  >   +    onEntered,
  >   +    onEntering,
  >   +    onExit,
  >   +    onExited,
  >   +    onExiting,
  >   +  }}
  >    >
  > ```

### SpeedDial

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import SpeedDial from '@mui/lab/SpeedDial';
  >   -import SpeedDialAction from '@mui/lab/SpeedDialAction';
  >   -import SpeedDialIcon from '@mui/lab/SpeedDialIcon';
  >   +import SpeedDial from '@mui/material/SpeedDial';
  >   +import SpeedDialAction from '@mui/material/SpeedDialAction';
  >   +import SpeedDialIcon from '@mui/material/SpeedDialIcon';
  > ```

### Stepper 步骤条组件

- The root component (Paper) was replaced with a div. Stepper no longer has elevation, nor inherits Paper's props. This change is meant to encourage composition.

  ```diff
  +<Paper square elevation={2}>
  -  <Stepper elevation={2}>
  +  <Stepper>
       <Step>
         <StepLabel>Hello world</StepLabel>
       </Step>
     </Stepper>
  +<Paper>
  ```

- Remove the built-in 24px padding.

  ```diff
  -<Stepper>
  +<Stepper style={{ padding: 24 }}>
     <Step>
       <StepLabel>Hello world</StepLabel>
     </Step>
   </Stepper>
  ```

### SvgIcon（Svg 图标）

- The default value of `fontSize` was changed from `default` to `medium` for consistency. In the unlikey event that you were using the value `default`, the prop can be removed:

  ```diff
  -<SvgIcon fontSize="default">
  +<SvgIcon>
     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
   </SvgIcon>
  ```

### Switch 开关

- Deprecate the second argument from `onChange`. You can pull out the checked state by accessing `event.target.checked`.

  ```diff
  function MySwitch() {
  - const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
  + const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  +   const checked = event.target.checked;
    };

    return <Switch onChange={handleChange} />;
  }
  ```

- The switch color prop is now "primary" by default. To continue using the "secondary" color, you must explicitly indicate `secondary`. This brings the switch closer to the Material Design guidelines.

  ```diff
  -<Switch />
  +<Switch color="secondary" />
  ```

- The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore, target `.MuiButtonBase-root` instead.

  ```diff
   <span class="MuiSwitch-root">
  -  <span class="MuiIconButton-root MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  -    <span class="MuiIconButton-label">
  -      <input class="MuiSwitch-input PrivateSwitchBase-input">
  +  <span class="MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
  +    <span class="MuiSwitch-input PrivateSwitchBase-input">
  ```

### Table 表格

- Rename the `default` value of the `padding` prop to `normal`.

  ```diff
  -<Table padding="default" />
  -<TableCell padding="default" />
  +<Table padding="normal" />
  +<TableCell padding="normal" />
  ```

### TablePagination

- The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop. This increases consistency with the `Pagination` component.

  ```diff
   <TablePagination
  -  backIconButtonText="Avant"
  -  nextIconButtonText="Après"
  +  getItemAriaLabel={…}
  ```

- Rename `onChangeRowsPerPage` to `onRowsPerPageChange` and `onChangePage` to `onPageChange` due to API consistency.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >    <TablePagination
  >   -  onChangeRowsPerPage={()=>{}}
  >   -  onChangePage={()=>{}}
  >   +  onRowsPerPageChange={()=>{}}
  >   +  onPageChange={()=>{}}
  > ```

- Separate classes for different table pagination labels. This allows simpler customizations.

  ```diff
   <TablePagination
  -  classes={{ caption: 'foo' }}
  +  classes={{ selectLabel: 'foo', displayedRows: 'foo' }}
   />
  ```

- Move the custom class on `input` to `select`. The `input` key is being applied on another element.

  ```diff
   <TablePagination
  -  classes={{ input: 'foo' }}
  +  classes={{ select: 'foo' }}
   />
  ```

### Tabs 选项卡

- Change the default `indicatorColor` and `textColor` prop values to "primary". This is done to match the most common use cases with Material Design.

  ```diff
  -<Tabs />
  +<Tabs indicatorColor="primary" textColor="inherit" />
  ```

- TypeScript: The `event` in `onChange` is no longer typed as a `React.ChangeEvent` but `React.SyntheticEvent`.

  ```diff
  -<Tabs onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
  +<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
  ```

- The API that controls the scroll buttons has been split it in two props.

  - The `scrollButtons` prop controls when the scroll buttons are displayed depending on the space available.
  - The `allowScrollButtonsMobile` prop removes the CSS media query that systematically hide the scroll buttons on mobile.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<Tabs scrollButtons="on" />
  >   -<Tabs scrollButtons="desktop" />
  >   -<Tabs scrollButtons="off" />
  >   +<Tabs scrollButtons allowScrollButtonsMobile />
  >   +<Tabs scrollButtons />
  >   +<Tabs scrollButtons={false} />
  > ```

### Tab

- Tab `minWidth` changed from `72px` => `90px` (without media-query) according to [material-design spec](https://material.io/components/tabs#specs)
- Tab `maxWidth` changed from `264px` => `360px` according to [material-design spec](https://material.io/components/tabs#specs)
- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `wrapper` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26926).

  ```diff
   <button class="MuiTab-root">
  -  <span class="MuiTab-wrapper">
       {icon}
       {label}
  -  </span>
   </button>
  ```

### TextField

- Change the default variant from `standard` to `outlined`. Standard has been removed from the Material Design guidelines.

  > ✅ This is handled in [variant-prop codemod](#variant-prop), read the details before running this codemod. 
  > 
  > ```diff
  >   -<TextField value="Standard" />
  >   -<TextField value="Outlined" variant="outlined" />
  >   +<TextField value="Standard" variant="standard" />
  >   +<TextField value="Outlined" />
  > ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<TextField rowsMax={6}>
  >   +<TextField maxRows={6}>
  > ```

- Better isolate the fixed textarea height behavior to the dynamic one. You need to use the `minRows` prop in the following case:

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<TextField rows={2} maxRows={5} />
  >   +<TextField minRows={2} maxRows={5} />
  > ```

- Change ref forwarding expectations on custom `inputComponent`. The component should forward the `ref` prop instead of the `inputRef` prop.

  ```diff
  -function NumberFormatCustom(props) {
  -  const { inputRef, onChange, ...other } = props;
  +const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  +  props,
  +  ref,
  +) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
  -     getInputRef={inputRef}
  +     getInputRef={ref}
  ```

- Rename `marginDense` and `inputMarginDense` classes to `sizeSmall` and `inputSizeSmall` to match the prop.

  ```diff
  -<Input margin="dense" />
  +<Input size="small" />
  ```

- Set the InputAdornment `position` prop to `start` or `end`. Use `start` if used as the value of the `startAdornment` prop. Use `end` if used as the value of the `endAdornment` prop.

  ```diff
  -<TextField startAdornment={<InputAdornment>kg</InputAdornment>} />
  -<TextField endAdornment={<InputAdornment>kg</InputAdornment>} />
  +<TextField startAdornment={<InputAdornment position="start">kg</InputAdornment>} />
  +<TextField endAdornment={<InputAdornment position="end">kg</InputAdornment>} />
  ```

### TextareaAutosize

- Remove the `rows` prop, use the `minRows` prop instead. This change aims to clarify the behavior of the prop.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<TextareaAutosize rows={2} />
  >   +<TextareaAutosize minRows={2} />
  > ```

- Rename `rowsMax` prop with `maxRows` for consistency with HTML attributes.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<TextareAutosize rowsMax={6}>
  >   +<TextareAutosize maxRows={6}>
  > ```

- Rename `rowsMin` prop with `minRows` for consistency with HTML attributes.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -<TextareAutosize rowsMin={1}>
  >   +<TextareAutosize minRows={1}>
  > ```

### ToggleButton

- 该组件已从实验室包移动到核心包。 现在这个组件处于稳定版本。

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -import ToggleButton from '@mui/lab/ToggleButton';
  >   -import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
  >   +import ToggleButton from '@mui/material/ToggleButton';
  >   +import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
  > ```

- `span` element that wraps children has been removed. `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/26666). `label` classKey is also removed. More details about [this change](https://github.com/mui-org/material-ui/pull/27111).

  ```diff
   <button class="MuiToggleButton-root">
  -  <span class="MuiToggleButton-label">
       {children}
  -  </span>
   </button>
  ```

### Tooltip

- Tooltips are now interactive by default.

  The previous default behavior failed [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus). To reflect the new default value, the prop was renamed to `disableInteractive`. If you want to restore the old behavior (thus not reaching level AA), you can apply the following diff:

  ```diff
  -<Tooltip>
  +<Tooltip disableInteractive>

  # Interactive tooltips no longer need the `interactive` prop.
  -<Tooltip interactive>
  +<Tooltip>
  ```

### 文字铸排

- Remove the `srOnly` variant. You can use the `visuallyHidden` utility in conjunction with the `sx` prop instead.

  ```diff
  +import { visuallyHidden } from '@mui/utils';

  -<Typography variant="srOnly">Create a user</Typography>
  +<span style={visuallyHidden}>Create a user</span>
  ```

- The following `classes` and style overrides keys were removed: "colorInherit", "colorPrimary", "colorSecondary", "colorTextPrimary", "colorTextSecondary", "colorError", "displayInline" and "displayBlock". These props are now considered part of the system, not on the `Typography` component itself. If you still wish to add overrides for them, you can use the `theme.components.MuiTypography.variants` options. 例如

  ```diff
  const theme = createTheme({
    components: {
      MuiTypography: {
  -     styleOverrides: {
  -       colorSecondary: {
  -         marginTop: '20px',
  -       },
  -     },
  +     variants: {
  +       props: { color: "secondary" },
  +       style: {
  +         marginTop: '20px',
  +       },
  +     }],
      },
    },
  });
  ```

### 主题

- The default background color is now `#fff` in light mode and `#121212` in dark mode. This matches the Material Design guidelines.
- Breakpoints are now treated as values instead of [ranges](https://v4.mui.com/customization/breakpoints/#default-breakpoints). The behavior of `down(key)` was changed to define a media query below the value defined by the corresponding breakpoint (exclusive), rather than the breakpoint above. `between(start, end)` was also updated to define a media query for the values between the actual values of start (inclusive) and end (exclusive). When using the `down()` breakpoints utility you need to update the breakpoint key by one step up. When using the `between(start, end)` the end breakpoint should also be updated by one step up.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。

  Here are some examples of the changes required:

  ```diff
  -theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
  +theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, md + 1) => [0, lg)
  +theme.breakpoints.between('sm', 'lg') // '@media (min-width:600px) and (max-width:1279.95px)' - [0, lg)
  ```

  ```diff
  -theme.breakpoints.between('sm', 'xl') // '@media (min-width:600px)'
  +theme.breakpoints.up('sm') // '@media (min-width:600px)'
  ```

  The same should be done when using the `Hidden` component:

  ```diff
  -<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
  +<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
  ```

- The default breakpoints were changed to better match the common use cases. They also better match the Material Design guidelines. [Read more about the change](https://github.com/mui-org/material-ui/issues/21902)

  ```diff
  {
    xs: 0,
    sm: 600,
  - md: 960,
  + md: 900,
  - lg: 1280,
  + lg: 1200,
  - xl: 1920,
  + xl: 1536,
  }
  ```

  If you prefer the old breakpoint values, use the snippet below.

  ```js
  import { createTheme } from '@mui/material/styles';

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  ```

* The `theme.breakpoints.width` utility was removed because it's redundant. Use `theme.breakpoints.values` to get the same values.

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```diff
  >   -theme.breakpoints.width('md')
  >   +theme.breakpoints.values.md
  > ```

* The signature of `theme.palette.augmentColor` helper has changed:

  ```diff
  -theme.palette.augmentColor(red);
  +theme.palette.augmentColor({ color: red, name: 'brand' });
  ```

* The `theme.typography.round` helper was removed because it was no longer used. If you need it, use the function below:

  > ✅ 这在 [preset-safe codemod](#preset-safe) 中已经解决。 
  > 
  > ```js
  >   function round(value) {
  >     return Math.round(value * 1e5) / 1e5;
  >   }
  > ```

### `@mui/types`

- Rename the exported `Omit` type in `@mui/types`. The module is now called `DistributiveOmit`. The change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5. The built-in `Omit`, while similar, is non-distributive. This leads to differences when applied to union types. [See this StackOverflow answer for further details](https://stackoverflow.com/a/57103940/1009797).

  ```diff
  -import { Omit } from '@mui/types';
  +import { DistributiveOmit } from '@mui/types';
  ```

## 将theme的 `styleOverrides`迁移至emotion

Although your style overrides defined in the theme may partially work, there is an important difference on how the nested elements are styled. The `$` syntax used with JSS will not work with Emotion. You need to replace those selectors with a valid class selector.

### Replace state class names

```diff
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '&$focused': {
+         '&.Mui-focused': {
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

### Replace nested classes selectors with global class names

```diff
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '& $notchedOutline': {
+         '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

> Note: For each component we export a `[component]Classes` constant that contains all nested classes for that component. You can rely on this instead of hardcoding the classes.

```diff
+import { outlinedInputClasses } from '@mui/material/OutlinedInput';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
-         '& $notchedOutline': {
+         [`& .${outlinedInputClasses['notchedOutline']}`]: {
            borderWidth: 1,
          }
        }
      }
    }
  }
});
```

Take a look at the whole [list of global state classnames](/customization/how-to-customize/#state-classes) available.

## 从 JSS 迁移

This is the last step in the migration process to remove `@mui/styles` package from your codebase. We can use one of these two options, by order of preference:

### 1. Use `styled` or `sx` API

#### Codemod

We provide [a codemod](https://github.com/mui-org/material-ui/blob/master/packages/mui-codemod/README.md#jss-to-styled) to help migrate JSS styles to `styled` API, but this approach **increases the CSS specificity**.

```sh
npx @mui/codemod v5.0.0/jss-to-styled <path>
```

**Example transformation**:

```diff
 import Typography from '@mui/material/Typography';
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    backgroundColor: theme.palette.primary.main
-  },
-  cta: {
-    borderRadius: theme.shape.radius
-  },
-  content: {
-    color: theme.palette.common.white,
-    fontSize: 16,
-    lineHeight: 1.7
-  },
-}))
+const PREFIX = 'MyCard';
+const classes = {
+  root: `${PREFIX}-root`,
+  cta: `${PREFIX}-cta`,
+  content: `${PREFIX}-content`,
+}
+const Root = styled('div')(({ theme }) => ({
+  [`&.${classes.root}`]: {
+    display: 'flex',
+    alignItems: 'center',
+    backgroundColor: theme.palette.primary.main
+  },
+  [`& .${classes.cta}`]: {
+    borderRadius: theme.shape.radius
+  },
+  [`& .${classes.content}`]: {
+    color: theme.palette.common.white,
+    fontSize: 16,
+    lineHeight: 1.7
+  },
+}))

 export const MyCard = () => {
-  const classes = useStyles();
   return (
-    <div className={classes.root}>
+    <Root className={classes.root}>
       {/* The benefit of this approach is that the code inside Root stays the same. */}
       <Typography className={classes.content}>...</Typography>
       <Button className={classes.cta}>Go</Button>
-    </div>
+    </Root>
   )
 }
```

> 💡 You should run this codemod per small chunk of files and then check the changes because in some cases you might need to adjust the code after the transformation (this codemod won't cover all of the cases).

We recommend `sx` API over `styled` when you have to create responsive styles or needs minor CSS overrides. [Read more about `sx`](/system/the-sx-prop/#main-content).

```diff
 import Chip from '@mui/material/Chip';
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  wrapper: {
-    display: 'flex',
-  },
-  chip: {
-    padding: theme.spacing(1, 1.5),
-    boxShadow: theme.shadows[1],
-  }
-}))
+const Root = styled('div')({
+  display: 'flex',
+})

 function App() {
-  const classes = useStyles();
   return (
-    <div>
-      <Chip className={classes.chip} label="Chip" />
-    </div>
+    <Root>
+      <Chip label="Chip" sx={{ py: 1, px: 1.5, boxShadow: 1 }} />
+    </Root>
   )
 }
```

#### Manual

In some cases, you might want to create multiple styled components in a file instead of increasing CSS specificity. for example:

```diff
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    borderRadius: 20,
-    background: theme.palette.grey[50],
-  },
-  label: {
-    color: theme.palette.primary.main,
-  }
-}))
+const Root = styled('div')(({ theme }) => ({
+  display: 'flex',
+  alignItems: 'center',
+  borderRadius: 20,
+  background: theme.palette.grey[50],
+}))

+const Label = styled('span')(({ theme }) => ({
+  color: theme.palette.primary.main,
+}))

 function Status({ label }) {
-  const classes = useStyles();
   return (
-    <div className={classes.root}>
-      {icon}
-      <span className={classes.label}>{label}</span>
-    </div>
+    <Root>
+      {icon}
+      <Label>{label}</Label>
+    </Root>
   )
 }
```

> **Note:** [https://siriwatk.dev/tool/jss-to-styled](https://siriwatk.dev/tool/jss-to-styled) is a tool that helps converting JSS to multiple styled components without increasing CSS specificity. (This tool is **not maintained** by MUI)

### 2. Use [tss-react](https://github.com/garronej/tss-react)

The API is similar to JSS `makeStyles` but works with emotion.

  <!-- Add material-ui component migration example -->

> **Note:** this library is **not maintained** by MUI. If you have any issue regarding to it, please open an issue in [tss-react repository](https://github.com/garronej/tss-react/issues/new).

💡 Once you migrate all of the styling, remove unnecessary `@mui/styles` by

```sh
npm uninstall @mui/styles

// or with `yarn`
yarn remove @mui/styles
```

## 故障排除（Troubleshooting）

### Storybook emotion with v5

If your project uses Storybook v6.x, you will need to update `.storybook/main.js` webpack config to use the most recent version of emotion.

```js
// .storybook/main.js

const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    };
  },
};
```

and update `.storybook/preview.js` (otherwise, the "Docs" tab in storybook will display empty page)

```js
// .storybook/preview.js

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

const defaultTheme = createTheme(); // or your custom theme

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

// ...other storybook exports
```

**Tested versions**

```json
{
  "@storybook/react": "6.3.8",
  "@storybook/addon-docs": "6.3.8",
  "@emotion/react": "11.4.1",
  "@emotion/styled": "11.3.0",
  "@mui/material": "5.0.2"
}
```

> Note: This setup is a workaround and might not work in all cases.

For more details, checkout these issues on GitHub.

- https://github.com/storybookjs/storybook/issues/16099
- https://github.com/mui-org/material-ui/issues/24282#issuecomment-796755133

### Cannot read property `scrollTop` of null

This error comes from `Fade`, `Grow`, `Slide`, `Zoom` components due to missing DOM Node.

You need to make sure that the children forward ref to DOM for custom component.

```jsx
// Ex. 1 ✅ html tag works since it is a DOM
<Fade in>
  <div>
    <CustomComponent />
  </div>
</Fade>

// Ex. 2 ❌ This will cause error. don't use Fragment as a child
<Fade in>
  <React.Fragment>
    <CustomComponent />
  </React.Fragment>
</Fade>;

// Ex. 3 ❌ This will cause error because `CustomComponent` does not forward ref to DOM
function CustomComponent() {
  return <div>...</div>;
}

<Fade in>
  <CustomComponent />
</Fade>;
```

```js
// ✅ Fixed by using `React.forwardRef` and pass to DOM.
const CustomComponent = React.forwardRef(function CustomComponent(props, ref) {
  return (
    <div ref={ref}>
      ...
    </div>
  )
})

<Fade in>
  <CustomComponent />
</Fade>
```

For more details, checkout [this issue](https://github.com/mui-org/material-ui/issues/27154) on GitHub.

### [Types] Property "palette", "spacing" does not exist on type 'DefaultTheme'

Since `makeStyles` is now exported from `@mui/styles` package which does not know about `Theme` in the core package. To fix this, you need to augment the `DefaultTheme` (empty object) in `@mui/styles` with `Theme` from the core. [Read more about module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

**TypeScript Project**

Put this snippet to your theme file:

```ts
// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}
```

**Javascript Project**

If your IDE (ex. VSCode) is able to infer types from `d.ts` file, create `index.d.ts` in your `src` folder with this snippet:

```js
// index.d.ts
declare module "@mui/private-theming" {
  import type { Theme } from "@mui/material/styles";

  interface DefaultTheme extends Theme {}
}
```

### [Jest] SyntaxError: Unexpected token 'export'

`@mui/material/colors/red` is considered private since v1.0.0. You should replace the import, [more details about this error](https://github.com/mui-org/material-ui/issues/27296).

You can use this codemod (**recommended**) to fix all the import in your project:

```sh
npx @mui/codemod v5.0.0/optimal-imports <path>
```

or fix it manually like this:

```diff
-import red from '@mui/material/colors/red';
+import { red } from '@mui/material/colors';
```

### makeStyles - TypeError: Cannot read property 'drawer' of undefined

This error occurs when calling `useStyles` (result of `makeStyles`) or `withStyles` outside of `<ThemeProvider>` scope like this:

```js
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const theme = createTheme();

function App() {
  const classes = useStyles(); // ❌ called outside of ThemeProvider
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Card className={classes.root}>...</Card>
    </ThemeProvider>
  );
}

export default App;
```

You can fix by moving `useStyles` inside another component so that it is called under `<ThemeProvider>`.

```js
// ...imports

function AppContent(props) {
  const classes = useStyles(); // ✅ This is safe because it is called inside ThemeProvider
  return <Card className={classes.root}>...</Card>;
}

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent {...props} />
    </ThemeProvider>
  );
}

export default App;
```

### TypeError: Cannot read properties of undefined (reading 'pxToRem')

The root cause of this error comes from accessing empty theme. Make sure that you have follow these checklist:

- `styled` should only be imported from `@mui/material/styles` (If you are not using standalone `@mui/system`)

  ```js
  import { styled } from '@mui/material/styles';
  ```

- Make sure that no `useStyles` is called outside of `<ThemeProvider>`. If you have, consider fixing it like [this suggestion](#makestyles-typeerror-cannot-read-property-drawer-of-undefined)

For more details, [checkout this issue](https://github.com/mui-org/material-ui/issues/28496)

### Styles broken after migrating to v5

There are two reasons why the styles of the components may be broken after you finished with all the steps in the previous sections.

First, check if you have configured the `StyledEngineProvider` correct as shown in the [Style library](#style-library) section.

If the `StyledEngineProvider` is already used at the top of your application and the styles are still broken, it may be the case that you still have `@material-ui/core` in your application. It may be coming from some of the dependencies that you have, that still depend on `@material-ui/core` (v4).

The easiest way to check this is to run `npm ls @material-ui/core` (or `yarn why @material-ui/core`) which will give you the necessary information.

Here is one example:

```sh
$ npm ls @material-ui/core
project@0.1.0 /path/to/project
└─┬  @mui/x-data-grid@4.0.0
  └── @material-ui/core@4.12.3
```

You can notice based on the output above that `@material-ui/core` is a dependency of `@mui/x-data-grid`. In this specific example, you need to bump the version of `@mui/x-data-grid` to [version 5](https://www.npmjs.com/package/@mui/x-data-grid) so that it depends on `@mui/material` instead.
