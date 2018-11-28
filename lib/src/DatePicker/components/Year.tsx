import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface YearProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
}

export class Year extends React.PureComponent<YearProps> {
  public static propTypes: any = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    value: PropTypes.any.isRequired,
    innerRef: PropTypes.any,
  };

  public static defaultProps = {
    selected: false,
    disabled: false,
  };

  public handleClick = () => {
    this.props.onSelect(this.props.value);
  };

  public render() {
    const { classes, selected, disabled, value, children, ...other } = this.props;

    return (
      <Typography
        role="button"
        component="div"
        className={classnames(classes.root, {
          [classes.selected]: selected,
          [classes.disabled]: disabled,
        })}
        tabIndex={disabled ? -1 : 0}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        color={selected ? 'primary' : 'default'}
        variant={selected ? 'h5' : 'subtitle1'}
        {...other}
      >
        {children}
      </Typography>
    );
  }
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing.unit * 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    selected: {
      margin: '10px 0',
      fontWeight: theme.typography.fontWeightMedium,
    },
    disabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint,
    },
  });

export default withStyles(styles, { name: 'MuiPickersYear' })(Year);
