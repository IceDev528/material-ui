import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DiamondSponsors from 'docs/src/components/home/DiamondSponsors';
import GoldSponsors from 'docs/src/components/home/GoldSponsors';

const Sponsors = () => {
  return (
    <Container sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h2" sx={{ my: 1 }}>
        Our sponsors
      </Typography>
      <Typography color="text.secondary" sx={{ mb: { xs: 2, md: 4 }, maxWidth: 450 }}>
        The continued development and maintenance of MUI is greatly helped by our generous sponsors.
      </Typography>
      <DiamondSponsors />
      <Box sx={{ mb: 4 }} />
      <GoldSponsors />
    </Container>
  );
};

export default Sponsors;
