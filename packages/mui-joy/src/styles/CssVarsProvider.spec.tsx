import * as React from 'react';
import { CSSObject } from '@mui/system';
import { CssVarsProvider, PaletteRange, PaletteVariant } from '@mui/joy/styles';

// -----------------------------------
// Extending palete

declare module '@mui/joy/styles' {
  interface ColorSchemeOverrides {
    trueDark: true;
  }

  interface Palette {
    secondary: PaletteRange;
  }

  interface PaletteRangeOverrides {
    '100': false;
    '120': true;
  }
}

function App() {
  return <CssVarsProvider />;
}

function App2() {
  // theme can be empty
  return <CssVarsProvider theme={{}} />;
}

function App3() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          // `trueDark` is extended
          trueDark: {
            palette: {
              primary: {
                500: '',
              },
            },
          },
        },
      }}
    />
  );
}

function App4() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          // @ts-expect-error `yellow` is not listed in ExtendedColorSchemes
          yellow: {},
        },
      }}
    />
  );
}

function App5() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              secondary: {
                // @ts-expect-error `100` is removed
                100: '',
                120: '#ff5252',
              },
            },
          },
        },
      }}
    />
  );
}

// -----------------------------------
// Extending radius

declare module '@mui/joy/styles' {
  interface Radius {
    xl2: string;
  }
}

function App6() {
  return (
    <CssVarsProvider
      theme={{
        radius: {
          xl2: '20px',
        },
      }}
    />
  );
}

// -----------------------------------
// Extending shadow

declare module '@mui/joy/styles' {
  interface Shadow {
    xl2: string;
  }
}

function App7() {
  return (
    <CssVarsProvider
      theme={{
        shadow: {
          xl2: '0 0 20px 1px rgba(0,0,0,0.12)',
        },
      }}
    />
  );
}

// -----------------------------------
// Extending focus

declare module '@mui/joy/styles' {
  interface Focus {
    bordered: CSSObject;
  }
}

function App8() {
  return (
    <CssVarsProvider
      theme={{
        focus: {
          bordered: {
            '&:after': {
              position: 'absolute',
              inset: '2px',
              outline: '1px solid',
              outlineColor: 'var(--token)',
            },
          },
        },
      }}
    />
  );
}

// -----------------------------------
// Extending typography

declare module '@mui/joy/styles' {
  interface TypographySystemOverrides {
    callout: true; // add new typography
    h1: false; // default the default
  }
}

function App9() {
  return (
    <React.Fragment>
      <CssVarsProvider
        theme={{
          typography: {
            callout: {
              fontSize: '12px',
            },
          },
        }}
      />
      <CssVarsProvider
        theme={{
          typography: {
            // @ts-expect-error 'h1' is removed
            h1: {
              fontSize: '12px',
            },
          },
        }}
      />
    </React.Fragment>
  );
}
