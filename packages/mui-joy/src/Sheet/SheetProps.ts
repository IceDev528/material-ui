import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type SheetSlot = 'root';

export interface SheetPropsColorOverrides {}
export interface SheetPropsVariantOverrides {}

export interface SheetTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<Exclude<ColorPaletteProp, 'context'>, SheetPropsColorOverrides>;
    /**
     * Shadow depth, corresponds to the `theme.shadow` scale.
     * It accepts theme values between 'xs' and 'xl'.
     */
    elevation?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'text'
     */
    variant?: OverridableStringUnion<VariantProp, SheetPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type SheetProps<
  D extends React.ElementType = SheetTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<SheetTypeMap<P, D>, D>;
