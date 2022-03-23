import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { TypographyTypeMap, TypographyProps } from './TypographyProps';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getTypographyUtilityClass } from './typographyClasses';

export const TypographyContext = React.createContext(false);

const useUtilityClasses = (ownerState: TypographyProps) => {
  const { gutterBottom, noWrap, level } = ownerState;

  const slots = {
    root: ['root', level, gutterBottom && 'gutterBottom', noWrap && 'noWrap'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getTypographyUtilityClass, {});
};

const StartDecorator = styled('span', {
  name: 'MuiTypography',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})<{ ownerState: TypographyProps & { nested: boolean } }>(({ ownerState }) => ({
  display: 'inline-flex',
  marginInlineEnd: 'min(var(--Typography-gap, 0.25em), 0.5rem)',
  ...((ownerState.sx as any)?.alignItems === 'flex-start' && {
    marginTop: '2px', // this makes the alignment perfect in most cases
  }),
}));

const EndDecorator = styled('span', {
  name: 'MuiTypography',
  slot: 'endDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})<{ ownerState: TypographyProps & { nested: boolean } }>(({ ownerState }) => ({
  display: 'inline-flex',
  marginInlineStart: 'min(var(--Typography-gap, 0.25em), 0.5rem)',
  ...((ownerState.sx as any)?.alignItems === 'flex-start' && {
    marginTop: '2px', // this makes the alignment perfect in most cases
  }),
}));

const TypographyRoot = styled('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TypographyProps & { nested: boolean } }>(({ theme, ownerState }) => ({
  '--Icon-fontSize': '1.25em',
  margin: 0,
  ...(ownerState.nested
    ? {
        display: 'inline',
      }
    : {
        fontFamily: theme.vars.fontFamily.body, // for nested typography, the font family will be inherited.
        display: 'block',
      }),
  ...((ownerState.startDecorator || ownerState.endDecorator) && {
    display: 'flex',
    alignItems: 'center',
    ...(ownerState.nested && {
      display: 'inline-flex',
      ...(ownerState.startDecorator && {
        verticalAlign: 'bottom', // to make the text align with the parent's content
      }),
    }),
  }),
  ...(ownerState.level && ownerState.level !== 'inherit' && theme.typography[ownerState.level]),
  ...(ownerState.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  ...(ownerState.gutterBottom && {
    marginBottom: '0.35em',
  }),
}));

const defaultVariantMapping: Record<string, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  inherit: 'p',
};

const Typography = React.forwardRef(function Typography(inProps, ref) {
  const themeProps = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiTypography',
  });

  const nested = React.useContext(TypographyContext);

  const props = extendSxProp(themeProps);

  const {
    className,
    component,
    color, // declare to prevent type error spread to TypographyRoot
    gutterBottom = false,
    noWrap = false,
    level: levelProp = 'body1',
    levelMapping = {},
    children,
    endDecorator,
    startDecorator,
    ...other
  } = props;

  const level = nested ? inProps.level || 'inherit' : levelProp;

  const ownerState = {
    ...props,
    level,
    className,
    component,
    gutterBottom,
    noWrap,
    nested,
  };

  const Component =
    component || (nested ? 'span' : levelMapping[level] || defaultVariantMapping[level] || 'span');

  const classes = useUtilityClasses(ownerState);

  return (
    <TypographyContext.Provider value>
      <TypographyRoot
        as={Component as React.ElementType}
        ref={ref}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        {...other}
      >
        {startDecorator && (
          <StartDecorator ownerState={ownerState} className={classes.startDecorator}>
            {startDecorator}
          </StartDecorator>
        )}

        {children}
        {endDecorator && (
          <EndDecorator ownerState={ownerState} className={classes.endDecorator}>
            {endDecorator}
          </EndDecorator>
        )}
      </TypographyRoot>
    </TypographyContext.Provider>
  );
}) as OverridableComponent<TypographyTypeMap>;

Typography.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.any,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  level: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['body1', 'body2', 'body3', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit']),
    PropTypes.string,
  ]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, body1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   body3: 'p',
   *   inherit: 'p',
   * }
   */
  levelMapping: PropTypes /* @typescript-to-proptypes-ignore */.object,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,
  /**
   * Element placed before the children.
   */
  startDecorator: PropTypes.node,
} as any;

export default Typography;
