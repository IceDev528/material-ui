
const defaultConstants = {
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeightLight: 300,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
};

export default function createTypography(palette, constants = defaultConstants) {
  return {
    ...constants,
    display4: {
      fontSize: 112,
      fontWeight: constants.fontWeightLight,
      fontFamily: constants.fontFamily,
    },
    display3: {
      fontSize: 56,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
    },
    display2: {
      fontSize: 45,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
    },
    display1: {
      fontSize: 34,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
    },
    headline: {
      fontSize: 24,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
    },
    title: {
      fontSize: 20,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
    },
    subheading: {
      fontSize: 16,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
    },
    body2: {
      fontSize: 14,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
    },
    body1: {
      fontSize: 14,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
    },
    caption: {
      fontSize: 12,
      fontWeight: constants.fontWeightNormal,
      fontFamily: constants.fontFamily,
      color: palette.text.secondary,
    },
    button: {
      fontSize: 14,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
      textTransform: 'uppercase',
    },
  };
}
