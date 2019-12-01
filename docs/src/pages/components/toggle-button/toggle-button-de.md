---
title: Schalter React Komponente
components: ToggleButton, ToggleButtonGroup
---

# Schalter (Toggle Buttons)

<p class="description">Schalter können verwendet werden, um verwandte Optionen zu gruppieren.</p>

Um Gruppen von verwandten [Schaltern](https://material.io/design/components/buttons.html#toggle-button), hervorzuheben, sollte eine Gruppe einen gemeinsamen Container verwenden.

The `ToggleButtonGroup` will control the selected state of its child buttons when given its own `value` prop.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Größen

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Barrierefreiheit

ToggleButtonGroup has `role="group"`. You should provide an accessible label with `arial-label="label"`, `aria-labelledby="id"` or `<label>`.

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.