---
filename: /packages/material-ui-lab/src/Autocomplete/Autocomplete.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Autocomplete API

<p class="description">The API documentation of the Autocomplete React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Autocomplete from '@material-ui/lab/Autocomplete';
// or
import { Autocomplete } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoComplete</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the portion of the selected suggestion that has not been typed by the user, known as the completion string, appears inline after the input cursor in the textbox. The inline completion string is visually highlighted and has a selected state. |
| <span class="prop-name">autoHighlight</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the first option is automatically highlighted. |
| <span class="prop-name">autoSelect</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the selected option becomes the value of the input when the Autocomplete loses focus unless the user chooses a different option or changes the character string in the input. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">clearOnEscape</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, clear all values when the user presses escape and the popup is closed. |
| <span class="prop-name">clearText</span> | <span class="prop-type">string</span> | <span class="prop-default">'Clear'</span> | Override the default text for the *clear* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">closeIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;CloseIcon fontSize="small" /></span> | The icon to display in place of the default close icon. |
| <span class="prop-name">closeText</span> | <span class="prop-type">string</span> | <span class="prop-default">'Close'</span> | Override the default text for the *close popup* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">debug</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup will ignore the blur event if the input if filled. You can inspect the popup markup with your browser tools. Consider this option when you need to customize the component. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">any</span> |  | The default input value. Use when the component is not controlled. |
| <span class="prop-name">disableClearable</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input can't be cleared. |
| <span class="prop-name">disableCloseOnSelect</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup won't close when a value is selected. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the input will be disabled. |
| <span class="prop-name">disableListWrap</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list box in the popup will not wrap focus. |
| <span class="prop-name">disableOpenOnFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the popup won't open on input focus. |
| <span class="prop-name">disablePortal</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Disable the portal behavior. The children stay within it's parent DOM hierarchy. |
| <span class="prop-name">filterOptions</span> | <span class="prop-type">func</span> |  | A filter function that determines the options that are eligible.<br><br>**Signature:**<br>`function(options: undefined, state: object) => undefined`<br>*options:* The options to render.<br>*state:* The state of the component. |
| <span class="prop-name">filterSelectedOptions</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, hide the selected options from the list box. |
| <span class="prop-name">freeSolo</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options. |
| <span class="prop-name">getOptionDisabled</span> | <span class="prop-type">func</span> |  | Used to determine the disabled state for a given option. |
| <span class="prop-name">getOptionLabel</span> | <span class="prop-type">func</span> | <span class="prop-default">x => x</span> | Used to determine the string value for a given option. It's used to fill the input (and the list box options if `renderOption` is not provided). |
| <span class="prop-name">getOptionSelected</span> | <span class="prop-type">func</span> |  | Used to determine if an option is selected. Uses strict equality by default. |
| <span class="prop-name">groupBy</span> | <span class="prop-type">func</span> |  | If provided, the options will be grouped under the returned string. The groupBy value is also used as the text for group headings when `renderGroup` is not provided.<br><br>**Signature:**<br>`function(options: any) => string`<br>*options:* The option to group. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id. |
| <span class="prop-name">includeInputInList</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the highlight can move to the input. |
| <span class="prop-name">inputValue</span> | <span class="prop-type">string</span> |  | The input value. |
| <span class="prop-name">ListboxComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'ul'</span> | The component used to render the listbox. |
| <span class="prop-name">loading</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component is in a loading state. |
| <span class="prop-name">loadingText</span> | <span class="prop-type">node</span> | <span class="prop-default">'Loading…'</span> | Text to display when in a loading state.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">multiple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, `value` must be an array and the menu will support multiple selections. |
| <span class="prop-name">noOptionsText</span> | <span class="prop-type">node</span> | <span class="prop-default">'No options'</span> | Text to display when there are no options.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback<br>*value:* null |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the popup requests to be closed. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">onInputChange</span> | <span class="prop-type">func</span> |  | Callback fired when the input value changes.<br><br>**Signature:**<br>`function(event: object, value: string) => void`<br>*event:* The event source of the callback.<br>*value:* null |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func</span> |  | Callback fired when the popup requests to be opened. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | Control the popup` open state. |
| <span class="prop-name">openText</span> | <span class="prop-type">string</span> | <span class="prop-default">'Open'</span> | Override the default text for the *open popup* icon button.<br>For localization purposes, you can use the provided [translations](/guides/localization/). |
| <span class="prop-name">options</span> | <span class="prop-type">array</span> | <span class="prop-default">[]</span> | Array of options. |
| <span class="prop-name">PaperComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Paper</span> | The component used to render the body of the popup. |
| <span class="prop-name">PopperComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Popper</span> | The component used to position the popup. |
| <span class="prop-name">popupIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;ArrowDropDownIcon /></span> | The icon to display in place of the default popup icon. |
| <span class="prop-name">renderGroup</span> | <span class="prop-type">func</span> |  | Render the group.<br><br>**Signature:**<br>`function(option: any) => ReactNode`<br>*option:* The group to render. |
| <span class="prop-name required">renderInput&nbsp;*</span> | <span class="prop-type">func</span> |  | Render the input.<br><br>**Signature:**<br>`function(params: object) => ReactNode`<br>*params:* null |
| <span class="prop-name">renderOption</span> | <span class="prop-type">func</span> |  | Render the option, use `getOptionLabel` by default.<br><br>**Signature:**<br>`function(option: any, state: object) => ReactNode`<br>*option:* The option to render.<br>*state:* The state of the component. |
| <span class="prop-name">renderTags</span> | <span class="prop-type">func</span> |  | Render the selected value.<br><br>**Signature:**<br>`function(value: any, getTagProps: function) => ReactNode`<br>*value:* The `value` provided to the component.<br>*getTagProps:* A tag props getter. |
| <span class="prop-name">size</span> | <span class="prop-type">'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the autocomplete. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the autocomplete.<br>The value must have reference equality with the option in order to be selected. You can customize the equality behavior with the `getOptionSelected` prop. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiAutocomplete`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiAutocomplete-root</span> | Styles applied to the root element.
| <span class="prop-name">focused</span> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if focused.
| <span class="prop-name">tag</span> | <span class="prop-name">.MuiAutocomplete-tag</span> | Styles applied to the tag elements, e.g. the chips.
| <span class="prop-name">tagSizeSmall</span> | <span class="prop-name">.MuiAutocomplete-tagSizeSmall</span> | Styles applied to the tag elements, e.g. the chips if `size="small"`.
| <span class="prop-name">inputRoot</span> | <span class="prop-name">.MuiAutocomplete-inputRoot</span> | Styles applied to the Input element.
| <span class="prop-name">input</span> | <span class="prop-name">.MuiAutocomplete-input</span> | Styles applied to the input element.
| <span class="prop-name">inputFocused</span> | <span class="prop-name">.MuiAutocomplete-inputFocused</span> | Styles applied to the input element if tag focused.
| <span class="prop-name">endAdornment</span> | <span class="prop-name">.MuiAutocomplete-endAdornment</span> | Styles applied to the endAdornment element.
| <span class="prop-name">clearIndicator</span> | <span class="prop-name">.MuiAutocomplete-clearIndicator</span> | Styles applied to the clear indictator.
| <span class="prop-name">clearIndicatorDirty</span> | <span class="prop-name">.MuiAutocomplete-clearIndicatorDirty</span> | Styles applied to the clear indictator if the input is dirty.
| <span class="prop-name">popupIndicator</span> | <span class="prop-name">.MuiAutocomplete-popupIndicator</span> | Styles applied to the popup indictator.
| <span class="prop-name">popupIndicatorOpen</span> | <span class="prop-name">.MuiAutocomplete-popupIndicatorOpen</span> | Styles applied to the popup indictator if the popup is open.
| <span class="prop-name">popper</span> | <span class="prop-name">.MuiAutocomplete-popper</span> | Styles applied to the popper element.
| <span class="prop-name">popperDisablePortal</span> | <span class="prop-name">.MuiAutocomplete-popperDisablePortal</span> | Styles applied to the popper element if `disablePortal={true}`.
| <span class="prop-name">paper</span> | <span class="prop-name">.MuiAutocomplete-paper</span> | Styles applied to the `Paper` component.
| <span class="prop-name">listbox</span> | <span class="prop-name">.MuiAutocomplete-listbox</span> | Styles applied to the `listbox` component.
| <span class="prop-name">loading</span> | <span class="prop-name">.MuiAutocomplete-loading</span> | Styles applied to the loading wrapper.
| <span class="prop-name">noOptions</span> | <span class="prop-name">.MuiAutocomplete-noOptions</span> | Styles applied to the no option wrapper.
| <span class="prop-name">option</span> | <span class="prop-name">.MuiAutocomplete-option</span> | Styles applied to the option elements.
| <span class="prop-name">groupLabel</span> | <span class="prop-name">.MuiAutocomplete-groupLabel</span> | Styles applied to the group's label elements.
| <span class="prop-name">groupUl</span> | <span class="prop-name">.MuiAutocomplete-groupUl</span> | Styles applied to the group's ul elements.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/Autocomplete/Autocomplete.js) for more detail.

## Demos

- [Autocomplete](/components/autocomplete/)

