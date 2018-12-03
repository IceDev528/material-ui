import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import AppTheme from 'docs/src/modules/components/AppTheme';
import Terms from 'docs/src/pages/premium-themes/onepirate/Terms';

function Page() {
  return (
    <AppTheme title="Onepirate theme - Material-UI" description="A onepirate theme">
      <Terms />
    </AppTheme>
  );
}

export default withRoot(Page);
