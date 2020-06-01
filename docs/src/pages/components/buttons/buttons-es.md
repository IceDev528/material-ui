---
title: Componente de React Button
components: Button, IconButton, ButtonBase
---

# Button (botón)

<p class="description">Los botones permiten a los usuarios ejecutar acciones, y tomar decisiones, con un simple toque.</p>

[Los botones](https://material.io/design/components/buttons.html) comunican acciones que los usuarios pueden realizar. Usualmente están ubicados dentro de tu interfaz, en lugares como:

- Diálogos
- Ventanas modal
- Formularios
- Tarjetas
- Barras de herramientas

## Botones contenidos

Los [Botones contenidos](https://material.io/design/components/buttons.html#contained-button) son de alto énfasis, distinguidos por el uso de elevación y relleno. Contienen acciones que son primarias para la aplicación.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

Se puede eliminar la elevación con la prop `disableElevation`.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Botones de texto

Los [Botones de texto](https://material.io/design/components/buttons.html#text-button) se suelen usar para acciones menos notables, incluyendo las que se encuentran:

- En diálogos
- En tarjetas

En las tarjetas, los botones de texto ayudan a mantener un énfasis en el contenido de la tarjeta.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Botones con Contorno

[Botones con contorno (outlined)](https://material.io/design/components/buttons.html#outlined-button) son de énfasis medio. Contienen acciones que son importantes, pero no primarias en la app.

Los botones delineados también son una alternativa de menos énfasis que los botones contenidos, o de mayor énfasis que los botones de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Handling clicks

All components accept an `onClick` handler that is applied to the root DOM element.

```jsx
<Button onClick={() => { alert('clicked') }}>Click me</Button>
```

Note that the documentation [avoids](/guides/api/#native-properties) mentioning native props (there are a lot) in the API section of the components.

## Botón de subida

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Tamaños

Botones más grandes o más pequeños? Usa la propiedad `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Botones con iconos y títulos

Tal vez se necesita tener iconos para un botón en particular para mejorar la experiencia del usuario de la aplicación porque se reconocen más fácilmente los logos que el texto. Por ejemplo, si se crea un botón para borrar se le puede poner un icono de papelera.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Botones con Iconos

Los botones de iconos suelen encontrarse en las barras de aplicaciones y las barras de herramientas.

Los iconos son también apropiados para botones toggle que permiten marcar o desmarcar una sola opción, tal como poner o quitar una estrella de un elemento.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Botones Personalizados

Here are some examples of customizing the component. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/button).

## Botones Complejos

Los Botones de Texto, los Botones Contenidos, los Botones de Acción Flotantes y los Botones con Iconos se construyen sobre el mismo componente: el `ButtonBase`. Se puede sacar partido de este componente básico para construir interacciones personalizadas.

{{"demo": "pages/components/buttons/ButtonBase.js"}}

## Librería externa de routing

Un caso de uso común es emplear el botón para iniciar la navegación hacia una nueva página. El componente `ButtonBase` provee un atributo para tratar este uso: `component`. Sin embargo, para ciertos rellenos `ButtonBase` requiere el nodo DOM del componente proporcionado. Esto se logra adjuntando una referencia al componente y esperando que el componente reenvíe esta referencia al nodo DOM subyacente. Given that many of the interactive components rely on `ButtonBase`, you should be able to take advantage of it everywhere.

Here is an [integration example with react-router](/guides/composition/#button).

## Limitaciones

### Cursor not-allowed

The ButtonBase component sets `pointer-events: none;` on disabled buttons, which prevents the appearance of a disabled cursor.

If you wish to use `not-allowed`, you have two options:

1. **CSS only**. You can remove the pointer events style on the disabled state of the `<button>` element:

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

However:

- You should add `pointer-events: none;` back when you need to display [tooltips on disabled elements](/components/tooltips/#disabled-elements).
- The cursor won't change if you render something other than a button element, for instance, a link `<a>` element.

2. **DOM change**. You can wrap the button:

  ```jsx
  <span style={{ cursor: 'not-allowed' }}>
    <Button component={Link} disabled>
      disabled
    </Button>
  </span>
  ```

Este tiene la ventaja de permitir cualquier elemento, por ejemplo un enlace `<a>`<a></0>.</p>