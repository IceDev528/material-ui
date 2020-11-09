import * as React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import { TypographyProps } from '@material-ui/core/Typography';
import ToolbarText from './PickersToolbarText';
import { ExtendMui } from './typings/helpers';

export interface ToolbarButtonProps extends ExtendMui<ButtonProps, 'value' | 'variant'> {
  align?: TypographyProps['align'];
  selected: boolean;
  typographyClassName?: string;
  value: React.ReactNode;
  variant: TypographyProps['variant'];
}

export const styles = createStyles({
  root: {
    padding: 0,
    minWidth: '16px',
    textTransform: 'none',
  },
});

export type PickersToolbarButtonClassKey = keyof WithStyles<typeof styles>['classes'];

const ToolbarButton: React.FunctionComponent<ToolbarButtonProps & WithStyles<typeof styles>> = (
  props,
) => {
  const {
    align,
    classes,
    className,
    selected,
    typographyClassName,
    value,
    variant,
    ...other
  } = props;

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

export default withStyles(styles, { name: 'MuiPickersToolbarButton' })(ToolbarButton);
