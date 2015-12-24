## Installation

Material-UI is available as an [npm package](https://www.npmjs.org/package/material-ui).
After npm install, you will find all the `.jsx` files in the `/src` folder and
their compiled versions in the `/lib` folder.

### react-tap-event-plugin

Our components use [react-tap-event-plugin](https://github.com/zilverline/react-tap-event-plugin)
to listen for touch events.
This dependency is temporary and will go away once react v1.0 is released.
Until then, be sure to inject this plugin at the start of your app.

```js
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
```

### Roboto Font

Material-UI was designed with the [Roboto](http://www.google.com/fonts/specimen/Roboto)
font in mind.
So be sure to include it in your project.
Here are [some instructions](http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500)
on how to do so.
