import * as React from 'react';
import { OptionState } from '../ListboxUnstyled';
import { SelectOption, UseSelectOptionSlotProps } from './useSelect.types';

export interface SelectUnstyledContextType {
  getOptionState: (value: SelectOption<any>) => OptionState;
  getOptionProps: (option: SelectOption<any>) => UseSelectOptionSlotProps;
  listboxRef: React.RefObject<HTMLElement>;
}

export const SelectUnstyledContext = React.createContext<SelectUnstyledContextType | undefined>(
  undefined,
);
