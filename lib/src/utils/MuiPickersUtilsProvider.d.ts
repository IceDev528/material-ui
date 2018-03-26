import { ComponentClass, ReactNode } from 'react';
import { DateTimePickerView } from '../constants/date-picker-view';
import { Utils } from '../typings/utils';

export interface MuiPickersUtilsProviderProps {
  utils: Utils;
  children: ReactNode;
  locale?: any;
  moment?: any;
}

declare const MuiPickersUtilsProvider: ComponentClass<MuiPickersUtilsProviderProps>;

export default MuiPickersUtilsProvider;
