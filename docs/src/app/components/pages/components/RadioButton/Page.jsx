import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import radioButtonReadmeText from './README';
import radioButtonCode from '!raw!material-ui/lib/radio-button';
import radioButtonGroupCode from '!raw!material-ui/lib/radio-button-group';
import RadioButtonExampleSimple from './ExampleSimple';
import radioButtonExampleSimpleCode from '!raw!./ExampleSimple';

const description = 'The second button is selected by default using the `defaultSelected` property of ' +
  '`RadioButtonGroup`. The third button is disabled using the `disabled` property of `RadioButton.';

const RadioButtonPage = () => (
  <div>
    <MarkdownElement text={radioButtonReadmeText} />
    <CodeExample description={description} code={radioButtonExampleSimpleCode}>
      <RadioButtonExampleSimple />
    </CodeExample>
    <PropTypeDescription header="### RadioButton Properties" code={radioButtonCode} />
    <PropTypeDescription header="### RadioButtonGroup Properties" code={radioButtonGroupCode} />
  </div>
);

export default RadioButtonPage;
