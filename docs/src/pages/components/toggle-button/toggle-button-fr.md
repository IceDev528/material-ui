---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
---

# Toggle Buttons

<p class="description">Toggle buttons can be used to group related options.</p>

To emphasize groups of related [Toggle buttons](https://material.io/components/buttons#toggle-button), a group should share a common container. The `ToggleButtonGroup` controls the selected state of its child buttons when given its own `value` prop.

## Exclusive selection

Text justification toggle buttons present options for left, right, center, full, and justified text with only one item available for selection at a time. Selecting one option deselects any other.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Multiple selection

Logically-grouped options, like bold, italic, and underline, allow multiple options to be selected.

{{"demo": "pages/components/toggle-button/ToggleButtonsMultiple.js"}}

## Tailles

Fancy larger or smaller buttons? Use the `size` prop.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Vertical buttons

{{"demo": "pages/components/toggle-button/VerticalToggleButtons.js"}}

## Enforce value set

If you want to enforce at least one button to be active, you can adapt your handleChange function.

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

Voici un exemple de personnalisation du composant. Vous pouvez en savoir plus dans la [page de documentation des overrides](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Accessibilité

- ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.