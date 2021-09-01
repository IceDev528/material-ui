import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface AlertTitleClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type AlertTitleClassKey = keyof AlertTitleClasses;

export function getAlertTitleUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAlertTitle', slot);
}

const alertTitleClasses: AlertTitleClasses = generateUtilityClasses('MuiAlertTitle', ['root']);

export default alertTitleClasses;
