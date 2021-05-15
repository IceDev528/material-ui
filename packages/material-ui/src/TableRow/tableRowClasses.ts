import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface TableRowClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Pseudo-class applied to the root element if `selected={true}`. */
  selected: string;
  /** Pseudo-class applied to the root element if `hover={true}`. */
  hover: string;
  /** Styles applied to the root element if table variant="head". */
  head: string;
  /** Styles applied to the root element if table variant="footer". */
  footer: string;
}

export type TableRowClassKey = keyof TableRowClasses;

export function getTableRowUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableRow', slot);
}

const tableRowClasses: TableRowClasses = generateUtilityClasses('MuiTableRow', [
  'root',
  'selected',
  'hover',
  'head',
  'footer',
]);

export default tableRowClasses;
