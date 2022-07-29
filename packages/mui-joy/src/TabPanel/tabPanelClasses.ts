import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TabPanelClasses {
  /** Classname applied to the root element. */
  root: string;
  /** Classname applied to the root element if the tab is not active. */
  hidden: string;
  /** Classname applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Classname applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Classname applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type TabPanelClassKey = keyof TabPanelClasses;

export function getTabPanelUtilityClass(slot: string): string {
  return generateUtilityClass('JoyTabPanel', slot);
}

const tabListClasses: TabPanelClasses = generateUtilityClasses('JoyTabPanel', [
  'root',
  'hidden',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default tabListClasses;
