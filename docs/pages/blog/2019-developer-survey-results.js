import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './2019-developer-survey-results.md';

export default function Page() {
  return <MarkdownDocs markdown={markdown} blog disableAd disableToc disableEdit />;
}
