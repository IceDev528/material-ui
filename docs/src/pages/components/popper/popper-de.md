---
title: Popper React-Komponente
components: Popper
---

# Popper

<p class="description">A Popper can be used to display some content on top of another. It's an alternative to react-popper.</p>

Einige wichtige Funktionen der `Popper` Komponente:

- 🕷 Popper relies on the 3rd party library ([Popper.js](https://github.com/FezVrasta/popper.js)) for perfect positioning.
- 💄 It's an alternative API to react-popper. It aims for simplicity.
- 📦 [10 kB gzipped](/size-snapshot) ([7 kB](https://bundlephobia.com/result?p=popper.js) from Popper.js).
- The children is [`Portal`](/components/portal/) to the body of the document to avoid rendering problems. You can disable this behavior with `disablePortal`.
- The scroll isn't blocked like with the [`Popover`](/components/popover/) component. The placement of the popper updates with the available area in the viewport.
- Durch Wegklicken wird die `Popper` Komponente ausgeblendet. Wenn Sie dieses Verhalten benötigen, können Sie den [`ClickAwayListener`](/components/click-away-listener/) verwenden - siehe das Beispiel im [Menü Dokumentation Abschnitt](/components/menus/#menulist-composition).
- Die `anchorEl` Komponente wird als Referenzobjekt übergeben, um eine neue Instanz von `Popper.js` zu erstellen.

## Einfacher Popper

{{"demo": "pages/components/popper/SimplePopper.js"}}

## Übergänge

The open/close state of the popper can be animated with a render prop child and a transition component. This component should respect the following conditions:

- Be a direct child descendent of the popper.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the popper to unmount the child content when closed and fully transitioned.

Popper has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "pages/components/popper/TransitionsPopper.js"}}

Alternatively, you can use [react-spring](https://github.com/react-spring/react-spring).

{{"demo": "pages/components/popper/SpringPopper.js"}}

## Positioned Popper

{{"demo": "pages/components/popper/PositionedPopper.js", "bg": true}}

## Scroll playground

{{"demo": "pages/components/popper/ScrollPlayground.js", "hideHeader": true, "bg": true}}

## Faked reference object

The `anchorEl` property can be a reference to a fake DOM element. You just need to create an object shaped like the [`ReferenceObject`](https://github.com/FezVrasta/popper.js/blob/0642ce0ddeffe3c7c033a412d4d60ce7ec8193c3/packages/popper/index.d.ts#L118-L123).

Highlight part of the text to see the popper:

{{"demo": "pages/components/popper/FakedReferencePopper.js"}}

## Ergänzende Projekte

Für fortgeschrittenere Anwendungsfälle können Ihnen folgende Projekte helfen:

### PopupState-Helfer

There is a 3rd party package [`material-ui-popup-state`](https://github.com/jcoreio/material-ui-popup-state) that takes care of popper state for you in most cases.

{{"demo": "pages/components/popper/PopperPopupState.js"}}