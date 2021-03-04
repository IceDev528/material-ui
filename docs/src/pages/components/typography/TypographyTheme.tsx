import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import * as CSS from 'csstype';

const Div = styled('div')(({ theme }) => ({
  ...(theme.typography.button as CSS.Properties),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default function TypographyTheme() {
  return <Div>{"This div's text looks like that of a button."}</Div>;
}
