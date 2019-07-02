/* eslint-disable no-underscore-dangle */

import React from 'react';
import NextHead from 'next/head';
import { Router, withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Head(props) {
  const { t, userLanguage } = useSelector(state => ({
    t: state.options.t,
    userLanguage: state.options.userLanguage,
  }));
  const { description = t('strapline'), router, title = t('headTitle') } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MaterialUI" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://material-ui.com/static/brand.png" />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={`https://material-ui.com${Router._rewriteUrlForNextExport(router.asPath)}`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://material-ui.com/static/brand.png" />
      <meta property="og:ttl" content="604800" />
      {/* Algolia */}
      <meta name="docsearch:language" content={userLanguage} />
      <meta name="docsearch:version" content="master" />
    </NextHead>
  );
}

Head.propTypes = {
  description: PropTypes.string,
  router: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default withRouter(Head);
