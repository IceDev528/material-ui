import * as React from 'react';
import PropTypes from 'prop-types';
import { createPopper } from '@popperjs/core';
import { chainPropTypes, refType, HTMLElementType } from '@material-ui/utils';
import { useTheme } from '@material-ui/styles';
import Portal from '../Portal';
import ownerDocument from '../utils/ownerDocument';
import setRef from '../utils/setRef';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';

function flipPlacement(placement, theme) {
  const direction = (theme && theme.direction) || 'ltr';

  if (direction === 'ltr') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const defaultPopperOptions = {};

/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v2/) for positioning.
 */
const Popper = React.forwardRef(function Popper(props, ref) {
  const {
    anchorEl,
    children,
    container: containerProp,
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement: initialPlacement = 'bottom',
    popperOptions = defaultPopperOptions,
    popperRef: popperRefProp,
    style,
    transition = false,
    ...other
  } = props;
  const tooltipRef = React.useRef(null);
  const ownRef = useForkRef(tooltipRef, ref);

  const popperRef = React.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React.useRef(handlePopperRef);
  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, () => popperRef.current, []);

  const [exited, setExited] = React.useState(true);

  const theme = useTheme();
  const rtlPlacement = flipPlacement(initialPlacement, theme);
  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */
  const [placement, setPlacement] = React.useState(rtlPlacement);

  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });

  const handleOpen = React.useCallback(() => {
    if (!tooltipRef.current || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      handlePopperRefRef.current(null);
    }

    const handlePopperUpdate = (data) => {
      setPlacement(data.placement);
    };

    const resolvedAnchorEl = getAnchorEl(anchorEl);

    if (process.env.NODE_ENV !== 'production') {
      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();

        if (
          process.env.NODE_ENV !== 'test' &&
          box.top === 0 &&
          box.left === 0 &&
          box.right === 0 &&
          box.bottom === 0
        ) {
          console.warn(
            [
              'Material-UI: The `anchorEl` prop provided to the component is invalid.',
              'The anchor element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n'),
          );
        }
      }
    }

    let popperModifiers = [
      {
        name: 'preventOverflow',
        options: {
          altBoundary: disablePortal,
        },
      },
      {
        name: 'flip',
        options: {
          altBoundary: disablePortal,
        },
      },
      {
        name: 'onUpdate',
        enabled: true,
        phase: 'afterWrite',
        fn: ({ state }) => {
          handlePopperUpdate(state);
        },
      },
    ];

    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }

    const popper = createPopper(getAnchorEl(anchorEl), tooltipRef.current, {
      placement: rtlPlacement,
      ...popperOptions,
      modifiers: popperModifiers,
    });

    handlePopperRefRef.current(popper);
  }, [anchorEl, disablePortal, modifiers, open, rtlPlacement, popperOptions]);

  const handleRef = React.useCallback(
    (node) => {
      setRef(ownRef, node);
      handleOpen();
    },
    [ownRef, handleOpen],
  );

  const handleEnter = () => {
    setExited(false);
  };

  const handleClose = () => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current(null);
  };

  const handleExited = () => {
    setExited(true);
    handleClose();
  };

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  React.useEffect(() => {
    if (!open && !transition) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open, transition]);

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  const childProps = { placement };

  if (transition) {
    childProps.TransitionProps = {
      in: open,
      onEnter: handleEnter,
      onExited: handleExited,
    };
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  const container =
    containerProp || (anchorEl ? ownerDocument(getAnchorEl(anchorEl)).body : undefined);

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <div
        ref={handleRef}
        role="tooltip"
        {...other}
        style={{
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: 'fixed',
          // Fix Popper.js display issue
          top: 0,
          left: 0,
          display: !open && keepMounted && !transition ? 'none' : null,
          ...style,
        }}
      >
        {typeof children === 'function' ? children(childProps) : children}
      </div>
    </Portal>
  );
});

Popper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: chainPropTypes(
    PropTypes.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]),
    (props) => {
      if (props.open) {
        const resolvedAnchorEl = getAnchorEl(props.anchorEl);

        if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
          const box = resolvedAnchorEl.getBoundingClientRect();

          if (
            process.env.NODE_ENV !== 'test' &&
            box.top === 0 &&
            box.left === 0 &&
            box.right === 0 &&
            box.bottom === 0
          ) {
            return new Error(
              [
                'Material-UI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join('\n'),
            );
          }
        } else if (
          !resolvedAnchorEl ||
          typeof resolvedAnchorEl.getBoundingClientRect !== 'function' ||
          (resolvedAnchorEl.contextElement != null &&
            resolvedAnchorEl.contextElement.nodeType !== 1)
        ) {
          return new Error(
            [
              'Material-UI: The `anchorEl` prop provided to the component is invalid.',
              'It should be an HTML element instance or a virtualElement ',
              '(https://popper.js.org/docs/v2/virtual-elements/).',
            ].join('\n'),
          );
        }
      }

      return null;
    },
  ),
  /**
   * Popper render function or node.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object,
      effect: PropTypes.func,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      name: PropTypes.any.isRequired,
      options: PropTypes.object,
      phase: PropTypes.oneOf([
        'afterMain',
        'afterRead',
        'afterWrite',
        'beforeMain',
        'beforeRead',
        'beforeWrite',
        'main',
        'read',
        'write',
      ]),
      requires: PropTypes.arrayOf(PropTypes.string),
      requiresIfExists: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf([
    'auto-end',
    'auto-start',
    'auto',
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: PropTypes.shape({
    modifiers: PropTypes.array,
    onFirstUpdate: PropTypes.func,
    placement: PropTypes.oneOf([
      'auto-end',
      'auto-start',
      'auto',
      'bottom-end',
      'bottom-start',
      'bottom',
      'left-end',
      'left-start',
      'left',
      'right-end',
      'right-start',
      'right',
      'top-end',
      'top-start',
      'top',
    ]),
    strategy: PropTypes.oneOf(['absolute', 'fixed']),
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: PropTypes.bool,
};

export default Popper;
