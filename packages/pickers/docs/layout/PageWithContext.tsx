import * as React from 'react';
import rtl from 'jss-rtl';
import Layout from './Layout';
import orange from '@material-ui/core/colors/deepOrange';
import { create } from 'jss';
import { SnackbarProvider } from 'notistack';
import { setPrismTheme } from '../utils/prism';
import { PageContext } from '../utils/getPageContext';
import { LocalizationProvider } from '@material-ui/pickers';
import { UtilsContext } from '../_shared/UtilsServiceContext';
import { NotificationManager } from 'utils/NotificationManager';
import { createUtilsService, UtilsLib, utilsMap } from '../utils/utilsService';
import {
  Theme,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  jssPreset,
  StylesProvider,
} from '@material-ui/core';

export type ThemeType = 'light' | 'dark';
export type Direction = Theme['direction'];

export const ThemeContext = React.createContext<ThemeType>('light');

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const createCustomMuiTheme = (theme: ThemeType, direction: Theme['direction']) => {
  return createMuiTheme({
    direction,
    palette: {
      primary: {
        main: theme === 'dark' ? '#fdd835' : '#43a047',
      },
      secondary: orange,
      type: theme,
    },
    overrides: {},
    props: {},
  });
};

interface Props {
  children: React.ReactChild;
  pageContext: PageContext;
  initialTheme?: ThemeType;
}

export const PageWithContexts: React.SFC<Props> = ({
  children,
  pageContext,
  initialTheme = 'light',
}) => {
  React.useEffect(() => {
    console.log(`
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░▄▄▀▀▀▀▀▀▀▀▀▀▄▄█▄░░░░▄░░░░█░░░░░░░
░░░░░░█▀░░░░░░░░░░░░░▀▀█▄░░░▀░░░░░░░░░▄░
░░░░▄▀░░░░░░░░░░░░░░░░░▀██░░░▄▀▀▀▄▄░░▀░░
░░▄█▀▄█▀▀▀▀▄░░░░░░▄▀▀█▄░▀█▄░░█▄░░░▀█░░░░
░▄█░▄▀░░▄▄▄░█░░░▄▀▄█▄░▀█░░█▄░░▀█░░░░█░░░
▄█░░█░░░▀▀▀░█░░▄█░▀▀▀░░█░░░█▄░░█░░░░█░░░
██░░░▀▄░░░▄█▀░░░▀▄▄▄▄▄█▀░░░▀█░░█▄░░░█░░░
██░░░░░▀▀▀░░░░░░░░░░░░░░░░░░█░▄█░░░░█░░░
██░░░░░░░░░░░░░░░░░░░░░█░░░░██▀░░░░█▄░░░
██░░░░░░░░░░░░░░░░░░░░░█░░░░█░░░░░░░▀▀█▄
██░░░░░░░░░░░░░░░░░░░░█░░░░░█░░░░░░░▄▄██
░██░░░░░░░░░░░░░░░░░░▄▀░░░░░█░░░░░░░▀▀█▄
░▀█░░░░░░█░░░░░░░░░▄█▀░░░░░░█░░░░░░░▄▄██
░▄██▄░░░░░▀▀▀▄▄▄▄▀▀░░░░░░░░░█░░░░░░░▀▀█▄
░░▀▀▀▀░░░░░░░░░░░░░░░░░░░░░░█▄▄▄▄▄▄▄▄▄██
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

🔥🔥🔥🔥 Thanks for using our pickers 🔥🔥🔥🔥
`);
  }, []);

  const [lib, setLib] = React.useState<UtilsLib>('date-fns');
  const [theme, setTheme] = React.useState<ThemeType>(initialTheme);
  const [direction, setDirection] = React.useState<Direction>('ltr');

  const setBodyDirection = React.useCallback(() => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    document.body.dir = newDirection;

    setDirection(newDirection);
  }, [direction]);

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    setPrismTheme(newTheme);
    document.cookie = `theme=${newTheme}`;
  }, [theme]);

  const muiTheme = createCustomMuiTheme(theme, direction);

  return (
    <StylesProvider
      jss={jss}
      sheetsManager={pageContext.sheetsManager}
      sheetsRegistry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <ThemeProvider theme={muiTheme}>
        <SnackbarProvider maxSnack={3}>
          <LocalizationProvider dateAdapter={utilsMap[lib] as any}>
            <ThemeContext.Provider value={theme}>
              <UtilsContext.Provider value={createUtilsService(lib)}>
                <CssBaseline />
                <NotificationManager />
                <Layout
                  children={children}
                  onChangeUtils={setLib}
                  toggleThemeType={toggleTheme}
                  toggleDirection={setBodyDirection}
                />
              </UtilsContext.Provider>
            </ThemeContext.Provider>
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};
