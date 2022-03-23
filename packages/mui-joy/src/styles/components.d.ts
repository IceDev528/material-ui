import { GlobalStateSlot } from '@mui/base';
import { CSSInterpolation } from '@mui/system';
import { ButtonProps, ButtonSlot } from '../Button/ButtonProps';
import { IconButtonProps, IconButtonSlot } from '../IconButton/IconButtonProps';
import { InputProps, InputSlot } from '../Input/InputProps';
import { LinkProps, LinkSlot } from '../Link/LinkProps';
import { ListProps, ListSlot } from '../List/ListProps';
import { ListDividerProps, ListDividerSlot } from '../ListDivider/ListDividerProps';
import { ListItemProps, ListItemSlot } from '../ListItem/ListItemProps';
import { AvatarProps, AvatarSlot } from '../Avatar/AvatarProps';
import { ListItemButtonProps, ListItemButtonSlot } from '../ListItemButton/ListItemButtonProps';
import { ListItemContentProps, ListItemContentSlot } from '../ListItemContent/ListItemContentProps';
import {
  ListItemDecoratorProps,
  ListItemDecoratorSlot,
} from '../ListItemDecorator/ListItemDecoratorProps';
import { SheetProps, SheetSlot } from '../Sheet/SheetProps';
import { SvgIconProps, SvgIconSlot } from '../SvgIcon/SvgIconProps';
import { SwitchProps, SwitchSlot } from '../Switch/SwitchProps';
import { TypographyProps, TypographySlot } from '../Typography/TypographyProps';
import { CheckboxProps, CheckboxSlot } from '../Checkbox/CheckboxProps';
import { FormLabelProps, FormLabelSlot } from '../FormLabel/FormLabelProps';
import { FormHelperTextProps, FormHelperTextSlot } from '../FormHelperText/FormHelperTextProps';
import { TextFieldProps, TextFieldSlot } from '../TextField/TextFieldProps';

export type OverridesStyleRules<
  ClassKey extends string = string,
  ComponentProps = Record<string, unknown>,
  Theme = unknown,
> = Partial<
  Record<
    Exclude<ClassKey, GlobalStateSlot>,
    | CSSInterpolation
    | ((
        // Record<string, unknown> is for other props that the slot receive internally
        // Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
        props: {
          ownerState: ComponentProps & Record<string, unknown>;
          theme: Theme;
        } & Record<string, unknown>,
      ) => CSSInterpolation)
  >
>;

export interface Components<Theme = unknown> {
  MuiAvatar?: {
    defaultProps?: Partial<AvatarProps>;
    styleOverrides?: OverridesStyleRules<AvatarSlot, AvatarProps, Theme>;
  };
  MuiButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: OverridesStyleRules<ButtonSlot, ButtonProps, Theme>;
  };
  MuiIconButton?: {
    defaultProps?: Partial<IconButtonProps>;
    styleOverrides?: OverridesStyleRules<IconButtonSlot, IconButtonProps, Theme>;
  };
  MuiSwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: OverridesStyleRules<SwitchSlot, SwitchProps, Theme>;
  };
  MuiTypography?: {
    defaultProps?: Partial<TypographyProps>;
    styleOverrides?: OverridesStyleRules<TypographySlot, TypographyProps, Theme>;
  };
  MuiSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconProps, Theme>;
  };
  MuiList?: {
    defaultProps: Partial<ListProps>;
    styleOverrides?: OverridesStyleRules<ListSlot, ListProps, Theme>;
  };
  MuiListDivider?: {
    defaultProps: Partial<ListDividerProps>;
    styleOverrides?: OverridesStyleRules<ListDividerSlot, ListDividerProps, Theme>;
  };
  MuiListItem?: {
    defaultProps: Partial<ListItemProps>;
    styleOverrides?: OverridesStyleRules<ListItemSlot, ListItemProps, Theme>;
  };
  MuiListItemContent?: {
    defaultProps: Partial<ListItemContentProps>;
    styleOverrides?: OverridesStyleRules<ListItemContentSlot, ListItemContentProps, Theme>;
  };
  MuiListItemDecorator?: {
    defaultProps: Partial<ListItemDecoratorProps>;
    styleOverrides?: OverridesStyleRules<ListItemDecoratorSlot, ListItemDecoratorProps, Theme>;
  };
  MuiListItemButton?: {
    defaultProps: Partial<ListItemButtonProps>;
    styleOverrides?: OverridesStyleRules<ListItemButtonSlot, ListItemButtonProps, Theme>;
  };
  MuiInput?: {
    defaultProps?: Partial<InputProps>;
    styleOverrides?: OverridesStyleRules<InputSlot, InputProps, Theme>;
  };
  MuiSheet?: {
    defaultProps?: Partial<SheetProps>;
    styleOverrides?: OverridesStyleRules<SheetSlot, SheetProps, Theme>;
  };
  MuiLink?: {
    defaultProps?: Partial<LinkProps>;
    styleOverrides?: OverridesStyleRules<LinkSlot, LinkProps, Theme>;
  };
  MuiCheckbox?: {
    defaultProps?: Partial<CheckboxProps>;
    styleOverrides?: OverridesStyleRules<CheckboxSlot, CheckboxProps, Theme>;
  };
  MuiFormLabel?: {
    defaultProps?: Partial<FormLabelProps>;
    styleOverrides?: OverridesStyleRules<FormLabelSlot, FormLabelProps, Theme>;
  };
  MuiFormHelperText?: {
    defaultProps?: Partial<FormHelperTextProps>;
    styleOverrides?: OverridesStyleRules<FormHelperTextSlot, FormHelperTextProps, Theme>;
  };
  MuiTextField?: {
    defaultProps?: Partial<TextFieldProps>;
    styleOverrides?: OverridesStyleRules<TextFieldSlot, TextFieldProps, Theme>;
  };
}
