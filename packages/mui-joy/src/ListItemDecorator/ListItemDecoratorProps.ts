import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/defaultTheme';
import { ListItemDecoratorClasses } from './listItemDecoratorClasses';

export interface ListItemDecoratorTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ListItemDecoratorClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type ListItemDecoratorProps<
  D extends React.ElementType = ListItemDecoratorTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<ListItemDecoratorTypeMap<P, D>, D>;
