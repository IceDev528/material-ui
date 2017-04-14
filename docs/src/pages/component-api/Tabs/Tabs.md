Tabs
====



Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| buttonClassName | string |  | The CSS class name of the scroll button elements. |
| centered | bool | false | If `true`, the tabs will be centered. This property is intended for large views. |
| children | node |  | The content of the component. |
| className | string |  | The CSS class name of the root element. |
| fullWidth | bool | false | If `true`, the tabs will grow to use all the available space. This property is intended for small views. |
| index | number |  | The index of the currently selected `Tab`. |
| indicatorClassName | string |  | The CSS class name of the indicator element. |
| indicatorColor | union:&nbsp;[object Object]<br>&nbsp;string<br> | 'accent' | Determines the color of the indicator. |
| <span style="color: #31a148">onChange *</span> | function |  | Function called when the index change. |
| scrollable | bool | false | True invokes scrolling properties and allow for horizontally scrolling (or swiping) the tab bar. |
| scrollButtons | enum:&nbsp;'auto'<br>&nbsp;'on'<br>&nbsp;'off'<br> | 'auto' | Determine behavior of scroll buttons when tabs are set to scroll `auto` will only present them on medium and larger viewports `on` will always present them `off` will never present them |
| textColor | union:&nbsp;[object Object],[object Object]<br>&nbsp;string<br> | 'inherit' | Determines the color of the `Tab`. |

Any other properties supplied will be spread to the root element.
