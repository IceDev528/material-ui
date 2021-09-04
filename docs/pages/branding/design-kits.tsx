import * as React from 'react';
import Head from 'docs/src/modules/components/Head';
import Divider from '@mui/material/Divider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import DesignKitHero from 'docs/src/components/productDesignKit/DesignKitHero';
import DesignKitValues from 'docs/src/components/productDesignKit/DesignKitValues';
import DesignKitDemo from 'docs/src/components/productDesignKit/DesignKitDemo';
import DesignKitFAQ from 'docs/src/components/productDesignKit/DesignKitFAQ';
import Testimonials from 'docs/src/components/home/Testimonials';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import BrandingProvider from 'docs/src/BrandingProvider';

export default function DesignKits() {
  return (
    <BrandingProvider>
      <Head
        title="MUI in your favorite design tool."
        description="Pick your favorite design tool to enjoy and use MUI components. Boost consistency and facilitate communication when working with developers."
      />
      <AppHeader />
      <main>
        <DesignKitHero />
        <DesignKitValues />
        <DesignKitDemo />
        <DesignKitFAQ />
        <Testimonials />
        <HeroEnd />
      </main>
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
