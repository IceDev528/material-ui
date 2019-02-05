import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { _rewriteUrlForNextExport } from 'next/router';

const styles = {
  item: {
    flexGrow: 1,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardMedia: {
    height: 0,
    paddingTop: '65%',
  },
};

function layouts(t) {
  return [
    {
      title: t('dashboardTitle'),
      description: t('dashboardDescr'),
      src: '/static/images/layouts/dashboard.png',
      href: '/getting-started/page-layout-examples/dashboard',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/dashboard',
    },
    {
      title: t('signInTitle'),
      description: t('signInDescr'),
      src: '/static/images/layouts/sign-in.png',
      href: '/getting-started/page-layout-examples/sign-in',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/sign-in',
    },
    {
      title: t('blogTitle'),
      description: t('blogDescr'),
      src: '/static/images/layouts/blog.png',
      href: '/getting-started/page-layout-examples/blog',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/blog',
    },
    {
      title: t('checkoutTitle'),
      description: t('checkoutDescr'),
      src: '/static/images/layouts/checkout.png',
      href: '/getting-started/page-layout-examples/checkout',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/checkout',
    },
    {
      title: t('albumTitle'),
      description: t('albumDescr'),
      src: '/static/images/layouts/album.png',
      href: '/getting-started/page-layout-examples/album',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/album',
    },
    {
      title: t('pricingTitle'),
      description: t('pricingDescr'),
      src: '/static/images/layouts/pricing.png',
      href: '/getting-started/page-layout-examples/pricing',
      source:
        'https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/pricing',
    },
  ];
}

function PageLayoutExamples(props) {
  const { classes, t } = props;

  return (
    <Grid container spacing={16}>
      {layouts(t).map(layout => (
        <Grid item sm={6} md={4} className={classes.item} key={layout.title}>
          <Card className={classes.card}>
            <CardMedia
              component="a"
              href={_rewriteUrlForNextExport(layout.href)}
              className={classes.cardMedia}
              image={layout.src}
              title={layout.title}
              target="_blank"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" align="left" component="h2">
                {layout.title}
              </Typography>
              <Typography component="p">{layout.description}</Typography>
            </CardContent>
            <CardActions>
              <Button component="a" href={layout.source} size="small" color="primary">
                {t('sourceCode')}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

PageLayoutExamples.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({ t: state.options.t })),
  withStyles(styles),
)(PageLayoutExamples);
