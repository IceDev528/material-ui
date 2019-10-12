---
title: Composant React de champ de texte
components: FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField
---

# Text Fields (Champs de texte)

<p class="description">Les champs de texte permettent aux utilisateurs d'entrer et de modifier du texte.</p>

[Text fields](https://material.io/design/components/text-fields.html) allow users to enter text into a UI. They typically appear in forms and dialogs.

## TextField

Le composant d'encapsulation `TextField` est un contrôle de formulaire complet comprenant une étiquette, une entrée et un texte d'aide.

{{"demo": "pages/components/text-fields/TextFields.js"}}

> **Note:** This version of the text field is no longer documented in the [Material Design guidelines](https://material.io/), but Material-UI will continue to support it.

## Encadré

`TextField` prend en charge le style encadré.

{{"demo": "pages/components/text-fields/OutlinedTextFields.js"}}

## Remplis

`TextField` prend en charge le style rempli.

{{"demo": "pages/components/text-fields/FilledTextFields.js"}}

## Composants

`TextField` est composé d'éléments plus petits ( [`FormControl`](/api/form-control/), [`Input`](/api/input/), [`FilledInput`](/api/filled-input/), [`InputLabel`](/api/input-label/), [`OutlinedInput`](/api/outlined-input/), et [`FormHelperText`](/api/form-helper-text/) ) que vous pouvez utiliser directement pour personnaliser de manière significative vos entrées de formulaire.

Vous avez peut-être également remarqué que certaines propriétés d'entrée HTML natives sont absentes du composant `TextField`. C'est intentionnel. Le composant prend en charge les propriétés les plus utilisées, puis il appartient à l'utilisateur d'utiliser le composant sous-jacent présenté dans la démonstration suivante. Néanmoins, vous pouvez utiliser `inputProps` (et `InputProps`, `InputLabelProps` propriétés) pour aller plus vite.

{{"demo": "pages/components/text-fields/ComposedTextField.js"}}

## Inputs

{{"demo": "pages/components/text-fields/Inputs.js"}}

## Inputs personnalisées

Here are some examples of customizing the component. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/text-fields/CustomizedInputs.js"}}

La personnalisation ne se limite pas aux CSS, vous pouvez utiliser la composition pour créer des composants personnalisés et donner à votre application une sensation unique. Voici un exemple utilisant le composant [`InputBase`](/api/input-base/), inspiré de Google Maps.

{{"demo": "pages/components/text-fields/CustomizedInputBase.js"}}

## Ornements d'input

`Input` permet de fournir `InputAdornment`. Ceux-ci peuvent être utilisés pour ajouter un préfixe, un suffixe ou une action à une entrée. Par exemple, vous pouvez utiliser un bouton icône pour masquer ou révéler le mot de passe.

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

### Avec Icone

Les icônes peuvent être spécifiées comme prédéfinies ou ajoutées.

{{"demo": "pages/components/text-fields/InputWithIcon.js"}}

### Ornements d'input remplis

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

### Ornements d'input décrits

{{"demo": "pages/components/text-fields/InputAdornments.js"}}

## Disposition

`TextField`, `FormControl` permettent de spécifier les `margin` pour modifier l'espacement vertical des entrées. L’utilisation de `none` (par défaut) n’appliquera pas les marges au `FormControl`, alors que `dense` et `normal` modifieront aussi les autres styles pour respecter les spécifications.

{{"demo": "pages/components/text-fields/TextFields.js"}}

## Restrictions

### Shrink

Le label "shrink" n'est pas toujours correct. Le label d'input est supposé se réduire dès que l'input affiche quelque chose. Dans certaines circonstances, nous ne pouvons pas déterminer l'état de "réduction" (entrée de numéro, entrée de date / heure, entrée de bande). Vous remarquerez peut-être un chevauchement.

![shrink](/static/images/text-fields/shrink.png)

Pour contourner le problème, vous pouvez forcer l'état "shrink" de la legende.

```jsx
<TextField InputLabelProps={{ shrink: true }} />
```

ou

```jsx
<InputLabel shrink>Contagem</InputLabel>
```

### Floating label

The floating label is absolutely positioned, it won't impact the layout of the page. You need to make sure that the input is larger than the label to display correctly.

## Integration with 3rd party input libraries

You can use third-party libraries to format an input. You have to provide a custom implementation of the `<input>` element with the `inputComponent` property.

La démo suivante utilise les bibliothèques [react-text-mask](https://github.com/text-mask/text-mask) et [react-number-format](https://github.com/s-yadav/react-number-format). The same concept could be applied to [e.g. react-stripe-element](https://github.com/mui-org/material-ui/issues/16037).

{{"demo": "pages/demos/text-fields/FormattedInputs.js"}}

The provided input component should handle the `inputRef` property. The property should be called with a value that implements the following interface:

```ts
interface InputElement {
  focus(): void;
  value?: string;
}
```

```jsx
function MyInputComponent(props) {
  const { component: Component, inputRef, ...other } = props;

  // implement `InputElement` interface
  React.useImperativeHandle(inputRef, () => ({
    focus: () => {
      // logic to focus the rendered component from 3rd party belongs here
    },
    // hiding the value e.g. react-stripe-elements
  }));

  // `Component` will be your `SomeThirdPartyComponent` from below
  return <Component {...other} />;
}

// usage
<TextField
  InputProps={{
    inputComponent: MyInputComponent,
    inputProps: { component: SomeThirdPartyComponent },
  }}
/>;
```

## Accessibilité

In order for the text field to be accessible, **the input should be linked to the label and the helper text**. The underlying DOM nodes should have this structure.

```jsx
<div class="form-control">
  <label for="my-input">Email address</label>
  <input id="my-input" aria-describedby="my-helper-text" />
  <span id="my-helper-text">We'll never share your email.</span>
</div>
```

- Si vous utilisez le composant `TextField` , il vous suffit de fournir un identifiant unique `id`.
- Si vous composez le composant:

```jsx
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
```

## Projets complémentaires

Pour des cas d'utilisation plus avancés, vous pourrez peut-être tirer parti des avantages suivants:

- [formik-material-ui](https://github.com/stackworx/formik-material-ui) Bindings for using Material-UI with formik.
- [redux-form-material-ui](https://github.com/erikras/redux-form-material-ui) A set of wrapper components to facilitate using Material UI with Redux Form.
- [final-form-material-ui](https://github.com/Deadly0/final-form-material-ui) A set of wrapper components to facilitate using Material UI with Final Form.