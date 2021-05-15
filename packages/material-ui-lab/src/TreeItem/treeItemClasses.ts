import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface TreeItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the transition component. */
  group: string;
  /** Styles applied to the content element. */
  content: string;
  /** Pseudo-class applied to the content element when expanded. */
  expanded: string;
  /** Pseudo-class applied to the content element when selected. */
  selected: string;
  /** Pseudo-class applied to the content element when focused. */
  focused: string;
  /** Pseudo-class applied to the element when disabled. */
  disabled: string;
  /** Styles applied to the tree node icon. */
  iconContainer: string;
  /** Styles applied to the label element. */
  label: string;
}

export type TreeItemClassKey = keyof TreeItemClasses;

export function getTreeItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTreeItem', slot);
}

const treeItemClasses: TreeItemClasses = generateUtilityClasses('MuiTreeItem', [
  'root',
  'group',
  'content',
  'expanded',
  'selected',
  'focused',
  'disabled',
  'iconContainer',
  'label',
]);

export default treeItemClasses;
