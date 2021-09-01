import * as React from 'react';
import { ThemeProvider, createTheme, useTheme, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';

const primaryDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C',
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
  700: '#8796A5',
  800: '#5A6978',
  900: '#3D4752',
};

export default function PlayerCard({ theme: externalTheme }: { theme?: Theme }) {
  const [paused, setPaused] = React.useState(true);
  /*
   * Note: this demo use `theme.palette.mode` from `useTheme` to make dark mode works in the documentation only.
   *
   * Normally, you would implement dark mode via internal state and/or system preference at the root of the application.
   * For more detail about toggling dark mode: https://next.material-ui.com/customization/palette/#toggling-color-mode
   */
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            paper: mode === 'dark' ? primaryDark[800] : '#fff',
          },
          divider: mode === 'dark' ? primaryDark[500] : grey[200],
          ...(mode === 'light' && {
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }),
          grey,
        },
        shape: {
          borderRadius: 8,
        },
        spacing: 10,
        typography: {
          fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableTouchRipple: true,
            },
          },
          MuiAvatar: {
            styleOverrides: {
              root: {
                border: '1px solid',
                borderColor: mode === 'dark' ? primaryDark[500] : '#fff',
              },
            },
          },
          MuiIconButton: {
            defaultProps: {
              size: 'small',
            },
            styleOverrides: {
              root: {
                border: '1px solid',
                borderColor: mode === 'dark' ? primaryDark[500] : grey[200],
              },
            },
          },
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'small',
            },
          },
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={externalTheme || theme}>
      <Fade in timeout={700}>
        <Card
          variant="outlined"
          sx={{ p: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Box
            sx={{
              display: 'flex',
              mb: { xs: 1, sm: 0 },
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <img
              alt="Beside Myself album cover"
              style={{ borderRadius: 5, objectFit: 'cover', width: '100%' }}
              src="/static/images/cards/basement-beside-myself.jpeg"
              width="124"
              height="124"
            />
          </Box>
          <Box sx={{ alignSelf: 'center', mx: 2 }}>
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{ textAlign: { xs: 'center', sm: 'start' } }}
            >
              Ultraviolet
            </Typography>
            <Typography
              component="div"
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: { xs: 'center', sm: 'start' } }}
            >
              Basement • Beside Myself
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="fast rewind" disabled>
                <FastRewindRounded />
              </IconButton>
              <IconButton
                aria-label={paused ? 'play' : 'pause'}
                sx={{ mx: 2 }}
                onClick={() => setPaused((val) => !val)}
              >
                {paused ? <PlayArrowRounded /> : <PauseRounded />}
              </IconButton>
              <IconButton aria-label="fast forward" disabled>
                <FastForwardRounded />
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Fade>
    </ThemeProvider>
  );
}
