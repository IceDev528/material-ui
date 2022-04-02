import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface CardContentClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardContentClassKey = keyof CardContentClasses;

export function getCardContentUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardContent', slot);
}

const cardClasses: CardContentClasses = generateUtilityClasses('MuiCardContent', ['root']);

export default cardClasses;
