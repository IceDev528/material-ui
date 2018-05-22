import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types'
import { TextFieldProps } from 'material-ui/TextField';
import { Omit } from 'material-ui'
import { MaterialUiPickersDate } from '../typings/date'

export interface DateTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
    value: DateType;
    minDate?: DateType;
    minDateMessage?: string;
    disablePast?: boolean;
    disableFuture?: boolean;
    maxDate?: DateType;
    maxDateMessage?: string;
    mask?: any;
    onChange: (date: MaterialUiPickersDate) => void;
    onClear?: () => void;
    keyboard?: boolean;
    format?: string;
    invalidLabel?: string;
    emptyLabel?: string;
    labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
    keyboardIcon?: ReactNode;
    invalidDateMessage?: string;
    clearable?: boolean;
    TextFieldComponent?: React.ComponentType<TextFieldProps>;
}

declare const DateTextField: ComponentClass<DateTextFieldProps>;

export default DateTextField;
