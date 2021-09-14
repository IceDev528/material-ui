import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheetManager } from 'styled-components';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import rtlPluginSc from 'stylis-plugin-rtl-sc';
import { useTheme } from '@mui/material/styles';

// Cache for the rtl version of the styles
const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});

export default function StyledEngineProvider(props) {
  const theme = useTheme();

  const rtl = theme.direction === 'rtl';
  let Wrapper = React.Fragment;
  let wraperProps = {};

  // Only happens client-side after the hydration
  if (rtl) {
    Wrapper = CacheProvider;
    wraperProps = {
      value: cacheRtl,
    };
  }

  return (
    <StyleSheetManager stylisPlugins={rtl ? [rtlPluginSc] : []}>
      <Wrapper {...wraperProps}>{props.children}</Wrapper>
    </StyleSheetManager>
  );
}

StyledEngineProvider.propTypes = {
  children: PropTypes.node,
};
