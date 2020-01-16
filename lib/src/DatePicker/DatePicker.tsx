import { useUtils } from '../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../typings/date';
import { DatePickerToolbar } from './DatePickerToolbar';
import { getFormatByViews } from '../_helpers/date-utils';
import { datePickerDefaultProps } from '../constants/prop-types';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { ExportedCalendarProps } from '../views/Calendar/CalendarView';
import { ModalWrapper, InlineWrapper, StaticWrapper } from '../wrappers/Wrapper';
import {
  WithDateInputProps,
  makePickerWithStateAndWrapper,
  WithViewsProps,
} from '../Picker/makePickerWithState';

export type DatePickerView = 'year' | 'date' | 'month';

export interface BaseDatePickerProps extends ExportedCalendarProps {
  /** Callback firing on year change @DateIOType */
  onYearChange?: (date: MaterialUiPickersDate) => void;
}

export type DatePickerProps = BaseDatePickerProps &
  WithDateInputProps &
  WithViewsProps<'year' | 'date' | 'month'>;

const datePickerConfig = {
  DefaultToolbarComponent: DatePickerToolbar,
  useDefaultProps: ({ openTo = 'date', views = ['year', 'date'] }: DatePickerProps) => {
    const utils = useUtils();

    return {
      ...datePickerDefaultProps,
      views,
      openTo,
      format: getFormatByViews(views, utils),
    };
  },
};

export const DatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  ResponsiveWrapper,
  datePickerConfig
);

export const MobileDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  ModalWrapper,
  datePickerConfig
);

export const DesktopDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  InlineWrapper,
  datePickerConfig
);

export const StaticDatePicker = makePickerWithStateAndWrapper<DatePickerProps>(
  StaticWrapper,
  datePickerConfig
);
