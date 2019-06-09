---
title: Consulta de mídia no React para design responsivo
---

# useMediaQuery

<p class="description">Este é um hook de CSS media query para React. Ele ouve correspondências para uma consulta de mídia no CSS. Permite a renderização de componentes com base no fato de a consulta corresponder ou não.</p>

Algumas das principais características:

- ⚛️ Tem uma API React idiomática.
- 🚀 Com desempenho, ele observa o documento para detectar quando suas consultas de mídia mudam, em vez de pesquisar os valores periodicamente.
- 📦 [1 kB gzipped](/size-snapshot).
- 💄 É uma alternativa para react-responsive e react-media que visa simplicidade.
- 🤖 Ele suporta a renderização do lado do servidor.

## Consulta de mídia simples

Você deve fornecer uma consulta de mídia ao primeiro argumento do hook. A string de consulta de mídia pode ser feita por qualquer consulta de mídia CSS válida, por exemplo, `'print'`.

{{"demo": "pages/components/use-media-query/SimpleMediaQuery.js", "defaultCodeOpen": true}}

## Usando helpers de ponto de quebra do Material-UI

Você pode usar os [helpers de ponto de quebra](/customization/breakpoints/) do Material-UI da seguinte maneira:

```jsx
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}
```

{{"demo": "pages/components/use-media-query/ThemeHelper.js"}}

## Usando a sintaxe JavaScript

[json2mq](https://github.com/akiran/json2mq) é usado para gerar uma string de consulta de mídia a partir de um objeto JavaScript.

{{"demo": "pages/components/use-media-query/JavaScriptMedia.js", "defaultCodeOpen": true}}

## Renderização no servidor (Server-Side Rendering)

Uma implementação do [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) é necessária no servidor, recomendamos usar [css-mediaquery](https://github.com/ericf/css-mediaquery). Também incentivamos o uso da versão hook de `useMediaQueryTheme` que busca propriedades do tema. Dessa forma, você pode fornecer uma opção `ssrMatchMedia` uma vez para toda a sua árvore React.

{{"demo": "pages/components/use-media-query/ServerSide.js"}}

## Migrando de `withWidth()`

O componente de ordem superior `withWidth()` injeta a largura da tela da página. Você pode reproduzir o mesmo comportamento com o hook `useWidth`:

```jsx
function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  const queries = useMediaQuery(keys.map(key => theme.breakpoints.only(key)));
  return (
    queries.reduce((output, matches, index) => {
      return !output && matches ? keys[index] : output;
    }, null) || 'xs'
  );
}
```

{{"demo": "pages/components/use-media-query/UseWidth.js"}}

## API

### `useMediaQuery(query, [options]) => matches`

#### Argumentos

1. `query` (*String*): uma string representando a consulta de mídia a ser manipulada.
2. `options` (*Object* [opcional]): 
    - `options.defaultMatches` (*Boolean* [opcional]): Como `window.matchMedia()` não esta disponível no servidor, retornamos uma correspondência padrão durante a primeira montagem. O valor padrão é `false`.
    - `options.noSsr` (*Boolean* [opcional]): Padrão é `false`. Para realizar a reconciliação de renderização do lado do servidor, ele precisa renderizar duas vezes. Uma primeira vez sem nada e uma segunda vez com os filhos. Este ciclo de renderização de dupla passagem tem uma desvantagem. É mais lento. Você pode definir esse sinalizador para `true` se você **não estiver fazendo a renderização do lado do servidor**.
    - `options.ssrMatchMedia` (*Function* [opcional]) Você pode querer usar uma heurística para aproximar a tela no navegador do cliente. Por exemplo, você poderia estar usando o user-agent ou o client-hint https://caniuse.com/#search=client%20hint. Você pode fornecer um global ponyfill usando [`propriedades customizadas`](/customization/globals/#default-props) no tema. Verifique o exemplo de renderização do lado do servidor [](#server-side-rendering).

#### Retornos

`matches`: Matches é `true` se o documento coincidir com a consulta de mídia, e `false` quando isso não ocorrer.

#### Exemplos

```jsx
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery() {
  const matches = useMediaQuery('print');

  return <span>{`@media (min-width:600px) matches: ${matches}`}</span>;
}
```