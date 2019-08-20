import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context(
  'docs/src/pages/getting-started/example-projects',
  false,
  /\.(md|js|tsx)$/,
);
const reqSource = require.context(
  '!raw-loader!../../src/pages/getting-started/example-projects',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/getting-started/example-projects';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
