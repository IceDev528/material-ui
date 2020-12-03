---
title: Componente React Box
githubLabel: 'component: Box'
---

# Box

<p class="description">O componente Box serve como um componente encapsulador (wrapper) para a auxiliar na maioria das necessidades de uso com CSS.</p>

O component Box compõe [todas as funções de estilo](/system/basics/#all-inclusive) que são expostas no `@material-ui/system`. É criado usando a função `experimentalStyled()` de `@material-ui/core/styles`.

[A paleta](/system/palette/) com funções de estilo.

## Exemplo

[A paleta](/system/palette/) com funções de estilo.

## A propriedade sx

Todas as propriedades do sistema estão disponíveis através da propriedade `sx`. Além disso, esta propriedade permite que você especifique quaisquer outras regras CSS que você possa precisar. Aqui está um exemplo de como você pode usá-la:

{{"demo": "pages/components/box/BoxSx.js", "defaultCodeOpen": true }}

## Sobrescrevendo componentes do Material-UI

O componente Box envolve seu componente. Ele cria um novo elemento DOM, uma `<div>` por padrão, comportamento que pode ser modificado através da propriedade `component`. Digamos que você queira usar um `<span>`:

{{"demo": "pages/components/box/BoxComponent.js", "defaultCodeOpen": true }}

Isso funciona muito bem quando as alterações precisam ser isoladas em um novo elemento DOM. Note no exemplo, a forma que você alterou a margem.

No entanto, às vezes, você precisa modificar o elemento DOM subjacente. Por exemplo, você quer mudar a borda do botão. O componente botão define seus próprios estilos. A herança por CSS não irá ajudar nesse caso. Para contornar o problema, você tem duas opções:

1. Usar [`React.cloneElement()`](https://pt-br.reactjs.org/docs/react-api.html#cloneelement)

O componente Box tem uma propriedade `clone` para permitir o uso do método de clonar elemento do React.

{{"demo": "pages/components/box/BoxClone.js", "defaultCodeOpen": true }}

2. Use a função de renderização com propriedades

Os elementos filhos de Box aceitam uma função de renderização com propriedades. Você pode então extrair o `className`.

{{"demo": "pages/components/box/BoxRenderProps.js", "defaultCodeOpen": true }}

> ⚠️ A especificidade do CSS depende da ordem de importação. Se você quer garantir que o estilo do componente encapsulado seja substituído, você precisa importar o Box por último.

## API

```jsx
import Box from '@material-ui/core/Box';
```

| Nome                                                    | Tipo                                                                                                                          | Padrão                                  | Descrição                                                                                            |
|:------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:---------------------------------------------------------------------------------------------------- |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">union:&nbsp;node&nbsp;&#124;<br>&nbsp;func<br></span>                                     |                                         | Função de renderização do Box ou nó.                                                                 |
| <span class="prop-name">clone</span>                    | <span class="prop-type">bool</span>                                                                                           | <span class="prop-default">false</span> | Se `true`, o box irá recriar seu elemento DOM filho. Ele irá usar `React.cloneElement` internamente. |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> | <span class="prop-default">'div'</span> | O componente usado como nó raiz. Ou uma string para usar um elemento DOM ou componente.              |
| <span class="prop-name">sx</span>                       | <span class="prop-type">object</span>                                                                                         | <span class="prop-default">{}</span>    | Aceita todas as propriedades do sistema, bem como quaisquer propriedades CSS válidas.                |
