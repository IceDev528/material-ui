import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import NoSsr from '@mui/material/NoSsr';
import Divider from '@mui/material/Divider';
import SurveyBanner from 'docs/src/components/home/SurveyBanner';
import AppHeader from 'docs/src/layouts/AppHeader';
import Hero from 'docs/src/components/home/Hero';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import ProductSuite from 'docs/src/components/home/ProductSuite';
import ValueProposition from 'docs/src/components/home/ValueProposition';
import DesignSystemComponents from 'docs/src/components/home/DesignSystemComponents';
import Testimonials from 'docs/src/components/home/Testimonials';
import Sponsors from 'docs/src/components/home/Sponsors';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';
import BrandingProvider from 'docs/src/BrandingProvider';
import NewsletterToast from 'docs/src/components/home/NewsletterToast';

export default function Home() {
  return (
    <BrandingProvider>
      <Head
        title="MUI: The React component library you always wanted"
        description="MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design. You will develop React applications faster."
      />
      <NoSsr>
        <NewsletterToast />
      </NoSsr>
      <SurveyBanner />
      <AppHeader />
      <main>
        <Hero />
        <References companies={CORE_CUSTOMERS} />
        <ProductSuite />
        <ValueProposition />
        <DesignSystemComponents />
        <Testimonials />
        <Sponsors />
        <HeroEnd />
        <Divider />
      </main>
      <AppFooter />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MUI",
  "url": "https://mui.com/",
  "logo": "https://mui.com/static/logo.png",
  "sameAs": [
    "https://twitter.com/materialUI",
    "https://github.com/mui-org/material-ui",
    "https://opencollective.com/material-ui"
  ]
}
          `,
        }}
      />
    </BrandingProvider>
  );
}
