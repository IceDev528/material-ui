import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

const ToolbarButton = (props) => {
  const {
    classes, selected, label, className, ...other
  } = props;

  return (
    <Typography
      className={classnames(classes.toolbarBtn, className, {
        [classes.toolbarBtnSelected]: selected,
      })}
      {...other}
    >
      { label }
    </Typography>
  );
};

ToolbarButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ToolbarButton.defaultProps = {
  className: '',
};

const styles = theme => ({
  toolbarBtn: {
    cursor: 'pointer',
    color: theme.palette.common.lightWhite,
  },
  toolbarBtnSelected: {
    color: theme.palette.common.white,
  },
});

export default withStyles(styles, { name: 'MuiPickersToolbarButton' })(ToolbarButton);
