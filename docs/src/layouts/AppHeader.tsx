import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import HeaderNavBar from 'docs/src/components/header/HeaderNavBar';
import HeaderNavDropdown from 'docs/src/components/header/HeaderNavDropdown';
import ThemeModeToggle from 'docs/src/components/header/ThemeModeToggle';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import Link from 'docs/src/modules/components/Link';
import { DeferredAppSearch } from 'docs/src/modules/components/AppFrame';
import ROUTES from 'docs/src/route';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Header = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  transition: theme.transitions.create('top'),
  zIndex: theme.zIndex.appBar,
  backdropFilter: 'blur(20px)',
  boxShadow: `inset 0px -1px 1px ${
    theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100]
  }`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primaryDark[900], 0.72)
      : 'rgba(255,255,255,0.72)',
}));

const HEIGHT = 56;

export default function AppHeader() {
  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState<string | null>(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const t = useTranslate();

  React.useEffect(() => {
    const initialMode = getCookie('paletteMode') || 'system';
    setMode(initialMode);
  }, []);

  const handleChangeThemeMode = (checked: boolean) => {
    const paletteMode = checked ? 'dark' : 'light';
    setMode(paletteMode);

    document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
    changeTheme({ paletteMode });
  };

  return (
    <Header>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-header-height': `${HEIGHT}px`,
          },
        }}
      />
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: HEIGHT }}>
        <Box
          component={Link}
          href={ROUTES.home}
          aria-label="Go to homepage"
          sx={{ lineHeight: 0, mr: 2 }}
        >
          <SvgMuiLogo width={30} />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Stack direction="row" spacing={1}>
          <DeferredAppSearch />
          <Tooltip title={t('appFrame.github')} enterDelay={300}>
            <IconButton
              component="a"
              color="primary"
              href="https://github.com/mui"
              data-ga-event-category="header"
              data-ga-event-action="github"
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {mode !== null ? (
            <ThemeModeToggle
              checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
              onChange={handleChangeThemeMode}
            />
          ) : null}
        </Stack>
        <Box sx={{ display: { md: 'none' }, ml: 1 }}>
          <HeaderNavDropdown />
        </Box>
      </Container>
    </Header>
  );
}
