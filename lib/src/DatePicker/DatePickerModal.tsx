import * as React from 'react';
import * as PropTypes from 'prop-types';

import ModalWrapper, { ModalWrapperProps } from '../wrappers/ModalWrapper';
import DatePicker, { BaseDatePickerProps } from './DatePicker';
import DomainPropTypes from '../constants/prop-types';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import { Omit } from '@material-ui/core';

export interface DatePickerModalProps extends
  BasePickerProps,
  BaseDatePickerProps,
  Omit<ModalWrapperProps, 'onChange' | 'value'> {}

export const DatePickerModal: React.SFC<DatePickerModalProps> = (props) => {
  const {
    allowKeyboardControl,
    animateYearScrolling,
    autoOk,
    disableFuture,
    disablePast,
    format,
    forwardedRef,
    labelFunc,
    leftArrowIcon,
    maxDate,
    minDate,
    initialFocusedDate,
    onChange,
    openToYearSelection,
    renderDay,
    rightArrowIcon,
    shouldDisableDate,
    value,
    ...other
  } = props;

  return (
    <BasePicker {...props}>
      {
        ({
          date,
          utils,
          handleAccept,
          handleChange,
          handleClear,
          handleDismiss,
          handleSetTodayDate,
          handleTextFieldChange,
          isAccepted,
        }) => (
          <ModalWrapper
            disableFuture={disableFuture}
            disablePast={disablePast}
            format={format || utils.dateFormat}
            labelFunc={labelFunc}
            maxDate={maxDate}
            minDate={minDate}
            onAccept={handleAccept}
            onChange={handleTextFieldChange}
            onClear={handleClear}
            onDismiss={handleDismiss}
            onSetToday={handleSetTodayDate}
            ref={forwardedRef}
            value={value}
            isAccepted={isAccepted}
            {...other}
          >
            <DatePicker
              date={date}
              allowKeyboardControl={allowKeyboardControl}
              animateYearScrolling={animateYearScrolling}
              disableFuture={disableFuture}
              disablePast={disablePast}
              leftArrowIcon={leftArrowIcon}
              maxDate={maxDate}
              minDate={minDate}
              onChange={handleChange}
              openToYearSelection={openToYearSelection}
              renderDay={renderDay}
              rightArrowIcon={rightArrowIcon}
              shouldDisableDate={shouldDisableDate}
            />
          </ModalWrapper>
        )
      }
    </BasePicker>
  );
};

(DatePickerModal as any).propTypes = {
  /** Datepicker value */
  value: DomainPropTypes.date,
  /** Min selectable date */
  minDate: DomainPropTypes.date,
  /** Max selectable date */
  maxDate: DomainPropTypes.date,
  /** Initial focused date when calendar opens, if no value is provided */
  initialFocusedDate: DomainPropTypes.date,
  /** Date format string for input */
  format: PropTypes.string,
  /** Callback firing when date accepted [(date: Date) => void] */
  onChange: PropTypes.func.isRequired,
  /** Auto accept date on selection */
  autoOk: PropTypes.bool,
  /** Disable past dates */
  disablePast: PropTypes.bool,
  /** Disable future dates */
  disableFuture: PropTypes.bool,
  /** To animate scrolling to current year (with scrollIntoView) */
  animateYearScrolling: PropTypes.bool,
  /** Open datepicker from year selection */
  openToYearSelection: PropTypes.bool,
  /** Allow to specify dynamic label for text field
   * [(date: Date, invalidLabel: string) => string]
  */
  labelFunc: PropTypes.func,
  /** Left arrow icon */
  leftArrowIcon: PropTypes.node,
  /** Right arrow icon */
  rightArrowIcon: PropTypes.node,
  /** Custom renderer for day
   * [(date: Date, nowSelectedDate: Date, isInCurrentMonth: boolean) => ReactElement]
  */
  renderDay: PropTypes.func,
  /** Disable specific date [(date: Date) => boolean] */
  shouldDisableDate: PropTypes.func,
  /** Enables keyboard listener for moving between days in calendar */
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

DatePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  initialFocusedDate: undefined,
  disableFuture: false,
  disablePast: false,
  animateYearScrolling: false,
  openToYearSelection: false,
  allowKeyboardControl: true,
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  renderDay: undefined,
  labelFunc: undefined,
  shouldDisableDate: undefined,
  forwardedRef: undefined,
};

export default React.forwardRef((props: DatePickerModalProps, ref) => (
  <DatePickerModal {...props} forwardedRef={ref} />
));
