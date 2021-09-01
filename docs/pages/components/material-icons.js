import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  demos,
  docs,
  demoComponents,
} from 'docs/src/pages/components/material-icons/material-icons.md?@mui/markdown';

export default function Page() {
  return <MarkdownDocs demos={demos} docs={docs} disableToc demoComponents={demoComponents} />;
}
