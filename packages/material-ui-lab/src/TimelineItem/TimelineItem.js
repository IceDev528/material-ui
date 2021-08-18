import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize, isMuiElement } from '@material-ui/core/utils';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { timelineContentClasses } from '../TimelineContent';
import { timelineOppositeContentClasses } from '../TimelineOppositeContent';
import TimelineContext from '../Timeline/TimelineContext';
import { getTimelineItemUtilityClass } from './timelineItemClasses';

const useUtilityClasses = (ownerState) => {
  const { position, classes, hasOppositeContent } = ownerState;

  const slots = {
    root: [
      'root',
      `position${capitalize(position)}`,
      !hasOppositeContent && 'missingOppositeContent',
    ],
  };

  return composeClasses(slots, getTimelineItemUtilityClass, classes);
};

const TimelineItemRoot = styled('li', {
  name: 'MuiTimelineItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[`position${capitalize(ownerState.position)}`]];
  },
})(({ ownerState }) => ({
  listStyle: 'none',
  display: 'flex',
  position: 'relative',
  minHeight: 70,
  ...(ownerState.position === 'left' && {
    flexDirection: 'row-reverse',
  }),
  ...(ownerState.position === 'alternate' && {
    '&:nth-of-type(even)': {
      flexDirection: 'row-reverse',
      [`& .${timelineContentClasses.root}`]: {
        textAlign: 'right',
      },
      [`& .${timelineOppositeContentClasses.root}`]: {
        textAlign: 'left',
      },
    },
  }),
  ...(!ownerState.hasOppositeContent && {
    '&:before': {
      content: '""',
      flex: 1,
      padding: '6px 16px',
    },
  }),
}));

const TimelineItem = React.forwardRef(function TimelineItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineItem' });
  const { position: positionProp, className, ...other } = props;
  const { position: positionContext } = React.useContext(TimelineContext);

  let hasOppositeContent = false;

  React.Children.forEach(props.children, (child) => {
    if (isMuiElement(child, ['TimelineOppositeContent'])) {
      hasOppositeContent = true;
    }
  });

  const ownerState = {
    ...props,
    position: positionProp || positionContext || 'right',
    hasOppositeContent,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <TimelineContext.Provider value={{ position: ownerState.position }}>
      <TimelineItemRoot
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        ref={ref}
        {...other}
      />
    </TimelineContext.Provider>
  );
});

TimelineItem.propTypes /* remove-proptypes */ = {
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
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The position where the timeline's item should appear.
   */
  position: PropTypes.oneOf(['left', 'right']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default TimelineItem;
