---
title: Tabs React-Komponente
components: Tabs, Tab
---

# Tabs

<p class="description">Tabs erleichtern das Erkunden und Wechseln zwischen verschiedenen Ansichten.</p>

[Tabs](https://material.io/design/components/tabs.html) organisieren und ermöglichen die Navigation zwischen zusammengehörigen Inhaltsgruppen auf derselben Hierarchieebene.

## Einfache Tabs

Ein einfaches Beispiel ohne Verzierungen.

{{"demo": "pages/components/tabs/SimpleTabs.js"}}

### Umbrechen von Tab Beschriftungen

Lange Beschriftungen werden automatisch umgebrochen. Zu lange Beschriftungen sind allerdings nicht sichtbar und werden abgeschnitten (`overflow`).

{{"demo": "pages/components/tabs/TabsWrappedLabel.js"}}

### Deaktivierter Tab

Ein Tab kann durch die Eigenschaft `disabled` deaktiviert werden.

{{"demo": "pages/components/tabs/DisabledTabs.js"}}

## Feste Tabs

Feste Tabs sollten mit einer begrenzten Anzahl von Tabs verwendet werden, und wenn eine gleichmäßige Platzierung das Muskelgedächtnis verbessert.

### Gesamte Breite

Die Eigenschaft `variant="fullWidth"` sollte für kleinere Ansichten verwendet werden. Diese Demo verwendet auch [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views), um den Tab-Übergang zu animieren und Tabs auf Touch-Geräten zu ziehen.

{{"demo": "pages/components/tabs/FullWidthTabs.js"}}

### Zentriert

Die Eigenschaft `centered` sollte für kleinere Ansichten verwendet werden.

{{"demo": "pages/components/tabs/CenteredTabs.js"}}

## Scrollbare Tabs

### Automatische Scroll-Tasten

Bildlauftasten werden auf der linken und rechten Seite angezeigt, wenn der Tab breiter als der viewport ist. Auf mobilen Endgeräten werden diese Buttons nicht angezeigt. (based on viewport width)

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js"}}

### Erzwungene Bildlaufschaltflächen

Die linken und rechten Bildlauftasten werden unabhängig von der Breite des Ansichtsfensters angezeigt.

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js"}}

### Scrolltasten verhindern

Left and right scroll buttons will never be presented. All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js"}}

## Benutzerdefinierte Tabs

Hier ist ein Beispiel zum Anpassen der Komponente. Mehr dazu erfahren Sie auf der [Überschreibungsdokumentationsseite](/customization/components/).

{{"demo": "pages/components/tabs/CustomizedTabs.js"}}

👑 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/components/tabs).

## Vertikale Tabs

{{"demo": "pages/components/tabs/VerticalTabs.js"}}

## Nav-Tabs

Standardmäßig verwenden Registerkarten als `Button-` Element dargestellt, Sie können jedoch Ihr eigenes benutzerdefiniertes Tag oder Ihre eigene Komponente definieren. Here's an example of implementing tabbed navigation:

{{"demo": "pages/components/tabs/NavTabs.js"}}

## Symbol-Tabs

Tab-Beschriftungen können entweder nur Symbole oder nur Text enthalten.

{{"demo": "pages/components/tabs/IconTabs.js"}}

{{"demo": "pages/components/tabs/IconLabelTabs.js"}}