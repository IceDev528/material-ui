import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import Router from 'next/router';
import Interpolate from '@trendmicro/react-interpolate';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import NoSsr from '@material-ui/core/NoSsr';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ColorsIcon from '@material-ui/icons/InvertColors';
import LightbulbOutlineIcon from '@material-ui/docs/svgIcons/LightbulbOutline';
import LightbulbFullIcon from '@material-ui/docs/svgIcons/LightbulbFull';
import NProgressBar from '@material-ui/docs/NProgressBar';
import FormatTextdirectionLToR from '@material-ui/icons/FormatTextdirectionLToR';
import FormatTextdirectionRToL from '@material-ui/icons/FormatTextdirectionRToL';
import GithubIcon from '@material-ui/docs/svgIcons/GitHub';
import Link from 'docs/src/modules/components/Link';
import AppDrawer from 'docs/src/modules/components/AppDrawer';
import AppSearch from 'docs/src/modules/components/AppSearch';
import Notifications from 'docs/src/modules/components/Notifications';
import MarkdownLinks from 'docs/src/modules/components/MarkdownLinks';
import PageTitle from 'docs/src/modules/components/PageTitle';
import { ACTION_TYPES, LANGUAGES } from 'docs/src/modules/constants';
import compose from 'docs/src/modules/utils/compose';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export const languages = [
  {
    code: 'en',
    text: '🇺🇸 English',
  },
  {
    code: 'zh',
    text: '🇨🇳 中文',
  },
  {
    code: 'ru',
    text: '🇷🇺 Русский',
  },
  {
    code: 'pt',
    text: '🇧🇷 Português',
  },
  {
    code: 'fr',
    text: '🇫🇷 Français',
  },
  {
    code: 'es',
    text: '🇪🇸 Español',
  },
  {
    code: 'de',
    text: '🇩🇪 Deutsch',
  },
  {
    code: 'ja',
    text: '🇯🇵 日本語',
  },
];

const styles = theme => ({
  root: {
    display: 'flex',
  },
  banner: {
    display: 'block',
    padding: 4,
    textAlign: 'center',
    backgroundColor: '#0a6fc2',
    color: 'white',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 240px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      flexShrink: 0,
      width: 240,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

class AppFrame extends React.Component {
  state = {
    languageMenu: null,
    mobileOpen: false,
  };

  componentDidMount() {
    const { canonical } = pathnameToLanguage(window.location.pathname);
    this.canonical = canonical;
  }

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleLanguageIconClick = event => {
    this.setState({ languageMenu: event.currentTarget });
  };

  handleLanguageMenuClose = () => {
    this.setState({ languageMenu: null });
  };

  handleTogglePaletteType = () => {
    const paletteType = this.props.reduxTheme.paletteType === 'light' ? 'dark' : 'light';
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;

    this.props.dispatch({
      type: ACTION_TYPES.THEME_CHANGE,
      payload: {
        paletteType,
      },
    });
  };

  handleToggleDirection = () => {
    this.props.dispatch({
      type: ACTION_TYPES.THEME_CHANGE,
      payload: {
        direction: this.props.reduxTheme.direction === 'ltr' ? 'rtl' : 'ltr',
      },
    });
  };

  render() {
    const { children, classes, reduxTheme, t, userLanguage } = this.props;
    const { languageMenu } = this.state;

    return (
      <PageTitle t={t}>
        {title => {
          let disablePermanent = false;
          let navIconClassName = '';
          let appBarClassName = classes.appBar;

          if (title === null) {
            // home route, don't shift app bar or dock drawer
            disablePermanent = true;
            appBarClassName += ` ${classes.appBarHome}`;
          } else {
            navIconClassName = classes.navIconHide;
            appBarClassName += ` ${classes.appBarShift}`;
          }

          return (
            <div className={classes.root}>
              <NProgressBar />
              <CssBaseline />
              <Notifications />
              <MarkdownLinks />
              <AppBar className={appBarClassName}>
                <Typography className={classes.banner} noWrap>
                  <Interpolate
                    replacement={{
                      versionNumber: (
                        <Link color="inherit" href="/versions/">
                          {`v${process.env.LIB_VERSION}`}
                        </Link>
                      ),
                    }}
                  >
                    {t('topBanner')}
                  </Interpolate>
                </Typography>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={navIconClassName}
                  >
                    <MenuIcon />
                  </IconButton>
                  {title !== null && (
                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                      {title}
                    </Typography>
                  )}
                  <div className={classes.grow} />
                  <AppSearch />
                  <Tooltip title="Change language" enterDelay={300}>
                    <IconButton
                      color="inherit"
                      aria-owns={languageMenu ? 'language-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleLanguageIconClick}
                      data-ga-event-category="AppBar"
                      data-ga-event-action="language"
                    >
                      <LanguageIcon />
                    </IconButton>
                  </Tooltip>
                  <NoSsr>
                    <Menu
                      id="language-menu"
                      anchorEl={languageMenu}
                      open={Boolean(languageMenu)}
                      onClose={this.handleLanguageMenuClose}
                    >
                      {languages
                        .filter(language => LANGUAGES.indexOf(language.code) !== -1)
                        .map(language => (
                          <MenuItem
                            component="a"
                            data-no-link="true"
                            href={
                              language.code === 'en'
                                ? this.canonical
                                : `/${language.code}${this.canonical}`
                            }
                            key={language.code}
                            selected={userLanguage === language.code}
                            onClick={this.handleLanguageMenuClose}
                          >
                            {language.text}
                          </MenuItem>
                        ))}
                    </Menu>
                  </NoSsr>
                  <Tooltip title={t('editWebsiteColors')} enterDelay={300}>
                    <IconButton
                      color="inherit"
                      aria-label={t('editWebsiteColors')}
                      component={Link}
                      naked
                      href="/style/color/#color-tool"
                      data-ga-event-category="AppBar"
                      data-ga-event-action="colors"
                    >
                      <ColorsIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('toggleTheme')} enterDelay={300}>
                    <IconButton
                      color="inherit"
                      onClick={this.handleTogglePaletteType}
                      aria-label={t('toggleTheme')}
                      data-ga-event-category="AppBar"
                      data-ga-event-action="dark"
                    >
                      {reduxTheme.paletteType === 'light' ? (
                        <LightbulbOutlineIcon />
                      ) : (
                        <LightbulbFullIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('toggleRTL')} enterDelay={300}>
                    <IconButton
                      color="inherit"
                      onClick={this.handleToggleDirection}
                      aria-label={t('toggleRTL')}
                      data-ga-event-category="AppBar"
                      data-ga-event-action="rtl"
                    >
                      {reduxTheme.direction === 'rtl' ? (
                        <FormatTextdirectionLToR />
                      ) : (
                        <FormatTextdirectionRToL />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('github')} enterDelay={300}>
                    <IconButton
                      edge="end"
                      component="a"
                      color="inherit"
                      href="https://github.com/mui-org/material-ui"
                      aria-label={t('github')}
                      data-ga-event-category="AppBar"
                      data-ga-event-action="github"
                    >
                      <GithubIcon />
                    </IconButton>
                  </Tooltip>
                </Toolbar>
              </AppBar>
              <AppDrawer
                className={classes.drawer}
                disablePermanent={disablePermanent}
                onClose={this.handleDrawerClose}
                onOpen={this.handleDrawerOpen}
                mobileOpen={this.state.mobileOpen}
              />
              {children}
            </div>
          );
        }}
      </PageTitle>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  reduxTheme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  userLanguage: PropTypes.string.isRequired,
};

export default compose(
  connect(state => ({
    reduxTheme: state.theme,
    t: state.options.t,
    userLanguage: state.options.userLanguage,
  })),
  withStyles(styles),
)(AppFrame);
