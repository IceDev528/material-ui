import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { RenderDay } from '../DatePicker/Calendar';
import { ModalWrapperProps } from '../wrappers/ModalWrapper';
import { Moment } from 'moment';
import { PickerBaseProps } from '../_shared/PickerBase'
import { Omit } from 'material-ui'

export interface DateTimePickerWrapperProps extends PickerBaseProps,
  Omit<ModalWrapperProps, 'onChange'> {
  minDate?: DateType;
  maxDate?: DateType;
  disablePast?: boolean;
  disableFuture?: boolean;
  autoSubmit?: boolean;
  showTabs?: boolean;
  animateYearScrolling?: boolean;
  openTo?: DateTimePickerView;
  leftArrowIcon?: ReactNode;
  rightArrowIcon?: ReactNode;
  dateRangeIcon?: ReactNode;
  timeIcon?: ReactNode;
  renderDay?: RenderDay;
  utils?: Utils;
  shouldDisableDate?: (day: Moment) => boolean;
}

declare const DateTimePickerWrapper: ComponentClass<DateTimePickerWrapperProps>;

export default DateTimePickerWrapper;
