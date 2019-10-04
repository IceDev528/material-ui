import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    paper: {
      position: 'absolute',
      top: 28,
      right: 0,
      left: 0,
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function ClickAway() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.wrapper}>
        <button type="button" onClick={handleClick}>
          Open menu dropdown
        </button>
        {open ? <div className={classes.paper}>Click me, I will stay visible.</div> : null}
      </div>
    </ClickAwayListener>
  );
}
