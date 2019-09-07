# Anzeige

<p class="description">Quickly and responsively toggle the display value of components and more with the display utilities. Unterstützt einige der gebräuchlichsten Werte sowie einige Extras zur Steuerung der Anzeige beim Drucken.</p>

## Beispiele

```jsx
<Box component="div" display="inline">inline</Box>
<Box component="div" display="inline">inline</Box>
```

{{"demo": "pages/system/display/Inline.js"}}

```jsx
<Box component="span" display="block">block</Box>
<Box component="span" display="block">block</Box>
```

{{"demo": "pages/system/display/Block.js"}}

## Elemente verstecken

Verwenden Sie für eine schnellere, mobilere Entwicklung responsive Anzeigeklassen zum Anzeigen und Ausblenden von Elementen nach Gerätetypen. Erstellen Sie keine völlig unterschiedlichen Versionen derselben Seite, sondern blenden Sie Elemente für jede Bildschirmgröße entsprechend aus.

| Bildschirmgröße      | Klasse                                               |
|:-------------------- |:---------------------------------------------------- |
| Für alle versteckt   | `display="none"`                                     |
| Versteckt nur bei xs | `display={{ xs: 'none', sm: 'block' }}`              |
| Versteckt nur bei sm | `display={{ xs: 'block', sm: 'none', md: 'block' }}` |
| Versteckt nur bei md | `display={{ xs: 'block', md: 'none', lg: 'block' }}` |
| Versteckt nur bei lg | `display={{ xs: 'block', lg: 'none', xl: 'block' }}` |
| Versteckt nur bei xl | `display={{ xs: 'block', xl: 'none' }}`              |
| Sichtbar nur bei xs  | `display={{ xs: 'block', sm: 'none' }}`              |
| Sichtbar nur bei sm  | `display={{ xs: 'none', sm: 'block', md: 'none' }}`  |
| Sichtbar nur bei md  | `display={{ xs: 'none', md: 'block', lg: 'none' }}`  |
| Sichtbar nur bei lg  | `display={{ xs: 'none', lg: 'block', xl: 'none' }}`  |
| Sichtbar nur bei xl  | `display={{ xs: 'none', xl: 'block' }}`              |


```jsx
<Box display={{ xs: 'block', md: 'none' }}>
  auf Bildschirmen ausblenden, die breiter als md sind
</Box>
<Box display={{ xs: 'none', md: 'block' }}>
  ausblenden auf Bildschirmen, die kleiner als md sind
</Box>
```

{{"demo": "pages/system/display/Hiding.js"}}

## Im Druck anzeigen

```jsx
<Box display="block" displayPrint="none">
  Nur Bildschirm (Beim Drucken ausgeblendet)
</Box>
<Box display="none" displayPrint="block">
  Nur Druck (Auf dem Bildschirm ausgeblendet)
</Box>
```

{{"demo": "pages/system/display/Print.js"}}

## Overflow

```jsx
<Box component="div" overflow="hidden">
  Overflow Hidden
</Box>
<Box component="div" overflow="visible">
  Overflow visible
</Box>
```

{{"demo": "pages/system/display/Overflow.js"}}

## Text Overflow

```jsx
<Box component="div" textOverflow="clip">
  Text Overflow Clip
</Box>
<Box component="div" textOverflow="ellipsis">
  Text Overflow Ellipsis
</Box>
```

{{"demo": "pages/system/display/TextOverflow.js"}}

## Visibility

```jsx
<Box component="div" visibility="visible">
  Visibility Visible
</Box>
<Box component="div" visibility="hidden">
  Visibility Hidden
</Box>
```

{{"demo": "pages/system/display/Visibility.js"}}

## White Space

```jsx
<Box component="div" whiteSpace="nowrap">
  White Space Nowrap
</Box>
<Box component="div" whiteSpace="normal">
  White Space Normal
</Box>
```

{{"demo": "pages/system/display/WhiteSpace.js"}}

## API

```js
import { display } from '@material-ui/system';
```

| Inportname     | Eigenschaften  | CSS-Eigenschaft | Theme-Schlüssel |
|:-------------- |:-------------- |:--------------- |:--------------- |
| `displayPrint` | `displayPrint` | `display`       | none            |
| `displayRaw`   | `display`      | `display`       | none            |
| `overflow`     | `overflow`     | `overflow`      | none            |
| `textOverflow` | `textOverflow` | `text-overflow` | none            |
| `visibility`   | `visibility`   | `visibility`    | none            |
| `whiteSpace`   | `whiteSpace`   | `white-space`   | none            |