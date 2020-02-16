---
title: Componente React de Campo de Texto
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Field (campo de texto)

<p class="description">Campos de texto permitem que os usuários digitem e editem texto.</p>

[Campos de texto](https://material.io/design/components/text-fields.html) permitem que os usuários insiram texto em uma interface de usuário. Eles geralmente aparecem em formulários e diálogos.

## TextField

O componente wrapper `TextField` é um controle de formulário completo, incluindo um rótulo, entrada e texto de ajuda.

O `TextField` suporta 3 variações: O estilo padrão, com contorno e preenchido.

{{"demo": "pages/components/text-fields/BasicTextFields.js"}}

**Observação:** A variante padrão do `TextField` não é mais documentada em [Material Design guidelines](https://material.io/) ([entenda o porque](https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03)).

## Form props

Os atributos são suportados pelo `TextField`, como por exemplo `required`, `disabled`, `type`, etc. assim como o `helperText` que é utilizada para dar contexto sobre um campo de entrada, tais como, a entrada que será usada.

{{"demo": "pages/components/text-fields/FormPropsTextFields.js"}}

## Validation

A propriedade `error` habilita o estado de erro, e, utilizando a propriedade `helperText` será fornecido um "feedback" ao usuário sobre o erro.

{{"demo": "pages/components/text-fields/ValidationTextFields.js"}}

## Multiline

A propriedade `multiline` transforma o `textfield` em um `<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">TextArea</a>.</p>

<p>{{"demo": "pages/components/text-fields/MultilineTextFields.js"}}</p>

<h2>Select</h2>

<p>A propriedade <code>select` transforma o `textfield` em um componente [Select](/components/selects/).

{{"demo": "pages/components/text-fields/SelectTextFields.js"}}

## Ícones

Há muitas formas de incluir um icone em um `textfield`.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Decoração de inputs

A forma principal é utilizando um `InputAdornment`. Estes podem ser usados para adicionar um prefixo, sufixo ou uma ação para uma entrada. Por exemplo, você pode usar um botão com ícone para ocultar ou revelar a senha.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Tamanhos

Gosta mais de campos de texto menores? Use a propriedade `size`.

{{"demo": "pages/components/text-fields/TextFieldSizes.js"}}

## Leiaute

`margin` pode ser utilizado para alterar o espaçamento vertical entre os inputs. Using `none` (default) will not apply margins to the `FormControl`, whereas `dense` and `normal` will. `dense` and `normal` alter other styles to meet the specification.

`fullWidth` can be used to make the input take up the full width of its container.

{{"demo": "pages/components/text-fields/LayoutTextFields.js"}}

## Uncontrolled vs Controlled

The component can be controlled or uncontrolled

{{"demo": "pages/components/text-fields/StateTextFields.js"}}

## Componentes

`TextField` é composto por componentes menores ([`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), e [`FormHelperText`](/api/form-helper-text/)) que você pode aproveitar diretamente para personalizar significativamente as entradas do seu formulário.

Você também pode ter notado que algumas propriedades de entrada nativas do HTML estão faltando no componente `TextField`. Isto é intencional. O componente cuida das propriedades mais usadas, depois cabe ao usuário usar o componente exibido na demonstração. Ainda, você pode usar `inputProps` (`InputProps` e `InputLabelProps`) se você quiser evitar algum boilerplate.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Entradas

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Cor

The `color` prop changes the highlight color of the text field when focused.

{{"demo": "pages/components/text-fields/ColorTextFields.js"}}

## Inputs Costumizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

A customização não para no CSS, você pode usar composição para criar componentes personalizados e dar ao seu aplicativo uma sensação única. Abaixo há um exemplo usando o componente [`InputBase`](/api/input-base/), inspirado pelo Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js", "bg": true}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/text-field).

## Limitações

### Reduzir

The input label "shrink" state isn't always correct. The input label is supposed to shrink as soon as the input is displaying something. In some circumstances, we can't determine the "shrink" state (number input, datetime input, Stripe input). You might notice an overlap.

![shrink](/static/images/text-fields/shrink.png)

To workaround the issue, you can force the "shrink" state of the label.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

or

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Rótulo flutuante

The floating label is absolutely positioned, it won't impact the layout of the page. You need to make sure that the input is larger than the label to display correctly.

## Integração com bibliotecas de input de terceiros

You can use third-party libraries to format an input. You have to provide a custom implementation of the `<input>` element with the `inputComponent` property.

The following demo uses the [react-text-mask](https://github.com/text-mask/text-mask) and [react-number-format](https://github.com/s-yadav/react-number-format) libraries. The same concept could be applied to [e.g. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/components/text-fields/FormattedInputs.js"}}

The provided input component should handle the `inputRef` property. The property should be called with a value that implements the following interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
function MeuInputComponente(props) {
  const { component: Component, inputRef, ...other } = props;

  // implementa a interface `InputElement`
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // logica para focar o componente renderizado de terceiros entra aquito focus
    },
    // ocultando o valor p.ex. react-stripe-elements
  }));

  // O `Component` abaixo será seu `AlgumComponentDeTerceiro`
  return <Component {...other} />;
}

// uso
<TextField
  InputProps={{
    inputComponent: MeuInputComponente,
    inputProps: { component: AlgumComponentDeTerceiro },
  }}
/>;
```

## Acessibilidade

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure.

```jsx
<div class="form-control">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

- Se você estiver usando o componente `TextField`, basta fornecer um `id` único.
- Se você está compondo o componente:

```jsx
<div class="form-control">
  <label for="my-input">Endereço de e-mail</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">Nós nunca compartilharemos seu e-mail.</span>
</div>
```

## Projetos Complementares

Para usos mais avançados, você pode tirar vantagem com:

- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with [formik](https://jaredpalmer.com/formik).
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) Bindings for using Material UI with [Redux Form](https://redux-form.com/).
- [mui-rff](https://github.com/lookfirst/mui-rff) Bindings for using Material UI with [React Final Form](https://final-form.org/react).