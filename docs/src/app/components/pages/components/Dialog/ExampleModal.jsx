import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

const DialogExampleModal = React.createClass({

  getInitialState() {
    return {open: false};
  },

  handleOpen() {
    this.setState({open: true});
  },

  handleClose() {
    this.setState({open: false});
  },

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose} />,
    ];

    return (
      <RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen}>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={true}
          open={this.state.open}>
          Only actions can close this dialog.
        </Dialog>
      </RaisedButton>
    );
  },
});

export default DialogExampleModal;
