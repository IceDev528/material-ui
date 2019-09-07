# タイポグラフィ

<p class="description">位置合わせ、ラッピング、重みなどをコントロールする一般的なテキストユーティリティのドキュメントと例。</p>

## テキストの位置

```jsx
<Box textAlign="left">…
<Box textAlign="center">…
<Box textAlign="right">…
```

{{"demo": "pages/system/typography/TextAlignment.js"}}

## Font weight

```jsx
<Box fontWeight="fontWeightLight">…
<Box fontWeight="fontWeightRegular">…
<Box fontWeight="fontWeightMedium">…
<Box fontWeight={500}>…
<Box fontWeight="fontWeightBold">…
```

{{"demo": "pages/system/typography/FontWeight.js"}}

## フォントサイズ

```jsx
<Box fontSize="fontSize">…
<Box fontSize="h6.fontSize">…
<Box fontSize={16}>…
```

{{"demo": "pages/system/typography/FontSize.js"}}

## フォントスタイル

```jsx
<Box fontStyle="normal">…
<Box fontStyle="italic">…
<Box fontStyle="oblique">…
```

{{"demo": "pages/system/typography/FontStyle.js"}}

## フォントファミリー

```jsx
<Box fontFamily="fontFamily">…
<Box fontFamily="Monospace">…
```

{{"demo": "pages/system/typography/FontFamily.js"}}

## 文字間隔

```jsx
<Box letterSpacing={6}>…
<Box letterSpacing={10}>…
```

{{"demo": "pages/system/typography/LetterSpacing.js"}}

## 行の高さ

```jsx
<Box lineHeight="normal">…
<Box lineHeight={10}>…
```

{{"demo": "pages/system/typography/LineHeight.js"}}

## API

```js
import { typography } from '@material-ui/system';
```

| Import name     | Prop            | CSS property     | Theme key                                                              |
|:--------------- |:--------------- |:---------------- |:---------------------------------------------------------------------- |
| `fontFamily`    | `fontFamily`    | `font-family`    | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `fontSize`      | `fontSize`      | `font-size`      | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `fontStyle`     | `fontStyle`     | `font-style`     | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `fontWeight`    | `fontWeight`    | `font-weight`    | [`typography`](/customization/default-theme/?expend-path=$.typography) |
| `letterSpacing` | `letterSpacing` | `letter-spacing` | none                                                                   |
| `lineHeight`    | `lineHeight`    | `line-height`    | none                                                                   |
| `textAlign`     | `textAlign`     | `text-align`     | none                                                                   |