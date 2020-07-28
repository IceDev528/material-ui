import * as React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TypographyProps } from '@material-ui/core/Typography';
import ToolbarText from './ToolbarText';
import { ExtendMui } from '../typings/helpers';

export interface ToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
  align?: TypographyProps['align'];
  selected: boolean;
  typographyClassName?: string;
  value: React.ReactNode;
  variant: TypographyProps['variant'];
}

export const useStyles = makeStyles(
  {
    root: {
      padding: 0,
      minWidth: '16px',
      textTransform: 'none',
    },
  },
  { name: 'MuiPickersToolbarButton' }
);

export const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = (props) => {
  const { align, className, selected, typographyClassName, value, variant, ...other } = props;
  const classes = useStyles();

  return (
    <Button
      data-mui-test="toolbar-button"
      variant="text"
      className={clsx(classes.root, className)}
      {...other}
    >
      <ToolbarText
        align={align}
        className={typographyClassName}
        variant={variant}
        value={value}
        selected={selected}
      />
    </Button>
  );
};

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;
