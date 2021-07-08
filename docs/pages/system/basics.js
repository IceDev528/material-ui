import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  demos,
  docs,
  requireDemo,
} from 'docs/src/pages/system/basics/basics.md?@material-ui/markdown';

export default function Page() {
  return <MarkdownDocs demos={demos} docs={docs} requireDemo={requireDemo} />;
}
