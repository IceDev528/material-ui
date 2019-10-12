# API

<p class="description">The API reference of @material-ui/core/styles.</p>

## `createGenerateClassName([options]) => class name generator`

[クラス名ジェネレーター関数を返す関数](https://cssinjs.org/jss-api/#generate-your-class-names) 。

#### 引数

1. `オプション` (*オプジェクト* [任意]): 
  - `options.disableGlobal` (*Boolean* [optional]): Defaults `false`. 確定的なクラス名の生成を無効にします。
  - `options.productionPrefix` (*String* [optional]): Defaults to `'jss'`. プロダクションでクラス名のプレフィックスに使用される文字列。
  - `options.seed` (*String* [optional]): Defaults to `''`. ジェネレータを一意に識別するために使用される文字列。 同じドキュメントで複数のジェネレーターを使用する場合、クラス名の衝突を避けるために使用できます。

#### 戻り値

`class name generator` ：ジェネレーターをJSSに提供する必要があります。

#### 例

```jsx
import React from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>...</StylesProvider>
  );
}
```

## `createStyles(styles) => styles`

This function doesn't really "do anything" at runtime, it's just the identity function. Its only purpose is to defeat **TypeScript**'s type widening when providing style rules to `makeStyles`/`withStyles` which are a function of the `Theme`.

#### 引数

1. `styles` (*Function | Object*): A function generating the styles or a styles object.

#### 戻り値

`styles`: A function generating the styles or a styles object.

#### 例

```jsx
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.color.red,
  },
}));

function MyComponent {
  const classes = useStyles();
  return <div className={classes.root} />;
}

export default MyComponent;
```

## `makeStyles(styles, [options]) => hook`

Link a style sheet with a function component using the **hook** pattern.

#### 引数

1. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
2. `オプション` (*オプジェクト* [任意]): 
  - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
  - `options.name` (*String* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
  - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
  - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

#### 戻り値

`hook`: A hook. This hook can be used in a function component. The documentation often calls this returned hook `useStyles`. It accepts one argument: the properties that will be used for "interpolation" in the style sheet.

#### 例

```jsx
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color,
  },
});

export default function MyComponent(props) {
  const classes = useStyles(props);
  return <div className={classes.root} />;
}
```

## `ServerStyleSheets`

This is a class helper to handle server-side rendering. [You can follow this guide for a practical approach](/guides/server-rendering/).

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';

const sheets = new ServerStyleSheets();
const html = ReactDOMServer.renderToString(sheets.collect(<App />));
const cssString = sheets.toString();

const response = `
<!DOCTYPE html>
<html>
  <head>
    <style id="jss-server-side">${cssString}</style>
  </head>
  <body>${html}</body>
</html>
`;
```

### `new ServerStyleSheets([options])`

The instantiation accepts an options object as a first argument.

1. `options` (*Object* [optional]): The options are spread as props to the [`StylesProvider`](#stylesprovider) component.

### `sheets.collect(node) => React element`

The method wraps your React node in a provider element. It collects the style sheets during the rendering so they can be later sent to the client.

### `sheets.toString() => CSS string`

The method returns the collected styles.

⚠️ You must call `.collect()` before using this method.

### `
sheets.getStyleElement() => CSS React element`

The method is an alternative to `.toString()` when you are rendering the whole page with React.

⚠️ You must call `.collect()` before using this method.

## `styled(Component)(styles, [options]) => Component`

Link a style sheet with a function component using the **styled components** pattern.

#### 引数

1. `Component`: The component that will be wrapped.
2. `styles` (*Function | Object*): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as property of the first argument.
3. `オプション` (*オプジェクト* [任意]): 
  - `options.defaultTheme` (*Object* [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
  - `options.withTheme` (*ブール値* [任意]): デフォルト値 `false`. `theme`オブジェクトをプロパティとしてコンポーネントに提供します。
  - `options.name` (*String* [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
  - `options.flip` (*Boolean* [optional]): When set to `false`, this sheet will opt-out the `rtl` transformation. When set to `true`, the styles are inversed. When set to `null`, it follows `theme.direction`.
  - The other keys are forwarded to the options argument of [jss.createStyleSheet([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

#### 戻り値

`Component` ：作成された新しいコンポーネント。

#### 例

```jsx
import React from 'react';
import { styled } from '@material-ui/core/styles';

const MyComponent = styled('div')({
  backgroundColor: 'red',
});

const MyThemeComponent = styled('div')(({
  theme
}) => ({
  padding: theme.spacing(1),
}));

export default function StyledComponents() {
  return (
    <MyThemeComponent>
      <MyComponent />
    </MyThemeComponent>
  );
}
```

## `StylesProvider`

This component allows you to change the behavior of the styling solution. It makes the options available down the React tree thanks to the context.

It should preferably be used at **the root of your component tree**.

#### PropsBy default, the styles are injected last in the 

<head>
  element of the page. As a result, they gain more specificity than any other style sheet. If you want to override Material-UI's styles, set this prop.</td> </tr> 
  
  <tr>
    <td align="left">
      jss
    </td>
    
    <td align="left">
      object
    </td>
    
    <td align="left">
      
    </td>
    
    <td align="left">
      JSS's instance.
    </td>
  </tr></tbody> </table> 
  
  <h4>
    例
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/core/styles';

function App() {
  return (
    &lt;StylesProvider jss={jss}&gt;...&lt;/StylesProvider&gt;
  );
}

ReactDOM.render(&lt;App /&gt;, document.querySelector('#app'));
</code></pre>
  
  <h2>
    <code>ThemeProvider</code>
  </h2>
  
  <p>
    This component takes a <code>theme</code> property, and makes it available down the React tree thanks to the context. It should preferably be used at <strong>the root of your component tree</strong>.
  </p>
  
  <h4>
    Props
  </h4>
  
  <table>
    <tr>
      <th align="left">
        Name
      </th>
      
      <th align="left">
        Type
      </th>
      
      <th align="left">
        Default
      </th>
      
      <th align="left">
        Description
      </th>
    </tr>
    
    <tr>
      <td align="left">
        children&nbsp;*
      </td>
      
      <td align="left">
        node
      </td>
      
      <td align="left">
        
      </td>
      
      <td align="left">
        Your component tree.
      </td>
    </tr>
    
    <tr>
      <td align="left">
        theme&nbsp;*
      </td>
      
      <td align="left">
        union:&nbsp;object&nbsp;&#124;&nbsp;func
      </td>
      
      <td align="left">
        
      </td>
      
      <td align="left">
        A theme object. You can provide a function to extend the outer theme.
      </td>
    </tr>
  </table>
  
  <h4>
    例
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = {};

function App() {
  return (
    &lt;ThemeProvider theme={theme}&gt;...&lt;/ThemeProvider&gt;
  );
}

ReactDOM.render(&lt;App /&gt;, document.querySelector('#app'));
</code></pre>
  
  <h2>
    <code>useTheme() =&gt; theme</code>
  </h2>
  
  <p>
    This hook returns the <code>theme</code> object so it can be used inside a function component.
  </p>
  
  <h4>
    戻り値
  </h4>
  
  <p>
    <code>theme</code>：以前にコンテキストに挿入されたテーマオブジェクト。
  </p>
  
  <h4>
    例
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function MyComponent() {
  const theme = useTheme();

  return &lt;div&gt;{`spacing ${theme.spacing}`}&lt;/div&gt;;
}
</code></pre>
  
  <h2>
    <code>withStyles(styles, [options]) =&gt; higher-order component</code>
  </h2>
  
  <p>
    Link a style sheet with a component using the <strong>higher-order component</strong> pattern. It does not modify the component passed to it; instead, it returns a new component with a <code>classes</code> property. This <code>classes</code> object contains the name of the class names injected in the DOM.
  </p>
  
  <p>
    注意が必要な実装の詳細は、次のとおりです。
  </p>
  
  <ul spaces="0" level="0" marker="-">
    <li level="0">
      It adds a <code>classes</code> property so you can override the injected class names from the outside.
    </li>
    <li level="0">
      It forwards refs to the inner component.
    </li>
    <li level="0">
      The <code>innerRef</code> prop is deprecated. Use <code>ref</code> instead.
    </li>
    <li level="0">
      It does <strong>not</strong> copy over statics. たとえば、<code>getInitialProps()</code>静的メソッド (next.js) を定義するために使用できます。
    </li>
  </ul>
  
  <h4>
    引数
  </h4>
  
  <ol start="1" spaces="2" level="0">
    <li level="0">
      <code>styles</code> (<em>Function | Object</em>): A function generating the styles or a styles object. It will be linked to the component. Use the function signature if you need to have access to the theme. It's provided as the first argument.
    </li>
    
    <li level="0">
      <code>オプション</code> (<em>オプジェクト</em> [任意]): <ul spaces="0" level="1" marker="-">
        <li level="1">
          <code>options.defaultTheme</code> (<em>Object</em> [optional]): The default theme to use if a theme isn't supplied through a Theme Provider.
        </li>
        <li level="1">
          <code>options.withTheme</code> (<em>ブール値</em> [任意]): デフォルト値 <code>false</code>. <code>theme</code>オブジェクトをプロパティとしてコンポーネントに提供します。
        </li>
        <li level="1">
          <code>options.name</code> (<em>String</em> [optional]): The name of the style sheet. Useful for debugging. If the value isn't provided, it will try to fallback to the name of the component.
        </li>
        <li level="1">
          <code>options.flip</code> (<em>Boolean</em> [optional]): When set to <code>false</code>, this sheet will opt-out the <code>rtl</code> transformation. When set to <code>true</code>, the styles are inversed. When set to <code>null</code>, it follows <code>theme.direction</code>.
        </li>
        <li level="1">
          The other keys are forwarded to the options argument of <a href="https://cssinjs.org/jss-api/#create-style-sheet">jss.createStyleSheet([styles], [options])</a>.
        </li>
      </ul>
    </li>
  </ol>
  
  <h4>
    戻り値
  </h4>
  
  <p>
    <code>higher-order component</code> ：コンポーネントをラップするために使用する必要があります。
  </p>
  
  <h4>
    例
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

function MyComponent(props) {
  return &lt;div className={props.classes.root} /&gt;;
}

export default withStyles(styles)(MyComponent);
</code></pre>
  
  <p>
    また、<a href="https://babeljs.io/docs/en/babel-plugin-proposal-decorators">デコレータ</a>などとしてしても使用できます。
  </p>
  
  <pre><code class="jsx">import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

@withStyles(styles)
class MyComponent extends React.Component {
  render () {
    return &lt;div className={this.props.classes.root} /&gt;;
  }
}

export default MyComponent
</code></pre>
  
  <h2>
    <code>withTheme(Component) =&gt; Component</code>
  </h2>
  
  <p>
    Provide the <code>theme</code> object as a property of the input component so it can be used in the render method.
  </p>
  
  <h4>
    引数
  </h4>
  
  <ol start="1" spaces="0" level="0">
    <li level="0">
      <code>Component</code>:：ラップされるコンポーネント。
    </li>
  </ol>
  
  <h4>
    戻り値
  </h4>
  
  <p>
    <code>Component</code> ：作成された新しいコンポーネント。 内部コンポーネントへの参照を転送します。
  </p>
  
  <h4>
    例
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { withTheme } from '@material-ui/core/styles';

function MyComponent(props) {
  return &lt;div&gt;{props.theme.direction}&lt;/div&gt;;
}

export default withTheme(MyComponent);
</code></pre>