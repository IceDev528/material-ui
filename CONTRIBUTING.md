# Contributing to Material-UI

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of the Material-UI community. Here are a few guidelines that will help you along the way.

## Code of Conduct

Material-UI has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it.
Please read [the full text](/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## A large spectrum of contributions

There are [many ways](https://material-ui.com/getting-started/faq/#material-ui-is-awesome-how-can-i-support-the-project) to contribute to Material-UI, code contribution is one aspect of it. For instance, documentation improvements are as important as code changes.

## Your first Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/mui-org/material-ui/issues?q=is:open+is:issue+label:"good+first+issue") that contain changes that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you have started to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than a week, it’s fine to take it over but you should still leave a comment.

## Sending a Pull Request

Material-UI is a community project, so Pull Requests are always welcome, but, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your Pull Requests small. To give a Pull Request the best chance of getting accepted, don't bundle more than one feature or bug fix per Pull Request. It's often best to create two smaller Pull Requests than one big one.

1. Fork the repository.

2. Clone the fork to your local machine and add upstream remote

```sh
git clone git@github.com:<yourname>/material-ui.git
cd material-ui
git remote add upstream git@github.com:mui-org/material-ui.git
```

3. Synchronize your local `master` branch with the upstream one:

```sh
git checkout master
git pull upstream master
```

4. Create a new topic branch:

```sh
git checkout -b my-topic-branch
```

5. Make changes, commit and push to your fork:

```sh
git push -u
```

6. Go to [the repository](https://github.com/mui-org/material-ui) and make a Pull Request.

The core team is monitoring for Pull Requests. We will review your Pull Request and either merge it, request changes to it, or close it with an explanation.

### How to increase the chance of being accepted?

Make sure the following is true:

- The branch is targeted at `master` for ongoing development. We do our best to keep `master` in good shape, with all tests passing. Code that lands in `master` must be compatible with the latest stable release. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of `master` at any time.
- If a feature is being added:
   - If the result was already achievable with the core library, explain why this feature needs to be added to the core.
   - If this is a common use case, consider adding an example to the documentation.
- When adding new features or modifying existing, please include tests to confirm the new behavior. You can read more about our test setup in our test [README](https://github.com/mui-org/material-ui/blob/master/test/README.md).
- If props were added or prop types were changed, the TypeScript declarations were updated.
- When submitting a new component, please add it to the [lab](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab).
- The branch is not behind its target.

Because we will only merge a Pull Request for which all tests pass. The following items need is true. We will provide assistance if not:

- If TypeScript declarations were changed, `yarn typescript` passed.
- The code is formatted (run `yarn prettier`).
- The code is linted (run `yarn lint`).
- If API documentation is being changed in the source (run `yarn docs:api`).
- If demos were changed, make sure `yarn docs:typescript:formatted` does not introduce changes.
  See [About TypeScript demos](#about-typescript-demos).
- The Pull Request title follows the pattern `[Component] Imperative commit message`. (See: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/#imperative) for a great explanation)

### Testing the documentation site

The documentation site is built with Material-UI and contains examples of all the components.

To get started:

```sh
yarn
yarn docs:dev
```

You can now access the documentation site [locally](http://localhost:3000).
Changes to the docs will hot reload the site. If you make changes to TypeScript files
in the docs run `yarn docs:typescript --watch` in a separate terminal.

Where possible, please add tests for any changes you make.
Tests can be run with `yarn test`.

### Updating the component API documentation

To update the component API documentation (auto-generated from component PropTypes comments), run:
```sh
yarn docs:api
```

### Coding style

Please follow the coding style of the project. Material-UI uses prettier and eslint, so if possible, enable linting in your editor to get real-time feedback.

- `yarn prettier` reformats the code.
- `yarn lint` runs manually the linting rules.

Finally, when you submit a Pull Request, they are run again by our continuous integration tools, but hopefully, your code is already clean!

## How to add a new demo in the documentation?

You need to **create** a new file and **modify** two files.
For example, let say you want to add new demos for buttons component, then you have to go through the following steps:

#### 1. Add a new React component file under the related directory.

In this case, you are going to add the new file to the following directory:

```
docs/src/pages/components/buttons/
```

and give it a name: `SuperButtons.js`.

#### 2. Edit the page Markdown file.

The Markdown file is the source for the website documentation. So, whatever you wrote there will be reflected on the website.
In this case, the file you need to edit is `docs/src/pages/components/buttons/buttons.md`.

Changes should only be applied to the English version e.g. only `app-bar.md` and
not `app-bar-de.md`. For contributions concerning translations please read the [section
about translations](#translations).

```diff
+### Super buttons
+
+Sometimes, you need a super button to make your app looks **superb**. Yea ...
+
+{{"demo": "pages/components/buttons/SuperButtons.js"}}
```

#### 3. Write the content of the demo

Material-UI documents how to use this library with TypeScript.

If you are familiar with that language, write the demo in TypeScript, and only, in a *.tsx file.
When you're done run `yarn docs:typescript:formatted` to automatically create the JavaScript version.

If you are no familiar with that language, write the demo in JavaScript, a core contributor might help you to migrate it to TypeScript.

#### 4. You are done 🎉!

In case you missed something, [we have a real example that can be used as a summary report](https://github.com/mui-org/material-ui/pull/8922/files).

## Translations

Translations are handled via [Crowdin](https://translate.material-ui.com).
You don't need to apply any changes to localized versions of our markdown files
i.e. files having a `-locale` suffix. Crowdin automatically takes care of syncing
these changes across the localized versions.

## Roadmap

To get a sense of where Material-UI is heading, or for ideas on where you could contribute, take a look at the [roadmap](https://material-ui.com/discover-more/roadmap/).

## License

By contributing your code to the mui-org/material-ui GitHub repository, you agree to license your contribution under the MIT license.
