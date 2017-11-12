// @flow

import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/stepper/stepper.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/stepper/HorizontalLinearAlternativeLabelStepper.js': {
          js: require('docs/src/pages/demos/stepper/HorizontalLinearAlternativeLabelStepper')
            .default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/src/pages/demos/stepper/HorizontalLinearAlternativeLabelStepper'), 'utf8')
`,
        },
        'pages/demos/stepper/HorizontalLinearStepper.js': {
          js: require('docs/src/pages/demos/stepper/HorizontalLinearStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/stepper/HorizontalLinearStepper'), 'utf8')
`,
        },
        'pages/demos/stepper/HorizontalNonLinearAlternativeLabelStepper.js': {
          js: require('docs/src/pages/demos/stepper/HorizontalNonLinearAlternativeLabelStepper')
            .default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require
    .resolve('docs/src/pages/demos/stepper/HorizontalNonLinearAlternativeLabelStepper'), 'utf8')
`,
        },
        'pages/demos/stepper/HorizontalNonLinearStepper.js': {
          js: require('docs/src/pages/demos/stepper/HorizontalNonLinearStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/stepper/HorizontalNonLinearStepper'), 'utf8')
`,
        },
        'pages/demos/stepper/VerticalLinearStepper.js': {
          js: require('docs/src/pages/demos/stepper/VerticalLinearStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/stepper/VerticalLinearStepper'), 'utf8')
`,
        },
        'pages/demos/stepper/TextMobileStepper.js': {
          js: require('docs/src/pages/demos/stepper/TextMobileStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/stepper/TextMobileStepper'), 'utf8')
`,
        },
        'pages/demos/stepper/DotsMobileStepper.js': {
          js: require('docs/src/pages/demos/stepper/DotsMobileStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/stepper/DotsMobileStepper'), 'utf8')
`,
        },
        'pages/demos/stepper/ProgressMobileStepper.js': {
          js: require('docs/src/pages/demos/stepper/ProgressMobileStepper').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/stepper/ProgressMobileStepper'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
