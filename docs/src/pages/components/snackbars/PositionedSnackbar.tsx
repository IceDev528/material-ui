import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function PositionedSnackbar() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>Top-Center</Button>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>Top-Right</Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
        Bottom-Right
      </Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
        Bottom-Center
      </Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>Bottom-Left</Button>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>Top-Left</Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">I love snacks</span>}
      />
    </div>
  );
}
