import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { getHours, getMinutes } from '../../_helpers/time-utils';
import ClockType, { ClockTypeType } from '../../constants/ClockType';
import ClockPointer from './ClockPointer';

export interface ClockProps extends WithStyles<typeof styles> {
  type: ClockTypeType;
  value: number;
  onChange: (value: number, isFinish?: boolean) => void;
  ampm?: boolean;
  children: Array<React.ReactElement<any>>;
}

export class Clock extends React.Component<ClockProps> {
  public static propTypes: any = {
    type: PropTypes.oneOf(Object.keys(ClockType).map(key => ClockType[key])).isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    ampm: PropTypes.bool,
    innerRef: PropTypes.any,
  };

  public static defaultProps = {
    ampm: false,
  };

  public isMoving = false;

  public setTime(e: any, isFinish = false) {
    let { offsetX, offsetY } = e;

    if (typeof offsetX === 'undefined') {
      const rect = e.target.getBoundingClientRect();

      offsetX = e.changedTouches[0].clientX - rect.left;
      offsetY = e.changedTouches[0].clientY - rect.top;
    }

    const value =
      this.props.type === ClockType.SECONDS || this.props.type === ClockType.MINUTES
        ? getMinutes(offsetX, offsetY)
        : getHours(offsetX, offsetY, Boolean(this.props.ampm));

    this.props.onChange(value, isFinish);
  }

  public handleTouchMove = (e: React.TouchEvent) => {
    this.isMoving = true;
    this.setTime(e);
  };

  public handleTouchEnd = (e: React.TouchEvent) => {
    if (this.isMoving) {
      this.setTime(e, true);
      this.isMoving = false;
    }
  };

  public handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
    const isButtonPressed =
      typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

    if (isButtonPressed) {
      this.setTime(e.nativeEvent, false);
    }
  };

  public handleMouseUp = (e: React.MouseEvent) => {
    if (this.isMoving) {
      this.isMoving = false;
    }

    this.setTime(e.nativeEvent, true);
  };

  public hasSelected = () => {
    const { type, value } = this.props;

    if (type === ClockType.HOURS) {
      return true;
    }

    return value % 5 === 0;
  };

  public render() {
    const { classes, value, children, type, ampm } = this.props;

    const isPointerInner = !ampm && type === ClockType.HOURS && (value < 1 || value > 12);

    return (
      <div className={classes.container}>
        <div className={classes.clock}>
          <div
            role="menu"
            tabIndex={-1}
            className={classes.squareMask}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMove}
          />

          <div className={classes.pin} />

          <ClockPointer
            type={type}
            value={value}
            isInner={isPointerInner}
            hasSelected={this.hasSelected()}
          />

          {children}
        </div>
      </div>
    );
  }
}

export const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px`,
    },
    clock: {
      backgroundColor: 'rgba(0,0,0,.07)',
      borderRadius: '50%',
      height: 260,
      width: 260,
      position: 'relative',
      pointerEvents: 'none',
      zIndex: 1,
    },
    squareMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'auto',
      outline: 'none',
      touchActions: 'none',
      userSelect: 'none',
      '&:active': {
        cursor: 'move',
      },
    },
    pin: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  });

export default withStyles(styles, {
  name: 'MuiPickersClock',
})(Clock as React.ComponentType<ClockProps>);
