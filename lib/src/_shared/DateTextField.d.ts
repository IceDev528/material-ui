import { ComponentClass, ReactNode } from 'react';
import { DateType } from '../constants/prop-types';
import { Utils } from '../utils/utils';
import { TextFieldProps } from 'material-ui/TextField';

export interface DateTextFieldProps extends TextFieldProps {
    value: any;
    disabled?: boolean;
    format?: string;
    invalidLabel?: string;
    labelFunc?: (date: object, invalidLabel: string) => string;
}

declare const DateTextField: ComponentClass<DateTextFieldProps>;

export default DateTextField;
