# Flexbox

<p class="description">Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities.</p>

**flexboxに不慣れ**な場合、 [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) を読むことをおすすめします。

## 親のプロパティ

### display

```jsx
<Box display="flex">…
```

{{"demo": "pages/system/flexbox/Display.js"}}

### flex-direction

```jsx
<Box flexDirection="row">…
<Box flexDirection="row-reverse">…
```

{{"demo": "pages/system/flexbox/FlexDirection.js"}}

### flex-wrap

```jsx
<Box flexWrap="nowrap">…
<Box flexWrap="wrap">…
```

{{"demo": "pages/system/flexbox/FlexWrap.js"}}

### justify-content

```jsx
<Box justifyContent="flex-start">…
<Box justifyContent="flex-end">…
<Box justifyContent="center">…
```

{{"demo": "pages/system/flexbox/JustifyContent.js"}}

### align-items

```jsx
<Box alignItems="flex-start">…
<Box alignItems="flex-end">…
<Box alignItems="center">…
```

{{"demo": "pages/system/flexbox/AlignItems.js"}}

### align-content

```jsx
<Box alignContent="flex-start">…
<Box alignContent="flex-end">…
```

{{"demo": "pages/system/flexbox/AlignContent.js"}}

## 子供のプロパティ

### order

```jsx
<Box order={2}>Item 1</Box>
<Box order={3}>Item 2</Box>
<Box order={1}>Item 3</Box>
```

{{"demo": "pages/system/flexbox/Order.js"}}

### flex-grow

```jsx
<Box flexGrow={1}>Item 1</Box>
<Box>Item 2</Box>
<Box>Item 3</Box>
```

{{"demo": "pages/system/flexbox/FlexGrow.js"}}

### flex-shrink

```jsx
<Box width="100%">Item 1</Box>
<Box flexShrink={1}>Item 2</Box>
<Box flexShrink={0}>Item 3</Box>
```

{{"demo": "pages/system/flexbox/FlexShrink.js"}}

### align-self

```jsx
<Box>Item 1</Box>
<Box alignSelf="flex-end">Item 2</Box>
<Box>Item 3</Box>
```

{{"demo": "pages/system/flexbox/AlignSelf.js"}}

## API

```js
import { flexbox } from '@material-ui/system';
```

| Import name      | Prop             | CSS property      | Theme key |
|:---------------- |:---------------- |:----------------- |:--------- |
| `flexDirection`  | `flexDirection`  | `flex-direction`  | none      |
| `flexWrap`       | `flexWrap`       | `flex-wrap`       | none      |
| `justifyContent` | `justifyContent` | `justify-content` | none      |
| `alignItems`     | `alignItems`     | `align-items`     | none      |
| `alignContent`   | `alignContent`   | `align-content`   | none      |
| `order`          | `order`          | `order`           | none      |
| `flex`           | `flex`           | `flex`            | none      |
| `flexGrow`       | `flexGrow`       | `flex-grow`       | none      |
| `flexShrink`     | `flexShrink`     | `flex-shrink`     | none      |
| `alignSelf`      | `alignSelf`      | `align-self`      | none      |