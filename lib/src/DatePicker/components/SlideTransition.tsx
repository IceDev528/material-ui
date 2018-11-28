import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export type SlideDirection = 'right' | 'left';
interface SlideTransitionProps extends WithStyles<typeof styles> {
  transKey: React.Key;
  className?: string;
  slideDirection: SlideDirection;
  children: React.ReactChild;
}

const animationDuration = 350;

const SlideTransition: React.SFC<SlideTransitionProps> = ({
  classes,
  className,
  children,
  transKey,
  slideDirection,
}) => (
  <TransitionGroup className={classnames(classes.transitionContainer, className)}>
    <CSSTransition
      key={transKey}
      mountOnEnter
      unmountOnExit
      timeout={animationDuration}
      children={children}
      classNames={{
        enter: classes[`slideEnter-${slideDirection}`],
        enterActive: classes.slideEnterActive,
        exit: classes.slideExit,
        exitActive: classes[`slideExitActiveLeft-${slideDirection}`],
      }}
    />
  </TransitionGroup>
);

(SlideTransition as any).propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  slideDirection: PropTypes.oneOf(['left', 'right']).isRequired,
  transKey: PropTypes.string.isRequired,
  innerRef: PropTypes.any,
};

SlideTransition.defaultProps = {
  className: undefined,
};

export const styles = (theme: Theme) => {
  const slideTransition = theme.transitions.create('transform', {
    duration: animationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)',
  });

  return createStyles({
    transitionContainer: {
      display: 'block',
      position: 'relative',
      '& > *': {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
      },
    },
    'slideEnter-left': {
      willChange: 'transform',
      transform: 'translate(100%)',
    },
    'slideEnter-right': {
      willChange: 'transform',
      transform: 'translate(-100%)',
    },
    slideEnterActive: {
      transform: 'translate(0%)',
      transition: slideTransition,
    },
    slideExit: {
      transform: 'translate(0%)',
    },
    'slideExitActiveLeft-left': {
      willChange: 'transform',
      transform: 'translate(-200%)',
      transition: slideTransition,
    },
    'slideExitActiveLeft-right': {
      willChange: 'transform',
      transform: 'translate(200%)',
      transition: slideTransition,
    },
  });
};

export default withStyles(styles, {
  name: 'MuiPickersSlideTransition',
})(SlideTransition);
