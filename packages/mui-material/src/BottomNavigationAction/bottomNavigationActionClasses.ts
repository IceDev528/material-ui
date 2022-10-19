import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface BottomNavigationActionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if selected. */
  selected: string;
  /** State class applied to the root element if `showLabel={false}` and not selected. */
  iconOnly: string;
  /** Styles applied to the label's span element. */
  label: string;
}

export type BottomNavigationActionClassKey = keyof BottomNavigationActionClasses;

export function getBottomNavigationActionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBottomNavigationAction', slot);
}

const bottomNavigationActionClasses: BottomNavigationActionClasses = generateUtilityClasses(
  'MuiBottomNavigationAction',
  ['root', 'iconOnly', 'selected', 'label'],
);

export default bottomNavigationActionClasses;
