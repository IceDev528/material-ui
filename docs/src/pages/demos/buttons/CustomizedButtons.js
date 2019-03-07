import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontFamily: [
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
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function CustomizedButtons(props) {
  const { classes } = props;

  return (
    <div>
      <Button variant="contained" color="primary" className={clsx(classes.margin, classes.cssRoot)}>
        Custom CSS
      </Button>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin}>
          ThemeProvider
        </Button>
      </ThemeProvider>
      <Button
        variant="contained"
        color="primary"
        disableRipple
        className={clsx(classes.margin, classes.bootstrapRoot)}
      >
        Bootstrap
      </Button>
    </div>
  );
}

CustomizedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedButtons);
