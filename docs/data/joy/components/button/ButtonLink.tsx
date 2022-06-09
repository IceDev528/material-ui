import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import OpenInNew from '@mui/icons-material/OpenInNew';

export default function IconButtons() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Button component="a" href="#as-link" startIcon={<OpenInNew />}>
        Open in new tab
      </Button>
      <IconButton aria-label="Open in new tab" component="a" href="#as-link">
        <OpenInNew />
      </IconButton>
    </Box>
  );
}
