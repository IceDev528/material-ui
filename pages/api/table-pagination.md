---
filename: /src/Table/TablePagination.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TablePagination

A `TableCell` based component for placing inside `TableFooter` for pagination.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | Object |  | Useful to extend the style applied to components. |
| component | ElementType | TableCell | The component used for the root node. Either a string to use a DOM element or a component. |
| <span style="color: #31a148">count *</span> | number |  | The total number of rows. |
| labelDisplayedRows | signature | ({ from, to, count }) => `${from}-${to} of ${count}` | Useful to customize the displayed rows label. |
| labelRowsPerPage | Node | 'Rows per page:' | Useful to customize the rows per page label. Invoked with a `{ from, to, count, page }` object. |
| <span style="color: #31a148">onChangePage *</span> | signature |  | Callback fired when the page is changed.<br><br>**Signature:**<br>`function(event: object, page: number) => void`<br>*event:* The event source of the callback<br>*page:* The page selected |
| <span style="color: #31a148">onChangeRowsPerPage *</span> | signature |  | Callback fired when the number of rows per page is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span style="color: #31a148">page *</span> | number |  | The zero-based index of the current page. |
| <span style="color: #31a148">rowsPerPage *</span> | number |  | The number of rows per page. |
| rowsPerPageOptions | Array | [5, 10, 25] | Customizes the options of the rows per page select field. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `toolbar`
- `spacer`
- `caption`
- `input`
- `selectRoot`
- `select`
- `actions`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/callemall/material-ui/tree/v1-beta/src/Table/TablePagination.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTablePagination`.

## Inheritance

The properties of the [&lt;TableCell /&gt;](/api/table-cell) component are also available.

## Demos

- [Tables](/demos/tables)

