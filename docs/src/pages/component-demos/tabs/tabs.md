---
components: Tabs, Tab
---

# Tabs

[Tabs](https://material.google.com/components/tabs.html) make it easy to explore and switch between different views.

## Basic Tabs

A simple example with no frills.

{{demo='pages/component-demos/tabs/BasicTabs.js'}}

### Wrapped Labels

Long labels will automatically wrap on tabs. If the label is too long for the tab, it will overflow and the text will not be visible.

{{demo='pages/component-demos/tabs/BasicTabsWrappedLabel.js'}}

## Fixed Tabs

Fixed tabs should be used with a limited number of tabs and when consistent placement will aid muscle memory.

### Full width

The `fullWidth` property should be used for smaller views.
This demo also uses [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) to animate the Tab transition, and allowing tabs to be swiped on touch devices.

{{demo='pages/component-demos/tabs/FullWidthTabs.js'}}

### Centered

The `centered` property should be used for larger views.

{{demo='pages/component-demos/tabs/CenteredTabs.js'}}

## Scrollable Tabs

### Automatic Scroll Buttons

Left and right scroll buttons will be presented or hidden automatically based on viewport width.

{{demo='pages/component-demos/tabs/ScrollableTabsButtonAuto.js'}}

### Forced Scroll Buttons

Left and right scroll buttons will be presented regardless of the viewport width.

{{demo='pages/component-demos/tabs/ScrollableTabsButtonForce.js'}}

### Prevent Scroll Buttons

Left and right scroll buttons will never be presented.  All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift-mousewheel, etc.)

{{demo='pages/component-demos/tabs/ScrollableTabsButtonPrevent.js'}}

## Icon Tabs

Tab labels may be either all icons or all text.

{{demo='pages/component-demos/tabs/IconTabs.js'}}
{{demo='pages/component-demos/tabs/IconLabelTabs.js'}}

## Disabled Tab

Tab may be disabled by setting `disabled` property.

{{demo='pages/component-demos/tabs/DisabledTabs.js'}}
