# Color

<p class="description">Transmitir significado a través del color. Ahora mismo se puede acceder a todos los colores en la especificación de diseño de Material Design.</p>

El [sistema de color](https://material.io/design/color/) Material Design se puede utilizar para crear un tema de color que refleje su marca o estilo.

## Sistema de color

### Términos importantes

#### "Pallette" (Paleta)

Una paleta es una colección de colores, es decir, su matiz (color) y sus tonos. Material-UI proporciona todos los colores incluidos en las pautas de Material Design. [Esta paleta de colores](#color-palette) ha sido diseñada con colores que funcionan en armonía unos con otros.

#### "Hue" & "Shade" (Matiz y tono)

Un solo color dentro de la paleta está formado por un matiz como el "rojo" y un tono, como "500". "rojo 50" es el tono más claro de rojo (*¡rosa!*), mientras que "rojo 900" es el más oscuro. Además, la mayoría de los matices vienen con tonos de "acento", prefijados con una `A`.

### Ejemplos

La paleta de colores de Material Design consta de colores primarios y de acento que se pueden usar para ilustrar o desarrollar los colores de su marca. Han sido diseñados para trabajar en armonía unos con otros.

Por ejemplo, puede referirse a colores primarios y de acento complementarios (por ejemplo, 'rojo 500' & 'púrpura A200'), así:

```js
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
const accent = purple.A200; // #E040FB (método alternativo)
```

### Paleta de colores

Dado un *HUE (matiz)* (rojo, rosa, etc.) y una *SHADE (tono)* (500, 600, etc.) se puede importar el color así:

```jsx
import HUE from '@material-ui/core/colors/HUE';

const color = HUE[SHADE];
```

{{"demo": "pages/customization/color/Color.js", "hideHeader": true}}

## Herramienta de color

Para probar un esquema de color [material.io/design/color](https://material.io/design/color/) con la documentación de Material-UI, simplemente se pueden seleccionar los colores usando la paleta y los sliders de abajo. Como alternativa, se pueden escribir valores hexadecimales en los campos de text Primary (color primario) y Secondary (color secundario).

{{"demo": "pages/customization/color/ColorTool.js", "hideHeader": true}}

The output shown in the color sample can be pasted directly into a [`createMuiTheme()`](/customization/theming/#createmuitheme-options-theme) function (to be used with [`ThemeProvider`](/customization/theming/#theme-provider)):

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});
```

Only the `main` shades need be provided (unless you wish to further customize `light`, `dark` or `contrastText`), as the other colors will be calculated by `createMuiTheme()`, as described in the [Theme customization](/customization/palette/) section.

If you are using the default primary and / or secondary shades then by providing the color object, `createMuiTheme()` will use the appropriate shades from the material color for main, light and dark.

### Herramienta oficial de color

El equipo de Material Design ha creado una increíble herramienta para configurar la paleta [material.io/tools/color](https://material.io/tools/color/). This can help you create a color palette for your UI, as well as measure the accessibility level of any color combination.

<a href="https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=3F51B5&secondary.color=F44336" target="_blank" rel="noopener nofollow">
  <img src="/static/images/color/colorTool.png" alt="Herramienta oficial de color" style="width: 574px" />
</a>

The output can be fed into `createMuiTheme()` function:

```jsx
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
```

### Herramientas de la comunidad

- [create-mui-theme](https://react-theming.github.io/create-mui-theme/): Is an online tool for creating Material-UI themes via Material Design Color Tool.
- [material-ui-theme-editor](https://in-your-saas.github.io/material-ui-theme-editor/): A tool to generate themes for your Material-UI applications by just selecting the colors and having a live preview.
- [Material palette generator](https://material.io/inline-tools/color/): The Material palette generator can be used to generate a palette for any color you input.