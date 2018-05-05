import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});

function OverridesProperties() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>Overrides properties</Button>
    </MuiThemeProvider>
  );
}

export default OverridesProperties;
