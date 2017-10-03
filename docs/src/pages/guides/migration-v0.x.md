# Migration from v0.x

## FAQ

### Woah - the API is way different! Does that mean 1.0 is completely different, I’ll have to learn the basics all over again, and migrating will be practically impossible?

I’m glad you asked! The answer is no. The core concepts haven’t changed.
You will notice that the API provides more flexibility, but this has a cost.
We have been making lower-level components, abstracting less complexity.

### What motivated such large change?

Material-UI was started [3 years ago](https://github.com/callemall/material-ui/commit/28b768913b75752ecf9b6bb32766e27c241dbc46).
The ecosystem has evolved a lot since then, we have also learned a lot.
[@nathanmarks](https://github.com/nathanmarks/) started an ambitious task, rebuilding Material-UI from the **ground-up**
taking advantage of this knowledge to address long-standing issues. To name some of the major changes:
- New styling solution using CSS-in-JS (better [customization](/customization/overrides) power, better performance)
- New [theme handling](/customization/themes) (nesting, self-supporting, etc.)
- Blazing fast documentation thanks to [Next.js](https://github.com/zeit/next.js)
- Way better [test coverage](/guides/testing) (99%+, run on all the major browsers, [visual regression tests](https://www.argos-ci.com/callemall/material-ui))
- Full [server-side rendering](/guides/server-rendering) support
- Wide range of [supported browsers](/getting-started/supported-platforms)

Curious to learn more about it? You can checkout our [Q&A on with the v1 version](http://0.0.0.0:3000/discover-more/roadmap#q-amp-a-with-the-v1-version).

### Where should I start in a migration?

1. Start by installing the v1.x version of Material-UI along side the v0.x version.
[Yarn](https://github.com/yarnpkg/yarn) provides an alias feature to do so:
```sh
yarn add material-ui@latest
yarn add material-ui-next@npm:material-ui@next
```
then
```js
import FlatButton from 'material-ui/FlatButton'; // v0.x
import Button from 'material-ui-next/Button'; // v1.x
```
2. Run [the migration helper](https://github.com/callemall/material-ui/tree/v1-beta/packages/material-ui-codemod) on your project.
3. After that, you are free to migrate one component instance at the time.

## Components

### Flat Button

```diff
-import FlatButton from 'material-ui/FlatButton';
+import Button from 'material-ui-next/Button';

-<FlatButton />
+<Button />
```

### Raised Button

```diff
-import RaisedButton from 'material-ui/RaisedButton';
+import Button from 'material-ui-next/Button';

-<RaisedButton />
+<Button raised />
```

### To be continuated…

You successfully migrated your app and wish to help the community?
Please help us! We have an open issue in order to finish this migration guide [#7195](https://github.com/callemall/material-ui/issues/7195). Any pull request is welcomed 😊.
