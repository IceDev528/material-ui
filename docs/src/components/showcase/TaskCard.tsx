import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import CodeRounded from '@material-ui/icons/CodeRounded';
import ScheduleRounded from '@material-ui/icons/ScheduleRounded';

declare module '@material-ui/core/Paper' {
  interface PaperPropsVariantOverrides {
    gradient: true;
  }
}

const primary = {
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

const theme = createTheme({
  palette: { mode: 'dark', primary },
  shape: {
    borderRadius: 10,
  },
  spacing: 10,
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
    h6: {
      lineHeight: 1.2,
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            background: `linear-gradient(to right bottom, ${primary.main}, ${primary[700]} 120%)`,
            boxShadow: '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
          },
        },
      ],
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '1px solid #fff',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: 'rgba(255,255,255,0.12)',
        },
        bar: {
          borderRadius: 10,
          backgroundColor: '#fff',
        },
      },
    },
  },
});

export default function TaskCard() {
  return (
    <ThemeProvider theme={theme}>
      <Fade in timeout={700}>
        <Card
          variant="gradient"
          sx={{
            minWidth: 280,
            maxWidth: 360,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            p: 2.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ScheduleRounded fontSize="inherit" />
            <Typography color="text.secondary" variant="caption" sx={{ ml: 0.5, mt: '1px' }}>
              March 25th
            </Typography>
          </Box>
          <Box sx={{ my: 'auto' }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                bgcolor: '#fff',
                borderRadius: 0.75,
                p: '2px',
              }}
            >
              <CodeRounded color="primary" />
            </Box>
            <Typography variant="h6" component="div" sx={{ mt: 1.5 }}>
              Check for the API response and return the proper method
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Avatar
              imgProps={{ 'aria-labelledby': 'demo-task-card-assigne-name' }}
              src="/static/images/avatar/1-sm.jpeg"
              variant="rounded"
            />
            <Box sx={{ ml: 1 }}>
              <Typography variant="body2" color="primary.200">
                Assigned to
              </Typography>
              <Typography id="demo-task-card-assigne-name">Michael Scott</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: -0.5, mt: 0.5 }}>
            <LinearProgress
              aria-label="Progress"
              variant="determinate"
              value={60}
              sx={{ flexGrow: 1 }}
            />
            <Typography color="#00C8FF" variant="body2" sx={{ ml: 2 }}>
              <b>60%</b>
            </Typography>
          </Box>
        </Card>
      </Fade>
    </ThemeProvider>
  );
}
