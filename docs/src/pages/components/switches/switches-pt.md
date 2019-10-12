---
title: Componente React para Interruptores
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Interruptores

<p class="description">Interruptores alternam o estado de uma única configuração ligado ou desligado.</p>

[Interruptores](https://material.io/design/components/selection-controls.html#switches) são a forma preferida de ajustes de configuração em mobile. A opção que o interruptor controla, juntamente com o estado atual, deve ser claramente explícita no rótulo(label) inline correspondente.

{{"demo": "pages/components/switches/Switches.js"}}

## Interruptores com FormControlLabel

`Switch` também pode ser utilizado com uma descrição de rótulo graças ao componente `FormControlLabel`.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Interruptores com FormGroup

`FormGroup` é um componente encapsulador usado para agrupar componentes de seleção para fornecer uma fácil API. No entanto, nós recomendamos que você use [Caixas de Seleção](#checkboxes).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Interruptores customizados

Aqui esta um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

## Tamanhos

Gosta de interruptores menores? Use a propriedade `size`.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Posicionamento do Rótulo

Você pode alterar o posicionamento do rótulo:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Quando usar

- [Caixas de Seleção vs. Interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Acessibilidade

- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e seletores. Na maioria dos casos, isso é feito usando o elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<Switch
  value="interruptorA"
  inputProps={{ 'aria-label': 'Interruptor A' }}
/>
```