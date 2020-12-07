import * as React from 'react';
import { SxProps } from '@material-ui/system';
import {
  ExtendSliderUnstyledTypeMap,
  ExtendSliderUnstyled,
  SliderUnstyledTypeMap,
  SliderUnstyledClasses,
} from '@material-ui/unstyled';
import { Theme } from '@material-ui/core/styles';
import { OverrideProps } from '../OverridableComponent';

export type SliderTypeMap<
  D extends React.ElementType = 'span',
  P = {}
> = ExtendSliderUnstyledTypeMap<{
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: 'primary' | 'secondary';
    /**
     * Override or extend the styles applied to the component.
     * @default {}
     */
    classes?: SliderUnstyledTypeMap['props']['classes'] & {
      /** Class name applied to the root element if `color="primary"`. */
      colorPrimary?: string;
      /** Class name applied to the root element if `color="secondary"`. */
      colorSecondary?: string;
      /** Class name applied to the thumb element if `color="primary"`. */
      thumbColorPrimary?: string;
      /** Class name applied to the thumb element if `color="secondary"`. */
      thumbColorSecondary?: string;
    };
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

type SliderRootProps = NonNullable<SliderTypeMap['props']['componentsProps']>['root'];
type SliderMarkProps = NonNullable<SliderTypeMap['props']['componentsProps']>['mark'];
type SliderMarkLabelProps = NonNullable<SliderTypeMap['props']['componentsProps']>['markLabel'];
type SliderRailProps = NonNullable<SliderTypeMap['props']['componentsProps']>['rail'];
type SliderTrackProps = NonNullable<SliderTypeMap['props']['componentsProps']>['track'];
type SliderThumbProps = NonNullable<SliderTypeMap['props']['componentsProps']>['thumb'];
type SliderValueLabel = NonNullable<SliderTypeMap['props']['componentsProps']>['valueLabel'];

export const SliderRoot: React.FC<SliderRootProps>;
export const SliderMark: React.FC<SliderMarkProps>;
export const SliderMarkLabel: React.FC<SliderMarkLabelProps>;
export const SliderRail: React.FC<SliderRailProps>;
export const SliderTrack: React.FC<SliderTrackProps>;
export const SliderThumb: React.FC<SliderThumbProps>;
export const SliderValueLabel: React.FC<SliderValueLabel>;

/**
 *
 * Demos:
 *
 * - [Slider](https://material-ui.com/components/slider/)
 *
 * API:
 *
 * - [Slider API](https://material-ui.com/api/slider/)
 * - inherits [SliderUnstyled API](https://material-ui.com/api/slider-unstyled/)
 */
declare const Slider: ExtendSliderUnstyled<SliderTypeMap>;

export type SliderClassKey = keyof NonNullable<SliderTypeMap['props']['classes']>;

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<D, P>, D>;

export interface SliderClasses extends SliderUnstyledClasses {
  colorPrimary: string;
  colorSecondary: string;
  thumbPrimary: string;
  thumbSecondary: string;
}

export const sliderClasses: SliderClasses;

export default Slider;
