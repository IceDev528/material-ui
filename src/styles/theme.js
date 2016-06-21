import merge from 'lodash/merge';
import hashObject from '../utils/hashObject';
import {getContrastRatio} from './colorManipulator';
import {indigo, pink, grey, black, white} from './colors';
import shadows from './shadows';
import transitions from './transitions';
import createTypography from './typography';
import createBreakpoints from './breakpoints';
import zIndex from './zIndex';
import createMixins from './mixins';

export function createMuiTheme(
  palette = createPalette(),
  typography = createTypography(palette),
  breakpoints = createBreakpoints(),
  mixins = createMixins(breakpoints),
  ...more
) {
  const properties = merge({
    palette,
    typography,
    shadows,
    transitions,
    mixins,
    breakpoints,
    zIndex,
  }, ...more);

  if (!properties.hasOwnProperty('id')) {
    properties.id = hashObject(properties);
  }

  const muiTheme = {...properties};

  return muiTheme;
}

export function createPalette({
  primary = indigo,
  accent = pink,
  dark = false,
} = {}) {
  const type = dark ? 'dark' : 'light';

  return {
    type,
    text: shades[type].text,
    background: shades[type].background,
    shades,
    primary,
    accent,
    grey,
    // functions
    getContrastText,
  };
}

export const light = {
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
    icon: 'rgba(0, 0, 0, 0.38)',
    divider: 'rgba(0, 0, 0, 0.12)',
    lightDivider: 'rgba(0, 0, 0, 0.075)',
  },
  background: {
    default: grey[50],
    paper: white,
    appBar: grey[100],
    status: grey[300],
  },
};

export const dark = {
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.70)',
    disabled: 'rgba(255, 255, 255, 0.50)',
    hint: 'rgba(255, 255, 255, 0.50)',
    icon: 'rgba(255, 255, 255, 0.50)',
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  background: {
    default: '#303030',
    paper: grey[800],
    appBar: grey[900],
    status: black,
  },
};

export const shades = {dark, light};

function getContrastText(color) {
  if (getContrastRatio(color, black) < 7) {
    return dark.text.primary;
  }
  return light.text.primary;
}
