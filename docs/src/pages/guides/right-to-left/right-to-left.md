# Right-to-left

<p class="description">Right-to-left languages such as Arabic, Persian, or Hebrew are supported. To change the direction of Material-UI components you must follow the following steps.</p>

## Steps

### 1. HTML

Make sure the `dir` attribute is set on the body, otherwise native components will break:

```html
<body dir="rtl"></body>
```

As an alternative to the above, you can also wrap your application in an element with the `dir` attribute:

```jsx
function App() {
  return (
    <div dir="rtl">
      <MyComponent />
    </div>
  );
}
```

This can be helpful for creating components to toggle language settings in the live application.

### 2. Theme

Set the direction in your custom theme:

```js
const theme = createTheme({
  direction: 'rtl',
});
```

### 3. Install the rtl plugin

When using either `emotion` or `styled-components`, you need [`stylis-plugin-rtl`](https://github.com/styled-components/stylis-plugin-rtl) to flip the styles.

```sh
npm install stylis stylis-plugin-rtl
```

> **Note**: Only `emotion` is compatible with version 2 of the plugin. `styled-components` requires version 1. If you are using `styled-components` as a [styled engine](/guides/styled-engine/), make sure to install the correct version.

In case you are using `jss` (up to v4) or with the legacy `@mui/styles` package, you need [`jss-rtl`](https://github.com/alitaheri/jss-rtl) to flip the styles.

```sh
npm install jss-rtl
```

Having installed the plugin in your project, Material-UI components still require it to be loaded by the style engine instance that you use. Find bellow guides on how you can load it.

### 4. Load the rtl plugin

#### 4.1 emotion

If you use emotion as your style engine, you should create new cache instance that uses the `stylis-plugin-rtl` and provide that on the top of your application tree. The [CacheProvider](https://emotion.sh/docs/cache-provider) component enables this:

```jsx
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

function RTL(props) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}
```

#### 4.2 styled-components

If you use `styled-components` as your style engine, you can use the [StyleSheetManager](https://styled-components.com/docs/api#stylesheetmanager) and provide the stylis-plugin-rtl as an item in the `stylisPlugins` property:

```jsx
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

function RTL(props) {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      {props.children}
    </StyleSheetManager>
  );
}
```

#### 4.3 JSS

After installing the plugin in your project, you need to configure the JSS instance to load it.
The next step is to make the new JSS instance available to all the components in the component tree.
The [`StylesProvider`](/styles/api/#stylesprovider) component enables this:

```jsx
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@mui/styles';

// Configure JSS
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
```

For more information on the plugin, head to the [plugin README](https://github.com/alitaheri/jss-rtl).
**Note**: Internally, withStyles is using this JSS plugin when `direction: 'rtl'` is set on the theme.

## Demo

_Use the direction toggle button on the top right corner to flip the whole documentation_

{{"demo": "pages/guides/right-to-left/Direction.js"}}

## Opting out of rtl transformation

### emotion & styled-components

You have to use the template literal syntax and add the `/* @noflip */` directive before the rule or property for which you want to disable right-to-left styles.

```jsx
const AffectedText = styled('div')`
  text-align: left;
`;

const UnaffectedText = styled('div')`
  /* @noflip */
  text-align: left;
`;
```

{{"demo": "pages/guides/right-to-left/RtlOptOutStylis.js", "hideToolbar": true}}

### JSS

If you want to prevent a specific rule-set from being affected by the `rtl` transformation you can add `flip: false` at the beginning.

```jsx
const useStyles = makeStyles(
  (theme) => ({
    affected: {
      textAlign: 'right',
    },
    unaffected: {
      flip: false,
      textAlign: 'right',
    },
  }),
  { defaultTheme },
);
```
