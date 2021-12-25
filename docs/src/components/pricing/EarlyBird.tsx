import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'docs/src/modules/components/Link';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

export default function EarlyBird() {
  return (
    <Container sx={{ pt: 2, pb: { xs: 2, sm: 4, md: 8 } }} id="early-bird">
      <Stack
        sx={{
          borderRadius: 1,
          p: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'primary.50'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.500' : 'primary.100',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
        }}
      >
        <Box>
          <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
            🐦&nbsp;&nbsp;Early bird special!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 700 }}>
            Buy now at a reduced price (~25% off), and get early access to MUI X Pro, with the added
            opportunity to influence its development. This perpetual license gives access to support
            and updates for one year. The early bird special is available for a limited time, so
            don&apos;t miss this opportunity!
          </Typography>
        </Box>
        <Button
          component={Link}
          noLinkStyle
          href="https://mui.com/store/items/material-ui-pro/"
          variant="contained"
          fullWidth
          endIcon={<KeyboardArrowRightRounded />}
          sx={{
            py: 1,
            ml: { xs: 0, sm: 2 },
            mt: { xs: 3, sm: 0 },
            width: { xs: '100%', sm: '50%', md: '20%' },
          }}
        >
          Buy now
        </Button>
      </Stack>
    </Container>
  );
}
