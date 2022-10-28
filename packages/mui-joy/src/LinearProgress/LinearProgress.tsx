import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import { css, keyframes } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getLinearProgressUtilityClass } from './linearProgressClasses';
import {
  LinearProgressOwnerState,
  LinearProgressProps,
  LinearProgressTypeMap,
} from './LinearProgressProps';

// TODO: replace `left` with `inset-inline-start` in the future to work with writing-mode. https://caniuse.com/?search=inset-inline-start
//       replace `width` with `inline-size`, not sure why inline-size does not work with animation in Safari.
const progressKeyframe = keyframes`
  0% {
    left: var(--_LinearProgress-progressInset);
    width: var(--LinearProgress-progressMinWidth);
  }

  25% {
    width: var(--LinearProgress-progressMaxWidth);
  }

  50% {
    left: var(--_LinearProgress-progressLeft);
    width: var(--LinearProgress-progressMinWidth);
  }

  75% {
    width: var(--LinearProgress-progressMaxWidth);
  }
  
  100% {
    left: var(--_LinearProgress-progressInset);
    width: var(--LinearProgress-progressMinWidth);
  }
`;

const useUtilityClasses = (ownerState: LinearProgressOwnerState) => {
  const { determinate, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      determinate && 'determinate',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      size && `size${capitalize(size)}`,
    ],
    progress: ['progress'],
  };

  return composeClasses(slots, getLinearProgressUtilityClass, {});
};

const LinearProgressRoot = styled('div', {
  name: 'JoyLinearProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: LinearProgressOwnerState }>(
  ({ ownerState, theme }) => ({
    // public variables
    '--LinearProgress-radius': 'var(--LinearProgress-thickness)',
    '--LinearProgress-progressThickness': 'var(--LinearProgress-thickness)',
    '--LinearProgress-progressRadius':
      'max(var(--LinearProgress-radius) - var(--_LinearProgress-padding), min(var(--_LinearProgress-padding) / 2, var(--LinearProgress-radius) / 2))',
    ...(ownerState.size === 'sm' && {
      '--LinearProgress-thickness': '4px',
    }),
    ...(ownerState.size === 'md' && {
      '--LinearProgress-thickness': '6px',
    }),
    ...(ownerState.size === 'lg' && {
      '--LinearProgress-thickness': '8px',
    }),
    ...(ownerState.thickness && {
      '--LinearProgress-thickness': `${ownerState.thickness}px`,
    }),
    ...(!ownerState.determinate && {
      '--LinearProgress-progressMinWidth': 'calc(var(--LinearProgress-percent) * 1% / 2)',
      '--LinearProgress-progressMaxWidth': 'calc(var(--LinearProgress-percent) * 1%)',
      '--_LinearProgress-progressLeft':
        'calc(100% - var(--LinearProgress-progressMinWidth) - var(--_LinearProgress-progressInset))',
      '--_LinearProgress-progressInset':
        'calc(var(--LinearProgress-thickness) / 2 - var(--LinearProgress-progressThickness) / 2)',
    }),
    minBlockSize: 'var(--LinearProgress-thickness)',
    boxSizing: 'border-box',
    borderRadius: 'var(--LinearProgress-radius)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 'var(--_LinearProgress-padding)',
    position: 'relative',
    ...theme.variants[ownerState.variant!]?.[ownerState.color!],
    '--_LinearProgress-padding':
      'max((var(--LinearProgress-thickness) - 2 * var(--variant-borderWidth) - var(--LinearProgress-progressThickness)) / 2, 0px)',
    '&::before': {
      content: '""',
      display: 'block',
      boxSizing: 'inherit',
      blockSize: 'var(--LinearProgress-progressThickness)',
      borderRadius: 'var(--LinearProgress-progressRadius)',
      backgroundColor: 'currentColor',
      color: 'inherit',
      position: 'absolute', // required to make `left` animation works.
    },
  }),
  ({ ownerState }) =>
    ownerState.determinate
      ? {
          '&::before': {
            left: 'var(--_LinearProgress-padding)',
            transition: 'inline-size 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            inlineSize:
              'calc(var(--LinearProgress-percent) * 1% - 2 * var(--_LinearProgress-padding))',
          },
        }
      : css`
          &::before {
            animation: ${progressKeyframe}
              var(--LinearProgress-circulation, 2.5s ease-in-out 0s infinite normal none running);
          }
        `,
);

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const LinearProgress = React.forwardRef(function LinearProgress(inProps, ref) {
  const props = useThemeProps<typeof inProps & LinearProgressProps>({
    props: inProps,
    name: 'JoyLinearProgress',
  });

  const {
    component = 'div',
    children,
    className,
    color = 'primary',
    size = 'md',
    variant = 'soft',
    thickness,
    determinate = false,
    value = determinate ? 0 : 25, // `25` is the 1/4 of the bar.
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    size,
    variant,
    thickness,
    value,
    determinate,
    instanceSize: inProps.size,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: LinearProgressRoot,
    externalSlotProps: {},
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref,
      as: component,
      role: 'progressbar',
      style: {
        // Setting this CSS varaible via inline-style
        // prevents the generation of new CSS every time
        // `value` prop updates
        '--LinearProgress-percent': value,
      },
    },
    className: clsx(classes.root, className),
    ...(typeof value === 'number' &&
      determinate && {
        'aria-valuenow': Math.round(value),
      }),
  });

  return <LinearProgressRoot {...rootProps}>{children}</LinearProgressRoot>;
}) as OverridableComponent<LinearProgressTypeMap>;

LinearProgress.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The boolean to select a variant.
   * Use indeterminate when there is no progress value.
   * @default false
   */
  determinate: PropTypes.bool,
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The thickness of the bar.
   */
  thickness: PropTypes.number,
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   *
   * For indeterminate, @default 25
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default LinearProgress;
