// @flow weak

import { Component, PropTypes } from 'react';
import { createStyleManager } from 'stylishly/lib/styleManager';
import { createPluginRegistry } from 'stylishly/lib/pluginRegistry';
import vendorPrefixer from 'stylishly-vendor-prefixer';
import pseudoClasses from 'stylishly-pseudo-classes';
import units from 'stylishly-units';
import nested from 'stylishly-nested';
import atRules from 'stylishly-at-rules';
import { createMuiTheme } from './theme';

export function createDefaultContext(props = {}) {
  const theme = props.theme || createMuiTheme();
  const styleManager = props.styleManager || createStyleManager({
    theme,
    pluginRegistry: createPluginRegistry(
      nested(),
      atRules(),
      pseudoClasses(),
      units(),
      vendorPrefixer()
    ),
  });
  return { theme, styleManager };
}

export default class MuiThemeProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    styleManager: PropTypes.object,
    theme: PropTypes.object,
  };

  static childContextTypes = {
    styleManager: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  getChildContext() {
    const { theme, styleManager } = this;
    return {
      theme,
      styleManager,
    };
  }

  componentWillMount() {
    const { theme, styleManager } = createDefaultContext(this.props);
    this.theme = theme;
    this.styleManager = styleManager;
  }

  componentWillUpdate(nextProps) {
    if (this.theme && nextProps.theme && nextProps.theme !== this.theme) {
      this.theme = nextProps.theme;
      this.styleManager.replaceTheme(nextProps.theme);
      this.styleManager.empty();
    }
  }

  theme = undefined;
  styleManager = undefined;

  render() {
    return this.props.children;
  }
}
