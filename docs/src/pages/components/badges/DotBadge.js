import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function DotBadge() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge color="primary" variant="dot">
        <MailIcon />
      </Badge>
      <Badge color="secondary" variant="dot">
        <MailIcon />
      </Badge>
      <Badge color="error" variant="dot">
        <Typography>Typography</Typography>
      </Badge>
    </div>
  );
}
