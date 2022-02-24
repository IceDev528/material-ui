import React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { UseInputProps } from '@mui/base/InputUnstyled';
import { InputClasses } from './inputClasses';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type InputSlot = 'root' | 'input' | 'startAdornment' | 'endAdornment';

export interface InputPropsVariantOverrides {}

export interface InputPropsColorOverrides {}

export interface InputPropsSizeOverrides {}

export interface InputTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    UseInputProps & {
      'aria-describedby'?: string;
      'aria-label'?: string;
      'aria-labelledby'?: string;
      /**
       * This prop helps users to fill forms faster, especially on mobile devices.
       * The name can be confusing, as it's more like an autofill.
       * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
       */
      autoComplete?: string;
      /**
       * If `true`, the `input` element is focused during the first mount.
       */
      autoFocus?: boolean;
      /**
       * Class name applied to the root element.
       */
      className?: string;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<InputClasses>;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       */
      color?: OverridableStringUnion<
        Exclude<ColorPaletteProp, 'context'>,
        InputPropsColorOverrides
      >;
      /**
       * The components used for each slot inside the InputBase.
       * Either a string to use a HTML element or a component.
       */
      components?: {
        Root?: React.ElementType;
        Input?: React.ElementType;
      };
      /**
       * The props used for each slot inside the Input.
       * @default {}
       */
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'div'>;
        input?: React.ComponentPropsWithRef<'input'>;
      };
      /**
       * Trailing adornment for this input.
       */
      endAdornment?: React.ReactNode;
      /**
       * If `true`, the button will take up the full width of its container.
       * @default false
       */
      fullWidth?: boolean;
      /**
       * The id of the `input` element.
       */
      id?: string;
      /**
       * Pass a ref to the `input` element.
       */
      inputRef?: React.Ref<any>;
      /**
       * Name attribute of the `input` element.
       */
      name?: string;
      onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
      onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
      /**
       * The short hint displayed in the `input` before the user enters a value.
       */
      placeholder?: string;
      /**
       * It prevents the user from changing the value of the field
       * (not from interacting with the field).
       */
      readOnly?: boolean;
      /**
       * Leading adornment for this input.
       */
      startAdornment?: React.ReactNode;
      /**
       * The size of the component.
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', InputPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
       * @default 'text'
       */
      type?: string;
      /**
       * The value of the `input` element, required for a controlled component.
       */
      value?: unknown;
      /**
       * The variant to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, InputPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type InputProps<
  D extends React.ElementType = InputTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<InputTypeMap<P, D>, D>;

export default InputProps;
