import { ParsableDate } from '../constants/prop-types';
import { ToolbarComponentProps } from '../Picker/SharedPickerProps';

export interface BasePickerProps<TInputValue = ParsableDate, TDateValue = unknown> {
  /**
   * Picker value.
   */
  value: TInputValue;
  /**
   * onChange callback @DateIOType.
   */
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  /**
   * If `true` picker will immediately close after submitting full date.
   *
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect?: boolean;
  /**
   * Format string.
   */
  inputFormat?: string;
  /**
   * Disable picker and text field.
   */
  disabled?: boolean;
  /**
   * Make picker read only.
   */
  readOnly?: boolean;
  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept?: (date: TDateValue | null) => void;
  /**
   * On open callback.
   */
  onOpen?: () => void;
  /**
   * On close callback.
   */
  onClose?: () => void;
  /**
   * Controlled picker open state.
   */
  open?: boolean;
  /**
   * Show toolbar even in desktop mode.
   */
  showToolbar?: boolean;
  /**
   * Force rendering in particular orientation.
   */
  orientation?: 'portrait' | 'landscape';
  /**
   * Component that will replace default toolbar renderer.
   */
  ToolbarComponent?: React.ComponentType<ToolbarComponentProps>;
  /**
   * Mobile picker title, displaying in the toolbar.
   *
   * @default "SELECT DATE"
   */
  toolbarTitle?: React.ReactNode;
  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   *
   * @default "–"
   */
  toolbarPlaceholder?: React.ReactNode;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
  /**
   * className applied to the root component.
   */
  className?: string;
}
