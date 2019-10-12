# API

<p class="description">The API reference of @material-ui/core/styles.</p>

## `createGenerateClassName([options]) => class name generator`

Uma função que retorna [uma função geradora de nome de classe](https://cssinjs.org/jss-api/#generate-your-class-names).

#### Argumentos

1. `options` (*Object* [opcional]): 
  - `options.disableGlobal` (*Boolean* [opcional]): Padrão `false`. Desabilita a geração de nomes de classes determinísticas.
  - `options.productionPrefix` (*String* [opcional]): Padrão `'jss'`. A string usada para prefixar os nomes de classes em produção.
  - `options.seed` (*String* [opcional]): Padrão `''`. A string u usada unicamente para identificar o gerador. Ela pode ser usada para evitar colisões de nomes de classes ao usar vários geradores no mesmo documento.

#### Retornos

`class name generator`: O gerador que deve ser fornecido ao JSS.

#### Exemplos

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

Esta função realmente não "faz nada" em tempo de execução, é apenas uma função de identidade. Sua única finalidade é prevenir a ampliação de tipos do **TypeScript**, ao fornecer regras de estilo para `makeStyles`/`withStyles` que são uma função do `Tema`.

#### Argumentos

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos.

#### Retornos

`styles`: Uma função que gera os estilos ou um objeto de estilos.

#### Exemplos

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

Vincula uma folha de estilo a um componente de função usando o padrão **hook**.

#### Argumentos

1. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ela será vinculada ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
2. `options` (*Object* [opcional]): 
  - `options.defaultTheme` (*Object* [opcional]): O tema padrão a ser usado se um tema não for fornecido por meio de um provedor de temas.
  - `options.name` (*String* [opcional]): O nome da folha de estilo. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
  - `options.flip` (*Boolean* [opcional]): Quando definido como `false`, está folha irá cancelar a transformação `rtl`. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
  - As outras chaves são encaminhadas para o argumento de opções do [jss.createStyleSheet ([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

#### Retornos

`hook`: Um hook. Este hook pode ser usado em uma função que retorna o componente. A documentação geralmente chama esse hook retornado de `useStyles`. Aceita um argumento: as propriedades que serão usadas para "interpolação" na folha de estilo.

#### Exemplos

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

Esta é uma classe auxiliar para manipular a renderização do lado do servidor. [You can follow this guide for a practical approach](/guides/server-rendering/).

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

A instanciação aceita um objeto de opções como primeiro argumento.

1. `options` (*Object* [opcional]): As opções são distribuídas como propriedades para o componente [`StylesProvider`](#stylesprovider).

### `sheets.collect(node) => Elemento React`

O método envolve seu nó React em um elemento provider. Ele coleta as folhas de estilo durante a renderização para que elas possam ser enviadas posteriormente ao cliente.

### `sheets.toString() => CSS string`

O método retorna os estilos coletados.

⚠️ Você deve chamar `.collect()` antes de usar este método.

### `sheets.getStyleElement() => CSS do elemento React`

O método é uma alternativa para `.toString()` quando você esta renderizando a página inteira com React.

⚠️ Você deve chamar `.collect()` antes de usar este método.

## `styled(Component)(styles, [options]) => Component`

Vincula uma folha de estilos, com uma função de componente, usando o padrão de **componentes estilizados (styled components)**.

#### Argumentos

1. `Component`: O componente que será manipulado.
2. `styles` (*Function | Object*): Uma função que gera os estilos ou um objeto de estilos. Ela será vinculada ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como propriedade do primeiro argumento.
3. `options` (*Object* [opcional]): 
  - `options.defaultTheme` (*Object* [opcional]): O tema padrão a ser usado se um tema não for fornecido por meio de um provedor de temas.
  - `options.withTheme` (*Boolean* [opcional]): Padrão `false`. Fornecer o objeto `theme` para o componente como uma propriedade.
  - `options.name` (*String* [opcional]): O nome da folha de estilo. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
  - `options.flip` (*Boolean* [opcional]): Quando definido como `false`, está folha irá cancelar a transformação `rtl`. Quando definido para `true`, os estilos são invertidos. Quando definido para `null`, segue `theme.direction`.
  - As outras chaves são encaminhadas para o argumento de opções do [jss.createStyleSheet ([styles], [options])](https://cssinjs.org/jss-api/#create-style-sheet).

#### Retornos

`Component`: O novo componente criado.

#### Exemplos

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

Este componente permite que você altere o comportamento da solução de estilo. Ele torna as opções disponíveis na árvore React graças ao contexto.

Deve preferencialmente ser usado na **raiz da sua árvore de componentes**.

#### PropsPor padrão, os estilos são injetados por último 

<head>
  elemento da página. Como resultado, eles ganham mais especificidade do que qualquer outra folha de estilo. Se você quiser sobrescrever estilos do Material-UI, defina esta propriedade.</td> </tr> 
  
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
      Instância do JSS.
    </td>
  </tr></tbody> </table> 
  
  <h4>
    Exemplos
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
    Este componente tem uma propriedade <code>theme</code>, e se torna disponível pela árvore React graças ao contexto. Deve preferencialmente ser usado na <strong>raiz da sua árvore de componentes</strong>.
  </p>
  
  <h4>
    Props
  </h4>
  
  <table>
    <tr>
      <th align="left">
        Nome
      </th>
      
      <th align="left">
        Tipo
      </th>
      
      <th align="left">
        Padrão
      </th>
      
      <th align="left">
        Descrição
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
        Sua árvore de componentes.
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
        Um objeto de tema. Você pode utilizar uma função para receber o tema externo.
      </td>
    </tr>
  </table>
  
  <h4>
    Exemplos
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
    Este hook retorna o objeto <code>theme</code>, para que possa ser usado dentro de um componente retornado por função.
  </p>
  
  <h4>
    Retornos
  </h4>
  
  <p>
    <code>theme</code>: O objeto de tema previamente injetado no contexto.
  </p>
  
  <h4>
    Exemplos
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
    Vincula uma folha de estilos com um componente usando o padrão de <strong>higher-order component</strong>. Ele não modifica o componente passados para ele; em vez disso, ele retorna um novo componente, com a propriedade <code>classes</code>. Este objeto <code>classes</code> contém o nome das classes inseridas no DOM.
  </p>
  
  <p>
    Alguns detalhes de implementação que podem ser interessantes para estar ciente:
  </p>
  
  <ul spaces="0" level="0" marker="-">
    <li level="0">
      Adiciona uma propriedade <code>classes</code>, assim você pode substituir, a partir do exterior, os nomes de classe previamente injectados.
    </li>
    <li level="0">
      Ele encaminha refs para o componente interno.
    </li>
    <li level="0">
      A propriedade <code>innerRef</code> está descontinuada. Em vez disso, use <code>ref</code>.
    </li>
    <li level="0">
      Ele <strong>não</strong> faz copia sobre estáticos. Por exemplo, pode ser usado para definir um método estático (next.js) <code>getInitialProps()</code>.
    </li>
  </ul>
  
  <h4>
    Argumentos
  </h4>
  
  <ol start="1" spaces="2" level="0">
    <li level="0">
      <code>styles</code> (<em>Function | Object</em>): Uma função que gera os estilos ou um objeto de estilos. Ela será vinculada ao componente. Use a assinatura da função se você precisar ter acesso ao tema. É fornecido como o primeiro argumento.
    </li>
    
    <li level="0">
      <code>options</code> (<em>Object</em> [opcional]): <ul spaces="0" level="1" marker="-">
        <li level="1">
          <code>options.defaultTheme</code> (<em>Object</em> [opcional]): O tema padrão a ser usado se um tema não for fornecido por meio de um provedor de temas.
        </li>
        <li level="1">
          <code>options.withTheme</code> (<em>Boolean</em> [opcional]): Padrão <code>false</code>. Fornecer o objeto <code>theme</code> para o componente como uma propriedade.
        </li>
        <li level="1">
          <code>options.name</code> (<em>String</em> [opcional]): O nome da folha de estilo. Útil para depuração. Se o valor não for fornecido, ele tentará usar o nome do componente.
        </li>
        <li level="1">
          <code>options.flip</code> (<em>Boolean</em> [opcional]): Quando definido como <code>false</code>, está folha irá cancelar a transformação <code>rtl</code>. Quando definido para <code>true</code>, os estilos são invertidos. Quando definido para <code>null</code>, segue <code>theme.direction</code>.
        </li>
        <li level="1">
          As outras chaves são encaminhadas para o argumento de opções do <a href="https://cssinjs.org/jss-api/#create-style-sheet">jss.createStyleSheet ([styles], [options])</a>.
        </li>
      </ul>
    </li>
  </ol>
  
  <h4>
    Retornos
  </h4>
  
  <p>
    <code>higher-order component</code>: Deve ser usado para encapsular o componente.
  </p>
  
  <h4>
    Exemplos
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
    Além disso, você pode usar como <a href="https://babeljs.io/docs/en/babel-plugin-proposal-decorators">decoradores</a> dessa forma:
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
    Fornece o objeto <code>theme</code> como uma propriedade do componente de entrada, para que ele possa ser usado no método de renderização.
  </p>
  
  <h4>
    Argumentos
  </h4>
  
  <ol start="1" spaces="0" level="0">
    <li level="0">
      <code>Component</code>: O componente que será manipulado.
    </li>
  </ol>
  
  <h4>
    Retornos
  </h4>
  
  <p>
    <code>Component</code>: O novo componente criado. Encaminha refs para o componente interno.
  </p>
  
  <h4>
    Exemplos
  </h4>
  
  <pre><code class="jsx">import React from 'react';
import { withTheme } from '@material-ui/core/styles';

function MyComponent(props) {
  return &lt;div&gt;{props.theme.direction}&lt;/div&gt;;
}

export default withTheme(MyComponent);
</code></pre>