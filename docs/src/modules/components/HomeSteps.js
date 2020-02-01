import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { FileDownload as FileDownloadIcon } from '@material-ui/docs';
import BuildIcon from '@material-ui/icons/Build';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Link from 'docs/src/modules/components/Link';

const InstallationLink = React.forwardRef((buttonProps, ref) => (
  <Link naked prefetch href="/getting-started/installation" ref={ref} {...buttonProps} />
));

const UsageLink = React.forwardRef((buttonProps, ref) => (
  <Link naked prefetch href="/getting-started/usage" ref={ref} {...buttonProps} />
));

const styles = theme => ({
  container: {
    marginTop: theme.spacing(5),
  },
  step: {
    border: `12px solid ${theme.palette.background.level1}`,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.background.level2,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 4),
    },
  },
  leftStep: {
    [theme.breakpoints.up('md')]: {
      borderLeftWidth: 12,
      borderRightWidth: 6,
      borderBottomWidth: 0,
    },
  },
  rightStep: {
    borderBottomWidth: 0,
    [theme.breakpoints.up('md')]: {
      borderLeftWidth: 6,
      borderRightWidth: 12,
    },
  },
  stepTitle: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    alignItems: 'center',
  },
  stepIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    fontSize: 30,
  },
  stepBody: {
    minHeight: 290,
  },
  markdownElement: {
    maxWidth: `calc(100vw - ${(theme.spacing(5) + 1) * 2}px)`,
    '& pre, & pre[class*="language-"], & code': {
      // backgroundColor: 'transparent',
    },
    '& pre, & pre[class*="language-"]': {
      padding: theme.spacing(1, 0),
      margin: theme.spacing(1, 0),
    },
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  link: {
    marginTop: theme.spacing(1),
    display: 'block',
  },
  img: {
    maxWidth: 500,
    width: '100%',
    height: 'auto',
  },
});

function HomeSteps(props) {
  const { classes } = props;
  const t = useSelector(state => state.options.t);

  return (
    <Container disableGutters maxwidth="lg" className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={6} className={clsx(classes.step, classes.leftStep)}>
          <div className={classes.stepTitle}>
            <FileDownloadIcon className={classes.stepIcon} />
            <Typography variant="h6" component="h3">
              {t('installation')}
            </Typography>
          </div>
          <div className={classes.stepBody}>
            <Typography variant="subtitle1" component="div" gutterBottom>
              {t('installDescr')}
            </Typography>
            <MarkdownElement
              className={classes.markdownElement}
              text={`
  \`\`\`sh
  $ npm install @material-ui/core
  \`\`\`
                `}
            />
            <Link
              variant="subtitle1"
              color="inherit"
              href="https://github.com/mui-org/material-ui/tree/master/examples/cdn"
              gutterBottom
            >
              {t('cdn')}
            </Link>
            <Typography variant="subtitle1" component="div" gutterBottom>
              {t('loadFont')}
            </Typography>
            <MarkdownElement
              className={classes.markdownElement}
              text={`
  \`\`\`html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  \`\`\`
                `}
            />
          </div>
          <Divider className={classes.divider} />
          <Button component={InstallationLink}>{t('installButton')}</Button>
        </Grid>
        <Grid item xs={12} md={6} className={clsx(classes.step, classes.rightStep)}>
          <div className={classes.stepTitle}>
            <BuildIcon className={classes.stepIcon} />
            <Typography variant="h6" component="h3">
              {t('usage')}
            </Typography>
          </div>
          <div className={classes.stepBody}>
            <Typography variant="subtitle1" component="div" gutterBottom>
              {t('usageDescr')}
            </Typography>
            <MarkdownElement
              className={classes.markdownElement}
              text={`
  \`\`\`jsx
  import React from 'react';
  import Button from '@material-ui/core/Button';

  const App = () => (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
  \`\`\`
                `}
            />
          </div>
          <Divider className={classes.divider} />
          <Button component={UsageLink}>{t('usageButton')}</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

HomeSteps.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeSteps);
