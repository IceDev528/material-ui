---
title: Componente React para Caixa de seleção
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
materialDesign: 'https://material.io/components/selection-controls#checkboxes'
githubLabel: 'component: Checkbox'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#checkbox'
---

# Caixa de seleção

<p class="description">Caixas de seleção permitem ao usuário selecionar um ou mais itens de um conjunto.</p>

Caixas de seleção podem ser usadas para ativar ou desativar uma opção.

Se você tem várias opções aparecendo em uma lista, você pode economizar espaço usando caixas de seleção ao invés de interruptores liga/desliga. Se você tem uma única opção, evite usar uma caixa de seleção e use um interruptor de liga/desliga.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Caixa de seleção básica

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## Caixas de seleção com FormGroup

You can provide a label to the `Checkbox` thanks to the `FormControlLabel` component.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Size

Use the `size` prop or customize the font size of the svg icons to change the size of the checkboxes.

{{"demo": "pages/components/checkboxes/SizeCheckboxes.js"}}

## Color

{{"demo": "pages/components/checkboxes/ColorCheckboxes.js"}}

## Ícone

{{"demo": "pages/components/checkboxes/IconCheckboxes.js"}}

## Controlado

Você pode controlar a checkbox com as opções `checked` e `onChange`:

{{"demo": "pages/components/checkboxes/ControlledCheckbox.js"}}

## Caixa de seleção com FormControlLabel

Uma caixa de seleção só pode ter dois estados em um formulário: marcado ou desmarcado. Ou submete o seu valor ou não. Visually, there are **three** states a checkbox can be in: checked, unchecked, or indeterminate.

{{"demo": "pages/components/checkboxes/IndeterminateCheckbox.js"}}

> ⚠️ When indeterminate is set, the value of the `checked` prop only impacts the form submitted values. It has no accessibility or UX implications.

## Posicionamento do rótulo

`FormGroup` is a helpful wrapper used to group selection control components.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Posicionamento do rótulo

Você pode alterar o posicionamento do rótulo:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Customization

Here is an example of customizing the component. You can learn more about this in the [overrides documentation page](/customization/how-to-customize/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/checkbox/).

## Quando usar

- [Caixas de Seleção vs. Botões de Opção](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Caixas de Seleção vs. Interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e interruptores. Na maioria dos casos, isso é feito usando o elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```
