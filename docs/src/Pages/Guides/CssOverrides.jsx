import React from 'react';
import Code from '_shared/Code';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';
import typescriptOverrideCode from './CssOverridesTypescript.example'; // eslint-disable-line

const CssOverrides = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Override stylesheet
    </Typography>

    <Typography variant="body1" gutterBottom>
      Default pickers appearance built based on material-ui theme provided. So pickers will take all
      colors/fonts/theme setting as any other material-ui components.
    </Typography>

    <Typography variant="body1" gutterBottom>
      But we are not providing any for-component classes api to override stylesheet for particular
      component. Only one way to override existed stylesheet - usage of global material-ui theme
      overrides.
    </Typography>

    <SourcablePanel
      title="Override example"
      sourceFile="Guides/CssOverrides.example.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          You can find the override component name and class in the generated classnames for pickers
          components.
        </Typography>
      }
    />

    <Typography variant="h4" gutterBottom>
      For typescript users
    </Typography>

    <Typography variant="body1" gutterBottom>
      Override default material-ui theme to attach picker's component override. (This will also
      autocomplete classnames for overrides)
    </Typography>

    <Code language="ts" text={typescriptOverrideCode} />
  </div>
);

export default CssOverrides;
