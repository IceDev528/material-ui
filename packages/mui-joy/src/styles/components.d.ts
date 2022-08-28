import { GlobalStateSlot } from '@mui/base';
import { CSSInterpolation } from '@mui/system';
import {
  AspectRatioProps,
  AspectRatioOwnerState,
  AspectRatioSlot,
} from '../AspectRatio/AspectRatioProps';
import { AvatarProps, AvatarOwnerState, AvatarSlot } from '../Avatar/AvatarProps';
import {
  AvatarGroupProps,
  AvatarGroupOwnerState,
  AvatarGroupSlot,
} from '../AvatarGroup/AvatarGroupProps';
import { BadgeProps, BadgeOwnerState, BadgeSlot } from '../Badge/BadgeProps';
import { BoxProps, BoxSlot } from '../Box/BoxProps';
import {
  BreadcrumbsProps,
  BreadcrumbsOwnerState,
  BreadcrumbsSlot,
} from '../Breadcrumbs/BreadcrumbsProps';
import { ButtonProps, ButtonOwnerState, ButtonSlot } from '../Button/ButtonProps';
import { CardProps, CardOwnerState, CardSlot } from '../Card/CardProps';
import {
  CardContentProps,
  CardContentOwnerState,
  CardContentSlot,
} from '../CardContent/CardContentProps';
import { CardCoverProps, CardCoverOwnerState, CardCoverSlot } from '../CardCover/CardCoverProps';
import {
  CardOverflowProps,
  CardOverflowOwnerState,
  CardOverflowSlot,
} from '../CardOverflow/CardOverflowProps';
import { CheckboxProps, CheckboxOwnerState, CheckboxSlot } from '../Checkbox/CheckboxProps';
import { ChipProps, ChipOwnerState, ChipSlot } from '../Chip/ChipProps';
import {
  ChipDeleteProps,
  ChipDeleteOwnerState,
  ChipDeleteSlot,
} from '../ChipDelete/ChipDeleteProps';
import { ContainerProps, ContainerSlot } from '../Container/ContainerProps';
import {
  FormHelperTextProps,
  FormHelperTextOwnerState,
  FormHelperTextSlot,
} from '../FormHelperText/FormHelperTextProps';
import { FormLabelProps, FormLabelOwnerState, FormLabelSlot } from '../FormLabel/FormLabelProps';
import { GridProps, GridSlot } from '../Grid/GridProps';
import {
  IconButtonProps,
  IconButtonOwnerState,
  IconButtonSlot,
} from '../IconButton/IconButtonProps';
import { InputProps, InputOwnerState, InputSlot } from '../Input/InputProps';
import { LinkProps, LinkOwnerState, LinkSlot } from '../Link/LinkProps';
import { ListProps, ListOwnerState, ListSlot } from '../List/ListProps';
import {
  ListDividerProps,
  ListDividerOwnerState,
  ListDividerSlot,
} from '../ListDivider/ListDividerProps';
import { ListItemProps, ListItemOwnerState, ListItemSlot } from '../ListItem/ListItemProps';
import {
  ListItemButtonProps,
  ListItemButtonOwnerState,
  ListItemButtonSlot,
} from '../ListItemButton/ListItemButtonProps';
import {
  ListItemContentProps,
  ListItemContentOwnerState,
  ListItemContentSlot,
} from '../ListItemContent/ListItemContentProps';
import {
  ListItemDecoratorOwnerState,
  ListItemDecoratorProps,
  ListItemDecoratorSlot,
} from '../ListItemDecorator/ListItemDecoratorProps';
import { MenuProps, MenuOwnerState, MenuSlot } from '../Menu/MenuProps';
import { MenuItemProps, MenuItemOwnerState, MenuItemSlot } from '../MenuItem/MenuItemProps';
import { MenuListProps, MenuListOwnerState, MenuListSlot } from '../MenuList/MenuListProps';
import { RadioProps, RadioOwnerState, RadioSlot } from '../Radio/RadioProps';
import {
  RadioGroupProps,
  RadioGroupOwnerState,
  RadioGroupSlot,
} from '../RadioGroup/RadioGroupProps';
import { SheetProps, SheetOwnerState, SheetSlot } from '../Sheet/SheetProps';
import { SelectProps, SelectOwnerState, SelectSlot } from '../Select/SelectProps';
import { OptionProps, OptionOwnerState, OptionSlot } from '../Option/OptionProps';
import { SliderProps, SliderOwnerState, SliderSlot } from '../Slider/SliderProps';
import { StackProps, StackSlot } from '../Stack/StackProps';
import { SvgIconProps, SvgIconOwnerState, SvgIconSlot } from '../SvgIcon/SvgIconProps';
import { SwitchProps, SwitchOwnerState, SwitchSlot } from '../Switch/SwitchProps';
import { TabProps, TabOwnerState, TabSlot } from '../Tab/TabProps';
import { TabListProps, TabListOwnerState, TabListSlot } from '../TabList/TabListProps';
import { TabPanelProps, TabPanelOwnerState, TabPanelSlot } from '../TabPanel/TabPanelProps';
import { TabsProps, TabsOwnerState, TabsSlot } from '../Tabs/TabsProps';
import { TextFieldProps, TextFieldOwnerState, TextFieldSlot } from '../TextField/TextFieldProps';
import {
  TypographyProps,
  TypographyOwnerState,
  TypographySlot,
} from '../Typography/TypographyProps';
import { TextareaProps, TextareaOwnerState, TextareaSlot } from '../Textarea/TextareaProps';

export type OverridesStyleRules<
  ClassKey extends string = string,
  ComponentOwnerState = Record<string, unknown>,
  Theme = unknown,
> = Partial<
  Record<
    Exclude<ClassKey, GlobalStateSlot>,
    | CSSInterpolation
    | ((
        // Record<string, unknown> is for other props that the slot receive internally
        // Documenting all ownerStates could be a huge work, let's wait until we have a real needs from developers.
        props: {
          ownerState: ComponentOwnerState & Record<string, unknown>;
          theme: Theme;
        } & Record<string, unknown>,
      ) => CSSInterpolation)
  >
>;
export interface Components<Theme = unknown> {
  // alphabetical order
  JoyAspectRatio?: {
    defaultProps?: Partial<AspectRatioProps>;
    styleOverrides?: OverridesStyleRules<AspectRatioSlot, AspectRatioOwnerState, Theme>;
  };
  JoyAvatar?: {
    defaultProps?: Partial<AvatarProps>;
    styleOverrides?: OverridesStyleRules<AvatarSlot, AvatarOwnerState, Theme>;
  };
  JoyAvatarGroup?: {
    defaultProps?: Partial<AvatarGroupProps>;
    styleOverrides?: OverridesStyleRules<AvatarGroupSlot, AvatarGroupOwnerState, Theme>;
  };
  JoyBadge?: {
    defaultProps?: Partial<BadgeProps>;
    styleOverrides?: OverridesStyleRules<BadgeSlot, BadgeOwnerState, Theme>;
  };
  JoyBox?: {
    defaultProps?: Partial<BoxProps>;
    styleOverrides?: OverridesStyleRules<BoxSlot, BoxProps, Theme>;
  };
  JoyButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: OverridesStyleRules<ButtonSlot, ButtonOwnerState, Theme>;
  };
  JoyBreadcrumbs?: {
    defaultProps?: Partial<BreadcrumbsProps>;
    styleOverrides?: OverridesStyleRules<BreadcrumbsSlot, BreadcrumbsOwnerState, Theme>;
  };
  JoyCard?: {
    defaultProps?: Partial<CardProps>;
    styleOverrides?: OverridesStyleRules<CardSlot, CardOwnerState, Theme>;
  };
  JoyCardContent?: {
    defaultProps?: Partial<CardContentProps>;
    styleOverrides?: OverridesStyleRules<CardContentSlot, CardContentOwnerState, Theme>;
  };
  JoyCardCover?: {
    defaultProps?: Partial<CardCoverProps>;
    styleOverrides?: OverridesStyleRules<CardCoverSlot, CardCoverOwnerState, Theme>;
  };
  JoyCardOverflow?: {
    defaultProps?: Partial<CardOverflowProps>;
    styleOverrides?: OverridesStyleRules<CardOverflowSlot, CardOverflowOwnerState, Theme>;
  };
  JoyCheckbox?: {
    defaultProps?: Partial<CheckboxProps>;
    styleOverrides?: OverridesStyleRules<CheckboxSlot, CheckboxOwnerState, Theme>;
  };
  JoyChip?: {
    defaultProps?: Partial<ChipProps>;
    styleOverrides?: OverridesStyleRules<ChipSlot, ChipOwnerState, Theme>;
  };
  JoyChipDelete?: {
    defaultProps?: Partial<ChipDeleteProps>;
    styleOverrides?: OverridesStyleRules<ChipDeleteSlot, ChipDeleteOwnerState, Theme>;
  };
  JoyContainer?: {
    defaultProps?: Partial<ContainerProps>;
    styleOverrides?: OverridesStyleRules<ContainerSlot, ContainerProps, Theme>;
  };
  JoyFormHelperText?: {
    defaultProps?: Partial<FormHelperTextProps>;
    styleOverrides?: OverridesStyleRules<FormHelperTextSlot, FormHelperTextOwnerState, Theme>;
  };
  JoyFormLabel?: {
    defaultProps?: Partial<FormLabelProps>;
    styleOverrides?: OverridesStyleRules<FormLabelSlot, FormLabelOwnerState, Theme>;
  };
  JoyGrid?: {
    defaultProps?: Partial<GridProps>;
    styleOverrides?: OverridesStyleRules<GridSlot, GridProps, Theme>;
  };
  JoyIconButton?: {
    defaultProps?: Partial<IconButtonProps>;
    styleOverrides?: OverridesStyleRules<IconButtonSlot, IconButtonOwnerState, Theme>;
  };
  JoyInput?: {
    defaultProps?: Partial<InputProps>;
    styleOverrides?: OverridesStyleRules<InputSlot, InputOwnerState, Theme>;
  };
  JoyLink?: {
    defaultProps?: Partial<LinkProps>;
    styleOverrides?: OverridesStyleRules<LinkSlot, LinkOwnerState, Theme>;
  };
  JoyList?: {
    defaultProps?: Partial<ListProps>;
    styleOverrides?: OverridesStyleRules<ListSlot, ListOwnerState, Theme>;
  };
  JoyListDivider?: {
    defaultProps?: Partial<ListDividerProps>;
    styleOverrides?: OverridesStyleRules<ListDividerSlot, ListDividerOwnerState, Theme>;
  };
  JoyListItem?: {
    defaultProps?: Partial<ListItemProps>;
    styleOverrides?: OverridesStyleRules<ListItemSlot, ListItemOwnerState, Theme>;
  };
  JoyListItemButton?: {
    defaultProps?: Partial<ListItemButtonProps>;
    styleOverrides?: OverridesStyleRules<ListItemButtonSlot, ListItemButtonOwnerState, Theme>;
  };
  JoyListItemContent?: {
    defaultProps?: Partial<ListItemContentProps>;
    styleOverrides?: OverridesStyleRules<ListItemContentSlot, ListItemContentOwnerState, Theme>;
  };
  JoyListItemDecorator?: {
    defaultProps?: Partial<ListItemDecoratorProps>;
    styleOverrides?: OverridesStyleRules<ListItemDecoratorSlot, ListItemDecoratorOwnerState, Theme>;
  };
  JoyRadio?: {
    defaultProps?: Partial<RadioProps>;
    styleOverrides?: OverridesStyleRules<RadioSlot, RadioOwnerState, Theme>;
  };
  JoyRadioGroup?: {
    defaultProps?: Partial<RadioGroupProps>;
    styleOverrides?: OverridesStyleRules<RadioGroupSlot, RadioGroupOwnerState, Theme>;
  };
  JoySelect?: {
    defaultProps?: Partial<SelectProps<any>>;
    styleOverrides?: OverridesStyleRules<SelectSlot, SelectOwnerState<any>, Theme>;
  };
  JoyOption?: {
    defaultProps?: Partial<OptionProps>;
    styleOverrides?: OverridesStyleRules<OptionSlot, OptionOwnerState, Theme>;
  };
  JoySheet?: {
    defaultProps?: Partial<SheetProps>;
    styleOverrides?: OverridesStyleRules<SheetSlot, SheetOwnerState, Theme>;
  };
  JoyStack?: {
    defaultProps?: Partial<StackProps>;
    styleOverrides?: OverridesStyleRules<StackSlot, StackProps, Theme>;
  };
  JoySwitch?: {
    defaultProps?: Partial<SwitchProps>;
    styleOverrides?: OverridesStyleRules<SwitchSlot, SwitchOwnerState, Theme>;
  };
  // Temporary for Material UI icons usage
  MuiSvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconOwnerState, Theme>;
  };
  JoySvgIcon?: {
    defaultProps?: Partial<SvgIconProps>;
    styleOverrides?: OverridesStyleRules<SvgIconSlot, SvgIconOwnerState, Theme>;
  };
  JoySlider?: {
    defaultProps?: Partial<SliderProps>;
    styleOverrides?: OverridesStyleRules<SliderSlot, SliderOwnerState, Theme>;
  };
  JoyTabs?: {
    defaultProps?: Partial<TabsProps>;
    styleOverrides?: OverridesStyleRules<TabsSlot, TabsOwnerState, Theme>;
  };
  JoyTabList?: {
    defaultProps?: Partial<TabListProps>;
    styleOverrides?: OverridesStyleRules<TabListSlot, TabListOwnerState, Theme>;
  };
  JoyTab?: {
    defaultProps?: Partial<TabProps>;
    styleOverrides?: OverridesStyleRules<TabSlot, TabOwnerState, Theme>;
  };
  JoyTabPanel?: {
    defaultProps?: Partial<TabPanelProps>;
    styleOverrides?: OverridesStyleRules<TabPanelSlot, TabPanelOwnerState, Theme>;
  };
  JoyTextField?: {
    defaultProps?: Partial<TextFieldProps>;
    styleOverrides?: OverridesStyleRules<TextFieldSlot, TextFieldOwnerState, Theme>;
  };
  JoyTypography?: {
    defaultProps?: Partial<TypographyProps>;
    styleOverrides?: OverridesStyleRules<TypographySlot, TypographyOwnerState, Theme>;
  };
  JoyMenu?: {
    defaultProps?: Partial<MenuProps>;
    styleOverrides?: OverridesStyleRules<MenuSlot, MenuOwnerState, Theme>;
  };
  JoyMenuList?: {
    defaultProps?: Partial<MenuListProps>;
    styleOverrides?: OverridesStyleRules<MenuListSlot, MenuListOwnerState, Theme>;
  };
  JoyMenuItem?: {
    defaultProps?: Partial<MenuItemProps>;
    styleOverrides?: OverridesStyleRules<MenuItemSlot, MenuItemOwnerState, Theme>;
  };
  JoyTextarea?: {
    defaultProps?: Partial<TextareaProps>;
    styleOverrides?: OverridesStyleRules<TextareaSlot, TextareaOwnerState, Theme>;
  };
}
