# Theming

<p class="description">定制自己的 Material-UI 主题， You can change the colors, the typography and much more.</p>

主题可以指定组件的配色、平面的明暗、阴影的深浅、墨水元素适当的不透明度等。

样式可让您为应用程序应用一致的音调。它可以让你 **自定义所有的设计方面** 项目，以满足您的企业或品牌的特定需求。

为了提高应用程序之间的一致性，可以选择明暗样式类型。 默认情况下，组件使用浅色样式类型。

## ThemeProvider

如果你想要自定义样式，则需要使用 `MuiThemeProvider` 组件才能将样式注入到你的应用中。 但是，这是可选的，因为 Material-UI 组件带有默认主题。

`MuiThemeProvider` 依赖于React的Context上下文将样式传递给组件， 因此您需要确保 `MuiThemeProvider` 是您想要自定义的组件的父级元素。 You can learn more about this in [the API section](/styles/api/#themeprovider).

## 主题配置变量

更改主题配置变量是将Material-UI与您的需求相匹配的最有效方法。 以下列出了一些重要的样式变量：

- [Palette（调色）](/customization/palette/)
- [Typography（文字铸排）](/customization/typography/)
- [Spacing（间距）](/customization/spacing/)
- [断点](/customization/breakpoints/)
- [z-index](/customization/z-index/)
- [全局样式](/customization/globals/)

You can check out the [default theme section](/customization/default-theme/) to view the default theme in full.

### Custom variables

When using Material-UI's theme with the [styling solution](/styles/basics/) or [any others](/guides/interoperability/#themeprovider). It can be convenient to add additional variables to the theme so you can use them everywhere. 就像这样：

{{"demo": "pages/customization/theming/CustomStyles.js"}}

## Accessing the theme in a component

You [can access](/styles/advanced/#accessing-the-theme-in-a-component) the theme variables inside your React components.

## 嵌套主题

[您可以嵌套](/styles/advanced/#theme-nesting)多个主题提供者。

{{"demo": "pages/customization/theming/ThemeNesting.js"}}

The inner theme will **override** the outer theme. You can extend the outer theme by providing a function:

{{"demo": "pages/customization/theming/ThemeNestingExtend.js"}}

### A note on performance

The performance implications of nesting the `ThemeProvider` component are linked to JSS's work behind the scenes. The main point to understand is that the injected CSS is cached with the following tuple `(styles, theme)`.

- `theme`: If you provide a new theme at each render, a new CSS object will be computed and injected. Both for UI consistency and performance, it's better to render a limited number of theme objects.
- `styles`: The larger the styles object is, the more work is needed.

## API

### `createMuiTheme(options) => theme`

Generate a theme base on the options received.

#### 参数

1. `options` （*Object*）：采用不完整的主题对象并添加缺少的部分。

#### 返回结果

`theme` (*Object*): A complete, ready to use theme object.

#### 示例

```js
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});
```

### `responsiveFontSizes(theme, options) => theme`

Generate responsive typography settings based on the options received.

#### 参数

1. `theme` (*Object*): The theme object to enhance.
2. `options` (*Object* [optional]):

- `breakpoints` (*Array<String>* [optional]): Default to `['sm', 'md', 'lg']`. Array of [breakpoints](/customization/breakpoints/) (identifiers).
- `disableAlign` (*Boolean* [optional]): Default to `false`. Whether font sizes change slightly so line heights are preserved and align to Material Design's 4px line height grid. This requires a unitless line height in the theme's styles.
- `factor` (*Number* [optional]): Default to `2`. This value determines the strength of font size resizing. The higher the value, the less difference there is between font sizes on small screens. The lower the value, the bigger font sizes for small screens. 该值必须大于1。
- `variants` (*Array<String>* [optional]): Default to all. The typography variants to handle.

#### 返回结果

`theme` (*Object*): The new theme with a responsive typography.

#### 示例

```js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
```