---
product: joy-ui
title: React Menu component
githubLabel: 'component: menu'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
unstyled: /base/react-menu/
---

# Menu

<p class="description">Menus display a list of choices on temporary surfaces.</p>

## Introduction

A menu displays a list of choices on a temporary surface.
It appears when the user interacts with a button, or other type of control.

{{"demo": "MenuUsage.js", "hideToolbar": true}}

Joy UI provides three menu-related components:

- `Menu`: A listbox popup for wrapping the menu items which reuses the styles from [`List`](/joy-ui/react-list/).
- `MenuItem`: A menu item which reuses the styles from [`ListItemButton`](/joy-ui/react-list/).
- `MenuList`: A standalone listbox for composition usage. It also reuses the styles from [`List`](/joy-ui/react-list/).

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';

export default function MyApp() {
  return (
    <Menu>
      <MenuItem>Add item</MenuItem>
    </Menu>
  );
}
```

### Basic usage

The basic version of the menu opens over the anchor element by default.
You can change this via [specific positioning props](#menu-positioning).

When close to the screen's edge, the menu vertically realigns to make sure that all menu items are completely visible.
Choosing an option should immediately, and ideally, commit the option and close the menu.

{{"demo": "BasicMenu.js"}}

### Size

The menu component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

When specifying a size for the `Menu` component, menu items inside of it will inherit the value.

{{"demo": "SizeMenu.js"}}

### Selected

Use the `selected` prop to signal whether a `MenuItem` is selected or not.

The menu item uses the same styles as the [`ListItemButton`](/joy-ui/react-list/#selected).

{{"demo": "SelectedMenu.js"}}

### Positioned menu

The `Menu` is based on the `PopperUnstyled` component, which exposes a few [placement props](/base/react-popper/#placement).
For example, this is how you'd go for displaying the menu on the bottom-end of the anchor button.

{{"demo": "PositionedMenu.js"}}

### `MenuList` composition

To get full control of the DOM structure, use the `MenuList` component.
You can use it to compose any popup-alike component.
The primary responsibility of this component is handling the focus state.

{{"demo": "MenuListComposition.js"}}

## Common examples

### Menu bar

This example replicates the application menu bar on macOS.
It supports mouse and keyboard navigation between menu items.

{{"demo": "MenuToolbarExample.js"}}

### Side navigation icons

This example is quite common in dashboard applications where the side navigation is shrunk into icons, and the menu is triggered by hovering them.

{{"demo": "MenuIconSideNavExample.js", "bg": true}}
