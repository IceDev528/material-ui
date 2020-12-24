import * as React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog, { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { DIALOG_WIDTH, DIALOG_WIDTH_WIDER } from './constants/dimensions';

export interface ExportedPickerModalProps {
  /**
   * Ok button text.
   * @default "OK"
   */
  okText?: React.ReactNode;
  /**
   * Cancel text message
   * @default "CANCEL"
   */
  cancelText?: React.ReactNode;
  /**
   * Clear text message
   * @default "CLEAR"
   */
  clearText?: React.ReactNode;
  /**
   * Today text message
   * @default "TODAY"
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

export interface PickerModalDialogProps extends ExportedPickerModalProps {
  onAccept: () => void;
  onClear: () => void;
  onDismiss: () => void;
  onSetToday: () => void;
  wider?: boolean;
  open: boolean;
}

export const styles = createStyles({
  container: {
    outline: 0,
  },
  paper: {
    outline: 0,
    minWidth: DIALOG_WIDTH,
  },
  paperWider: {
    minWidth: DIALOG_WIDTH_WIDER,
  },
  content: {
    '&:first-child': {
      padding: 0,
    },
  },
  action: {},
  withAdditionalAction: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/mui-org/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
    '& > *:first-child': {
      marginRight: 'auto',
    },
  },
});

export type PickersModalDialogClassKey = keyof WithStyles<typeof styles>['classes'];

const PickersModalDialog: React.FC<PickerModalDialogProps & WithStyles<typeof styles>> = (
  props,
) => {
  const {
    cancelText = 'Cancel',
    children,
    classes,
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
    wider,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onDismiss}
      {...DialogProps}
      classes={{
        ...DialogProps.classes,
        container: classes.container,
        paper: clsx(classes.paper, {
          [classes.paperWider]: wider,
        }),
      }}
    >
      <DialogContent className={classes.content}>{children}</DialogContent>
      <DialogActions
        className={clsx(classes.action, {
          [classes.withAdditionalAction]: clearable || showTodayButton,
        })}
      >
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
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { name: 'MuiPickersModalDialog' })(PickersModalDialog);
