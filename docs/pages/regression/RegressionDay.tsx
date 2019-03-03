import React from 'react';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { IUtils } from '@date-io/core/IUtils';

export const createRegressionDay = (utils: IUtils<any>) => (
  day: any,
  selectedDate: any,
  dayInCurrentMonth: boolean,
  dayComponent: React.ReactElement<IconButtonProps>
) => {
  return <span data-day={utils.format(day, 'dd/MM/yyyy')}>{dayComponent}</span>;
};
