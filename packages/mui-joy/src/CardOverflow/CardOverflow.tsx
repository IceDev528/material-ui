import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getCardOverflowUtilityClass } from './cardOverflowClasses';
import { CardOverflowProps, CardOverflowTypeMap } from './CardOverflowProps';

const useUtilityClasses = (ownerState: CardOverflowProps) => {
  const { variant, color } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getCardOverflowUtilityClass, {});
};

const CardOverflowRoot = styled('div', {
  name: 'MuiCardOverflow',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CardOverflowProps }>(({ theme, ownerState }) => {
  const childRadius =
    ownerState.variant === 'outlined'
      ? `calc(var(--Card-radius) - var(--variant-outlinedBorderWidth))`
      : 'var(--Card-radius)';
  return [
    {
      marginLeft: 'var(--CardOverflow-offset)',
      marginRight: 'var(--CardOverflow-offset)',
      borderRadius: 'var(--Card-radius)',
      // use data-attribute instead of :first-child, :last-child to support zero config SSR (emotion)
      '&[data-first-child]': {
        '--AspectRatio-radius': `${childRadius} ${childRadius} 0 0`,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: 'var(--CardOverflow-offset)',
      },
      '&[data-last-child]': {
        '--AspectRatio-radius': `0 0 ${childRadius} ${childRadius}`,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginBottom: 'var(--CardOverflow-offset)',
      },
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
  ];
});

const CardOverflow = React.forwardRef(function CardOverflow(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardOverflowProps>({
    props: inProps,
    name: 'MuiCardOverflow',
  });

  const {
    className,
    component = 'div',
    children,
    color = 'neutral',
    variant = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardOverflowRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children}
    </CardOverflowRoot>
  );
}) as OverridableComponent<CardOverflowTypeMap>;

CardOverflow.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the CardOverflow if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
} as any;

export default CardOverflow;
