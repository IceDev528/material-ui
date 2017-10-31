import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Dialog, DialogActions, DialogContent, Button, withStyles } from 'material-ui';

const styles = {
  dialogRoot: {

  },
  dialog: {
    width: 300,
    height: 420,

    '&:first-child': {
      padding: 0,
    },
  },
};

const ModalDialog = (props) => {
  const {
    children, classes, onAccept, onDismiss, dialogContentClassName, ...other
  } = props;

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} {...other}>
      <DialogContent className={classnames(classes.dialog, dialogContentClassName)}>
        { children }
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={onDismiss} tabIndex={-1}> Cancel </Button>
        <Button color="primary" onClick={onAccept}> OK </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dialogContentClassName: PropTypes.string,
};

ModalDialog.defaultProps = {
  dialogContentClassName: '',
};

export default withStyles(styles, { name: 'MuiPickersModal' })(ModalDialog);
