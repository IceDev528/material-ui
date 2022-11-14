import { Breakpoints, Breakpoint } from '../createTheme/createBreakpoints';
import { Spacing } from '../createTheme/createSpacing';
import { ResponsiveStyleValue } from '../styleFunctionSx';
import { GridDirection, GridOwnerState } from './GridProps';

interface Props {
  theme: { breakpoints: Breakpoints; spacing?: Spacing };
  ownerState: GridOwnerState & { parentDisableEqualOverflow?: boolean };
}

interface Iterator<T> {
  (appendStyle: (responsiveStyles: Record<string, any>, style: object) => void, value: T): void;
}

export const filterBreakpointKeys = (breakpointsKeys: Breakpoint[], responsiveKeys: string[]) =>
  breakpointsKeys.filter((key: string) => responsiveKeys.includes(key));

export const traverseBreakpoints = <T = unknown>(
  breakpoints: Breakpoints,
  responsive: T | T[] | Record<string, any> | undefined,
  iterator: Iterator<T>,
) => {
  const smallestBreakpoint = breakpoints.keys[0]; // the keys is sorted from smallest to largest by `createBreakpoints`.

  if (Array.isArray(responsive)) {
    responsive.forEach((breakpointValue, index) => {
      iterator((responsiveStyles, style) => {
        if (index <= breakpoints.keys.length - 1) {
          if (index === 0) {
            Object.assign(responsiveStyles, style);
          } else {
            responsiveStyles[breakpoints.up(breakpoints.keys[index])] = style;
          }
        }
      }, breakpointValue as T);
    });
  } else if (responsive && typeof responsive === 'object') {
    // prevent null
    // responsive could be a very big object, pick the smallest responsive values

    const keys =
      Object.keys(responsive).length > breakpoints.keys.length
        ? breakpoints.keys
        : filterBreakpointKeys(breakpoints.keys, Object.keys(responsive));

    keys.forEach((key) => {
      if (breakpoints.keys.indexOf(key as Breakpoint) !== -1) {
        // @ts-ignore already checked that responsive is an object
        const breakpointValue: T = responsive[key];
        if (breakpointValue !== undefined) {
          iterator((responsiveStyles, style) => {
            if (smallestBreakpoint === key) {
              Object.assign(responsiveStyles, style);
            } else {
              responsiveStyles[breakpoints.up(key as Breakpoint)] = style;
            }
          }, breakpointValue);
        }
      }
    });
  } else if (typeof responsive === 'number' || typeof responsive === 'string') {
    iterator((responsiveStyles, style) => {
      Object.assign(responsiveStyles, style);
    }, responsive);
  }
};

export const generateGridSizeStyles = ({ theme, ownerState }: Props) => {
  const styles = {};
  traverseBreakpoints<'auto' | number | true>(
    theme.breakpoints,
    ownerState.gridSize,
    (appendStyle, value) => {
      let style = {};
      if (value === true) {
        style = {
          flexBasis: 0,
          flexGrow: 1,
          maxWidth: '100%',
        };
      }
      if (value === 'auto') {
        style = {
          flexBasis: 'auto',
          flexGrow: 0,
          flexShrink: 0,
          maxWidth: 'none',
          width: 'auto',
        };
      }
      if (typeof value === 'number') {
        style = {
          flexGrow: 0,
          flexBasis: 'auto',
          width: `calc(100% * ${value} / var(--Grid-columns)${
            ownerState.nested && ownerState.container ? ` + var(--Grid-columnSpacing)` : ''
          })`,
        };
      }
      appendStyle(styles, style);
    },
  );
  return styles;
};

export const generateGridOffsetStyles = ({ theme, ownerState }: Props) => {
  const styles = {};
  traverseBreakpoints<number | 'auto'>(
    theme.breakpoints,
    ownerState.gridOffset,
    (appendStyle, value) => {
      let style = {};
      if (value === 'auto') {
        style = {
          marginLeft: 'auto',
        };
      }
      if (typeof value === 'number') {
        style = {
          marginLeft: value === 0 ? '0px' : `calc(100% * ${value} / var(--Grid-columns))`,
        };
      }
      appendStyle(styles, style);
    },
  );
  return styles;
};

export const generateGridColumnsStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = { '--Grid-columns': 12 };
  traverseBreakpoints<number>(theme.breakpoints, ownerState.columns, (appendStyle, value) => {
    appendStyle(styles, { '--Grid-columns': value });
  });
  return styles;
};

export const generateGridRowSpacingStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.rowSpacing,
    (appendStyle, value) => {
      appendStyle(styles, {
        '--Grid-rowSpacing': typeof value === 'string' ? value : theme.spacing?.(value),
      });
    },
  );
  return styles;
};

export const generateGridColumnSpacingStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.columnSpacing,
    (appendStyle, value) => {
      appendStyle(styles, {
        '--Grid-columnSpacing': typeof value === 'string' ? value : theme.spacing?.(value),
      });
    },
  );
  return styles;
};

export const generateGridDirectionStyles = ({ theme, ownerState }: Props) => {
  if (!ownerState.container) {
    return {};
  }
  const styles = {};
  traverseBreakpoints<number | string>(
    theme.breakpoints,
    ownerState.direction,
    (appendStyle, value) => {
      appendStyle(styles, { flexDirection: value });
    },
  );
  return styles;
};

export const generateGridStyles = ({ ownerState }: Props): {} => {
  return {
    minWidth: 0,
    boxSizing: 'border-box',
    ...(ownerState.container
      ? {
          display: 'flex',
          flexWrap: 'wrap',
          ...(ownerState.wrap &&
            ownerState.wrap !== 'wrap' && {
              flexWrap: ownerState.wrap,
            }),
          margin: `calc(var(--Grid-rowSpacing) / -2) calc(var(--Grid-columnSpacing) / -2)`,
          ...(ownerState.disableEqualOverflow && {
            margin: `calc(var(--Grid-rowSpacing) * -1) 0px 0px calc(var(--Grid-columnSpacing) * -1)`,
          }),
          ...(ownerState.nested
            ? {
                padding: `calc(var(--Grid-nested-rowSpacing) / 2) calc(var(--Grid-nested-columnSpacing) / 2)`,
                ...((ownerState.disableEqualOverflow || ownerState.parentDisableEqualOverflow) && {
                  padding: `calc(var(--Grid-nested-rowSpacing)) 0px 0px calc(var(--Grid-nested-columnSpacing))`,
                }),
              }
            : {
                '--Grid-nested-rowSpacing': 'var(--Grid-rowSpacing)',
                '--Grid-nested-columnSpacing': 'var(--Grid-columnSpacing)',
              }),
        }
      : {
          padding: `calc(var(--Grid-rowSpacing) / 2) calc(var(--Grid-columnSpacing) / 2)`,
          ...(ownerState.disableEqualOverflow && {
            padding: `calc(var(--Grid-rowSpacing)) 0px 0px calc(var(--Grid-columnSpacing))`,
          }),
        }),
  };
};

export const generateSizeClassNames = (gridSize: GridOwnerState['gridSize']) => {
  const classNames: string[] = [];
  Object.entries(gridSize).forEach(([key, value]) => {
    if (value !== false && value !== undefined) {
      classNames.push(`grid-${key}-${String(value)}`);
    }
  });
  return classNames;
};

export const generateSpacingClassNames = (
  spacing: GridOwnerState['spacing'],
  smallestBreakpoint: string = 'xs',
) => {
  function isValidSpacing(val: GridOwnerState['spacing'] | null) {
    if (val === undefined) {
      return false;
    }
    return (
      (typeof val === 'string' && !Number.isNaN(Number(val))) ||
      (typeof val === 'number' && val > 0)
    );
  }
  if (isValidSpacing(spacing)) {
    return [`spacing-${smallestBreakpoint}-${String(spacing)}`];
  }
  if (typeof spacing === 'object' && !Array.isArray(spacing)) {
    const classNames: string[] = [];
    Object.entries(spacing).forEach(([key, value]) => {
      if (isValidSpacing(value)) {
        classNames.push(`spacing-${key}-${String(value)}`);
      }
    });
    return classNames;
  }
  return [];
};

export const generateDirectionClasses = (
  direction: ResponsiveStyleValue<GridDirection> | undefined,
): string[] => {
  if (direction === undefined) {
    return [];
  }
  if (typeof direction === 'object') {
    return Object.entries(direction).map(([key, value]) => `direction-${key}-${value}`);
  }

  return [`direction-xs-${String(direction)}`];
};
