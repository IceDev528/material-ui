---
title: Componente React para Divisores
components: Divider
---

# Divisor

<p class="description">Um divisor é uma linha fina que agrupa conteúdo em listas e leiautes.</p>

[Divisores](https://material.io/design/components/dividers.html) separam grupos de conteúdos.

## Divisores de lista

O divisor renderiza como um `<hr>` por padrão. Você pode salvar a renderização desse elemento DOM usando a propriedade `divider` no componente `ListItem`.

{{"demo": "pages/components/dividers/ListDividers.js", "bg": true}}

## Especificação HTML5

Em uma lista, você deve garantir que o `Divider` seja renderizado como um elemento `<li>` para corresponder à especificação HTML5. Os exemplos abaixo mostram duas maneiras de conseguir isso.

## Divisores de inserção

{{"demo": "pages/components/dividers/InsetDividers.js", "bg": true}}

## Divisores de subtítulo

{{"demo": "pages/components/dividers/SubheaderDividers.js", "bg": true}}

## Divisores médios

{{"demo": "pages/components/dividers/MiddleDividers.js", "bg": true}}

## Divisores verticais

Você pode renderizar um divisor vertical usando a propriedade `orientation`. Observe o uso da propriedade `flexItem` para acomodar em um contêiner flexível.

{{"demo": "pages/components/dividers/VerticalDividers.js", "bg": true}}