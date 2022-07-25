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
    description: 'A component-driven development platform.',
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
    src: 'https://images.opencollective.com/aussiecasinohex/923df37/logo/40.png',
    srcSet: 'https://images.opencollective.com/aussiecasinohex/923df37/logo/80.png 2x',
    name: 'CasinoHEX Australia',
    description: 'A guide to online gambling in Australia.',
    href: 'https://online-aussie-casino.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://images.opencollective.com/sumatosoft_company/0b78570/avatar/40.png',
    srcSet: 'https://images.opencollective.com/sumatosoft_company/0b78570/avatar/80.png 2x',
    name: 'SunmatoSoft',
    description: 'Custom software development company.',
    href: 'https://sumatosoft.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://p18.zdusercontent.com/attachment/9422375/Rullx0rw9lUGKuyKOy4VQ9Zxq?size=40',
    srcSet: 'https://p18.zdusercontent.com/attachment/9422375/Rullx0rw9lUGKuyKOy4VQ9Zxq?size=80 2x',
    name: 'MegaFamous',
    description: 'The best place to buy Instagram followers & likes.',
    href: 'https://megafamous.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://images.opencollective.com/dialmycalls/f5ae9ab/avatar/40.png',
    srcSet: 'https://images.opencollective.com/dialmycalls/f5ae9ab/avatar/80.png 2x',
    name: 'DialMyCalls',
    description: 'Send text messages, calls & emails to thousands with ease.',
    href: 'https://www.dialmycalls.com/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
  },
  {
    src: 'https://goread.io/assets/uploads/usereb4ac3033e8ab3591e0fcefa8c26ce3fd36d5a0f/bd81e54effbcc265ad169015455a0c1e.png',
    srcSet:
      'https://goread.io/assets/uploads/usereb4ac3033e8ab3591e0fcefa8c26ce3fd36d5a0f/bd81e54effbcc265ad169015455a0c1e.png 2x',
    name: 'Goread.io',
    description: 'Instagram followers, likes, power likes, views, comments, saves in minutes.',
    href: 'https://goread.io/?utm_source=MUI&utm_medium=referral&utm_content=homepage',
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
      <Box sx={{ mb: 1 }}>
        <Typography
          component="h3"
          variant="h5"
          fontWeight="extraBold"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.warning[500]
                : theme.palette.warning[700],
          }}
        >
          Gold
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }}>
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
              aria-label="Sponsor MUI"
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
                Become a sponsor
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find out how{' '}
                <Link href={ROUTES.goldSponsor} target="_blank" rel="noopener noreferrer">
                  you can support MUI.
                </Link>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
