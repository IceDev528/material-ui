# Dimensionando

<p class="description">Facilmente faça um elemento tão largo ou tão alto (relativo a seu pai) com os utilitários de largura e altura.</p>

## Valores suportados

As funções de estilo de dimensionamento suportam diferentes tipos de entrada de propriedade:

```jsx
<Box width={1/4}> // Números em [0,1] são multiplicados por 100 e convertido em % valores.
<Box width={300}> // Números são convertidos em valores de pixel.
<Box width="75%"> // Valores de string são usados como CSS bruto.
<Box width={1}>   // 100%
```

{{"demo": "pages/system/sizing/Values.js"}}

## Largura

```jsx
<Box width="25%">…
<Box width="50%">…
<Box width="75%">…
<Box width="100%">…
<Box width="auto">…
```

{{"demo": "pages/system/sizing/Width.js"}}

## Altura

```jsx
<Box height="25%">…
<Box height="50%">…
<Box height="75%">…
<Box height="100%">…
```

{{"demo": "pages/system/sizing/Height.js"}}

## API

```js
import { sizing } from '@material-ui/system';
```

| Nome da importação | Propriedade | Propriedade CSS | Chave do tema |
|:------------------ |:----------- |:--------------- |:------------- |
| `width`            | `width`     | `width`         | none          |
| `maxWidth`         | `maxWidth`  | `max-width`     | none          |
| `minWidth`         | `minWidth`  | `min-width`     | none          |
| `height`           | `height`    | `height`        | none          |
| `maxHeight`        | `maxHeight` | `max-height`    | none          |
| `minHeight`        | `minHeight` | `min-height`    | none          |