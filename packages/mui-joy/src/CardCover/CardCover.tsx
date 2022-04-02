import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getCardCoverUtilityClass } from './cardCoverClasses';
import { CardCoverProps, CardCoverTypeMap } from './CardCoverProps';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardCoverUtilityClass, {});
};

const CardCoverRoot = styled('div', {
  name: 'MuiCardCover',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CardCoverProps }>({
  position: 'absolute',
  zIndex: 0,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: 'var(--Card-radius)',
  // use data-attribute instead of :first-child to support zero config SSR (emotion)
  '& > [data-first-child]': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    boxSizing: 'border-box',
    borderRadius: 'var(--Card-radius)',
  },
});

const CardCover = React.forwardRef(function CardCover(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardCoverProps>({
    props: inProps,
    name: 'MuiCardCover',
  });

  const { className, component = 'div', children, ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses();

  return (
    <CardCoverRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {React.Children.map(children, (child, index) =>
        index === 0 && React.isValidElement(child)
          ? React.cloneElement(child, { 'data-first-child': '' })
          : child,
      )}
    </CardCoverRoot>
  );
}) as OverridableComponent<CardCoverTypeMap>;

CardCover.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the CardCover if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
} as any;

export default CardCover;
