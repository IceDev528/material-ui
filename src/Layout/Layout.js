// @flow
/**
 * A layout component using the following libs as inspiration.
 *
 * For the implementation:
 * - http://v4-alpha.getbootstrap.com/layout/flexbox-grid/
 * - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
 * - https://github.com/roylee0704/react-flexbox-grid
 * - https://material.angularjs.org/latest/layout/introduction
 *
 * Follow this flexbox Guide to better understand the underlying model:
 * - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
import React, { Element } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import requirePropFactory from '../utils/requirePropFactory';

const GUTTERS = [0, 8, 16, 24, 40];
const GRID_SIZES = [true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  // For the auto layouting
  const styles = {
    [`grid-${breakpoint}`]: {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: '100%',
    },
  };

  GRID_SIZES.forEach((size) => {
    if (typeof size === 'boolean') { // Skip the first one as handle above.
      return;
    }

    // Only keep 6 significant numbers.
    const width = `${Math.round((size / 12) * Math.pow(10, 6)) / Math.pow(10, 4)}%`;

    /* eslint-disable max-len */
    // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/b0508a975d711d6b24c01f57dd5445c22699fac4/scss/mixins/_grid.scss#L69
    /* eslint-enable max-len */
    styles[`grid-${breakpoint}-${size}`] = {
      flexBasis: width,
      maxWidth: width,
    };
  });

  // No need for a media query for the first size.
  if (breakpoint === 'xs') {
    Object.assign(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function generateGutter(theme, breakpoint) {
  const styles = {};

  GUTTERS.forEach((gutter, index) => {
    if (index === 0) { // Skip the default style.
      return;
    }

    styles[`gutter-${breakpoint}-${gutter}`] = {
      margin: -gutter / 2,
      width: `calc(100% + ${gutter}px)`,
      '& > $typeItem': {
        padding: gutter / 2,
      },
    };
  });

  return styles;
}

export const styleSheet = createStyleSheet('MuiLayout', (theme) => {
  // Default CSS values
  // flex: '0 1 auto',
  // flexDirection: 'row',
  // alignItems: 'flex-start',
  // flexWrap: 'nowrap',
  // justifyContent: 'flex-start',

  return {
    typeContainer: {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
    },
    typeItem: {
      boxSizing: 'border-box',
      flex: '0 0 auto',
    },
    'direction-xs-column': {
      flexDirection: 'column',
    },
    'direction-xs-column-reverse': {
      flexDirection: 'column-reverse',
    },
    'direction-xs-row-reverse': {
      flexDirection: 'row-reverse',
    },
    'wrap-xs-nowrap': {
      flexWrap: 'nowrap',
    },
    'align-xs-center': {
      alignItems: 'center',
    },
    'align-xs-flex-start': {
      alignItems: 'flex-start',
    },
    'align-xs-flex-end': {
      alignItems: 'flex-end',
    },
    'justify-xs-center': {
      justifyContent: 'center',
    },
    'justify-xs-flex-end': {
      justifyContent: 'flex-end',
    },
    'justify-xs-space-between': {
      justifyContent: 'space-between',
    },
    'justify-xs-space-around': {
      justifyContent: 'space-around',
    },
    ...generateGutter(theme, 'xs'),
    ...theme.breakpoints.keys.reduce((styles, key) => {
      // Use side effect for performance.
      generateGrid(styles, theme, key);

      return styles;
    }, {}),
  };
});

type Align = 'flex-start' | 'center' | 'flex-end' | 'stretch'
type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type Gutters = 0 | 8 | 16 | 24 | 40
type GridSizes = boolean | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Justify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse'

type Props = {
  /**
   * The content of the component.
   */
  children?: Element<any>,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: string | Function,
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container?: boolean,
  /**
   * It true, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item?: boolean,
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs?: GridSizes,
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm?: GridSizes, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md?: GridSizes, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg?: GridSizes, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl?: GridSizes, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  align?: Align, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction?: Direction, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  gutter?: Gutters, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify?: Justify, // eslint-disable-line react/sort-prop-types
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap?: Wrap, // eslint-disable-line react/sort-prop-types
};

function Layout(props: Props, context: any) {
  const {
    children,
    className,
    component,
    container,
    item,
    align,
    direction,
    xs,
    sm,
    md,
    lg,
    xl,
    gutter,
    justify,
    wrap,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  // workaround: see https://github.com/facebook/flow/issues/1660#issuecomment-297775427
  const ComponentProp = component || Layout.defaultProps.component;

  return (
    <ComponentProp
      className={classNames({
        [classes.typeContainer]: container,
        [classes.typeItem]: item,
        [classes[`gutter-xs-${String(gutter)}`]]: container && gutter !== 0,
        [classes[`direction-xs-${String(direction)}`]]: direction !== Layout.defaultProps.direction,
        [classes[`wrap-xs-${String(wrap)}`]]: wrap !== Layout.defaultProps.wrap,
        [classes[`align-xs-${String(align)}`]]: align !== Layout.defaultProps.align,
        [classes[`justify-xs-${String(justify)}`]]: justify !== Layout.defaultProps.justify,
        [classes['grid-xs']]: xs === true,
        [classes[`grid-xs-${String(xs)}`]]: xs && xs !== true,
        [classes['grid-sm']]: sm === true,
        [classes[`grid-sm-${String(sm)}`]]: sm && sm !== true,
        [classes['grid-md']]: md === true,
        [classes[`grid-md-${String(md)}`]]: md && md !== true,
        [classes['grid-lg']]: lg === true,
        [classes[`grid-lg-${String(lg)}`]]: lg && lg !== true,
        [classes['grid-xl']]: xl === true,
        [classes[`grid-xl-${String(xl)}`]]: xl && xl !== true,
      }, className)}
      {...other}
    >
      {children}
    </ComponentProp>
  );
}

Layout.defaultProps = {
  component: 'div',
  container: false,
  item: false,
  align: 'stretch',
  direction: 'row',
  gutter: 16,
  justify: 'flex-start',
  wrap: 'wrap',
};

Layout.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

/**
 * Add a wrapper component to generate some helper messages in the development
 * environment.
 */
let LayoutWrapper = Layout; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV !== 'production') {
  const requireProp = requirePropFactory('Layout');

  LayoutWrapper = (props: any) => <Layout {...props} />;

  LayoutWrapper.propTypes = {
    align: requireProp('container'),
    direction: requireProp('container'),
    gutter: requireProp('container'),
    justify: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
  };
}

export default LayoutWrapper;
