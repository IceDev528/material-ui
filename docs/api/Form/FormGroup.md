FormGroup
=========

FormGroup wraps controls such as Checkbox and Switch.
It provides compact row layout and FormLabel awareness.
Upon focusing on one of the child controls, it will propagate `focused` to the label.

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| row | bool | false | Display group of elements in a compact row. |

Any other properties supplied will be spread to the root element.
