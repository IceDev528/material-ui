import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
import {
  BaseDatePickerProps,
  datePickerConfig,
  DatePickerGenericComponent,
} from '../DatePicker/DatePicker';
import {
  MobileWrapper,
  SomeWrapper,
  PublicWrapperProps,
} from '../internal/pickers/wrappers/Wrapper';
import Picker from '../internal/pickers/Picker/Picker';
import { ParsableDate } from '../internal/pickers/constants/prop-types';
import { MuiPickersAdapter } from '../internal/pickers/hooks/useUtils';
import { parsePickerInputValue } from '../internal/pickers/date-utils';
import { KeyboardDateInput } from '../internal/pickers/KeyboardDateInput';
import { PureDateInput } from '../internal/pickers/PureDateInput';
import { usePickerState, PickerStateValueManager } from '../internal/pickers/hooks/usePickerState';
import { AllSharedPickerProps } from '../internal/pickers/Picker/SharedPickerProps';
import { BasePickerProps } from '../internal/pickers/typings/BasePicker';
import { ResponsiveWrapperProps } from '../internal/pickers/wrappers/ResponsiveWrapper';
import {
  StaticWrapperProps,
  DateInputPropsLike,
  WrapperProps,
} from '../internal/pickers/wrappers/WrapperProps';

type AllPickerProps<T, TWrapper extends SomeWrapper = SomeWrapper> = T &
  AllSharedPickerProps &
  PublicWrapperProps<TWrapper>;

const valueManager: PickerStateValueManager<unknown, unknown> = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  areValuesEqual: (utils: MuiPickersAdapter, a: unknown, b: unknown) => utils.isEqual(a, b),
};

const { DefaultToolbarComponent, useInterceptProps, useValidation } = datePickerConfig;

interface MobileDatePickerWrapperProps
  extends Partial<BasePickerProps<any, any>>,
    ResponsiveWrapperProps,
    StaticWrapperProps {
  children: React.ReactNode;
  DateInputProps: DateInputPropsLike;
  wrapperProps: Omit<WrapperProps, 'DateInputProps'>;
}

function MobileDatePickerWrapper(props: MobileDatePickerWrapperProps) {
  const {
    disableCloseOnSelect,
    cancelText,
    clearable,
    clearText,
    DateInputProps,
    DialogProps,
    displayStaticWrapperAs,
    inputFormat,
    okText,
    onAccept,
    onChange,
    onClose,
    onOpen,
    open,
    PopperProps,
    todayText,
    value,
    wrapperProps,
    ...other
  } = props;

  const TypedWrapper = MobileWrapper as SomeWrapper;

  return (
    <TypedWrapper
      clearable={clearable}
      clearText={clearText}
      DialogProps={DialogProps}
      PopperProps={PopperProps}
      okText={okText}
      todayText={todayText}
      cancelText={cancelText}
      DateInputProps={DateInputProps}
      KeyboardDateInputComponent={KeyboardDateInput}
      PureDateInputComponent={PureDateInput}
      displayStaticWrapperAs={displayStaticWrapperAs}
      {...wrapperProps}
      {...other}
    />
  );
}

export interface MobileDatePickerProps<TDate = unknown>
  extends BaseDatePickerProps<unknown>,
    PublicWrapperProps<typeof MobileWrapper>,
    AllSharedPickerProps<ParsableDate<TDate>, TDate> {}

/**
 *
 * API:
 *
 * - [MobileDatePicker API](https://material-ui.com/api/mobile-date-picker/)
 */
const MobileDatePicker = React.forwardRef(function MobileDatePicker<TDate>(
  inProps: MobileDatePickerProps<TDate>,
  ref: React.Ref<HTMLInputElement>,
) {
  const allProps = useInterceptProps(inProps) as AllPickerProps<
    BaseDatePickerProps<unknown>,
    typeof MobileWrapper
  >;

  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  const props: AllPickerProps<BaseDatePickerProps<unknown>, typeof MobileWrapper> = useThemeProps({
    props: allProps,
    name: 'MuiMobileDatePicker',
  });

  const validationError = useValidation(props.value, props) !== null;
  const { pickerProps, inputProps, wrapperProps } = usePickerState<ParsableDate<TDate>, TDate>(
    props,
    valueManager as PickerStateValueManager<ParsableDate<TDate>, TDate>,
  );

  // Note that we are passing down all the value without spread.
  // It saves us >1kb gzip and make any prop available automatically on any level down.
  const { value, onChange, ...other } = props;
  const AllDateInputProps = { ...inputProps, ...other, ref, validationError };

  return (
    <MobileDatePickerWrapper
      wrapperProps={wrapperProps}
      DateInputProps={AllDateInputProps}
      {...other}
    >
      <Picker
        {...pickerProps}
        toolbarTitle={props.label || props.toolbarTitle}
        ToolbarComponent={other.ToolbarComponent || DefaultToolbarComponent}
        DateInputProps={AllDateInputProps}
        {...other}
      />
    </MobileDatePickerWrapper>
  );
}) as DatePickerGenericComponent<typeof MobileWrapper>;

MobileDatePicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex: PropTypes.instanceOf(RegExp),
  /**
   * Enables keyboard listener for moving between days in calendar.
   * Defaults to `true` unless the `ClockPicker` is used inside a `Static*` picker component.
   */
  allowKeyboardControl: PropTypes.bool,
  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection: PropTypes.bool,
  /**
   * Cancel text message.
   * @default "CANCEL"
   */
  cancelText: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable: PropTypes.bool,
  /**
   * Clear text message.
   * @default "CLEAR"
   */
  clearText: PropTypes.node,
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    LeftArrowButton: PropTypes.elementType,
    LeftArrowIcon: PropTypes.elementType,
    RightArrowButton: PropTypes.elementType,
    RightArrowIcon: PropTypes.elementType,
    SwitchViewButton: PropTypes.elementType,
    SwitchViewIcon: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,
  /**
   * Props applied to the [`Dialog`](/api/dialog/) element.
   */
  DialogProps: PropTypes.object,
  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect: PropTypes.bool,
  /**
   * If `true`, the picker and text field are disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: PropTypes.bool,
  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: PropTypes.bool,
  /**
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,
  /**
   * Get aria-label text for switching between views button.
   */
  getViewSwitchingButtonText: PropTypes.func,
  /**
   * @ignore
   */
  ignoreInvalidInputs: PropTypes.bool,
  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: PropTypes.object,
  /**
   * Format string.
   */
  inputFormat: PropTypes.string,
  /**
   * @ignore
   */
  InputProps: PropTypes.object,
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * @ignore
   */
  label: PropTypes.node,
  /**
   * Left arrow icon aria-label text.
   */
  leftArrowButtonText: PropTypes.string,
  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: PropTypes.string,
  /**
   * @ignore
   */
  maxDate: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  minDate: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Ok button text.
   * @default "OK"
   */
  okText: PropTypes.node,
  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept: PropTypes.func,
  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: PropTypes.func,
  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   */
  onError: PropTypes.func,
  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,
  /**
   * Callback fired on view change.
   */
  onViewChange: PropTypes.func,
  /**
   * Callback firing on year change @DateIOType.
   */
  onYearChange: PropTypes.func,
  /**
   * Control the popup or dialog open state.
   */
  open: PropTypes.bool,
  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: PropTypes.object,
  /**
   * Icon displaying for open picker button.
   */
  openPickerIcon: PropTypes.node,
  /**
   * First view to show.
   */
  openTo: PropTypes.oneOf(['date', 'hours', 'minutes', 'month', 'seconds', 'year']),
  /**
   * Force rendering in particular orientation.
   */
  orientation: PropTypes.oneOf(['landscape', 'portrait']),
  /**
   * Make picker read only.
   */
  readOnly: PropTypes.bool,
  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,
  /**
   * Custom renderer for day. Check the [PickersDay](https://material-ui.com/api/pickers-day/) component.
   */
  renderDay: PropTypes.func,
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,
  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: PropTypes.func,
  /**
   * Right arrow icon aria-label text.
   */
  rightArrowButtonText: PropTypes.string,
  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate: PropTypes.func,
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear: PropTypes.func,
  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,
  /**
   * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
   * @default false
   */
  showTodayButton: PropTypes.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,
  /**
   * Today text message.
   * @default "TODAY"
   */
  todayText: PropTypes.node,
  /**
   * Component that will replace default toolbar renderer.
   */
  ToolbarComponent: PropTypes.elementType,
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat: PropTypes.string,
  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default "–"
   */
  toolbarPlaceholder: PropTypes.node,
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default "SELECT DATE"
   */
  toolbarTitle: PropTypes.node,
  /**
   * The value of the picker.
   */
  value: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Array of views to show.
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['date', 'month', 'year']).isRequired),
} as any;

export default MobileDatePicker;
