import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useThemeProps as useThemeProps } from '@material-ui/core/styles';
import {
  BaseTimePickerProps,
  timePickerConfig,
  TimePickerGenericComponent,
} from '../TimePicker/TimePicker';
import {
  StaticWrapper,
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

const { DefaultToolbarComponent, useInterceptProps, useValidation } = timePickerConfig;

interface StaticTimePickerWrapperProps
  extends Partial<BasePickerProps<any, any>>,
    ResponsiveWrapperProps,
    StaticWrapperProps {
  children: React.ReactNode;
  DateInputProps: DateInputPropsLike;
  wrapperProps: Omit<WrapperProps, 'DateInputProps'>;
}

function StaticTimePickerWrapper(props: StaticTimePickerWrapperProps) {
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

  const TypedWrapper = StaticWrapper as SomeWrapper;

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

export interface StaticTimePickerProps<TDate = unknown>
  extends BaseTimePickerProps,
    PublicWrapperProps<typeof StaticWrapper>,
    AllSharedPickerProps<ParsableDate<TDate>, TDate> {}

/**
 *
 * API:
 *
 * - [StaticTimePicker API](https://material-ui.com/api/static-time-picker/)
 */
const StaticTimePicker = React.forwardRef(function StaticTimePicker<TDate>(
  inProps: StaticTimePickerProps<TDate>,
  ref: React.Ref<HTMLInputElement>,
) {
  const allProps = useInterceptProps(inProps) as AllPickerProps<
    BaseTimePickerProps,
    typeof StaticWrapper
  >;

  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  const props: AllPickerProps<BaseTimePickerProps, typeof StaticWrapper> = useThemeProps({
    props: allProps,
    name: 'MuiStaticTimePicker',
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
    <StaticTimePickerWrapper
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
    </StaticTimePickerWrapper>
  );
}) as TimePickerGenericComponent<typeof StaticWrapper>;

StaticTimePicker.propTypes /* remove-proptypes */ = {
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
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm: PropTypes.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
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
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,
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
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   * @default "static"
   */
  displayStaticWrapperAs: PropTypes.oneOf(['desktop', 'mobile']),
  /**
   * Accessible text that helps user to understand which time and view is selected.
   * @default <TDate extends any>(
   *   view: 'hours' | 'minutes' | 'seconds',
   *   time: TDate,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) => `Select ${view}. Selected time is ${adapter.format(time, 'fullTime')}`
   */
  getClockLabelText: PropTypes.func,
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,
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
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: PropTypes.string,
  /**
   * @ignore
   */
  maxTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  minTime: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,
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
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,
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
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: PropTypes.func,
  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: PropTypes.func,
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,
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
  views: PropTypes.arrayOf(PropTypes.oneOf(['hours', 'minutes', 'seconds']).isRequired),
} as any;

export default StaticTimePicker;
