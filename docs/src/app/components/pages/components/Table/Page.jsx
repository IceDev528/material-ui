import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import tableReadmeText from './README';
import tableCode from '!raw!material-ui/lib/table/table';
import tableRowCode from '!raw!material-ui/lib/table/table';
import tableBodyCode from '!raw!material-ui/lib/table/table-body';
import tableFooterCode from '!raw!material-ui/lib/table/table-footer';
import tableHeaderColumnCode from '!raw!material-ui/lib/table/table-header-column';
import tableHeaderCode from '!raw!material-ui/lib/table/table-header';
import tableRowColumnCode from '!raw!material-ui/lib/table/table-row-column';
import TableExampleSimple from './ExampleSimple';
import tableExampleSimpleCode from '!raw!./ExampleSimple';
import TableExampleComplex from './ExampleComplex';
import tableExampleComplexCode from '!raw!./ExampleComplex';

const descriptions = {
  simple: 'A simple table demonstrating the hierarchy of the `Table` component and its sub-components.',
  complex: 'A more complex example, allowing the table height to be set, and key boolean properties to be toggled.',
};

const TablePage = () => (
  <div>
    <MarkdownElement text={tableReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={tableExampleSimpleCode}
    >
      <TableExampleSimple />
    </CodeExample>
    <CodeExample
      title="Complex example"
      description={descriptions.complex}
      code={tableExampleComplexCode}
    >
      <TableExampleComplex />
    </CodeExample>
    <PropTypeDescription code={tableCode} header="### Table Properties" />
    <PropTypeDescription code={tableBodyCode} header="### TableBody Properties" />
    <PropTypeDescription code={tableFooterCode} header="### TableFooter Properties" />
    <PropTypeDescription code={tableHeaderColumnCode} header="### TableHeaderColumn Properties" />
    <PropTypeDescription code={tableHeaderCode} header="### TableHeader Properties" />
    <PropTypeDescription code={tableRowColumnCode} header="### TableRowColumn Properties" />
    <PropTypeDescription code={tableRowCode} header="### TableRow Properties" />
  </div>
);

export default TablePage;
