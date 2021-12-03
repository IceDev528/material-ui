import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import BrandingProvider from 'docs/src/BrandingProvider';
import CssBaseline from '@mui/material/CssBaseline';
import AppHeader from 'docs/src/layouts/AppHeader';
import CoreHero from 'docs/src/components/productCore/CoreHero';
import CoreComponents from 'docs/src/components/productCore/CoreComponents';
import CoreTheming from 'docs/src/components/productCore/CoreTheming';
import CoreStyling from 'docs/src/components/productCore/CoreStyling';
import CoreHeroEnd from 'docs/src/components/productCore/CoreHeroEnd';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import AppFooter from 'docs/src/layouts/AppFooter';
import SurveyBanner from 'docs/src/components/home/SurveyBanner';

export default function Home() {
  return (
    <BrandingProvider>
      <Head
        title="MUI Core: Ready to use components, free forever"
        description="Get a growing list of components, ready-to-use, free forever and with accessibility always in mind. We've built the foundational UI blocks for your design system so you don't have to."
        card="/static/social-previews/core-preview.jpg"
      />
      <CssBaseline />
      <SurveyBanner />
      <AppHeader />
      <main>
        <CoreHero />
        <References companies={CORE_CUSTOMERS} />
        <CoreComponents />
        <CoreTheming />
        <CoreStyling />
        <CoreHeroEnd />
      </main>
      <AppFooter />
    </BrandingProvider>
  );
}
