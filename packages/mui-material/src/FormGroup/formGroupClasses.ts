import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface FormGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `row={true}`. */
  row: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
}

export type FormGroupClassKey = keyof FormGroupClasses;

export function getFormGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFormGroup', slot);
}

const formGroupClasses: FormGroupClasses = generateUtilityClasses('MuiFormGroup', [
  'root',
  'row',
  'error',
]);

export default formGroupClasses;
