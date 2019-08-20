import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/components/tree-view', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/tree-view',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/tree-view';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
