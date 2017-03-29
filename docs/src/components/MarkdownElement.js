// @flow weak

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import marked from 'marked';
import customPropTypes from 'material-ui/utils/customPropTypes';
import prism from 'docs/src/utils/prism';

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return prism.highlight(code, prism.languages.jsx);
  },
});

const styleSheet = createStyleSheet('MarkdownElement', (theme) => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: '0 10px',
    '& pre': {
      margin: '25px 0',
      padding: '12px 18px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 3,
    },
    '& code': {
      display: 'inline-block',
      lineHeight: 1.6,
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      padding: '3px 6px',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      fontSize: 14,
    },
    '& h1': {
      ...theme.typography.display2,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
    },
    '& h2': {
      ...theme.typography.display1,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
    },
    '& h3': {
      ...theme.typography.headline,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
    },
    '& p, & ul, & ol': {
      lineHeight: 1.6,
    },
    '& p code, & ul code': {
      fontSize: 14,
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      overflow: 'hidden',
    },
    '& thead': {
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
    '& tbody': {
      fontSize: 13,
      lineHeight: 1.5,
      color: theme.palette.text.primary,
    },
    '& td': {
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 8}px ${
        theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
      textAlign: 'left',
    },
    '& td:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& td compact': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& td code': {
      fontSize: 13,
    },
    '& th': {
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: '0 56px 0 24px',
      textAlign: 'left',
    },
    '& th:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& tr': {
      height: 48,
    },
    '& thead tr': {
      height: 64,
    },
    '& strong': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& blockquote': {
      borderLeft: `5px solid ${theme.palette.text.hint}`,
      background: theme.palette.background.paper,
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 3}px`,
      margin: `${theme.spacing.unit * 3}px 0`,
    },
  },
}));

function MarkdownElement(props, context) {
  const {
    className,
    text,
  } = props;

  const classes = context.styleManager.render(styleSheet);

  /* eslint-disable react/no-danger */
  return (
    <div
      className={classNames(classes.root, 'markdown-body', className)}
      dangerouslySetInnerHTML={{ __html: marked(text) }}
    />
  );
  /* eslint-enable */
}

MarkdownElement.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

MarkdownElement.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default MarkdownElement;
