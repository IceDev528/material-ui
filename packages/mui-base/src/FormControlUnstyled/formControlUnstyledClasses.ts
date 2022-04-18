import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface FormControlUnstyledClasses {
  /** Class applied to the root element. */
  root: string;
  /** Class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Class applied to the root element if `error={true}`. */
  error: string;
  /** Class applied to the root element if the inner input has value. */
  filled: string;
  /** Class applied to the root element if the inner input is focused. */
  focused: string;
  /** Class applied to the root element if `required={true}`. */
  required: string;
}

export type FormControlUnstyledClassKey = keyof FormControlUnstyledClasses;

export function getFormControlUnstyledUtilityClasses(slot: string): string {
  return generateUtilityClass('BaseFormControl', slot);
}

const formControlUnstyledClasses: FormControlUnstyledClasses = generateUtilityClasses(
  'BaseFormControl',
  ['root', 'disabled', 'error', 'filled', 'focused', 'required'],
);

export default formControlUnstyledClasses;
