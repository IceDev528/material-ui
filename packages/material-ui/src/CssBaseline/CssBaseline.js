import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '../styles';
import { exactProp } from '@material-ui/utils';

const useStyles = makeStyles(
  theme => ({
    '@global': {
      html: {
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        // Change from `box-sizing: content-box` so that `width`
        // is not affected by `padding` or `border`.
        boxSizing: 'border-box',
      },
      '*, *::before, *::after': {
        boxSizing: 'inherit',
      },
      body: {
        margin: 0, // Remove the margin in all browsers.
        backgroundColor: theme.palette.background.default,
        '@media print': {
          // Save printer ink.
          backgroundColor: theme.palette.common.white,
        },
        ...theme.typography.body2,
      },
    },
  }),
  { name: 'MuiCssBaseline' },
);

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline(props) {
  useStyles();
  return <React.Fragment>{props.children}</React.Fragment>;
}

CssBaseline.propTypes = {
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  CssBaseline['propTypes' + ''] = exactProp(CssBaseline.propTypes);
}

CssBaseline.defaultProps = {
  children: null,
};

export default CssBaseline;
