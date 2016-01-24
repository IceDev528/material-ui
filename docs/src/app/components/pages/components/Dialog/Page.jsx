import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dialogReadmeText from './README';
import DialogExampleSimple from './ExampleSimple';
import dialogExampleSimpleCode from '!raw!./ExampleSimple';
import DialogExampleModal from './ExampleModal';
import dialogExampleModalCode from '!raw!./ExampleModal';
import DialogExampleCustomWidth from './ExampleCustomWidth';
import dialogExampleCustomWidthCode from '!raw!./ExampleCustomWidth';
import DialogExampleDialogDatePicker from './ExampleDialogDatePicker';
import dialogExampleDialogDatePickerCode from '!raw!./ExampleDialogDatePicker';
import dialogCode from '!raw!material-ui/lib/dialog';

const descriptions = {
  simple: 'Dialog with action buttons. The actions are passed in as an array of React objects, ' +
  'in this example [FlatButtons](http://localhost:3000/#/components/flat-button). \n\n' +
  'You can also close this dialog by clicking outside the dialog, or with the \'Esc\' key.',
  modal: 'A modal dialog can only be closed by selecting one of the actions.',
  styled: 'The dialog width has been set to occupy the full width of browser through the `contentStyle` property.',
  nested: 'Dialogs can be nested. This example opens a Date Picker from within a Dialog.',
};

const DialogPage = () => (
  <div>
    <MarkdownElement text={dialogReadmeText} />
    <CodeExample
      title="Simple dialog"
      description={descriptions.simple}
      code={dialogExampleSimpleCode}
    >
      <DialogExampleSimple />
    </CodeExample>
    <CodeExample
      title="Modal dialog"
      description={descriptions.modal}
      code={dialogExampleModalCode}
    >
      <DialogExampleModal />
    </CodeExample>
    <CodeExample
      title="Styled dialog"
      description={descriptions.styled}
      code={dialogExampleCustomWidthCode}
    >
      <DialogExampleCustomWidth />
    </CodeExample>
    <CodeExample
      title="Nested dialogs"
      description={descriptions.nested}
      code={dialogExampleDialogDatePickerCode}
    >
      <DialogExampleDialogDatePicker />
    </CodeExample>
    <PropTypeDescription code={dialogCode} />
  </div>
);

export default DialogPage;
