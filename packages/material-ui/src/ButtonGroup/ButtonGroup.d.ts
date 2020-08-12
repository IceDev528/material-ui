import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ButtonGroupPropsVariantOverrides {}
export type ButtonGroupVariantDefaults = Record<'text' | 'outlined' | 'contained', true>;

export interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the button group.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'inherit' | 'primary' | 'secondary';
    /**
     * If `true`, the buttons will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     */
    disableElevation?: boolean;
    /**
     * If `true`, the button keyboard focus ripple will be disabled.
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the button ripple effect will be disabled.
     */
    disableRipple?: boolean;
    /**
     * If `true`, the buttons will take up the full width of its container.
     */
    fullWidth?: boolean;
    /**
     * The group orientation (layout flow direction).
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant to use.
     */
    variant?: OverridableStringUnion<ButtonGroupVariantDefaults, ButtonGroupPropsVariantOverrides>;
  };
  defaultComponent: D;
  classKey: ButtonGroupClassKey;
}

/**
 *
 * Demos:
 *
 * - [Button Group](https://material-ui.com/components/button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://material-ui.com/api/button-group/)
 */
declare const ButtonGroup: OverridableComponent<ButtonGroupTypeMap>;

export type ButtonGroupClassKey =
  | 'root'
  | 'contained'
  | 'outlined'
  | 'text'
  | 'disabled'
  | 'disableElevation'
  | 'fullWidth'
  | 'vertical'
  | 'grouped'
  | 'groupedHorizontal'
  | 'groupedVertical'
  | 'groupedText'
  | 'groupedTextHorizontal'
  | 'groupedTextVertical'
  | 'groupedTextPrimary'
  | 'groupedTextSecondary'
  | 'groupedOutlined'
  | 'groupedOutlinedHorizontal'
  | 'groupedOutlinedVertical'
  | 'groupedOutlinedPrimary'
  | 'groupedOutlinedSecondary'
  | 'groupedContained'
  | 'groupedContainedHorizontal'
  | 'groupedContainedVertical'
  | 'groupedContainedPrimary'
  | 'groupedContainedSecondary';

export type ButtonGroupProps<
  D extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>;

export default ButtonGroup;
