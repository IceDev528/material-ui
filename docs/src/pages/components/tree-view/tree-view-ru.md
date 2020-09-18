---
title: Tree View React component
components: TreeView, TreeItem
githubLabel:
  component: TreeView
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#TreeView'
packages: '@material-ui/lab'
---

# Иерархическое представление

<p class="description">Виджет Иерархического представления представляет собой иерархический список.</p>

Иерархические представления могут использоваться для того чтобы показать структуру файловой системы. Каждый элемент может быть раскрыт, чтобы показать содержание папки, в которой могут быть файлы, папки или и то и другое.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic tree view

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}

## Multi selection

Tree views also support multi-selection.

{{"demo": "pages/components/tree-view/MultiSelectTreeView.js"}}

## Controlled tree view

The tree view also offers a controlled API.

{{"demo": "pages/components/tree-view/ControlledTreeView.js"}}

## Rich object

While the `TreeView`/`TreeItem` component API maximizes flexibility, an extra step is needed to handle a rich object.

Let's consider a data variable with the following shape, recursion can be used to handle it.

```js
const data = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    // …
  ],
};
```

{{"demo": "pages/components/tree-view/RecursiveTreeView.js", "defaultCodeOpen": false}}

## Customized tree view

### Custom icons, border and animation

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### Gmail clone

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## Disabled tree items

{{"demo": "pages/components/tree-view/DisabledTreeItems.js"}}

The behavior of disabled tree items depends on the `disabledItemsFocusable` prop.

If it is false:

- Arrow keys will not focus disabled items and, the next non-disabled item will be focused.
- Typing the first character of a disabled item's label will not focus the item.
- Mouse or keyboard interaction will not expand/collapse disabled items.
- Mouse or keyboard interaction will not select disabled items.
- Shift + arrow keys will skip disabled items and, the next non-disabled item will be selected.
- Programmatic focus will not focus disabled items.

If it is true:

- Arrow keys will focus disabled items.
- Typing the first character of a disabled item's label will focus the item.
- Mouse or keyboard interaction will not expand/collapse disabled items.
- Mouse or keyboard interaction will not select disabled items.
- Shift + arrow keys will not skip disabled items but, the disabled item will not be selected.
- Programmatic focus will focus disabled items.

## Доступность

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

The component follows the WAI-ARIA authoring practices.

To have an accessible tree view you must use `aria-labelledby` or `aria-label` to reference or provide a label on the TreeView, otherwise screen readers will announce it as "tree", making it hard to understand the context of a specific tree item.
