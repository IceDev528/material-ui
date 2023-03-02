import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent, OverrideProps, DefaultComponentProps } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import PopperUnstyled, {
  PopperUnstyledProps,
  PopperUnstyledTypeMap,
} from '@mui/base/PopperUnstyled';
import {
  SelectUnstyledContext,
  flattenOptionGroups,
  getOptionsFromChildren,
} from '@mui/base/SelectUnstyled';
import useSelect, { SelectChild, SelectOption } from '@mui/base/useSelect';
import composeClasses from '@mui/base/composeClasses';
import { StyledList } from '../List/List';
import ListProvider, { scopedVariables } from '../List/ListProvider';
import Unfold from '../internal/svg-icons/Unfold';
import { styled, useThemeProps } from '../styles';
import ColorInversion, { useColorInversion } from '../styles/ColorInversion';
import { SelectOwnProps, SelectOwnerState, SelectTypeMap } from './SelectProps';
import useSlot from '../utils/useSlot';
import selectClasses, { getSelectUtilityClass } from './selectClasses';
import { ListOwnerState } from '../List';
import FormControlContext from '../FormControl/FormControlContext';

function defaultRenderSingleValue<TValue>(selectedOption: SelectOption<TValue> | null) {
  return selectedOption?.label ?? '';
}

function defaultFormValueProvider<TValue>(selectedOption: SelectOption<TValue> | null) {
  if (selectedOption?.value == null) {
    return '';
  }

  if (typeof selectedOption.value === 'string' || typeof selectedOption.value === 'number') {
    return selectedOption.value;
  }

  return JSON.stringify(selectedOption.value);
}

const defaultModifiers: PopperUnstyledProps['modifiers'] = [
  {
    name: 'offset',
    options: {
      offset: [0, 4],
    },
  },
  {
    // popper will have the same width as root element when open
    name: 'equalWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
  },
];

const useUtilityClasses = (ownerState: SelectOwnerState<any>) => {
  const { color, disabled, focusVisible, size, variant, open } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      open && 'expanded',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    button: ['button'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
    indicator: ['indicator', open && 'expanded'],
    listbox: ['listbox', open && 'expanded', disabled && 'disabled'],
  };

  return composeClasses(slots, getSelectUtilityClass, {});
};

const SelectRoot = styled('div', {
  name: 'JoySelect',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
  return [
    {
      '--Select-radius': theme.vars.radius.sm,
      '--Select-gap': '0.5rem',
      '--Select-placeholderOpacity': 0.5,
      '--Select-focusedThickness': theme.vars.focus.thickness,
      ...(ownerState.color === 'context'
        ? {
            '--Select-focusedHighlight': theme.vars.palette.focusVisible,
          }
        : {
            '--Select-focusedHighlight':
              theme.vars.palette[
                ownerState.color === 'neutral' ? 'primary' : ownerState.color!
              ]?.[500],
          }),
      '--Select-indicator-color': variantStyle?.backgroundColor
        ? variantStyle?.color
        : theme.vars.palette.text.tertiary,
      ...(ownerState.size === 'sm' && {
        '--Select-minHeight': '2rem',
        '--Select-paddingInline': '0.5rem',
        '--Select-decorator-childHeight': 'min(1.5rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.25rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Select-minHeight': '2.5rem',
        '--Select-paddingInline': '0.75rem',
        '--Select-decorator-childHeight': 'min(2rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.5rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Select-minHeight': '3rem',
        '--Select-paddingInline': '1rem',
        '--Select-decorator-childHeight': 'min(2.375rem, var(--Select-minHeight))',
        '--Icon-fontSize': '1.75rem',
      }),
      // variables for controlling child components
      '--Select-decorator-childOffset':
        'min(calc(var(--Select-paddingInline) - (var(--Select-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Select-decorator-childHeight)) / 2), var(--Select-paddingInline))',
      '--_Select-paddingBlock':
        'max((var(--Select-minHeight) - 2 * var(--variant-borderWidth, 0px) - var(--Select-decorator-childHeight)) / 2, 0px)',
      '--Select-decorator-childRadius':
        'max(var(--Select-radius) - var(--variant-borderWidth, 0px) - var(--_Select-paddingBlock), min(var(--_Select-paddingBlock) + var(--variant-borderWidth, 0px), var(--Select-radius) / 2))',
      '--Button-minHeight': 'var(--Select-decorator-childHeight)',
      '--IconButton-size': 'var(--Select-decorator-childHeight)',
      '--Button-radius': 'var(--Select-decorator-childRadius)',
      '--IconButton-radius': 'var(--Select-decorator-childRadius)',
      boxSizing: 'border-box',
      minWidth: 0,
      minHeight: 'var(--Select-minHeight)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'var(--Select-radius)',
      cursor: 'pointer',
      ...(!variantStyle.backgroundColor && {
        backgroundColor: theme.vars.palette.background.surface,
      }),
      ...(ownerState.size && {
        paddingBlock: { sm: 2, md: 3, lg: 4 }[ownerState.size], // the padding-block act as a minimum spacing between content and root element
      }),
      paddingInline: `var(--Select-paddingInline)`,
      fontFamily: theme.vars.fontFamily.body,
      fontSize: theme.vars.fontSize.md,
      ...(ownerState.size === 'sm' && {
        fontSize: theme.vars.fontSize.sm,
      }),
      '&::before': {
        boxSizing: 'border-box',
        content: '""',
        display: 'block',
        position: 'absolute',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        borderRadius: 'inherit',
        margin: 'calc(var(--variant-borderWidth, 0px) * -1)', // for outlined variant
      },
      [`&.${selectClasses.focusVisible}`]: {
        '--Select-indicator-color': variantStyle?.color,
        '&::before': {
          boxShadow: `inset 0 0 0 var(--Select-focusedThickness) var(--Select-focusedHighlight)`,
        },
      },
      [`&.${selectClasses.disabled}`]: {
        '--Select-indicator-color': 'inherit',
      },
    },
    {
      // apply global variant styles
      ...variantStyle,
      '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
      [`&.${selectClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
    },
  ];
});

const SelectButton = styled('button', {
  name: 'JoySelect',
  slot: 'Button',
  overridesResolver: (props, styles) => styles.button,
})<{ ownerState: SelectOwnerState<any> }>(({ ownerState }) => ({
  // reset user-agent button style
  border: 0,
  outline: 0,
  background: 'none',
  padding: 0,
  fontSize: 'inherit',
  color: 'inherit',
  alignSelf: 'stretch',
  // make children horizontally aligned
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  fontFamily: 'inherit',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'auto',
  ...((ownerState.value === null || ownerState.value === undefined) && {
    opacity: 'var(--Select-placeholderOpacity)',
  }),
}));

const SelectListbox = styled(StyledList, {
  name: 'JoySelect',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => {
  const variantStyle =
    ownerState.color === 'context'
      ? undefined
      : theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--focus-outline-offset': `calc(${theme.vars.focus.thickness} * -1)`, // to prevent the focus outline from being cut by overflow
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.popup,
    '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)', // negative amount of the List's padding block
    ...scopedVariables,
    minWidth: 'max-content', // prevent options from shrinking if some of them is wider than the Select's root.
    maxHeight: '44vh', // the best value from what I tried so far which does not cause screen flicker when listbox is open.
    overflow: 'auto',
    outline: 0,
    boxShadow: theme.shadow.md,
    zIndex: theme.vars.zIndex.popup,
    ...(!variantStyle?.backgroundColor && {
      backgroundColor: theme.vars.palette.background.popup,
    }),
  };
});

const SelectStartDecorator = styled('span', {
  name: 'JoySelect',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => ({
  '--Button-margin': '0 0 0 calc(var(--Select-decorator-childOffset) * -1)',
  '--IconButton-margin': '0 0 0 calc(var(--Select-decorator-childOffset) * -1)',
  '--Icon-margin': '0 0 0 calc(var(--Select-paddingInline) / -4)',
  display: 'inherit',
  alignItems: 'center',
  marginInlineEnd: 'var(--Select-gap)',
  color: theme.vars.palette.text.tertiary,
  ...(ownerState.focusVisible && {
    color: 'var(--Select-focusedHighlight)',
  }),
}));

const SelectEndDecorator = styled('span', {
  name: 'JoySelect',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: SelectOwnerState<any> }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--Button-margin': '0 calc(var(--Select-decorator-childOffset) * -1) 0 0',
    '--IconButton-margin': '0 calc(var(--Select-decorator-childOffset) * -1) 0 0',
    '--Icon-margin': '0 calc(var(--Select-paddingInline) / -4) 0 0',
    display: 'inherit',
    alignItems: 'center',
    marginInlineStart: 'var(--Select-gap)',
    color: variantStyle?.color,
  };
});

const SelectIndicator = styled('span', {
  name: 'JoySelect',
  slot: 'Indicator',
})<{ ownerState: SelectOwnerState<any> }>(({ ownerState }) => ({
  ...(ownerState.size === 'sm' && {
    '--Icon-fontSize': '1.125rem',
  }),
  ...(ownerState.size === 'md' && {
    '--Icon-fontSize': '1.25rem',
  }),
  ...(ownerState.size === 'lg' && {
    '--Icon-fontSize': '1.5rem',
  }),
  color: 'var(--Select-indicator-color)',
  display: 'inherit',
  alignItems: 'center',
  marginInlineStart: 'var(--Select-gap)',
  marginInlineEnd: 'calc(var(--Select-paddingInline) / -4)',
  [`.${selectClasses.endDecorator} + &`]: {
    marginInlineStart: 'calc(var(--Select-gap) / 2)',
  },
}));
/**
 *
 * Demos:
 *
 * - [Select](https://mui.com/joy-ui/react-select/)
 *
 * API:
 *
 * - [Select API](https://mui.com/joy-ui/api/select/)
 */
const Select = React.forwardRef(function Select<TValue extends {}>(
  inProps: SelectOwnProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'JoySelect',
  });

  const {
    action,
    autoFocus,
    children,
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledExternalProp,
    getSerializedValue = defaultFormValueProvider,
    placeholder,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    onClose,
    renderValue: renderValueProp,
    value: valueProp,
    size: sizeProp = 'md',
    variant = 'outlined',
    color: colorProp = 'neutral',
    startDecorator,
    endDecorator,
    indicator = <Unfold />,
    // props to forward to the button (all handlers should go through slotProps.button)
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    id,
    name,
    ...other
  } = props as typeof inProps & {
    // need to cast types because SelectOwnProps does not have these properties
    'aria-describedby'?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    id?: string;
    name?: string;
  };

  const formControl = React.useContext(FormControlContext);

  if (process.env.NODE_ENV !== 'production') {
    const registerEffect = formControl?.registerEffect;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (registerEffect) {
        return registerEffect();
      }

      return undefined;
    }, [registerEffect]);
  }

  const disabledProp = inProps.disabled ?? formControl?.disabled ?? disabledExternalProp;
  const size = inProps.size ?? formControl?.size ?? sizeProp;
  const { getColor } = useColorInversion(variant);
  const color = getColor(
    inProps.color,
    formControl?.error ? 'danger' : formControl?.color ?? colorProp,
  );

  const renderValue = renderValueProp ?? defaultRenderSingleValue;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const [groupedOptions, setGroupedOptions] = React.useState<SelectChild<TValue>[]>([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'SelectUnstyled',
    state: 'listboxOpen',
  });

  const rootRef = React.useRef<HTMLElement | null>(null);
  const buttonRef = React.useRef<HTMLElement | null>(null);
  const listboxRef = React.useRef<HTMLElement | null>(null);

  const handleRef = useForkRef(ref, rootRef);

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        buttonRef.current?.focus();
      },
    }),
    [],
  );

  React.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);

  React.useEffect(() => {
    setAnchorEl(rootRef.current);
  }, []);

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setListboxOpen(isOpen);
      onListboxOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
    [onClose, onListboxOpenChange, setListboxOpen],
  );

  const {
    buttonActive,
    buttonFocusVisible,
    contextValue,
    disabled,
    getButtonProps,
    getListboxProps,
    value,
  } = useSelect({
    buttonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    multiple: false,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp,
  });

  const ownerState = {
    ...props,
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value,
    size,
    variant,
    color,
  };

  const classes = useUtilityClasses(ownerState);

  const selectedOption = React.useMemo(() => {
    return options.find((o) => value === o.value) ?? null;
  }, [options, value]);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref: handleRef,
    className: classes.root,
    elementType: SelectRoot,
    externalForwardedProps: other,
    getSlotProps: (handlers) => ({
      onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => {
        if (
          !listboxOpen &&
          !buttonRef.current?.contains(event.target as Node) &&
          !event.isPropagationStopped()
        ) {
          // show the popup if user click outside of the button element.
          // the close action is already handled by blur event.
          handleOpenChange(true);
        }
        handlers.onMouseDown?.(event);
      },
    }),
    ownerState,
  });

  const [SlotButton, buttonProps] = useSlot('button', {
    additionalProps: {
      'aria-describedby': ariaDescribedby ?? formControl?.['aria-describedby'],
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby ?? formControl?.labelId,
      id: id ?? formControl?.htmlFor,
      name,
    },
    className: classes.button,
    elementType: SelectButton,
    externalForwardedProps: other,
    getSlotProps: getButtonProps,
    ownerState,
  });

  const [SlotListbox, listboxProps] = useSlot('listbox', {
    additionalProps: {
      ref: listboxRef,
      anchorEl,
      disablePortal: true,
      open: listboxOpen,
      placement: 'bottom' as const,
    },
    className: classes.listbox,
    elementType: PopperUnstyled as OverridableComponent<PopperUnstyledTypeMap<{}, 'ul'>>,
    externalForwardedProps: other,
    getSlotProps: getListboxProps,
    ownerState: {
      ...ownerState,
      nesting: false,
      row: false,
      wrap: false,
    } as SelectOwnerState<any> & ListOwnerState,
    getSlotOwnerState: (mergedProps) => ({
      size: mergedProps.size || size,
      variant: mergedProps.variant || 'outlined',
      color: mergedProps.color || 'neutral',
      disableColorInversion: !mergedProps.disablePortal,
    }),
    internalForwardedProps: {
      component: SelectListbox,
    },
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: SelectStartDecorator,
    externalForwardedProps: other,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: SelectEndDecorator,
    externalForwardedProps: other,
    ownerState,
  });

  const [SlotIndicator, indicatorProps] = useSlot('indicator', {
    className: classes.indicator,
    elementType: SelectIndicator,
    externalForwardedProps: other,
    ownerState,
  });

  const context = React.useMemo(
    () => ({
      ...contextValue,
      color,
    }),
    [color, contextValue],
  );

  const modifiers = React.useMemo(
    () => [...defaultModifiers, ...(listboxProps.modifiers || [])],
    [listboxProps.modifiers],
  );

  let result = null;
  if (anchorEl) {
    result = (
      <SlotListbox
        {...listboxProps}
        className={clsx(
          listboxProps.className,
          listboxProps.ownerState?.color === 'context' && selectClasses.colorContext,
        )}
        modifiers={modifiers}
      >
        <SelectUnstyledContext.Provider value={context}>
          {/* for building grouped options */}
          <ListProvider nested>{children}</ListProvider>
        </SelectUnstyledContext.Provider>
      </SlotListbox>
    );

    if (!listboxProps.disablePortal) {
      result = (
        // For portal popup, the children should not inherit color inversion from the upper parent.
        <ColorInversion.Provider value={undefined}>{result}</ColorInversion.Provider>
      );
    }
  }

  return (
    <React.Fragment>
      <SlotRoot {...rootProps}>
        {startDecorator && (
          <SlotStartDecorator {...startDecoratorProps}>{startDecorator}</SlotStartDecorator>
        )}

        <SlotButton {...buttonProps}>
          {selectedOption ? renderValue(selectedOption) : placeholder}
        </SlotButton>
        {endDecorator && <SlotEndDecorator {...endDecoratorProps}>{endDecorator}</SlotEndDecorator>}

        {indicator && <SlotIndicator {...indicatorProps}>{indicator}</SlotIndicator>}
      </SlotRoot>
      {result}

      {name && <input type="hidden" name={name} value={getSerializedValue(selectedOption)} />}
    </React.Fragment>
  );
}) as SelectComponent;

interface SelectComponent {
  <TValue extends {}, C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<SelectTypeMap<TValue>, C>,
  ): JSX.Element | null;
  <TValue extends {}>(props: DefaultComponentProps<SelectTypeMap<TValue>>): JSX.Element | null;
  propTypes?: any;
}

Select.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for the select.
   */
  endDecorator: PropTypes.node,
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue: PropTypes.func,
  /**
   * The indicator(*) for the select.
   *    ________________
   *   [ value        * ]
   *    ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   */
  indicator: PropTypes.node,
  /**
   * `id` attribute of the listbox element.
   * Also used to derive the `id` attributes of options.
   */
  listboxId: PropTypes.string,
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name: PropTypes.string,
  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,
  /**
   * Text to show when there is no selected value.
   */
  placeholder: PropTypes.node,
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * Leading adornment for the select.
   */
  startDecorator: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes.any,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Select;
