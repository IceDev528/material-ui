import React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import markdown from './2019.md';

export default function Page() {
  return <TopLayoutBlog markdown={markdown} />;
}
