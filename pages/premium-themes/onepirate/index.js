import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Home from 'docs/src/pages/premium-themes/onepirate/Home';

function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <Home />
    </AppTheme>
  );
}

export default withRoot(Page);
