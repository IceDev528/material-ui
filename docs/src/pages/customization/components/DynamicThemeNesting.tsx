import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme, ThemeProvider, Theme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

export default function DynamicThemeNesting() {
  const [success, setSuccess] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuccess(event.target.checked);
  };

  const theme = React.useMemo(() => {
    if (success) {
      return createMuiTheme({
        palette: {
          primary: {
            light: green[300],
            main: green[500],
            dark: green[700],
          },
        },
      });
    }
    return createMuiTheme();
  }, [success]);

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <Switch
            checked={success}
            onChange={handleChange}
            color="primary"
            value="dynamic-class-name"
          />
        }
        label="Success"
      />
      <ThemeProvider<Theme> theme={theme}>
        <Slider defaultValue={30} sx={{ width: 300, mt: 1 }} />
      </ThemeProvider>
    </React.Fragment>
  );
}
