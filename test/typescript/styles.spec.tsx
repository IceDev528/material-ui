import * as React from 'react';
import { StyledComponent } from '../../src';
import {
  withStyles,
  WithStyles,
  createMuiTheme,
  MuiThemeProvider,
  Theme,
  withTheme,
  StyleRules,
} from '../../src/styles';
import Button from '../../src/Button/Button';
import { StyledComponentProps } from '../../src/index';

// Shared types for examples
type ComponentClassNames = 'root';
interface ComponentProps {
  text: string;
}

// Example 1
const styles = ({ palette, spacing }) => ({
  root: {
    padding: spacing.unit,
    background: palette.background,
    color: palette.primary,
  },
});

const StyledExampleOne = withStyles(styles)<
  ComponentProps
>(({ classes, text }) => <div className={classes.root}>{text}</div>);
<StyledExampleOne text="I am styled!" />;

// Example 2
const Component: React.SFC<
  ComponentProps & WithStyles<ComponentClassNames>
> = ({ classes, text }) => <div className={classes.root}>{text}</div>;

const StyledExampleTwo = withStyles(styles)(Component);
<StyledExampleTwo text="I am styled!" />;

// Example 3
const styleRule: StyleRules<ComponentClassNames> = {
  root: {
    display: 'flex',
    alignItems: 'stretch',
    height: '100vh',
    width: '100%',
  },
};

const ComponentWithChildren: React.SFC<WithStyles<ComponentClassNames>> = ({
  classes,
  children,
}) => <div className={classes.root}>{children}</div>;

const StyledExampleThree = withStyles(styleRule)<{}>(ComponentWithChildren);
<StyledExampleThree />;

// Also works with a plain object
const stylesAsPojo = {
  root: {
    background: 'hotpink',
  },
};

const AnotherStyledSFC = withStyles({
  root: { background: 'hotpink' },
})(({ classes }) => <div className={classes.root}>Stylish!</div>);

// Overriding styles
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    },
  },
});

const customTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function OverridesTheme() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button>{'Overrides'}</Button>
    </MuiThemeProvider>
  );
}

// withTheme
const ThemedComponent: React.SFC<{ theme: Theme }> = ({ theme }) => (
  <div>{theme.spacing.unit}</div>
);
const ComponentWithTheme = withTheme(ThemedComponent);

// withStyles + withTheme
interface AllTheProps {
  theme: Theme;
  classes: { root: string };
}

const AllTheStyles: React.SFC<AllTheProps> = ({ theme, classes }) => (
  <div className={classes.root}>{theme.palette.text.primary}</div>
);

const AllTheComposition = withTheme(withStyles(styles)(AllTheStyles));

@withStyles(styles)
class DecoratedComponent extends React.Component<
  ComponentProps & StyledComponentProps<'root'>
> {
  render() {
    const { classes, text } = this.props;
    return <div className={classes!.root}>{text}</div>;
  }
}

// no 'classes' property required at element creation time (#8267)
<DecoratedComponent text="foo" />;
