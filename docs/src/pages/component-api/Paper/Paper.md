Paper
=====

A piece of material paper.

```js
import Paper from 'material-ui/Paper';

const Component = () => <Paper elevation={8}>Hello World</Paper>;
```

Props
-----

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| className | string |  | The CSS class name of the root element. |
| elevation | number | 2 | Shadow depth, corresponds to `dp` in the spec. It's accepting values between 0 and 24 inclusive. |
| square | bool | false | If `true`, rounded corners are disabled. |

Any other properties supplied will be spread to the root element.
