import * as React from 'react';
import { useThemeProps } from '@material-ui/core/styles';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import { pick12hOr24hFormat } from '../internal/pickers/text-field-helper';
import { ExportedCalendarPickerProps } from '../CalendarPicker/CalendarPicker';
import { DateTimeValidationError, ValidationProps } from '../internal/pickers/hooks/useValidation';
import { ParseableDate } from '../internal/pickers/constants/prop-types';
import { BasePickerProps, ToolbarComponentProps } from '../internal/pickers/typings/BasePicker';
import { ExportedDateInputProps } from '../internal/pickers/PureDateInput';

export type DateTimePickerView = 'year' | 'day' | 'month' | 'hours' | 'minutes';

export interface BaseDateTimePickerProps<TDate>
  extends ExportedClockPickerProps<TDate>,
    ExportedCalendarPickerProps<TDate>,
    BasePickerProps<ParseableDate<TDate>, TDate | null>,
    ValidationProps<DateTimeValidationError, ParseableDate<TDate>>,
    ExportedDateInputProps<ParseableDate<TDate>, TDate | null> {
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: ExportedCalendarPickerProps<TDate>['components'] &
    ExportedDateInputProps<ParseableDate<TDate>, TDate | null>['components'];
  /**
   * To show tabs.
   */
  hideTabs?: boolean;
  /**
   * Date tab icon.
   */
  dateRangeIcon?: React.ReactNode;
  /**
   * Time tab icon.
   */
  timeIcon?: React.ReactNode;
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime?: TDate;
  /**
   * Minimal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime?: TDate;
  /**
   * First view to show.
   */
  openTo?: DateTimePickerView;
  /**
   * Component that will replace default toolbar renderer.
   * @default DateTimePickerToolbar
   */
  ToolbarComponent?: React.JSXElementConstructor<ToolbarComponentProps<TDate | null>>;
  /**
   * Mobile picker title, displaying in the toolbar.
   * @default 'Select date & time'
   */
  toolbarTitle?: React.ReactNode;
  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat?: string;
  /**
   * Array of views to show.
   */
  views?: readonly DateTimePickerView[];
}

type DefaultizedProps<Props> = Props & { inputFormat: string };

export function useDateTimePickerDefaultizedProps<Props extends BaseDateTimePickerProps<unknown>>(
  {
    ampm,
    inputFormat,
    maxDate: maxDateProp,
    maxDateTime,
    maxTime,
    minDate: minDateProp,
    minDateTime,
    minTime,
    openTo = 'day',
    orientation = 'portrait',
    views = ['year', 'day', 'hours', 'minutes'],
    ...other
  }: Props,
  name: string,
): DefaultizedProps<Props> {
  const utils = useUtils();
  const defaultDates = useDefaultDates<unknown>();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate;
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return useThemeProps({
    props: {
      openTo,
      views,
      ampm: willUseAmPm,
      ampmInClock: true,
      orientation,
      showToolbar: true,
      allowSameDateSelection: true,
      minDate: minDateTime ?? minDate,
      minTime: minDateTime ?? minTime,
      maxDate: maxDateTime ?? maxDate,
      maxTime: maxDateTime ?? maxTime,
      disableIgnoringDatePartForTimeValidation: Boolean(minDateTime || maxDateTime),
      acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
      mask: '__/__/____ __:__',
      disableMaskedInput: willUseAmPm,
      inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
        localized: utils.formats.keyboardDateTime,
        '12h': utils.formats.keyboardDateTime12h,
        '24h': utils.formats.keyboardDateTime24h,
      }),
      ...(other as Props),
    },
    name,
  });
}
