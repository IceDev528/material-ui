# Границы

<p class="description">Используй настройки border и border-radius для стилизации элементов. Доступно для изображений, кнопок и других элементов.</p>

## Border

Use border utilities to add or remove an element's borders. Можно устанавливать как все сразу, так и каждую часть по отдельности.

### Добавление

{{"demo": "pages/system/borders/BorderAdditive.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ border: 1 }}>…
<Box sx={{ borderTop: 1 }}>…
<Box sx={{ borderRight: 1 }}>…
<Box sx={{ borderBottom: 1 }}>…
<Box sx={{ borderLeft: 1 }}>…
```

### Удаление

{{"demo": "pages/system/borders/BorderSubtractive.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ border: 0 }}>…
<Box sx={{ borderTop: 0 }}>…
<Box sx={{ borderRight: 0 }}>…
<Box sx={{ borderBottom: 0 }}>…
<Box sx={{ borderLeft: 0 }}>…
```

## Цвет границы

{{"demo": "pages/system/borders/BorderColor.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ borderColor: 'primary.main' }}>…
<Box sx={{ borderColor: 'secondary.main' }}>…
<Box sx={{ borderColor: 'error.main' }}>…
<Box sx={{ borderColor: 'grey.500' }}>…
<Box sx={{ borderColor: 'text.primary' }}>…
```

## Border-radius

{{"demo": "pages/system/borders/BorderRadius.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ borderRadius: '50%' }}>…
<Box sx={{ borderRadius: 1 }}>… // theme.shape.borderRadius * 1
<Box sx={{ borderRadius: 16 }}>…
```

## API

```js
import { borders } from '@material-ui/system';
```

| Импорт         | Свойство       | Свойство CSS    | В теме                                                           |
|:-------------- |:-------------- |:--------------- |:---------------------------------------------------------------- |
| `border`       | `border`       | `border`        | `borders`                                                        |
| `borderTop`    | `borderTop`    | `border-top`    | `borders`                                                        |
| `borderLeft`   | `borderLeft`   | `border-left`   | `borders`                                                        |
| `borderRight`  | `borderRight`  | `border-right`  | `borders`                                                        |
| `borderBottom` | `borderBottom` | `border-bottom` | `borders`                                                        |
| `borderColor`  | `borderColor`  | `border-color`  | [`palette`](/customization/default-theme/?expand-path=$.palette) |
| `borderRadius` | `borderRadius` | `border-radius` | [`shape`](/customization/default-theme/?expand-path=$.shape)     |
