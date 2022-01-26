import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps as MuiDialogProps, dialogClasses } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { DIALOG_WIDTH } from './constants/dimensions';

export interface ExportedPickerModalProps {
  /**
   * Ok button text.
   * @default 'OK'
   */
  okText?: React.ReactNode;
  /**
   * Cancel text message.
   * @default 'Cancel'
   */
  cancelText?: React.ReactNode;
  /**
   * Clear text message.
   * @default 'Clear'
   */
  clearText?: React.ReactNode;
  /**
   * Today text message.
   * @default 'Today'
   */
  todayText?: React.ReactNode;
  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable?: boolean;
  /**
   * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
   * @default false
   */
  showTodayButton?: boolean;
  /**
   * Props applied to the [`Dialog`](/api/dialog/) element.
   */
  DialogProps?: Partial<MuiDialogProps>;
}

export interface PickersModalDialogProps extends ExportedPickerModalProps {
  onAccept: () => void;
  onClear: () => void;
  onDismiss: () => void;
  onSetToday: () => void;
  open: boolean;
}

const PickersModalDialogRoot = styled(Dialog)({
  [`& .${dialogClasses.container}`]: {
    outline: 0,
  },
  [`& .${dialogClasses.paper}`]: {
    outline: 0,
    minWidth: DIALOG_WIDTH,
  },
});

const PickersModalDialogContent = styled(DialogContent)({
  '&:first-of-type': {
    padding: 0,
  },
});

const PickersModalDialogActions = styled(DialogActions)<{
  ownerState: PickersModalDialogProps;
}>(({ ownerState }) => ({
  ...((ownerState.clearable || ownerState.showTodayButton) && {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/mui-org/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
    '& > *:first-of-type': {
      marginRight: 'auto',
    },
  }),
}));

const PickersModalDialog = (props: React.PropsWithChildren<PickersModalDialogProps>) => {
  const {
    cancelText = 'Cancel',
    children,
    clearable = false,
    clearText = 'Clear',
    DialogProps = {},
    okText = 'OK',
    onAccept,
    onClear,
    onDismiss,
    onSetToday,
    open,
    showTodayButton = false,
    todayText = 'Today',
  } = props;

  const ownerState = props;

  return (
    <PickersModalDialogRoot open={open} onClose={onDismiss} {...DialogProps}>
      <PickersModalDialogContent>{children}</PickersModalDialogContent>
      <PickersModalDialogActions ownerState={ownerState}>
        {clearable && (
          <Button data-mui-test="clear-action-button" onClick={onClear}>
            {clearText}
          </Button>
        )}
        {showTodayButton && (
          <Button data-mui-test="today-action-button" onClick={onSetToday}>
            {todayText}
          </Button>
        )}
        {cancelText && <Button onClick={onDismiss}>{cancelText}</Button>}
        {okText && <Button onClick={onAccept}>{okText}</Button>}
      </PickersModalDialogActions>
    </PickersModalDialogRoot>
  );
};

export default PickersModalDialog;
