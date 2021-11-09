import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface CardClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardClassKey = keyof CardClasses;

export function getCardUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCard', slot);
}

const cardClasses: CardClasses = generateUtilityClasses('MuiCard', ['root']);

export default cardClasses;
