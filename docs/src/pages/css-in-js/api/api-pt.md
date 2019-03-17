# API

<p class="description">A referência da API do pacote @material-ui/styles.</p>

## `createGenerateClassName([options]) => class name generator`

A function which returns [a class name generator function](http://cssinjs.org/jss-api/#generate-your-class-names).

#### Argumentos

1. `options` (*Object* [optional]): 
    - `options.dangerouslyUseGlobalCSS` (*Boolean* [optional]): Defaults to `false`. Makes the Material-UI class names deterministic.
    - `options.productionPrefix` (*String* [optional]): Defaults to `'jss'`. The string used to prefix the class names in production.
    - `options.seed` (*String* [optional]): Defaults to `''`. The string used to uniquely identify the generator. It can be used to avoid class name collisions when using multiple generators.

#### Returns

`class name generator`: The generator should be provided to JSS.

#### Exemplos

```jsx
import React from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'c',
});

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>...</StylesProvider>
  );
}
```

## `createStyles(styles) => styles`

This function doesn't really "do anything" at runtime, it's just the identity function. Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `withStyles` which are a function of the `Theme`.

#### Argumentos

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos.

#### Returns

`styles`: A function generating the styles or a styles object.

#### Exemplos

```jsx
import { withStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    backgroundColor: 'red',
  },
});

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```

## `makeStyles(styles, [options]) => hook`

Link a style sheet with a function component using the **hook** pattern.

#### Argumentos

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ele será vinculado ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
2. `options` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet).

#### Returns

`hook`: A hook. This hook can be used in a function component. It accepts one argument: the properties that will be used for "interpolation" in the style sheet.

#### Exemplos

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
  },
});

export default function MyComponent() {
  const classes = useStyles();
  return <div className={classes.root} />;
}
```

## `styled(Component)(styles, [options]) => Component`

Link a style sheet with a function component using the **styled components** pattern.

#### Argumentos

1. `Component`: The component that will be wrapped.
2. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ele será vinculado ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
3. `options` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet).

#### Returns

`Component`: The new component created.

#### Exemplos

```jsx
import React from 'react';
import { styled } from '@material-ui/styles';

const MyComponent = styled('div')({
  backgroundColor: 'red',
});

export default function StyledComponents() {
  return <MyComponent />;
}
```

## `StylesProvider`

This component allows you to change the behavior of the styling solution. It makes the options available down the React tree thanks to React context.

It should preferably be used at **the root of your component tree**.

#### Exemplos

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';

function App() {
  return (
    <StylesProvider jss={jss}>...</StylesProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `ThemeProvider`

This component takes a `theme` property, and makes the `theme` available down the React tree thanks to React context. It should preferably be used at **the root of your component tree**.

#### Exemplos

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';

const theme = {};

function App() {
  return (
    <ThemeProvider theme={theme}>...</ThemeProvider>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## `useTheme() => theme`

This hook returns the `theme` object so it can be used inside a function component.

#### Returns

`theme`: The theme object.

#### Exemplos

```jsx
import React from 'react';
import { useTheme } from '@material-ui/styles';

export default function MyComponent() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}
```

## `withStyles(styles, [options]) => higher-order component`

Link a style sheet with a component using the **higher-order component** pattern. Ele não modifica o componente passados para ele; em vez disso, ele retorna um novo componente, com a propriedade `classes`. Este objeto `classes` contém o nome das classes inseridas no DOM.

Alguns detalhes de implementação que podem ser interessantes para estar ciente:

- Adiciona uma propriedade `classes`, assim você pode substituir, a partir do exterior, os nomes de classe previamente injectados.
- It forwards refs to the inner component.
- The `innerRef` prop is deprecated. Use `ref` instead.
- It does **not** copy over statics. Por exemplo, pode ser usado para definir um método estático (next.js) `getInitialProps()`.

#### Argumentos

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ele será vinculado ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
2. `options` (*Object* [optional]): 
    - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
    - `options.withTheme` (*Boolean* [optional]): Defaults to `false`. Provide the `theme` object to the component as a property.
    - `options.name` (*String* [optional]): The name of the style sheet. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
    - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
    - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](http://cssinjs.org/jss-api/#create-style-sheet).

#### Returns

`higher-order component`: Should be used to wrap a component.

#### Exemplos

```jsx
import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default withStyles(styles)(MyComponent);
```

Also, you can use as [decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) like so:

```jsx
import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render () {
    return <div className={this.props.classes.root} />;
  }
}

export default MyComponent
```

## `withTheme(Component) => Component`

Provide the `theme` object as a property of the input component so it can be used in the render method.

#### Argumentos

1. `Component`: The component that will be wrapped.

#### Returns

`Component`: The new component created. Does forward refs to the inner component.

#### Exemplos

```jsx
import React from 'react';
import { withTheme } from '@material-ui/styles';

function MyComponent(props) {
  return <div>{props.theme.direction}</div>;
}

export default withTheme(MyComponent);
```