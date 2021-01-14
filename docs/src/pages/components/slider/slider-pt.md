---
title: Componente React Slider
components: Slider, SliderUnstyled
githubLabel: 'component: Slider'
materialDesign: https://material.io/components/sliders
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#slider'
---

# Slider

<p class="description">Sliders permitem que os usuários façam seleções a partir de um intervalo de valores.</p>

[Sliders](https://material.io/design/components/sliders.html) refletem um intervalo de valores ao longo de uma barra, a partir do qual os usuários podem selecionar um único valor. Eles são ideais para ajustar configurações como volume, brilho ou aplicação de filtros de imagem.

- 📦 [22 kB gzipped](/size-snapshot) (mas apenas +8 kB quando usado junto com outros componentes de Material-UI).

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Sliders contínuos

Os sliders contínuos permitem que os usuários selecionem um valor ao longo de um intervalo subjetivo.

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## Sliders discretos

Os sliders discretos podem ser ajustados para um valor específico, fazendo referência ao seu indicador de valor. Por ordem de demonstrações:

Você pode gerar uma marca para cada etapa com `marks={true}`.

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### Pequenas etapas

Você pode alterar o incremento padrão da etapa.

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### Marcas personalizadas

Você pode ter marcas customizadas, fornecendo um array para a propriedade `marks`.

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### Valores restritos

Você pode restringir os valores selecionáveis fornecidos na propriedade `marks` configurando a propriedade `step={null}`.

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### Rótulo sempre visível

Você pode forçar o marcador a ficar sempre visível com `valueLabelDisplay="on"`.

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## Slider com intervalo

O slider pode ser usado para definir o início e o fim de um intervalo, fornecendo um array de valores para a propriedade `value`.

{{"demo": "pages/components/slider/RangeSlider.js"}}

## Slider com campo de entrada

Neste exemplo, um campo de entrada permite que um valor seja definido.

{{"demo": "pages/components/slider/InputSlider.js"}}

## Sliders customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

## Sliders verticais

{{"demo": "pages/components/slider/VerticalSlider.js"}}

**WARNING**: Chrome, Safari and newer Edge versions i.e. any browser based on WebKit exposes `<Slider orientation="vertical" />` as horizontal ([chromium issue #1158217](https://bugs.chromium.org/p/chromium/issues/detail?id=1158217)). By applying `-webkit-appearance: slider-vertical;` the slider is exposed as vertical.

However, by applying `-webkit-appearance: slider-vertical;` keyboard navigation for horizontal keys (<kbd class="key">Arrow Left</kbd>, <kbd class="key">Arrow Right</kbd>) is reversed ([chromium issue #1162640](https://bugs.chromium.org/p/chromium/issues/detail?id=1162640)). Usually, up and right should increase and left and down should decrease the value. If you apply `-webkit-appearance` you could prevent keyboard navigation for horizontal arrow keys for a truly vertical slider. This might be less confusing to users compared to a change in direction.

{{"demo": "pages/components/slider/VerticalAccessibleSlider.js"}}

## Faixa

A faixa exibe o intervalo disponível para a seleção do usuário.

### Faixa desabilitada

A faixa pode ser desabilitada com `track={false}`.

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Faixa invertida

A faixa pode ser invertida com `track="inverted"`.

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Escala não linear

Você pode usar a propriedade `scale` para representar o `value` em uma escala diferente.

Na seguinte demonstração, o valor _x_ representa o valor _2^x_. Acrescentar em _x_ aumenta o valor representado por fator de  _2_.

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## Slider sem estilo

{{"demo": "pages/components/slider/UnstyledSlider.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

O componente lida com a maior parte do trabalho necessário para torná-lo acessível. No entanto, você precisa se certificar de que:

- Cada marcador possua propriedades de rótulo amigável para o usuário (`aria-label`, `aria-labelledby` ou `getAriaLabel`).
- Cada marcador tenha um texto amigável para o seu valor atual. Isso não é necessário se o valor corresponder ao rótulo exibido no slider. Você pode alterar o nome com as propriedades `getAriaValueText` ou `aria-valuetext`.
