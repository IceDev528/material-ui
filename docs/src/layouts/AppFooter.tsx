import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import EmailSubscribe from 'docs/src/components/footer/EmailSubscribe';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import Link from 'docs/src/modules/components/Link';

export default function AppFooter() {
  return (
    <Container component="footer">
      <Box
        sx={{
          py: 8,
          display: 'grid',
          gridAutoColumns: '1fr',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: (theme) => theme.spacing(4, 2),
          gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1.75fr', lg: '1fr 1fr' },
          gridTemplateRows: 'auto',
          '& a:not(.MuiIconButton-root)': {
            mt: 1,
            color: 'text.secondary',
            typography: 'body2',
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
          },
        }}
      >
        <div>
          <SvgMuiLogo width={32} />
          <Typography variant="body2" fontWeight="bold" sx={{ pt: 2 }}>
            Join our newsletter!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No spam, guaranteed.
          </Typography>
          <EmailSubscribe sx={{ mb: 1 }} />
        </div>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gridAutoColumns: '1fr',
            gap: 2,
          }}
        >
          {FEATURE_TOGGLE.nav_products ? (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography fontWeight="bold" variant="body2">
                Products
              </Typography>
              <Link href={ROUTES.productCore}>Core</Link>
              <Link href={ROUTES.productAdvanced}>Advanced X</Link>
              <Link href={ROUTES.productTemplates}>Templates</Link>
              <Link href={ROUTES.productDesignKits}>Design Kits</Link>
            </Box>
          ) : (
            <Box sx={{ display: { xs: 'none', md: 'block' } }} />
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Resources
            </Typography>
            <Link href={ROUTES.materialIcons}>Material Icons</Link>
            <Link href={ROUTES.freeTemplates}>Free templates</Link>
            <Link href={ROUTES.components}>Components</Link>
            <Link href={ROUTES.customization}>Customization</Link>
            <Link href={ROUTES.theming}>Theming</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Explore
            </Typography>
            <Link href={ROUTES.documentation}>Documentation</Link>
            <Link href={ROUTES.blog}>Blog</Link>
            <Link href={ROUTES.showcase}>Showcase</Link>
            <Link href={ROUTES.roadmap}>Roadmap</Link>
            <Link href={ROUTES.languages}>Languages</Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight="bold" variant="body2">
              Company
            </Typography>
            <Link href={ROUTES.about}>About</Link>
            <Link href={ROUTES.vision}>Vision</Link>
            <Link href={ROUTES.careers}>Careers</Link>
            <Link href={ROUTES.support}>Support</Link>
            <Link target="_blank" rel="noopener noreferrer" href="mailto:contact@material-ui.com">
              Contact us
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          py: 4,
          display: { xs: 'block', sm: 'flex' },
          alignItems: { sm: 'center' },
          justifyContent: { sm: 'space-between' },
        }}
      >
        <Typography color="text.secondary" variant="body2">
          Copyright © {new Date().getFullYear()} Material-UI SAS.
        </Typography>
        <Box sx={{ py: { xs: 2, sm: 0 } }}>
          <Stack spacing={2} direction="row">
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://github.com/mui-org"
              aria-label="github"
              title="GitHub"
              size="small"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://twitter.com/MaterialUI"
              aria-label="twitter"
              title="Twitter"
              size="small"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://www.linkedin.com/company/material-ui/"
              aria-label="linkedin"
              title="LinkedIn"
              size="small"
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
