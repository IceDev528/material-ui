import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return (
    <MarkdownDocs
      markdown={req(`./typography${props.lang}.md`)}
      demos={{
        'pages/style/typography/Types.js': {
          js: require('docs/src/pages/style/typography/Types').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/typography/Types'), 'utf8')
`,
        },
        'pages/style/typography/DeprecatedTypes.js': {
          js: require('docs/src/pages/style/typography/DeprecatedTypes').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/typography/DeprecatedTypes'), 'utf8')
`,
        },
        'pages/style/typography/TypographyTheme.js': {
          js: require('docs/src/pages/style/typography/TypographyTheme').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/style/typography/TypographyTheme'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
