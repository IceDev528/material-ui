import * as React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import { ExtendMui } from '../typings/helpers';
import { PenIcon } from './icons/Pen';
import { CalendarIcon } from './icons/CalendarIcon';
import { ToolbarComponentProps } from '../Picker/SharedPickerProps';

export const useStyles = makeStyles(
  (theme) => {
    const toolbarBackground =
      theme.palette.type === 'light'
        ? theme.palette.primary.main
        : theme.palette.background.default;
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: toolbarBackground,
        color: theme.palette.getContrastText(toolbarBackground),
      },
      toolbarLandscape: {
        height: 'auto',
        maxWidth: 160,
        padding: 16,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
      },
      dateTitleContainer: {
        flex: 1,
      },
    };
  },
  { name: 'MuiPickersToolbar' }
);

interface PickerToolbarProps
  extends ExtendMui<ToolbarProps>,
    Pick<
      ToolbarComponentProps,
      | 'getMobileKeyboardInputViewButtonText'
      | 'isMobileKeyboardViewOpen'
      | 'toggleMobileKeyboardView'
    > {
  toolbarTitle: React.ReactNode;
  landscapeDirection?: 'row' | 'column';
  isLandscape: boolean;
  penIconClassName?: string;
}

function defaultGetKeyboardInputSwitchingButtonText(isKeyboardInputOpen: boolean) {
  return isKeyboardInputOpen
    ? 'text input view is open, go to calendar view'
    : 'calendar view is open, go to text input view';
}

const PickerToolbar: React.SFC<PickerToolbarProps> = ({
  children,
  className,
  getMobileKeyboardInputViewButtonText = defaultGetKeyboardInputSwitchingButtonText,
  isLandscape,
  isMobileKeyboardViewOpen,
  landscapeDirection = 'column',
  penIconClassName,
  toggleMobileKeyboardView,
  toolbarTitle,
}) => {
  const classes = useStyles();

  return (
    <Toolbar
      data-mui-test="picker-toolbar"
      className={clsx(classes.root, { [classes.toolbarLandscape]: isLandscape }, className)}
    >
      <Typography data-mui-test="picker-toolbar-title" color="inherit" variant="overline">
        {toolbarTitle}
      </Typography>
      <Grid
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
          aria-label={getMobileKeyboardInputViewButtonText(isMobileKeyboardViewOpen)}
        >
          {isMobileKeyboardViewOpen ? (
            <CalendarIcon color="inherit" />
          ) : (
            <PenIcon color="inherit" />
          )}
        </IconButton>
      </Grid>
    </Toolbar>
  );
};

export default PickerToolbar;
