// allow this here since we want the declarations to be equivalent to declarations
// in their own files
// tslint:disable:strict-export-declare-modifiers

declare module '@material-ui/styles' {
  export { default as createGenerateClassName } from '@material-ui/styles/createGenerateClassName';
  export { default as createStyled } from '@material-ui/styles/createStyled';
  export { default as createStyles } from '@material-ui/styles/createStyles';
  export { default as getThemeProps } from '@material-ui/styles/getThemeProps';
  export { default as install } from '@material-ui/styles/install';
  export { default as jssPreset } from '@material-ui/styles/jssPreset';
  export { default as makeStyles } from '@material-ui/styles/makeStyles';
  export { default as styled } from '@material-ui/styles/styled';
  export { default as StylesProvider } from '@material-ui/styles/StylesProvider';
  export { default as ThemeProvider } from '@material-ui/styles/ThemeProvider';
  export { default as useTheme } from '@material-ui/styles/useTheme';
  export { default as withStyles, WithStyles } from '@material-ui/styles/withStyles';
  export { default as withTheme, WithTheme } from '@material-ui/styles/withTheme';
}

declare module '@material-ui/styles/createGenerateClassName' {
  import { GenerateClassName } from 'jss';

  export interface GenerateClassNameOptions {
    dangerouslyUseGlobalCSS?: boolean;
    productionPrefix?: string;
    seed?: string;
  }

  export default function createGenerateClassName(
    options?: GenerateClassNameOptions,
  ): GenerateClassName;
}

declare module '@material-ui/styles/createStyled' {
  import {
    ClassKeyOfStyles,
    ClassNameMap,
    Styles,
    ThemeOfStyles,
    WithStylesOptions,
  } from '@material-ui/styles/withStyles';

  export type ThemeOfRenderProps<R> = unknown;

  export type RenderProps<Theme, IncludeTheme extends boolean | undefined> = {
    classes: ClassNameMap<'root'>;
  } & (IncludeTheme extends true ? { theme: Theme } : {});

  export interface StyledProps<Theme, IncludeTheme extends boolean | undefined = false> {
    children: (props: RenderProps<Theme, IncludeTheme>) => React.ReactNode;
    classes?: ClassNameMap<'root'>;
    theme?: Theme;
  }

  export default function createStyled<
    S extends Styles<any, any, 'root'>,
    Options extends WithStylesOptions<ClassKeyOfStyles<S>>
  >(
    styles: S,
    options?: Options,
  ): React.ComponentType<StyledProps<ThemeOfStyles<S>, Options['withTheme']>>;
}

declare module '@material-ui/styles/createStyles' {
  import { CSSProperties, StyleRules, ClassNameMap } from '@material-ui/styles/withStyles';

  /**
   * This function doesn't really "do anything" at runtime, it's just the identity
   * function. Its only purpose is to defeat TypeScript's type widening when providing
   * style rules to `withStyles` which are a function of the `Theme`.
   *
   * @param styles a set of style mappings
   * @returns the same styles that were passed in
   */
  export default function createStyles<C extends string, P extends object>(
    styles: StyleRules<P, C>,
  ): StyleRules<P, C>;
}

declare module '@material-ui/styles/getThemeProps' {
  import { ComponentsPropsList } from '@material-ui/core/styles/props';
  import { Theme } from '@material-ui/core';

  interface NamedParams<K extends keyof ComponentsPropsList> {
    name: K;
    props: ComponentsPropsList[K];
    theme?: Theme;
  }
  export default function getThemeProps<Name extends keyof ComponentsPropsList>(
    params: NamedParams<Name>,
  ): ComponentsPropsList[Name];
}

declare module '@material-ui/styles/install' {
  export default function install(): void;
}

declare module '@material-ui/styles/jssPreset' {
  import { JSSOptions } from 'jss';

  export default function jssPreset(): JSSOptions;
}

declare module '@material-ui/styles/makeStyles' {
  import {
    ClassKeyOfStyles,
    ClassNameMap,
    PropsOfStyles,
    Styles,
    WithStylesOptions,
  } from '@material-ui/styles/withStyles';

  // https://stackoverflow.com/a/49928360/3406963 without generic branch types
  type IsAny<T> = 0 extends (1 & T) ? true : false;

  /**
   * @internal
   *
   * `Props` are `any` either by explicit annotation or if there are no callbacks
   * from which the typechecker could infer a type so it falls back to `any`.
   * See the test cases for examples and implications of explicit `any` annotation
   */
  export type StylesHook<S extends Styles<any, any>> = IsAny<PropsOfStyles<S>> extends true
    ? (props?: any) => ClassNameMap<ClassKeyOfStyles<S>>
    : (props: PropsOfStyles<S>) => ClassNameMap<ClassKeyOfStyles<S>>;

  export default function makeStyles<S extends Styles<any, any>>(
    styles: S,
    options?: WithStylesOptions<ClassKeyOfStyles<S>>,
  ): StylesHook<S>;
}

declare module '@material-ui/styles/styled' {
  import { Omit, PropsOf } from '@material-ui/core';
  import {
    CSSProperties,
    StyledComponentProps,
    Styles,
    WithStylesOptions,
  } from '@material-ui/styles/withStyles';

  /**
   * @internal
   */
  export type ComponentCreator<C extends React.ReactType> = <Theme>(
    styles: CSSProperties | ((theme: Theme) => CSSProperties),
    options?: WithStylesOptions,
  ) => React.ComponentType<
    Omit<JSX.LibraryManagedAttributes<C, PropsOf<C>>, 'classes' | 'className'> &
      StyledComponentProps<'root'> & { className?: string }
  >;

  export interface StyledProps {
    className: string;
  }

  export default function styled<C extends React.ReactType>(Component: C): ComponentCreator<C>;
}

declare module '@material-ui/styles/StylesProvider' {
  import { GenerateClassName, JSS } from 'jss';

  interface StylesOptions {
    disableGeneration?: boolean;
    generateClassName?: GenerateClassName;
    jss?: JSS;
    // TODO need info @oliviertassinari
    sheetsCache?: {};
    // TODO need info @oliviertassinari
    sheetsManager?: {};
    // TODO need info @oliviertassinari
    sheetsRegistry?: {};
  }

  const StylesContext: React.Context<StylesOptions>;

  export interface StylesProviderProps extends StylesOptions {
    children: React.ReactNode;
  }
  const StylesProvider: React.ComponentType<StylesProviderProps>;
  export default StylesProvider;
}

declare module '@material-ui/styles/ThemeProvider' {
  import { Theme } from '@material-ui/core';

  const ThemeContext: React.Context<Theme>;

  export interface ThemeProviderProps {
    children: React.ReactNode;
    theme: Theme | ((outerTheme: Theme) => Theme);
  }
  const ThemeProvider: React.ComponentType<ThemeProviderProps>;
  export default ThemeProvider;
}

declare module '@material-ui/styles/useTheme' {
  export default function useTheme<T>(): T;
}

declare module '@material-ui/styles/withStyles' {
  import * as React from 'react';
  import { Omit, PropInjector, PropsOf } from '@material-ui/core';
  import * as CSS from 'csstype';
  import * as JSS from 'jss';

  export interface CSSProperties extends CSS.Properties<number | string> {
    // Allow pseudo selectors and media queries
    [k: string]: CSS.Properties<number | string>[keyof CSS.Properties] | CSSProperties;
  }

  /**
   * @internal
   * This is basically the API of JSS. It defines a Map<string, CSS>,
   * where
   * - the `keys` are the class (names) that will be created
   * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
   *
   * if only `CSSProperties` are matched `Props` are inferred to `any`
   */
  export type StyleRules<Props extends object, ClassKey extends string = string> = Record<
    ClassKey,
    CSSProperties | ((props: Props) => CSSProperties)
  >;

  /**
   * @internal
   */
  export type StyleRulesCallback<Theme, Props extends object, ClassKey extends string = string> = (
    theme: Theme,
  ) => StyleRules<Props, ClassKey>;

  export type Styles<Theme, Props extends {}, ClassKey extends string = string> =
    | StyleRules<Props, ClassKey>
    | StyleRulesCallback<Theme, Props, ClassKey>;

  export interface WithStylesOptions<ClassKey extends string = string>
    extends JSS.CreateStyleSheetOptions<ClassKey> {
    flip?: boolean;
    withTheme?: boolean;
    name?: string;
  }

  export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

  /**
   * @internal
   */
  export type ClassKeyInferable<Theme, Props extends {}> = string | Styles<Theme, Props>;
  export type ClassKeyOfStyles<S> = S extends string
    ? S
    : S extends StyleRulesCallback<any, any, infer K>
    ? K
    : S extends StyleRules<any, infer K>
    ? K
    : never;

  /**
   * infers the type of the theme used in the styles
   */
  export type PropsOfStyles<S> = S extends Styles<any, infer Props> ? Props : {};
  /**
   * infers the type of the props used in the styles
   */
  export type ThemeOfStyles<S> = S extends Styles<infer Theme, any> ? Theme : {};

  export type WithStyles<
    S extends ClassKeyInferable<any, any>,
    IncludeTheme extends boolean | undefined = false
  > = (IncludeTheme extends true ? { theme: ThemeOfStyles<S> } : {}) & {
    classes: ClassNameMap<ClassKeyOfStyles<S>>;
    innerRef?: React.Ref<any> | React.RefObject<any>;
  } & PropsOfStyles<S>;

  export interface StyledComponentProps<ClassKey extends string = string> {
    classes?: Partial<ClassNameMap<ClassKey>>;
    innerRef?: React.Ref<any> | React.RefObject<any>;
  }

  export default function withStyles<
    S extends Styles<any, any>,
    Options extends WithStylesOptions<ClassKeyOfStyles<S>> = {}
  >(
    style: S,
    options?: Options,
  ): PropInjector<WithStyles<S, Options['withTheme']>, StyledComponentProps<ClassKeyOfStyles<S>>>;
}

declare module '@material-ui/styles/withTheme' {
  import { PropInjector } from '@material-ui/core';

  export interface WithTheme<Theme> {
    theme: Theme;
    innerRef?: React.Ref<any>;
  }

  export default function withTheme<Theme>(): PropInjector<
    WithTheme<Theme>,
    Partial<WithTheme<Theme>>
  >;
}
