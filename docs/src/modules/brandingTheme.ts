import { createTheme, ThemeOptions, Theme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    primaryDark: PaletteColor;
    svgBg: {
      base: string;
      active: string;
    };
    svgFilled: {
      base: string;
      active: string;
    };
    svgStroke: {
      base: string;
      active: string;
    };
  }
}

declare module '@material-ui/core/styles/createTypography' {
  interface TypographyOptions {
    fontWeightExtraBold?: number;
    fontFamilyCode?: string;
  }

  interface Typography {
    fontWeightExtraBold: number;
    fontFamilyCode: string;
  }
}

// TODO: enable this once types conflict is fixed
// declare module '@material-ui/core/Button' {
//   interface ButtonPropsVariantOverrides {
//     code: true;
//   }
// }

const defaultTheme = createTheme();

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#007FFF', // contrast 3.83:1
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};
const blueDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  main: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C', // contrast 3.02:1
  800: '#001E3C',
  900: '#0A1929',
};
const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  200: '#E5E8EC',
  300: '#D7DCE1',
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#96A3B0',
  700: '#8796A5', // contrast 3.02:1
  800: '#5A6978', // contrast 5.63:1
  900: '#3D4752',
};

const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

export const getDesignTokens = (mode: 'light' | 'dark') =>
  ({
    palette: {
      primary: blue,
      divider: mode === 'dark' ? blueDark[400] : grey[200],
      primaryDark: blueDark,
      mode,
      ...(mode === 'dark' && {
        background: {
          default: blueDark[800],
          paper: blueDark[900],
        },
      }),
      common: {
        black: '#1D1D1D',
      },
      ...(mode === 'light' && {
        text: {
          primary: grey[900],
          secondary: grey[800],
        },
      }),
      ...(mode === 'dark' && {
        text: {
          primary: '#fff',
          secondary: grey[500],
        },
      }),
      grey,
      error: {
        50: '#FFF0F1',
        100: '#FFDBDE',
        200: '#FFBDC2',
        300: '#FF99A2',
        400: '#FF7A86',
        500: '#FF505F',
        main: '#EB0014', // contrast 4.62:1
        600: '#EB0014',
        700: '#C70011',
        800: '#94000D',
        900: '#570007',
      },
      success: {
        50: '#E9FBF0',
        100: '#C6F6D9',
        200: '#9AEFBC',
        300: '#6AE79C',
        400: '#3EE07F',
        500: '#21CC66',
        600: '#1DB45A',
        ...(mode === 'dark' && {
          main: '#1DB45A', // contrast 6.17:1 (blueDark.800)
        }),
        ...(mode === 'light' && {
          main: '#1AA251', // contrast 3.31:1
        }),
        700: '#1AA251',
        800: '#178D46',
        900: '#0F5C2E',
      },
      warning: {
        50: '#FFF9EB',
        100: '#FFF4DB',
        200: '#FFF0CC',
        300: '#FFE4A3',
        400: '#FFD980',
        500: '#FFC846',
        600: '#FFBC1F',
        main: '#F5AC00', // does not pass constrast ratio
        700: '#F5AC00',
        800: '#DB9A00',
        900: '#8F6400',
      },
      svgBg: {
        base: mode === 'dark' ? blueDark[400] : grey[50],
        active: mode === 'dark' ? blueDark[400] : grey[50],
      },
      svgFilled: {
        base: mode === 'dark' ? blueDark[800] : grey[500],
        active: mode === 'dark' ? blue[300] : blue[500],
      },
      svgStroke: {
        base: mode === 'dark' ? blueDark[600] : '#ffffff',
        active: mode === 'dark' ? blue[700] : '#ffffff',
      },
    },
    shape: {
      borderRadius: 10,
    },
    spacing: 10,
    typography: {
      fontFamily: ['"IBM Plex Sans"', ...systemFont].join(','),
      fontFamilyCode: ['"IBM Plex Mono"', ...systemFont].join(','),
      fontFamilyTagline: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
      fontWeightExtraBold: 800,
      h1: {
        fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
        fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4.5rem)',
        fontWeight: 800,
        lineHeight: 80 / 72,
        ...(mode === 'light' && {
          color: blueDark[900],
        }),
      },
      h2: {
        fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
        fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
        fontWeight: 800,
        lineHeight: 44 / 36,
        color: mode === 'dark' ? grey[300] : blue[900],
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(36),
        lineHeight: 44 / 36,
        letterSpacing: 0,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(28),
        lineHeight: 42 / 28,
        letterSpacing: 0,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(24),
        lineHeight: 36 / 24,
        letterSpacing: 0,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(20),
        lineHeight: 30 / 20,
        letterSpacing: 0,
      },
      button: {
        textTransform: 'initial',
        fontWeight: 700,
        letterSpacing: 0,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        lineHeight: 24 / 18,
        letterSpacing: 0,
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(16), // 16px
        lineHeight: 24 / 16,
        letterSpacing: 0,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14), // 14px
        lineHeight: 21 / 14,
        letterSpacing: 0,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12), // 12px
        lineHeight: 18 / 12,
        letterSpacing: 0,
        fontWeight: 600,
      },
    },
  } as ThemeOptions);

export function getThemedComponents(theme: Theme) {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          sizeLarge: {
            padding: '1rem 1.25rem',
            ...theme.typography.body1,
            lineHeight: 21 / 16,
            fontWeight: 700,
          },
        },
        variants: [
          {
            props: { variant: 'code' },
            style: {
              color:
                theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[800],
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[400]
                  : theme.palette.grey[200],
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[50],
              fontFamily: theme.typography.fontFamilyCode,
              '&:hover, &.Mui-focusVisible': {
                borderColor: theme.palette.primary.main,
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[500]
                    : theme.palette.primary[50],
                '& .MuiButton-endIcon': {
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.primary[300]
                      : theme.palette.primary.main,
                },
              },
              '& .MuiButton-startIcon': {
                color: theme.palette.grey[400],
              },
              '& .MuiButton-endIcon': {
                color:
                  theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[700],
              },
            },
          },
          {
            props: { variant: 'code', size: 'large' },
            style: {
              ...theme.typography.body2,
              fontFamily: theme.typography.fontFamilyCode,
              fontWeight: theme.typography.fontWeightBold,
            },
          },
        ],
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            [theme.breakpoints.up('md')]: {
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: {
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary[400]
                : theme.palette.primary[600],
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            '&.MuiTypography-body1 > svg': {
              marginTop: 2,
            },
            '& svg:last-child': {
              marginLeft: 2,
            },
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          outlined: {
            display: 'block',
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[400]
                : theme.palette.grey[100],
            ...(theme.palette.mode === 'dark' && {
              backgroundColor: theme.palette.primaryDark[700],
            }),
            'a&, button&': {
              '&:hover': {
                boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
              },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1, 2),
            borderColor: theme.palette.divider,
          },
          head: {
            color: theme.palette.text.primary,
            fontWeight: 600,
          },
          body: {
            color: theme.palette.text.secondary,
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 32,
            height: 20,
            padding: 0,
          },
          switchBase: {
            height: 20,
            width: 20,
            padding: 0,
            color: '#fff',
            '&.Mui-checked + .MuiSwitch-track': {
              opacity: 1,
            },
            '&.Mui-checked': {
              transform: 'translateX(11px)',
              color: '#fff',
            },
          },
          track: {
            opacity: 1,
            borderRadius: 32,
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
          },
          thumb: {
            flexShrink: 0,
            width: '14px',
            height: '14px',
          },
        },
      },
    },
  };
}

const darkTheme = createTheme(getDesignTokens('dark'));
export const brandingDarkTheme = createTheme(darkTheme, getThemedComponents(darkTheme));
