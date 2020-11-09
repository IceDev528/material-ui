import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, fade } from '@material-ui/core/styles';
import { onSpaceOrEnter } from '../../_helpers/utils';
import { useCanAutoFocus } from '../../_shared/hooks/useCanAutoFocus';
import { PickerSelectionState } from '../../_shared/hooks/usePickerState';

const positions: Record<number, [number, number]> = {
  0: [0, 40],
  1: [55, 19.6],
  2: [94.4, 59.5],
  3: [109, 114],
  4: [94.4, 168.5],
  5: [54.5, 208.4],
  6: [0, 223],
  7: [-54.5, 208.4],
  8: [-94.4, 168.5],
  9: [-109, 114],
  10: [-94.4, 59.5],
  11: [-54.5, 19.6],
  12: [0, 5],
  13: [36.9, 49.9],
  14: [64, 77],
  15: [74, 114],
  16: [64, 151],
  17: [37, 178],
  18: [0, 188],
  19: [-37, 178],
  20: [-64, 151],
  21: [-74, 114],
  22: [-64, 77],
  23: [-37, 50],
};

export interface ClockNumberProps {
  disabled: boolean;
  getClockNumberText: (currentItemText: string) => string;
  index: number;
  isInner?: boolean;
  label: string;
  onSelect: (isFinish: PickerSelectionState) => void;
  selected: boolean;
}

export const useStyles = makeStyles(
  (theme) => {
    const size = 32;
    const clockNumberColor =
      theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.text.secondary;

    return {
      root: {
        outline: 0,
        width: size,
        height: size,
        userSelect: 'none',
        position: 'absolute',
        left: `calc((100% - ${size}px) / 2)`,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        color: clockNumberColor,
        '&:focused': {
          backgroundColor: theme.palette.background.paper,
        },
      },
      clockNumberSelected: {
        color: theme.palette.primary.contrastText,
      },
      clockNumberDisabled: {
        pointerEvents: 'none',
        color: fade(clockNumberColor, 0.2),
      },
    };
  },
  { name: 'MuiPickersClockNumber' }
);

export const ClockNumber: React.FC<ClockNumberProps> = (props) => {
  const { disabled, getClockNumberText, index, isInner, label, onSelect, selected } = props;
  const classes = useStyles();
  const canAutoFocus = useCanAutoFocus();
  const ref = React.useRef<HTMLSpanElement>(null);
  const className = clsx(classes.root, {
    [classes.clockNumberSelected]: selected,
    [classes.clockNumberDisabled]: disabled,
  });

  const transformStyle = React.useMemo(() => {
    const position = positions[index];

    return {
      transform: `translate(${position[0]}px, ${position[1]}px`,
    };
  }, [index]);

  React.useEffect(() => {
    if (canAutoFocus && selected && ref.current) {
      ref.current.focus();
    }
  }, [canAutoFocus, selected]);

  return (
    <ButtonBase
      focusRipple
      centerRipple
      ref={ref}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      component="span"
      className={className}
      style={transformStyle}
      aria-label={getClockNumberText(label)}
      onKeyDown={onSpaceOrEnter(() => onSelect('finish'))}
    >
      <Typography variant={isInner ? 'body2' : 'body1'}>{label}</Typography>
    </ButtonBase>
  );
};

export default ClockNumber;
