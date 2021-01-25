export interface AccordionSummaryClasses {
  root: string;
  expanded: string;
  focusVisible: string;
  disabled: string;
  gutters: string;
  contentGutters: string;
  content: string;
  expandIconWrapper: string;
}

declare const accordionSummaryClasses: AccordionSummaryClasses;

export function getAccordionSummaryUtilityClass(slot: string): string;

export default accordionSummaryClasses;
