## Future

1. Full Featured Tabs (close, disable, move, sizing).
1. Generate import statement for the svg-icons in the docs.
1. Add example on how to use [react-list](https://github.com/orgsync/react-list) for lists, menu items and table.
1. NavBar component (To address the hamburger anti-pattern).
1. Add jsdoc to the source code (Preparing for auto generation).
1. Make extensive use of `popover` and `render-to-layer`.
1. [\[es6-classes\]](https://github.com/callemall/material-ui/tree/es6-classes) Full ES6 Classes.
1. Full featured Table.
1. Comprehensive contribution guide for the docs and changelogs.
1. I18n for the doc-site.
1. Better accessibility support.
1. Full support for react-native.
1. Improve performance with `shouldComponentUpdate` and removed inefficient computations.
1. Standardize API naming and available `prop` convention across the library.
1. Standardize API callback signature and provide formal documentation.
1. #2416 TextField as a composable component for various field types.

##### Breaking Changes

* Remove usage of JSON to generate children across the components.
* Remove the old menu folder.

## 0.14.0

- [x] #2443 Deprecate the old menu folder.
- [ ] #2456 Deprecate usage of JSON in favor of composability.
- [ ] Documentation versioning (This is a must before removing deprecations).
- [ ] Enforce eslint rules.
- [ ] #2433 Auto-generate Docs from source-code.
- [ ] #2460 Enhance `ThemeManager` to perform a deep merge with default baseTheme. (easier customization)
- [ ] #2493 Use higher order components across the library to abstract themes passed down from context.

##### Breaking Changes

- [x] #2396 Remove Dialog's deprecated API.
