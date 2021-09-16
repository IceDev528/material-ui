import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddRounded from '@mui/icons-material/AddRounded';
import Grid from '@mui/material/Grid';
import SponsorCard from 'docs/src/components/home/SponsorCard';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';

const GOLDs = [
  {
    src: '/static/sponsors/tidelift.svg',
    srcSet: '/static/sponsors/tidelift.svg',
    name: 'Tidelift',
    description: 'Enterprise-ready open-source software.',
    // Tidelift requests this format.
    href: 'https://tidelift.com/?utm_source=npm-material-ui&utm_medium=referral&utm_campaign=homepage',
  },
  {
    src: 'https://avatars.githubusercontent.com/u/24789812?size=40',
    srcSet: 'https://avatars.githubusercontent.com/u/24789812?size=80 2x',
    name: 'Bit',
    description: 'The fastest way to share code.',
    href: 'https://bit.dev/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://images.opencollective.com/callemall/a6946da/logo/40.png',
    srcSet: 'https://images.opencollective.com/callemall/a6946da/logo/80.png 2x',
    name: 'Text-em-all',
    description: 'The easy way to message your group.',
    href: 'https://www.text-em-all.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://avatars.githubusercontent.com/u/13365608?s=40',
    srcSet: 'https://avatars.githubusercontent.com/u/13365608?s=80 2x',
    name: 'Spice Factory',
    description: 'Next gen digital product studio.',
    href: 'https://spicefactory.co/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: '/static/sponsors/elevator-logo.png',
    srcSet: '/static/sponsors/elevator-logo-2x.png 2x',
    name: 'Elevator',
    description: 'The dopest new hip hop, upcoming artists, music.',
    href: 'https://www.elevatormag.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://images.opencollective.com/movavi-software/a1d0167/logo/40.png',
    srcSet: 'https://images.opencollective.com/movavi-software/a1d0167/logo/80.png 2x',
    name: 'Movavi',
    description: 'Screen recorder for Mac.',
    href: 'https://www.movavi.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: '/static/sponsors/hoodie-bees.png',
    srcSet: '/static/sponsors/hoodie-bees-2x.png',
    name: 'Hoodie Bees',
    description: 'Horse community.',
    href: 'https://www.hoodiebees.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
];

export default function GoldSponsors() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  return (
    <Box ref={ref}>
      <Box sx={{ mb: 2 }}>
        <Typography
          component="h3"
          variant="h5"
          fontWeight="extraBold"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.warning[500]
                : theme.palette.warning[800],
          }}
        >
          Gold
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {GOLDs.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4} lg={3}>
            <SponsorCard inView={inView} item={item} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              borderStyle: 'dashed',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
            }}
          >
            <IconButton
              aria-label="Become MUI sponsor"
              component="a"
              href={ROUTES.goldSponsor}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{
                mr: 2,
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
              }}
            >
              <AddRounded />
            </IconButton>
            <div>
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                Become our sponsor!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                To join us,{' '}
                <Link href={ROUTES.goldSponsor} target="_blank" rel="noopener noreferrer">
                  choose how
                </Link>{' '}
                you want to contribute.
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
