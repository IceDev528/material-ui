import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface TypographyClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `level="h1"`. */
  h1: string;
  /** Styles applied to the root element if `level="h2"`. */
  h2: string;
  /** Styles applied to the root element if `level="h3"`. */
  h3: string;
  /** Styles applied to the root element if `level="h4"`. */
  h4: string;
  /** Styles applied to the root element if `level="h5"`. */
  h5: string;
  /** Styles applied to the root element if `level="h6"`. */
  h6: string;
  /** Styles applied to the root element if `level="body1"`. */
  body1: string;
  /** Styles applied to the root element if `level="body2"`. */
  body2: string;
  /** Styles applied to the root element if `level="body3"`. */
  body3: string;
  /** Styles applied to the root element if `nowrap={true}`. */
  noWrap: string;
  /** Styles applied to the root element if `gutterBottom={true}`. */
  gutterBottom: string;
  /** Styles applied to the startDecorator element */
  startDecorator: string;
  /** Styles applied to the endDecorator element */
  endDecorator: string;
}

export type TypographyClassKey = keyof TypographyClasses;

export function getTypographyUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTypography', slot);
}

const typographyClasses: TypographyClasses = generateUtilityClasses('MuiTypography', [
  'root',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body1',
  'body2',
  'body3',
  'noWrap',
  'gutterBottom',
  'startDecorator',
  'endDecorator',
]);

export default typographyClasses;
