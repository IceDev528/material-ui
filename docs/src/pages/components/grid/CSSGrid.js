import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const Item = styled(Paper)(({ theme }) => ({
  // TODO withStyles removal
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CSSGrid() {
  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="auto / span 8">
          <Item>xs=8</Item>
        </Box>
        <Box gridColumn="auto / span 4">
          <Item>xs=4</Item>
        </Box>
        <Box gridColumn="auto / span 4">
          <Item>xs=4</Item>
        </Box>
        <Box gridColumn="auto / span 8">
          <Item>xs=8</Item>
        </Box>
      </Box>
    </Box>
  );
}
