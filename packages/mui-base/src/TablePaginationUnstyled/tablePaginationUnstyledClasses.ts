import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TablePaginationUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the Toolbar component. */
  toolbar: string;
  /** Class name applied to the spacer element. */
  spacer: string;
  /** Class name applied to the select label Typography element. */
  selectLabel: string;
  /** Class name applied to the Select component `root` element. */
  selectRoot: string;
  /** Class name applied to the Select component `select` class. */
  select: string;
  /** Class name applied to the Select component `icon` class. */
  selectIcon: string;
  /** Class name applied to the Select component `root` element. */
  input: string;
  /** Class name applied to the MenuItem component. */
  menuItem: string;
  /** Class name applied to the displayed rows Typography element. */
  displayedRows: string;
  /** Class name applied to the internal `TablePaginationUnstyledActions` component. */
  actions: string;
}

export type TablePaginationUnstyledClassKey = keyof TablePaginationUnstyledClasses;

export function getTablePaginationUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTablePagination', slot);
}

const tablePaginationUnstyledClasses: TablePaginationUnstyledClasses = generateUtilityClasses(
  'MuiTablePagination',
  [
    'root',
    'toolbar',
    'spacer',
    'selectLabel',
    'selectRoot',
    'select',
    'selectIcon',
    'input',
    'menuItem',
    'displayedRows',
    'actions',
  ],
);

export default tablePaginationUnstyledClasses;
