---
title: Componente React Interruptor
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel, SwitchUnstyled
githubLabel: 'component: Switch'
materialDesign: 'https://material.io/components/selection-controls#switches'
---

# Interruptor

<p class="description">Interruptores alternam o estado de uma única configuração ligado ou desligado.</p>

[Interruptores](https://material.io/design/components/selection-controls.html#switches) são a forma preferida de ajustes de configuração em mobile. A opção que o interruptor controla, juntamente com o estado atual, deve ser claramente explícita no rótulo em linha correspondente.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Interruptores básicos

{{"demo": "pages/components/switches/BasicSwitches.js"}}

## Caixas de seleção com FormGroup

Você pode fornecer um rótulo para o `Switch` graças ao componente `FormControlLabel`.

{{"demo": "pages/components/switches/SwitchLabels.js"}}

## Tamanho

Use a propriedade `size` para alterar o tamanho do interruptor.

{{"demo": "pages/components/switches/SwitchesSize.js"}}

## Cor

{{"demo": "pages/components/switches/ColorSwitches.js"}}

## Controlled

Você pode controlar o interruptor com as propriedades `checked` e `onChange`:

{{"demo": "pages/components/switches/ControlledSwitches.js"}}

## Interruptores com FormGroup

`FormGroup` é usado para agrupar componentes de seleção para facilitar o uso da API. `FormGroup` é usado para agrupar componentes de seleção para facilitar o uso da API. (Veja: [Quando usar](#when-to-use)).

{{"demo": "pages/components/switches/SwitchesGroup.js"}}

## Customização

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

{{"demo": "pages/components/switches/CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch/).

## Unstyled

The switch also comes with an unstyled version. É ideal para fazer personalizações pesadas e diminuir o tamanho do pacote.

```jsx
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
```

The `SwitchUnstyled` component provides default components and assigns CSS classes you can style entirely on your own. You are free to choose any styling solution - plain CSS classes, a CSS framework, Emotion, etc. It is also possible to replace these default components by other HTML elements or custom components.

There are three components you can override by the `components` prop: `Root`, `Thumb` and `Input`. Each one's props can be set using the `componentsProps` object.

{{"demo": "pages/components/switches/UnstyledSwitches.js"}}

### useSwitch hook

For the ultimate customizability, a `useSwitch` hook is available. It accepts almost the same options as the SwitchUnstyled component minus the `component`, `components`, and `componentsProps` props.

```jsx
import { useSwitch } from '@mui/base/SwitchUnstyled';
```

#### Basic example

{{"demo": "pages/components/switches/UseSwitchesBasic.js"}}

#### Customized look and feel

{{"demo": "pages/components/switches/UseSwitchesCustom.js"}}

## Posicionamento do rótulo

Você pode alterar o posicionamento do rótulo:

{{"demo": "pages/components/switches/FormControlLabelPosition.js"}}

## Quando usar

- [Caixas de Seleção vs. Interruptores](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Acessibilidade

- Ele irá renderizar um elemento com a regra de `checkbox` e não `switch`, pois esta regra não é amplamente suportada ainda. Por favor, teste primeiro se a tecnologia assistiva do seu público-alvo suporta essa regra corretamente. Em seguida, você pode alterar a regra com `<Switch inputProps={{ role: 'switch' }}>`
- Todos os controles de formulário devem ter rótulos, e isso inclui os botões de opção, caixas de seleção e interruptores. Na maioria dos casos, isso é feito usando o elemento `<label>` ([FormControlLabel](/api/form-control-label/)).
- Quando um rótulo não pode ser usado, é necessário adicionar um atributo diretamente no componente de entrada. Nesse caso você pode aplicar um atributo adicional (e.g.`aria-label`,`aria-labelledby`, `title`) através da propriedade `inputProps`.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
