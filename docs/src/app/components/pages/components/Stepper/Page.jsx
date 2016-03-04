import React from 'react';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import stepperReadmeText from './README';

import VerticalLinearStepper from './VerticalLinearStepper';
import VerticalNonLinearStepper from './VerticalNonLinearStepper';
import VerticalLinearStepperWithOptionalStep from './VerticalLinearStepperWithOptionalStep';
import VerticalLinearStepperCode from '!raw!./VerticalLinearStepper';
import VerticalLinearStepperWithOptionalStepCode from '!raw!./VerticalLinearStepperWithOptionalStep';
import VerticalNonLinearStepperCode from '!raw!./VerticalNonLinearStepper';

import HorizontalLinearStepper from './HorizontalLinearStepper';
import HorizontalLinearStepperCode from '!raw!./HorizontalLinearStepper';

import stepperCode from '!raw!material-ui/lib/Stepper/Stepper';
import verticalStepCode from '!raw!material-ui/lib/Stepper/VerticalStep';
import horizontalStepCode from '!raw!material-ui/lib/Stepper/HorizontalStep';


const descriptions = {
  verticalLinearStepper: 'As for the vertical linear stepper, it requires steps be completed in specific order',
  verticalLinearStepperWithOptionalStep: 'Set the `optional` property to `true` for optional steps.'
   + 'Pass a custom label view through `stepLabel` property to show'
   + ' the difference between optional step and normal step.',
  verticalNonLinearStepper: 'As for the vertical non linear stepper, steps can be completed in any order.',
  horizontalLinearStepper: 'As for the horizontal linear stepper, it is the same with vertical linear stepper.',
};


const styles = {
  stepperWrapper: {
    marginBottom: 50,
  },
};

const StepperPage = () => (
  <div>
    <MarkdownElement text={stepperReadmeText} />
    <CodeExample
      title="Vertical linear step example"
      description={descriptions.verticalLinearStepper}
      code={VerticalLinearStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <VerticalLinearStepper />
      </div>
    </CodeExample>

    <CodeExample
      title="Optional step example"
      description={descriptions.verticalLinearStepperWithOptionalStep}
      code={VerticalLinearStepperWithOptionalStepCode}
    >
      <div style={styles.stepperWrapper}>
        <VerticalLinearStepperWithOptionalStep />
      </div>
    </CodeExample>

    <CodeExample
      title="Non linear example"
      description={descriptions.verticalNonLinearStepper}
      code={VerticalNonLinearStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <VerticalNonLinearStepper />
      </div>
    </CodeExample>

    <CodeExample
      title="Horizontal linear step example"
      description={descriptions.horizontalLinearStepper}
      code={HorizontalLinearStepperCode}
    >
      <div style={styles.stepperWrapper}>
        <HorizontalLinearStepper />
      </div>
    </CodeExample>

    <PropTypeDescription code={stepperCode} />
    <PropTypeDescription code={verticalStepCode} />
    <PropTypeDescription code={horizontalStepCode} />
  </div>
);

export default StepperPage;
