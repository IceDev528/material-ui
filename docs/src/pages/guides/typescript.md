# TypeScript

You can add static typing to JavaScript to improve developer productivity and code quality thanks to [TypeScript](https://www.typescriptlang.org/).
Have a look at the [Create React App with TypeScript](https://github.com/mui-org/material-ui/tree/v1-beta/examples/create-react-app-with-typescript) example.

## Usage of `withStyles`

The usage of `withStyles` in TypeScript can be a little tricky, so it's worth showing some examples. You can first call `withStyles()` to create a decorator function, like so:

```jsx
const decorate = withStyles(({ palette, spacing }) => ({
  root: {
    padding: spacing.unit,
    background: palette.background,
    color: palette.primary,
  },
}));
```

This can then subsequently be used to decorate either a stateless functional component or a class component. Suppose we have in either case the following props:

```jsx
interface Props {
  text: string;
  type: TypographyProps['type'];
  color: TypographyProps['color'];
}
```

Functional components are straightforward:

```jsx
const DecoratedSFC = decorate<Props>(({ text, type, color, classes }) => (
  <Typography type={type} color={color} classes={classes}>
    {text}
  </Typography>
));
```

Class components are a little more cumbersome. Due to a [current limitation in TypeScript's decorator support](https://github.com/Microsoft/TypeScript/issues/4881), `withStyles` can't be used as a class decorator. Instead, we decorate a class component like so:

```jsx
const DecoratedClass = decorate(
  class extends React.Component<Props & WithStyles<'root'>> {
    render() {
      const { text, type, color, classes } = this.props
      return (
        <Typography type={type} color={color} classes={classes}>
          {text}
        </Typography>
      )
    }
  }
);
```

Note that in the class example you didn't need to annotate `<Props>` in the call to `decorate`; type inference took care of everything. One caveat is that if your styled component takes _no_ additional props in addition to `classes`. The natural thing would be to write:

```jsx
const DecoratedNoProps = decorate(
  class extends React.Component<WithStyles<'root'>> {
    render() {
      return (
        <Typography classes={this.props.classes}>
          Hello, World!
        </Typography>
      )
    }
  }
);
```

Unfortunately, TypeScript infers the wrong type in this case and you'll have trouble when you go to make an element of this component. In this case, you'll need to provide an explicit `{}` type argument, like so:

```jsx
const DecoratedNoProps = decorate<{}>( // <-- note the type argument!
  class extends React.Component<WithStyles<'root'>> {
    render() {
      return (
        <Typography classes={this.props.classes}>
          Hello, World!
        </Typography>
      )
    }
  }
);
```

To avoid worrying about this edge case it may be a good habit to always provide an explicit type argument to `decorate`.
