import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {
  createMuiTheme,
  ThemeProvider,
  experimentalStyled as styled,
} from '@material-ui/core/styles';
import * as CSS from 'csstype';

const Item = styled(Paper)(({ theme }) => ({
  // TODO withStyles removal
  ...(theme.typography.body2 as CSS.Properties),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createMuiTheme({ palette: { mode: 'dark' } });
const lightTheme = createMuiTheme({ palette: { mode: 'light' } });

export default function Elevation() {
  return (
    <Grid container spacing={2}>
      {[lightTheme, darkTheme].map((theme, index) => (
        <Grid item xs={6} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            >
              {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                <Item key={elevation} elevation={elevation}>
                  {`elevation=${elevation}`}
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
