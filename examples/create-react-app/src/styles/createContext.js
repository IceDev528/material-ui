import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { purple, green } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

// Configure JSS
const jss = create(preset());

export const sheetsManager = new Map();

export default function createContext() {
  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName(),
  };
}
