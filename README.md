# Material-UI pickers
[![npm package](https://img.shields.io/npm/v/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
[![npm download](https://img.shields.io/npm/dm/material-ui-pickers.svg)](https://www.npmjs.org/package/material-ui-pickers)
[![Build Status](https://api.travis-ci.org/dmtrKovalenko/material-ui-pickers.svg?branch=master)](https://travis-ci.org/dmtrKovalenko/material-ui-pickers)
> Components, that implements material design date and time pickers for material-ui v1

### Installation
Available as npm package.
```sh
npm install material-ui-pickers -S
```

Now choose the library that pickers will use to work with date. We are providing interfaces for [moment](https://momentjs.com/) and [date-fns](https://date-fns.org/). If you are not using moment in the project (or dont have it in the bundle already) we suggest using date-fns, because it much more lightweight and will be correctly tree-shaked from the bundle.

```sh
npm install date-fns@next -s
// or
npm install moment -S
```

Then teach pickers which library to use with `MuiPickerUtilsProvider`.This component takes an utils property, and makes it available down the React tree thanks to React context. It should preferably be used at the root of your component tree.

```jsx
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Root />
    </MuiPickersUtilsProvider>
  );
}

render(<App />, document.querySelector('#app'));
```

And the last step of installation would be an icon font. By default we relying on material-icons font, but its possible to override any icons with a help of corresponding props.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

## Documentation
Check out the [documentation website](https://material-ui-pickers.firebaseapp.com/)

### Recently updated?
Changelog available [here](https://github.com/dmtrKovalenko/material-ui-pickers/releases)

### Contributing
For information about how to contribute, see the [CONTRIBUTING](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/CONTRIBUTING.md) file.

### LICENSE
The project is licensed under the terms of [MIT license](https://github.com/dmtrKovalenko/material-ui-pickers/blob/master/LICENSE)
