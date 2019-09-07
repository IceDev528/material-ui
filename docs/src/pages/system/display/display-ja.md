# ディスプレイ

<p class="description">Quickly and responsively toggle the display value of components and more with the display utilities. 一般的な値の一部のサポートと、印刷時の表示を制御するための追加機能が含まれています。</p>

## 例

```jsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```

{{"demo": "pages/system/display/Inline.js"}}

```jsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

{{"demo": "pages/system/display/Block.js"}}

## 要素を隠す

For faster mobile-friendly development, use responsive display classes for showing and hiding elements by device. Avoid creating entirely different versions of the same site, instead hide element responsively for each screen size.

| Screen Size        | Class                                                |
|:------------------ |:---------------------------------------------------- |
| Hidden on all      | `display="none"`                                     |
| Hidden only on xs  | `display={{ xs: 'none', sm: 'block' }}`              |
| Hidden only on sm  | `display={{ xs: 'block', sm: 'none', md: 'block' }}` |
| Hidden only on md  | `display={{ xs: 'block', md: 'none', lg: 'block' }}` |
| Hidden only on lg  | `display={{ xs: 'block', lg: 'none', xl: 'block' }}` |
| Hidden only on xl  | `display={{ xs: 'block', xl: 'none' }}`              |
| Visible only on xs | `display={{ xs: 'block', sm: 'none' }}`              |
| Visible only on sm | `display={{ xs: 'none', sm: 'block', md: 'none' }}`  |
| Visible only on md | `display={{ xs: 'none', md: 'block', lg: 'none' }}`  |
| Visible only on lg | `display={{ xs: 'none', lg: 'block', xl: 'none' }}`  |
| Visible only on xl | `display={{ xs: 'none', xl: 'block' }}`              |


```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  hide on screens wider than md
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  hide on screens smaller than md
</Box>
```

{{"demo": "pages/system/display/Hiding.js"}}

## Display in print

```jsx
<Box display="block" displayPrint="none">
  Screen Only (Hide on print only)
</Box>
<Box display="none" displayPrint="block">
  Print Only (Hide on screen only)
</Box>
```

{{"demo": "pages/system/display/Print.js"}}

## Overflow

```jsx
<Box component="div" overflow="hidden">
  Overflow Hidden
</Box>
<Box component="div" overflow="visible">
  Overflow visible
</Box>
```

{{"demo": "pages/system/display/Overflow.js"}}

## Text Overflow

```jsx
<Box component="div" textOverflow="clip">
  Text Overflow Clip
</Box>
<Box component="div" textOverflow="ellipsis">
  Text Overflow Ellipsis
</Box>
```

{{"demo": "pages/system/display/TextOverflow.js"}}

## Visibility

```jsx
<Box component="div" visibility="visible">
  Visibility Visible
</Box>
<Box component="div" visibility="hidden">
  Visibility Hidden
</Box>
```

{{"demo": "pages/system/display/Visibility.js"}}

## White Space

```jsx
<Box component="div" whiteSpace="nowrap">
  White Space Nowrap
</Box>
<Box component="div" whiteSpace="normal">
  White Space Normal
</Box>
```

{{"demo": "pages/system/display/WhiteSpace.js"}}

## API

```js
import { display } from '@material-ui/system';
```

| Import name    | Prop           | CSS property    | Theme key |
|:-------------- |:-------------- |:--------------- |:--------- |
| `displayPrint` | `displayPrint` | `display`       | none      |
| `displayRaw`   | `display`      | `display`       | none      |
| `overflow`     | `overflow`     | `overflow`      | none      |
| `textOverflow` | `textOverflow` | `text-overflow` | none      |
| `visibility`   | `visibility`   | `visibility`    | none      |
| `whiteSpace`   | `whiteSpace`   | `white-space`   | none      |