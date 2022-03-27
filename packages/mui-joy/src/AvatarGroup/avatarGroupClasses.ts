import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface AvatarGroupClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type AvatarGroupClassKey = keyof AvatarGroupClasses;

export function getAvatarGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAvatarGroup', slot);
}

const avatarGroupClasses: AvatarGroupClasses = generateUtilityClasses('MuiAvatarGroup', ['root']);

export default avatarGroupClasses;
