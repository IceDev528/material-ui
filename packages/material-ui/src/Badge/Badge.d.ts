import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { OverridableStringUnion } from '@material-ui/types';
import {
  ExtendBadgeUnstyledTypeMap,
  BadgeUnstyledTypeMap,
  BadgeUnstyledClasses,
} from '@material-ui/unstyled';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BadgePropsVariantOverrides {}
export type BadgeVariantDefaults = Record<'standard' | 'dot', true>;

export type BadgeTypeMap<
  D extends React.ElementType = 'span',
  P = {}
> = ExtendBadgeUnstyledTypeMap<{
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     * @default {}
     */
    classes?: BadgeUnstyledTypeMap['props']['classes'] & {
      /** Styles applied to the badge `span` element if `color="primary"`. */
      colorPrimary?: string;
      /** Styles applied to the badge `span` element if `color="secondary"`. */
      colorSecondary?: string;
      /** Styles applied to the badge `span` element if `color="error"`. */
      colorError?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'default'
     */
    color?: 'primary' | 'secondary' | 'default' | 'error';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The variant to use.
     * @default 'standard'
     */
    variant?: OverridableStringUnion<BadgeVariantDefaults, BadgePropsVariantOverrides>;
  };
  defaultComponent: D;
}>;

type BadgeRootProps = NonNullable<BadgeTypeMap['props']['componentsProps']>['root'];
type BadgeBadgeProps = NonNullable<BadgeTypeMap['props']['componentsProps']>['badge'];

export const BadgeRoot: React.FC<BadgeRootProps>;
export const BadgeMark: React.FC<BadgeBadgeProps>;

export type BadgeClassKey = keyof NonNullable<BadgeTypeMap['props']['classes']>;
/**
 *
 * Demos:
 *
 * - [Avatars](https://material-ui.com/components/avatars/)
 * - [Badges](https://material-ui.com/components/badges/)
 *
 * API:
 *
 * - [Badge API](https://material-ui.com/api/badge/)
 * - inherits [BadgeUnstyled API](https://material-ui.com/api/badge-unstyled/)
 */
declare const Badge: OverridableComponent<BadgeTypeMap>;

export interface BadgeClasses extends BadgeUnstyledClasses {
  primaryColor: string;
  secondaryColor: string;
  errorColor: string;
}
export const badgeClasses: BadgeClasses;

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BadgeTypeMap<D, P>, D>;

export default Badge;
