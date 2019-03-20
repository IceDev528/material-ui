import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Head from 'docs/src/modules/components/Head';
import AppContent from 'docs/src/modules/components/AppContent';
import Demo from 'docs/src/modules/components/Demo';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import EditPage from 'docs/src/modules/components/EditPage';
import MarkdownDocsContents from 'docs/src/modules/components/MarkdownDocsContents';
import {
  getHeaders,
  getTitle,
  getDescription,
  demoRegexp,
} from 'docs/src/modules/utils/parseMarkdown';
import compose from 'docs/src/modules/utils/compose';
import { LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';

const styles = theme => ({
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  markdownElement: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
  },
});

const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/blob/next';

function MarkdownDocs(props) {
  const {
    classes,
    disableAd,
    markdown: markdownProp,
    markdownLocation: markdownLocationProp,
    req,
    reqPrefix,
    reqSource,
    userLanguage,
  } = props;

  let demos;
  let markdown = markdownProp;

  if (req) {
    demos = {};
    const markdowns = {};
    const sourceFiles = reqSource.keys();
    req.keys().forEach(filename => {
      if (filename.indexOf('.md') !== -1) {
        const match = filename.match(/-([a-z]{2})\.md$/);

        if (match && LANGUAGES_IN_PROGRESS.indexOf(match[1]) !== -1) {
          markdowns[match[1]] = req(filename);
        } else {
          markdowns.en = req(filename);
        }
      } else {
        const demoName = `${reqPrefix}/${filename.replace(/.\//g, '')}`;
        const tsFilename = filename.replace(/\.js$/, '.tsx');
        const hasTSVersion = sourceFiles.indexOf(tsFilename) !== -1;

        demos[demoName] = {
          ...demos[demoName],
          js: req(filename).default,
          raw: reqSource(filename),
          rawTS: hasTSVersion ? reqSource(tsFilename) : undefined,
        };
      }
    });
    markdown = markdowns[userLanguage] || markdowns.en;
  }

  const headers = getHeaders(markdown);
  // eslint-disable-next-line no-underscore-dangle
  global.__MARKED_UNIQUE__ = {};

  return (
    <MarkdownDocsContents markdown={markdown} markdownLocation={markdownLocationProp}>
      {({ contents, markdownLocation }) => (
        <AppFrame>
          <Head
            title={`${headers.title || getTitle(markdown)} - Material-UI`}
            description={headers.description || getDescription(markdown)}
          />
          <AppTableOfContents contents={contents} />
          {disableAd ? null : (
            <Portal container={() => document.querySelector('.description')}>
              <Ad />
            </Portal>
          )}
          <AppContent className={classes.root}>
            <div className={classes.header}>
              <EditPage
                markdownLocation={markdownLocation}
                sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
              />
            </div>
            {contents.map(content => {
              if (demos && demoRegexp.test(content)) {
                let demoOptions;
                try {
                  demoOptions = JSON.parse(`{${content}}`);
                } catch (err) {
                  console.error(err); // eslint-disable-line no-console
                  return null;
                }

                const name = demoOptions.demo;
                if (!demos || !demos[name]) {
                  const errorMessage = [
                    `Missing demo: ${name}. You can use one of the following:`,
                    Object.keys(demos),
                  ].join('\n');

                  if (userLanguage === 'en') {
                    throw new Error(errorMessage);
                  }

                  warning(false, errorMessage);

                  const warnIcon = (
                    <span role="img" aria-label="warning">
                      ⚠️
                    </span>
                  );
                  return (
                    <div key={content}>
                      {warnIcon} Missing demo `{name}` {warnIcon}
                    </div>
                  );
                }

                return (
                  <Demo
                    key={content}
                    demo={demos[name]}
                    demoOptions={demoOptions}
                    githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
                  />
                );
              }

              return (
                <MarkdownElement className={classes.markdownElement} key={content} text={content} />
              );
            })}
          </AppContent>
        </AppFrame>
      )}
    </MarkdownDocsContents>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  disableAd: PropTypes.bool,
  markdown: PropTypes.string,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
  req: PropTypes.func,
  reqPrefix: PropTypes.string,
  reqSource: PropTypes.func,
  userLanguage: PropTypes.string.isRequired,
};

MarkdownDocs.defaultProps = {
  disableAd: false,
};

export default compose(
  connect(state => ({
    userLanguage: state.options.userLanguage,
  })),
  withStyles(styles),
)(MarkdownDocs);
