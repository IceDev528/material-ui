import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type CardSlot = 'root';

export interface CardPropsColorOverrides {}
export interface CardPropsVariantOverrides {}
export interface CardPropsSizeOverrides {}

export interface CardTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the Card if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<Exclude<ColorPaletteProp, 'context'>, CardPropsColorOverrides>;
    /**
     * The size of the component.
     * It accepts theme values between 'xs' and 'xl'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', CardPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'text'
     */
    variant?: OverridableStringUnion<VariantProp, CardPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type CardProps<
  D extends React.ElementType = CardTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CardTypeMap<P, D>, D>;
