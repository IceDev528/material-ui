---
title: React-компонент Icon
components: Icon, SvgIcon
---

# Иконки

<p class="description">Руководство и рекомендации по использованию иконок в Material-UI.</p>

Material-UI provides icons support in three ways:

1. Standardized [Material Design icons](#material-icons) exported as React components (SVG icons).
1. With the [SvgIcon](#svgicon) component, a React wrapper for custom SVG icons.
1. With the [Icon](#icon-font-icons) component, a React wrapper for custom font icons.

## Material Icons

Material Design has standardized over 1,000 official icons, each in five different "themes" (see below). For each SVG icon, we export the respective React component from the `@material-ui/icons` package. You can search the full list of these icons in our [built-in search page](/components/material-icons/).

### Использование

Install `@material-ui/icons`. Import icons using one of these two options:

- Option 1:

  ```jsx
  import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
  import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
  ```

- Option 2:

  ```jsx
  import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
  ```

The safest is Option 1 but Option 2 can yield the best developer experience. Make sure you follow the [minimizing bundle size guide](/guides/minimizing-bundle-size/#option-2) before using the second approach. The configuration of a Babel plugin is encouraged.

Each icon also has a "theme": `Filled` (default), `Outlined`, `Rounded`, `Two tone` and `Sharp`. If you want to import the icon component with a "theme" different than default, append the "theme" name to the icon name. For example `@material-ui/icons/Delete` icon with:

- `Filled` "theme" (default) is exported as `@material-ui/icons/Delete`,
- `Outlined` "theme" is exported as `@material-ui/icons/DeleteOutlined`,
- `Rounded` "theme" is exported as `@material-ui/icons/DeleteRounded`,
- `Two tone` "theme" is exported as `@material-ui/icons/DeleteTwoTone`,
- `Sharp` "theme" is exported as `@material-ui/icons/DeleteSharp`.

Note: The Material Design specification names the icons using "snake_case" naming (for example `delete_forever`, `add_a_photo`), while `@material-ui/icons` exports the respective icons using "PascalCase" naming (for example `DeleteForever`, `AddAPhoto`). There are three exceptions to this naming rule: `3d_rotation` exported as `ThreeDRotation`, `4k` exported as `FourK`, and `360` exported as `ThreeSixty`.

{{"demo": "pages/components/icons/SvgMaterialIcons.js"}}

## SvgIcon

If you need a custom SVG icon (not available in Material Icons) you should use the `SvgIcon` wrapper. The `SvgIcon` component takes the SVG `path` element as its child and converts it to a React component that displays this SVG icon, and allows the icon to be styled and respond to mouse events. SVG elements should be scaled for a 24x24px viewport.

The resulting icon can be used as is, or included as a child for other Material-UI components that use icons. По умолчанию иконка наследует текущий цвет текста. При желании вы можете установить цвет иконки с помощью одного из свойств цвета темы: `primary`, `secondary`, `action`, `error` или `disabled`.

{{"demo": "pages/components/icons/SvgIcons.js"}}

### Libraries

#### Material Design (recommended)

Material Design has standardized over [1,000 official icons](#material-icons).

#### MDI

[materialdesignicons.com](https://materialdesignicons.com/) provides over 2,000 icons. For the wanted icon, copy the SVG `path` they provide, and use it as the child of the `SvgIcon` component.

Note: [mdi-material-ui](https://github.com/TeamWertarbyte/mdi-material-ui) has already wrapped each of these SVG icons with the `SvgIcon` component, so you don't have to do it yourself.

## Icon (Font icons)

Компонент `Icon` отображает иконку из любого иконочного шрифта с поддержкой лигатур. Предварительно необходимо включить в проект шрифт, такой как [Material icon font](https://google.github.io/material-design-icons/#icon-font-for-the-web), с помощью, например, Google Web Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
```

`Icon` will set the correct class name for the Material icon font. For other fonts, you must supply the class name using the Icon component's `className` property.

Чтобы использовать иконку, просто оберните её имя (лигатуру шрифта) в компонент `Icon`, например:

```jsx
import Icon from '@material-ui/core/Icon';

<Icon>star</Icon>
```

По умолчанию иконка наследует текущий цвет текста. При желании вы можете установить цвет иконки с помощью одного из свойств цвета темы: `primary`, `secondary`, `action`, `error` или `disabled`.

### Шрифтовые иконки Material

{{"demo": "pages/components/icons/Icons.js"}}

### Font Awesome

[Font Awesome](https://fontawesome.com/icons) можно использовать с компонентом `Icon` следующим образом:

{{"demo": "pages/components/icons/FontAwesome.js", "hideEditButton": true}}

## Font vs SVG. Which approach to use?

Оба подхода работают нормально, однако есть некоторые тонкие различия, особенно с точки зрения производительности и качества отрисовки. Когда это возможно, использование SVG является более предпочтительным, так как в этом случае есть возможность разделения кода, поддерживается больше иконок, отрисовка происходит лучше и быстрее.

For more details, you can check out [why GitHub migrated from font icons to SVG icons](https://github.blog/2016-02-22-delivering-octicons-with-svg/).

## Доступность

Иконки могут передавать всевозможную значимую информацию, поэтому важно, чтобы они охватывали максимально возможное количество людей. There are two use cases you’ll want to consider:
- **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page.
- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

### Декоративные SVG-иконки

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Семантические SVG-иконки

Если у вашей иконки есть семантическое значение, необходимо только добавить свойство `titleAccess="значение"`. The `role="img"` attribute and the `<title>` element are added so that your icons are properly accessible.

В случае фокусируемых интерактивных элементов, например, кнопки с иконкой, можно использовать свойство `aria-label`:

```jsx
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

// ...

<IconButton aria-label="delete">
  <SvgIcon>
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </SvgIcon>
</IconButton>
```

### Декоративные шрифтовые иконки

If your icons are purely decorative, you’re already done! The `aria-hidden=true` attribute is added so that your icons are properly accessible (invisible).

### Семантические шрифтовые иконки

Если у ваших иконок есть семантическое значение, необходимо предоставить текстовую альтернативу, видимую только для вспомогательных технологий.

```jsx
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// ...

<Icon>add_circle</Icon>
<Typography variant="srOnly">Создать пользователя</Typography>
```

### Справка

- https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/
