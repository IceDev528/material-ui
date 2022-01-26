import * as React from 'react';
import clsx from 'clsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { generateUtilityClasses } from '@mui/base';
import PenIcon from '../svg-icons/Pen';
import CalendarIcon from '../svg-icons/Calendar';
import ClockIcon from '../svg-icons/Clock';
import { ToolbarComponentProps } from './typings/BasePicker';

export interface PickersToolbarProps
  extends Pick<
    ToolbarComponentProps,
    'getMobileKeyboardInputViewButtonText' | 'isMobileKeyboardViewOpen' | 'toggleMobileKeyboardView'
  > {
  className?: string;
  viewType?: 'calendar' | 'clock';
  isLandscape: boolean;
  landscapeDirection?: 'row' | 'column';
  penIconClassName?: string;
  toolbarTitle: React.ReactNode;
}

const classes = generateUtilityClasses('PrivatePickersToolbar', ['root', 'dateTitleContainer']);

const PickersToolbarRoot = styled('div')<{ ownerState: PickersToolbarProps }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 3),
    ...(ownerState.isLandscape && {
      height: 'auto',
      maxWidth: 160,
      padding: 16,
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    }),
  }),
);

const PickersToolbarGrid = styled(Grid)({
  flex: 1,
});

const getViewTypeIcon = (viewType: 'calendar' | 'clock') =>
  viewType === 'clock' ? <ClockIcon color="inherit" /> : <CalendarIcon color="inherit" />;

function defaultGetKeyboardInputSwitchingButtonText(
  isKeyboardInputOpen: boolean,
  viewType: 'calendar' | 'clock',
) {
  return isKeyboardInputOpen
    ? `text input view is open, go to ${viewType} view`
    : `${viewType} view is open, go to text input view`;
}

const PickersToolbar = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<PickersToolbarProps>
>(function PickersToolbar(props, ref) {
  const {
    children,
    className,
    getMobileKeyboardInputViewButtonText = defaultGetKeyboardInputSwitchingButtonText,
    isLandscape,
    isMobileKeyboardViewOpen,
    landscapeDirection = 'column',
    penIconClassName,
    toggleMobileKeyboardView,
    toolbarTitle,
    viewType = 'calendar',
  } = props;

  const ownerState = props;

  return (
    <PickersToolbarRoot
      ref={ref}
      data-mui-test="picker-toolbar"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
    >
      <Typography data-mui-test="picker-toolbar-title" color="text.secondary" variant="overline">
        {toolbarTitle}
      </Typography>
      <PickersToolbarGrid
        container
        justifyContent="space-between"
        className={classes.dateTitleContainer}
        direction={isLandscape ? landscapeDirection : 'row'}
        alignItems={isLandscape ? 'flex-start' : 'flex-end'}
      >
        {children}
        <IconButton
          onClick={toggleMobileKeyboardView}
          className={penIconClassName}
          color="inherit"
          data-mui-test="toggle-mobile-keyboard-view"
          aria-label={getMobileKeyboardInputViewButtonText(isMobileKeyboardViewOpen, viewType)}
        >
          {isMobileKeyboardViewOpen ? getViewTypeIcon(viewType) : <PenIcon color="inherit" />}
        </IconButton>
      </PickersToolbarGrid>
    </PickersToolbarRoot>
  );
});

export default PickersToolbar;
