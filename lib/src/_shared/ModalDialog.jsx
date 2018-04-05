import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';

const dialogWidth = 310;
const styles = {
  dialogRoot: {
    minWidth: dialogWidth,
  },
  dialog: {
    width: dialogWidth,

    '&:first-child': {
      padding: 0,
    },
  },
  dialogActions: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
  },
  clearableDialogAction: {
    '&:first-child': {
      marginRight: 'auto',
    },
  },
  todayDialogAction: {
    '&:first-child': {
      marginRight: 'auto',
    },
  },
  dialogAction: {
    // empty but may be needed for override
  },
};

export const ModalDialog = ({
  children,
  classes,
  onAccept,
  onDismiss,
  onClear,
  onSetToday,
  okLabel,
  cancelLabel,
  clearLabel,
  todayLabel,
  dialogContentClassName,
  clearable,
  showTodayButton,
  ...other
}) => (
  <Dialog onClose={onDismiss} classes={{ paper: classes.dialogRoot }} {...other}>
    <DialogContent className={classnames(classes.dialog, dialogContentClassName)}>
      { children }
    </DialogContent>

    <DialogActions
      classes={{
        root: clearable && classes.dialogActions,
        action: classnames(classes.dialogAction, {
          [classes.clearableDialogAction]: clearable,
          [classes.todayDialogAction]: !clearable && showTodayButton,
        }),
      }}
    >
      { clearable &&
        <Button
          color="primary"
          onClick={onClear}
          aria-label={clearLabel}
        >
          { clearLabel }
        </Button>
      }

      { !clearable && showTodayButton &&
        <Button
          color="primary"
          onClick={onSetToday}
          aria-label={todayLabel}
        >
          { todayLabel }
        </Button>
      }

      <Button
        color="primary"
        onClick={onDismiss}
        aria-label={cancelLabel}
      >
        { cancelLabel }
      </Button>

      <Button
        color="primary"
        onClick={onAccept}
        aria-label={okLabel}
      >
        { okLabel }
      </Button>
    </DialogActions>
  </Dialog>
);


ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dialogContentClassName: PropTypes.string,
  okLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  clearLabel: PropTypes.string.isRequired,
  clearable: PropTypes.bool.isRequired,
  todayLabel: PropTypes.string.isRequired,
  showTodayButton: PropTypes.bool.isRequired,
  onSetToday: PropTypes.func.isRequired,
};

ModalDialog.defaultProps = {
  dialogContentClassName: '',
};

export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
