import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/discover-more/showcase', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/discover-more/showcase',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/discover-more/showcase';

function Page() {
  return <MarkdownDocs disableToc req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
