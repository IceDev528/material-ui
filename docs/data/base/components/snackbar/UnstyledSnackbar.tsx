import * as React from 'react';
import { styled, keyframes, css } from '@mui/system';
import SnackbarUnstyled, { SnackbarCloseReason } from '@mui/base/SnackbarUnstyled';

const blue = {
  50: '#F0F7FF',
  400: '#3399FF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  200: '#E0E3E7',
};

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const StyledSnackbar = styled(SnackbarUnstyled)(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    bottom: 16px;
    left: auto;
    justify-content: start;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[400]};
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? '#fff' : blue[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    animation: ${snackbarInRight} 500ms;
    transition: transform 0.2s ease-out;
  `,
);

export default function UnstyledSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <button type="button" onClick={handleClick}>
        Open snackbar
      </button>
      <StyledSnackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        Hello World
      </StyledSnackbar>
    </React.Fragment>
  );
}
