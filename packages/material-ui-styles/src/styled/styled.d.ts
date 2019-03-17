import { Omit } from '@material-ui/core';
import {
  CSSProperties,
  StyledComponentProps,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';
import * as React from 'react';

/**
 * @internal
 */
export type ComponentCreator<C extends React.ElementType> = <Theme>(
  styles: CSSProperties | ((theme: Theme) => CSSProperties),
  options?: WithStylesOptions<Theme>,
) => React.ComponentType<
  Omit<JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>, 'classes' | 'className'> &
    StyledComponentProps<'root'> & { className?: string }
>;

export interface StyledProps {
  className: string;
}

export default function styled<C extends React.ElementType>(Component: C): ComponentCreator<C>;
