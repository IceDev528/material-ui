import * as React from 'react';
import PropTypes from 'prop-types';
import { chainPropTypes } from '@mui/utils';
import { capitalize } from '@mui/material/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { styled, useThemeProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import loadingButtonClasses, { getLoadingButtonUtilityClass } from './loadingButtonClasses';

const useUtilityClasses = (ownerState) => {
  const { loading, loadingPosition, classes } = ownerState;

  const slots = {
    root: ['root', loading && 'loading'],
    startIcon: [loading && `startIconLoading${capitalize(loadingPosition)}`],
    endIcon: [loading && `endIconLoading${capitalize(loadingPosition)}`],
    loadingIndicator: [
      'loadingIndicator',
      loading && `loadingIndicator${capitalize(loadingPosition)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getLoadingButtonUtilityClass, classes);

  return {
    ...classes, // forward the outlined, color, etc. classes to Button
    ...composedClasses,
  };
};

// TODO use `import { rootShouldForwardProp } from '../styles/styled';` once move to core
const rootShouldForwardProp = (prop) =>
  prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';
const LoadingButtonRoot = styled(Button, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [
      styles.root,
      styles.startIconLoadingStart && {
        [`& .${loadingButtonClasses.startIconLoadingStart}`]: styles.startIconLoadingStart,
      },
      styles.endIconLoadingEnd && {
        [`& .${loadingButtonClasses.endIconLoadingEnd}`]: styles.endIconLoadingEnd,
      },
    ];
  },
})(({ ownerState, theme }) => ({
  [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
    {
      transition: theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.short,
      }),
      opacity: 0,
    },
  ...(ownerState.loadingPosition === 'center' && {
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
    [`&.${loadingButtonClasses.loading}`]: {
      color: 'transparent',
    },
  }),
  ...(ownerState.loadingPosition === 'start' &&
    ownerState.fullWidth && {
      [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
        {
          transition: theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.short,
          }),
          opacity: 0,
          marginRight: -8,
        },
    }),
  ...(ownerState.loadingPosition === 'end' &&
    ownerState.fullWidth && {
      [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
        {
          transition: theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.short,
          }),
          opacity: 0,
          marginLeft: -8,
        },
    }),
}));

const LoadingButtonLoadingIndicator = styled('div', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.loadingIndicator,
      styles[`loadingIndicator${capitalize(ownerState.loadingPosition)}`],
    ];
  },
})(({ theme, ownerState }) => ({
  position: 'absolute',
  visibility: 'visible',
  display: 'flex',
  ...(ownerState.loadingPosition === 'start' &&
    (ownerState.variant === 'outlined' || ownerState.variant === 'contained') && {
      left: 14,
    }),
  ...(ownerState.loadingPosition === 'start' &&
    ownerState.variant === 'text' && {
      left: 6,
    }),
  ...(ownerState.loadingPosition === 'center' && {
    left: '50%',
    transform: 'translate(-50%)',
    color: theme.palette.action.disabled,
  }),
  ...(ownerState.loadingPosition === 'end' &&
    (ownerState.variant === 'outlined' || ownerState.variant === 'contained') && {
      right: 14,
    }),
  ...(ownerState.loadingPosition === 'end' &&
    ownerState.variant === 'text' && {
      right: 6,
    }),
  ...(ownerState.loadingPosition === 'start' &&
    ownerState.fullWidth && {
      position: 'relative',
      left: -10,
    }),
  ...(ownerState.loadingPosition === 'end' &&
    ownerState.fullWidth && {
      position: 'relative',
      right: -10,
    }),
}));

const LoadingIndicator = <CircularProgress color="inherit" size={16} />;

const LoadingButton = React.forwardRef(function LoadingButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiLoadingButton' });
  const {
    children,
    disabled = false,
    loading = false,
    loadingIndicator = LoadingIndicator,
    loadingPosition = 'center',
    variant = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    disabled,
    loading,
    loadingIndicator,
    loadingPosition,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <LoadingButtonRoot
      disabled={disabled || loading}
      ref={ref}
      {...other}
      variant={variant}
      classes={classes}
      ownerState={ownerState}
    >
      {ownerState.loadingPosition === 'end' ? (
        <React.Fragment>
          {children}
          {loading && (
            <LoadingButtonLoadingIndicator
              className={classes.loadingIndicator}
              ownerState={ownerState}
            >
              {loadingIndicator}
            </LoadingButtonLoadingIndicator>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {loading && (
            <LoadingButtonLoadingIndicator
              className={classes.loadingIndicator}
              ownerState={ownerState}
            >
              {loadingIndicator}
            </LoadingButtonLoadingIndicator>
          )}

          {children}
        </React.Fragment>
      )}
    </LoadingButtonRoot>
  );
});

LoadingButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the loading indicator is shown.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), (props) => {
    if (props.loadingPosition === 'start' && !props.startIcon) {
      return new Error(
        `MUI: The loadingPosition="start" should be used in combination with startIcon.`,
      );
    }
    if (props.loadingPosition === 'end' && !props.endIcon) {
      return new Error(
        `MUI: The loadingPosition="end" should be used in combination with endIcon.`,
      );
    }
    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
};

export default LoadingButton;
