import React from 'react';
import {
  ClearFix,
  Mixins,
  Styles,
  Utils,
} from 'material-ui';

const {ColorManipulator} = Utils;
const {StyleResizable, StylePropable} = Mixins;
const {Colors, Typography} = Styles;

const ColorsPage = React.createClass({

  mixins: [
    StyleResizable,
    StylePropable,
  ],

  getStyles() {
    let styles = {
      name: {
        display: 'block',
        marginBottom: 60,
      },
      hex: {
        float: 'right',
      },
      colorGroup: {
        float: 'left',
        padding: '16px 0',
        display: 'block',
        margin: 0,
      },
      headline: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack,
      },
      colorGroupWhenSmall: {
        width: '50%',
      },
      colorGroupWhenMedium: {
        width: '33%',
      },
      colorGroupWhenLarge: {
        width: '25%',
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.colorGroup = this.mergeStyles(styles.colorGroup, styles.colorGroupWhenLarge);
    } else if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.colorGroup = this.mergeStyles(styles.colorGroup, styles.colorGroupWhenMedium);
    } else {
      styles.colorGroup = this.mergeStyles(styles.colorGroup, styles.colorGroupWhenSmall);
    }

    return styles;
  },

  _getColorGroup(color, showAltPalette) {
    let mainPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    let altPalette = ['A100', 'A200', 'A400', 'A700'];
    let cssColor = color.replace(' ', '').replace(color.charAt(0), color.charAt(0).toLowerCase());
    let colors = [];
    let colorGroupStyle = this.getStyles().colorGroup;

    mainPalette.forEach((mainValue) => {
      colors.push(this._getColorBlock(cssColor, mainValue));
    }, this);

    if (showAltPalette) {
      altPalette.forEach((altValue) => {
        colors.push(this._getColorBlock(cssColor, altValue));
      }, this);
    }

    return (
      <ul style={colorGroupStyle}>
        {this._getColorBlock(cssColor, 500, color)}
        {colors}
      </ul>
    );
  },

  _getColorBlock(colorName, colorValue, colorTitle) {
    let bgColorText = colorName + colorValue;
    let bgColor = Colors[bgColorText];
    let fgColor = Colors.fullBlack;
    let contrastRatio = ColorManipulator.contrastRatio(bgColor, fgColor);
    let blockTitle;

    if (contrastRatio < 7) fgColor = Colors.fullWhite;
    if (colorTitle) blockTitle = <span style={this.getStyles().name}>{colorTitle}</span>;

    let styles = {
      backgroundColor: bgColor,
      color: fgColor,
      listStyle: 'none',
      padding: 15,
    };

    return (
      <li style={styles}>
        {blockTitle}
        {bgColorText}
      </li>
    );
  },

  render() {
    let mainColors = [
      'Red', 'Pink', 'Purple', 'Deep Purple', 'Indigo', 'Blue', 'Light Blue',
      'Cyan', 'Teal', 'Green', 'Light Green', 'Lime', 'Yellow', 'Amber', 'Orange', 'Deep Orange',
    ];
    let neutralColors = ['Brown', 'Blue Grey', 'Grey'];
    let colorGroups = [];
    let neutralGroups = [];

    mainColors.forEach((color) => {
      colorGroups.push(this._getColorGroup(color, true));
    }, this);

    neutralColors.forEach((color) => {
      neutralGroups.push(this._getColorGroup(color, false));
    }, this);

    let googleLink = 'https://www.google.com/design/spec/style/color.html#color-ui-color-palette';
    let githubLink = 'https://github.com/callemall/material-ui/blob/master/src/styles/colors.js';

    return (
      <div>
        <h2 style={this.getStyles().headline}>UI Color Palette</h2>
        <p>
          We&#39;ve created javascript variables for every color used in
          the <a href={googleLink}>UI Color Palette</a>. They are stored
          in <a href={githubLink}>styles/colors.js</a>.
        </p>

        <ClearFix>
          {colorGroups}

          <div>
            {neutralGroups}
          </div>
        </ClearFix>
      </div>
    );
  },

});

export default ColorsPage;
