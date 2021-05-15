import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface StepButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the `ButtonBase` touch-ripple. */
  touchRipple: string;
}

export type StepButtonClassKey = keyof StepButtonClasses;

export function getStepButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStepButton', slot);
}

const stepButtonClasses: StepButtonClasses = generateUtilityClasses('MuiStepButton', [
  'root',
  'horizontal',
  'vertical',
  'touchRipple',
]);

export default stepButtonClasses;
