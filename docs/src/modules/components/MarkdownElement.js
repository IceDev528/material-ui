import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, darken, styled } from '@mui/material/styles';
import {
  brandingDarkTheme as darkTheme,
  brandingLightTheme as lightTheme,
} from 'docs/src/modules/brandingTheme';

const Root = styled('div')(
  ({ theme }) => ({
    ...lightTheme.typography.body1,
    color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
    '& strong': {
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
    },
    wordBreak: 'break-word',
    '& pre': {
      margin: theme.spacing(2, 'auto'),
      padding: theme.spacing(2),
      backgroundColor: `var(--muidocs-palette-primaryDark-800, ${lightTheme.palette.primaryDark[800]})`,
      color: '#f8f8f2',
      colorScheme: 'dark',
      borderRadius: `var(--muidocs-shape-borderRadius, ${
        theme.shape?.borderRadius ?? lightTheme.shape.borderRadius
      }px)`,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      fontSize: lightTheme.typography.pxToRem(13),
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: '400px',
      [lightTheme.breakpoints.up('md')]: {
        maxWidth: 'calc(100vw - 32px - 16px)',
      },
    },
    '& code': {
      ...lightTheme.typography.body2,
      fontFamily: lightTheme.typography.fontFamilyCode,
      fontWeight: 400,
      WebkitFontSmoothing: 'subpixel-antialiased',
    },
    '& pre > code': {
      // Reset for Safari
      // https://github.com/necolas/normalize.css/blob/master/normalize.css#L102
      fontSize: 'inherit',
    },
    // inline code block
    '& :not(pre) > code': {
      display: 'inline-block',
      padding: '0 5px',
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      backgroundColor: alpha(lightTheme.palette.primary.light, 0.15),
      borderRadius: 5,
      fontSize: lightTheme.typography.pxToRem(13),
      direction: 'ltr /*! @noflip */',
    },
    '& h1': {
      ...lightTheme.typography.h3,
      fontSize: lightTheme.typography.pxToRem(36),
      fontFamily: `"PlusJakartaSans-ExtraBold", ${lightTheme.typography.fontFamilySystem}`,
      margin: '10px 0',
      color: `var(--muidocs-palette-primaryDark-900, ${lightTheme.palette.primaryDark[900]})`,
      fontWeight: 800,
    },
    '& .description': {
      ...lightTheme.typography.subtitle1,
      fontWeight: 400,
      margin: '0 0 40px',
    },
    '& h2': {
      ...lightTheme.typography.h5,
      fontFamily: lightTheme.typography.fontFamilySystem,
      fontWeight: 700,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      margin: '40px 0 4px',
    },
    '& h3': {
      ...lightTheme.typography.h6,
      fontFamily: lightTheme.typography.fontFamilySystem,
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      margin: '24px 0 8px',
    },
    '& h4': {
      ...lightTheme.typography.subtitle1,
      fontFamily: lightTheme.typography.fontFamilySystem,
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      margin: '24px 0 8px',
    },
    '& h5': {
      ...lightTheme.typography.subtitle2,
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      margin: '20px 0 8px',
    },
    '& p, & ul, & ol': {
      marginTop: 0,
      marginBottom: 16,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
    },
    '& ul': {
      paddingLeft: 30,
    },
    '& h1, & h2, & h3, & h4': {
      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        // Remove scroll on small screens.
        wordBreak: 'break-all',
      },
      '& .anchor-link-style': {
        // To prevent the link to get the focus.
        display: 'none',
      },
      '& a:not(.anchor-link-style):hover': {
        color: 'currentColor',
        borderBottom: '1px solid currentColor',
        textDecoration: 'none',
      },
      '&:hover .anchor-link-style': {
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: '21.5px',
        marginLeft: 10,
        height: '26px',
        width: '26px',
        background: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
        border: '1px solid',
        borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
        borderRadius: 8,
        color: `var(--muidocs-palette-text-secondary, ${lightTheme.palette.text.secondary})`,
        '&:hover': {
          color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
        },
        '& svg': {
          width: '0.875rem',
          height: '0.875rem',
          fill: 'currentColor',
        },
      },
    },
    '& h1 code, & h2 code, & h3 code': {
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
    },
    '& h1 code': {
      fontWeight: lightTheme.typography.fontWeightSemiBold,
    },
    '& h2 code': {
      fontSize: lightTheme.typography.pxToRem(24),
      fontWeight: lightTheme.typography.fontWeightSemiBold,
    },
    '& h3 code': {
      fontSize: lightTheme.typography.pxToRem(18),
    },
    '& table': {
      // Trade display table for scroll overflow
      display: 'block',
      wordBreak: 'normal',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderCollapse: 'collapse',
      marginBottom: '20px',
      borderSpacing: 0,
      '& .prop-name, & .prop-type, & .prop-default': {
        fontWeight: 400,
        fontFamily: lightTheme.typography.fontFamilyCode,
        WebkitFontSmoothing: 'subpixel-antialiased',
        fontSize: lightTheme.typography.pxToRem(13),
      },
      '& .required': {
        color: '#006500',
      },
      '& .optional': {
        color: '#45529f',
      },
      '& .prop-type': {
        color: '#932981',
      },
      '& .prop-default': {
        borderBottom: `1px dotted var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      },
    },
    '& td': {
      ...theme.typography.body2,
      borderBottom: `1px solid var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      paddingRight: 20,
      paddingTop: 12,
      paddingBottom: 12,
      color: `var(--muidocs-palette-text-secondary, ${lightTheme.palette.text.secondary})`,
    },
    '& td code': {
      lineHeight: 1.6,
    },
    '& th': {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: 500,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      whiteSpace: 'pre',
      borderBottom: `1px solid var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      paddingRight: 20,
      paddingTop: 12,
      paddingBottom: 12,
    },
    '& blockquote': {
      borderRadius: `var(--muidocs-shape-borderRadius, ${
        theme.shape?.borderRadius ?? lightTheme.shape.borderRadius
      }px)`,
      border: '1px solid',
      borderLeft: '8px solid',
      borderColor: `var(--muidocs-palette-warning-300, ${lightTheme.palette.warning[300]})`,
      backgroundColor: `var(--muidocs-palette-warning-50, ${lightTheme.palette.warning[50]})`,
      padding: '10px 20px',
      margin: '20px 0',
      '& p': {
        marginTop: 10,
        color: `var(--muidocs-palette-primaryDark-800, ${lightTheme.palette.primaryDark[800]})`,
      },
    },
    '& .MuiCallout-root': {
      padding: '16px',
      margin: '16px 0',
      border: '1px solid',
      borderRadius: `var(--muidocs-shape-borderRadius, ${
        theme.shape?.borderRadius ?? lightTheme.shape.borderRadius
      }px)`,
      '& > p': {
        color: 'inherit',
        '&:last-child': {
          margin: 0,
        },
      },
      '& ul, li': {
        color: 'inherit',
      },
      '&.MuiCallout-error': {
        color: `var(--muidocs-palette-error-900, ${lightTheme.palette.error[900]})`,
        backgroundColor: `var(--muidocs-palette-error-50, ${lightTheme.palette.error[50]})`,
        borderColor: `var(--muidocs-palette-error-200, ${lightTheme.palette.error[200]})`,
        '& strong': {
          color: `var(--muidocs-palette-error-800, ${lightTheme.palette.error[800]})`,
        },
        '& a': {
          color: `var(--muidocs-palette-error-800, ${lightTheme.palette.error[800]})`,
          textDecorationColor: alpha(lightTheme.palette.error.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
      '&.MuiCallout-info': {
        color: `var(--muidocs-palette-primary-900, ${lightTheme.palette.primary[900]})`,
        backgroundColor: alpha(lightTheme.palette.primary[50], 0.8),
        borderColor: `var(--muidocs-palette-primary-100, ${lightTheme.palette.primary[100]})`,
        '& strong': {
          color: `var(--muidocs-palette-primary-800, ${lightTheme.palette.primary[800]})`,
        },
      },
      '&.MuiCallout-success': {
        color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
        backgroundColor: `var(--muidocs-palette-success-50, ${lightTheme.palette.success[50]})`,
        borderColor: `var(--muidocs-palette-success-200, ${lightTheme.palette.success[200]})`,
        '& strong': {
          color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
        },
        '& a': {
          color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
          textDecorationColor: alpha(lightTheme.palette.success.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
      '&.MuiCallout-warning': {
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
        backgroundColor: alpha(lightTheme.palette.warning[50], 0.6),
        borderColor: `var(--muidocs-palette-warning-300, ${lightTheme.palette.warning[300]})`,
        '& strong': {
          color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
        },
        '& a': {
          color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
          textDecorationColor: alpha(lightTheme.palette.warning.main, 0.4),
          '&:hover': {
            textDecorationColor: 'inherit',
          },
        },
      },
    },
    '& a, & a code': {
      // Style taken from the Link component
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
      textDecoration: 'underline',
      textDecorationColor: alpha(lightTheme.palette.primary.main, 0.4),
      '&:hover': {
        textDecorationColor: 'inherit',
      },
    },
    '& a code': {
      color: darken(lightTheme.palette.primary.main, 0.04),
    },
    '& img, video': {
      maxWidth: '100%',
    },
    '& img': {
      // Avoid layout jump
      display: 'inline-block',
    },
    '& hr': {
      height: 1,
      margin: theme.spacing(6, 0),
      border: 0,
      flexShrink: 0,
      backgroundColor: `var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
    },
    '& kbd.key': {
      padding: '5px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      margin: '0 1px',
      font: '11px Consolas,Liberation Mono,Menlo,monospace',
      lineHeight: '10px',
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      verticalAlign: 'middle',
      backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
      border: `1px solid var(--muidocs-palette-grey-300, ${lightTheme.palette.grey[300]})`,
      borderRadius: 5,
      boxShadow: `inset 0 -1px 0 var(--muidocs-palette-grey-300, ${lightTheme.palette.grey[300]})`,
    },
    '& details': {
      marginBottom: theme.spacing(1.5),
      padding: theme.spacing(0.5, 0, 0.5, 1),
      '& pre': {
        marginTop: theme.spacing(1),
      },
    },
    '& summary': {
      cursor: 'pointer',
    },
    '& .MuiCode-root': {
      direction: 'ltr /*! @noflip */',
      position: 'relative',
      // Font size reset to fix a bug with Safari 16.0 when letterSpacing is set
      fontSize: 10,
      '&:hover': {
        '& .MuiCode-copy': {
          display: 'block',
        },
      },
    },
    '& .MuiCode-copy': {
      minWidth: 64,
      display: 'none',
      backgroundColor: alpha(lightTheme.palette.primaryDark[600], 0.5),
      cursor: 'pointer',
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      fontFamily: 'inherit',
      fontSize: lightTheme.typography.pxToRem(13),
      fontWeight: 500,
      padding: theme.spacing(0.5, 1),
      borderRadius: 4,
      border: `1px solid`,
      borderColor: lightTheme.palette.primaryDark[500],
      color: lightTheme.palette.primaryDark[50],
      '&:hover, &:focus': {
        opacity: 1,
        color: '#fff',
        backgroundColor: alpha(lightTheme.palette.primaryDark[600], 0.7),
        borderColor: lightTheme.palette.primaryDark[500],
        '& .MuiCode-copyKeypress': {
          opacity: 1,
        },
      },
      '&[data-copied]': {
        // style of the button when it is in copied state.
        borderColor: lightTheme.palette.primary[700],
        color: '#fff',
        backgroundColor: lightTheme.palette.primaryDark[600],
      },
      '&:focus-visible': {
        outline: '2px solid',
        outlineOffset: 2,
        outlineColor: lightTheme.palette.primaryDark[500],
      },
    },
    '& .MuiCode-copyKeypress': {
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: 0,
      position: 'absolute',
      left: '50%',
      top: '100%',
      minWidth: '100%',
      marginTop: theme.spacing(0.5),
      whiteSpace: 'nowrap',
      transform: 'translateX(-50%)',
      '& > span': {
        opacity: 0.72,
      },
    },
    '& li': {
      '& pre': {
        marginTop: theme.spacing(1),
      },
    },
  }),
  {
    ':where(.mode-dark) &': {
      '& :not(pre) > code': {
        // inline code block
        color: '#fff',
      },
      '& strong': {
        color: `var(--muidocs-palette-grey-200, ${darkTheme.palette.grey[200]})`,
      },
      '& h1': {
        color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
      },
      '& h2': {
        color: `var(--muidocs-palette-grey-100, ${darkTheme.palette.grey[100]})`,
      },
      '& h3': {
        color: `var(--muidocs-palette-grey-200, ${darkTheme.palette.grey[200]})`,
      },
      '& h4': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
      },
      '& h5': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
      },
      '& p, & ul, & ol': {
        color: `var(--muidocs-palette-grey-400, ${darkTheme.palette.grey[400]})`,
      },
      '& h1, & h2, & h3, & h4': {
        '&:hover .anchor-link-style': {
          background: alpha(darkTheme.palette.primaryDark[800], 0.3),
          borderColor: `var(--muidocs-palette-primaryDark-500, ${darkTheme.palette.primaryDark[500]})`,
        },
      },
      '& h1 code, & h2 code, & h3 code': {
        color: `var(--muidocs-palette-grey-100, ${darkTheme.palette.grey[100]})`,
      },
      '& table': {
        '& .required': {
          color: '#a5ffa5',
        },
        '& .optional': {
          color: '#a5b3ff',
        },
        '& .prop-type': {
          color: '#ffb6ec',
        },
      },
      '& blockquote': {
        borderColor: `var(--muidocs-palette-warning-500, ${darkTheme.palette.warning[500]})`,
        backgroundColor: alpha(darkTheme.palette.warning[900], 0.2),
        '& p': {
          color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
        },
      },
      '& .MuiCallout-root': {
        '&.MuiCallout-error': {
          color: `var(--muidocs-palette-error-50, ${darkTheme.palette.error[50]})`,
          backgroundColor: alpha(darkTheme.palette.error[900], 0.35),
          borderColor: `var(--muidocs-palette-error-800, ${darkTheme.palette.error[800]})`,
          '& strong': {
            color: `var(--muidocs-palette-error-100, ${darkTheme.palette.error[100]})`,
          },
          '& a': {
            color: `var(--muidocs-palette-error-100, ${darkTheme.palette.error[100]})`,
          },
        },
        '&.MuiCallout-info': {
          color: `var(--muidocs-palette-primary-50, ${darkTheme.palette.primary[50]})`,
          backgroundColor: alpha(darkTheme.palette.primary[900], 0.2),
          borderColor: `var(--muidocs-palette-primary-800, ${darkTheme.palette.primary[800]})`,
          '& strong': {
            color: `var(--muidocs-palette-primary-100, ${darkTheme.palette.primary[100]})`,
          },
        },
        '&.MuiCallout-success': {
          color: `var(--muidocs-palette-success-50, ${darkTheme.palette.success[50]})`,
          backgroundColor: alpha(darkTheme.palette.success[900], 0.35),
          borderColor: `var(--muidocs-palette-success-800, ${darkTheme.palette.success[800]})`,
          '& strong': {
            color: `var(--muidocs-palette-success-100, ${darkTheme.palette.success[100]})`,
          },
          '& a': {
            color: `var(--muidocs-palette-success-100, ${darkTheme.palette.success[100]})`,
          },
        },
        '&.MuiCallout-warning': {
          color: `var(--muidocs-palette-warning-50, ${darkTheme.palette.warning[50]})`,
          backgroundColor: alpha(darkTheme.palette.warning[900], 0.35),
          '& strong': {
            color: `var(--muidocs-palette-warning-800, ${darkTheme.palette.warning[800]})`,
          },
          '& a': {
            color: `var(--muidocs-palette-warning-100, ${darkTheme.palette.warning[100]})`,
          },
        },
      },
      '& a, & a code': {
        color: `var(--muidocs-palette-primary-300, ${darkTheme.palette.primary[300]})`,
      },
      '& a code': {
        color: `var(--muidocs-palette-primary-light, ${darkTheme.palette.primary.light})`,
      },
      '& kbd.key': {
        color: '#fff',
        backgroundColor: `var(--muidocs-palette-primaryDark-900, ${darkTheme.palette.primaryDark[900]})`,
        border: `1px solid var(--muidocs-palette-primaryDark-500, ${darkTheme.palette.primaryDark[500]})`,
        boxShadow: `inset 0 -1px 0 var(--muidocs-palette-primaryDark-700, ${darkTheme.palette.primaryDark[700]})`,
      },
    },
  },
);

const MarkdownElement = React.forwardRef(function MarkdownElement(props, ref) {
  const { className, renderedMarkdown, ...other } = props;
  const more = {};

  if (typeof renderedMarkdown === 'string') {
    // workaround for https://github.com/facebook/react/issues/17170
    // otherwise we could just set `dangerouslySetInnerHTML={undefined}`
    more.dangerouslySetInnerHTML = { __html: renderedMarkdown };
  }

  return <Root className={clsx('markdown-body', className)} {...more} {...other} ref={ref} />;
});

MarkdownElement.propTypes = {
  className: PropTypes.string,
  renderedMarkdown: PropTypes.string,
};

export default MarkdownElement;
