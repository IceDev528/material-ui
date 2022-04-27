import * as React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { styled, alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import SvgMuiLogo from 'docs/src/icons/SvgMuiLogo';
import DiamondSponsors from 'docs/src/modules/components/DiamondSponsors';
import AppNavDrawerItem from 'docs/src/modules/components/AppNavDrawerItem';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import DoneRounded from '@mui/icons-material/DoneRounded';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import IconImage from 'docs/src/components/icon/IconImage';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import { isNewLocation } from 'docs/src/modules/utils/replaceUrl';
import materialPkgJson from '../../../../packages/mui-material/package.json';
import joyPkgJson from '../../../../packages/mui-joy/package.json';
import basePkgJson from '../../../../packages/mui-base/package.json';
import systemPkgJson from '../../../../packages/mui-system/package.json';

const savedScrollTop = {};

const shouldShowJoy =
  process.env.NODE_ENV === 'development' ||
  process.env.PULL_REQUEST ||
  FEATURE_TOGGLE.enable_joy_scope;

const LinksWrapper = styled('div')(({ theme }) => {
  return {
    paddingLeft: theme.spacing(5.5),
    paddingTop: theme.spacing(1.5),
    height: shouldShowJoy ? 162 : 124,
    '& > a': {
      position: 'relative',
      display: 'flex',
      minHeight: 40,
      flexDirection: 'column',
      alignItems: 'initial',
      padding: theme.spacing(0, 1),
      paddingTop: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      color:
        theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
      transition: theme.transitions.create(),
      '&:hover': {
        paddingBottom: theme.spacing(3.5),
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primaryDark[700], 0.4)
            : theme.palette.grey[50],
        '& .MuiTypography-body2': {
          opacity: 1,
          transform: 'translateY(0px)',
        },
      },
      '& .MuiTypography-body1': {
        zIndex: 1,
      },
      '& .MuiTypography-body2': {
        opacity: 0,
        position: 'absolute',
        top: '28px',
        transition: theme.transitions.create(),
      },
      '& svg': {
        width: 18,
        height: 18,
      },
    },
  };
});

const ProductLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  fontSize: theme.typography.pxToRem(12),
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'uppercase',
  letterSpacing: '.05rem',
  color: theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
}));

function ProductSubMenu(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <Box
        sx={{
          '& circle': {
            fill: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
        }}
      >
        {props.icon}
      </Box>
      <div>
        <Typography color="text.primary" variant="body2" fontWeight="700">
          {props.name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {props.description}
        </Typography>
      </div>
    </Box>
  );
}

ProductSubMenu.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.element,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

function ProductDrawerButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* eslint-disable material-ui/no-hardcoded-labels */
  return (
    <React.Fragment>
      <Button
        id="mui-product-selector"
        aria-controls="drawer-open-button"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownRoundedIcon fontSize="small" sx={{ ml: -0.5 }} />}
        sx={(theme) => ({
          py: 0.1,
          minWidth: 0,
          fontSize: theme.typography.pxToRem(13),
          fontWeight: theme.typography.fontWeightMedium,
          color:
            theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
          '& svg': {
            ml: -0.6,
            width: 18,
            height: 18,
          },
          '& > span': {
            ml: '4px',
          },
        })}
      >
        {props.productName}
      </Button>
      <Menu
        id="mui-product-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'mui-product-selector',
        }}
        PaperProps={{
          sx: {
            width: { xs: 340, sm: 480 },
            '& ul': {
              margin: 0,
              padding: 0,
              listStyle: 'none',
            },
            '& li:not(:last-of-type)': {
              borderBottom: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary[100], 0.08)
                  : theme.palette.grey[100],
            },
            '& a': { textDecoration: 'none' },
            '& li': {
              p: 2,
            },
            '& li:last-of-type': {
              p: 0,
            },
          },
        }}
      >
        <li role="none">
          <ProductSubMenu
            role="menuitem"
            icon={<IconImage name="product-core" />}
            name="MUI Core"
            description="Ready-to-use foundational components, free forever."
          />
          <LinksWrapper>
            <Link href={ROUTES.materialDocs} sx={{ my: -0.5 }}>
              <ProductLabel>Material UI</ProductLabel>
              <Typography color="text.secondary" variant="body2">
                {"React components that implement Google's Material Design."}
              </Typography>
            </Link>
            {shouldShowJoy && (
              <Link href={ROUTES.joyDocs} sx={{ my: -0.5 }}>
                <ProductLabel>Joy UI</ProductLabel>
                <Typography color="text.secondary" variant="body2">
                  React components for building your design system.
                </Typography>
              </Link>
            )}
            <Link href={ROUTES.baseDocs} sx={{ mb: -0.5 }}>
              <ProductLabel>MUI Base</ProductLabel>
              <Typography color="text.secondary" variant="body2">
                Unstyled React components and low-level hooks.
              </Typography>
            </Link>
            <Link href={ROUTES.systemDocs}>
              <ProductLabel>MUI System</ProductLabel>
              <Typography color="text.secondary" variant="body2">
                CSS utilities for rapidly laying out custom designs.
              </Typography>
            </Link>
          </LinksWrapper>
        </li>
        <li role="none">
          <Link
            href={ROUTES.advancedComponents}
            sx={{
              p: 2,
              width: '100%',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primaryDark[700], 0.4)
                    : theme.palette.grey[50],
              },
            }}
          >
            <ProductSubMenu
              role="menuitem"
              icon={<IconImage name="product-advanced" />}
              name={
                <Box component="span" display="inline-flex" alignItems="center">
                  MUI&nbsp;X
                </Box>
              }
              description="Advanced and powerful components for complex use cases."
            />
          </Link>
        </li>
      </Menu>
    </React.Fragment>
  );
  /* eslint-enable material-ui/no-hardcoded-labels */
}

ProductDrawerButton.propTypes = {
  productName: PropTypes.string,
};

const ProductIdentifier = ({ name, metadata, versionSelector }) => (
  <Box sx={{ flexGrow: 1 }}>
    <Typography
      sx={(theme) => ({
        ml: 1,
        color: theme.palette.grey[600],
        fontSize: theme.typography.pxToRem(11),
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '.08rem',
      })}
    >
      {metadata}
    </Typography>
    <Box sx={{ display: 'flex' }}>
      <ProductDrawerButton productName={name} />
      {versionSelector}
    </Box>
  </Box>
);

ProductIdentifier.propTypes = {
  metadata: PropTypes.string,
  name: PropTypes.string,
  versionSelector: PropTypes.element,
};

function PersistScroll(props) {
  const { slot, children, enabled } = props;
  const rootRef = React.useRef();

  useEnhancedEffect(() => {
    const parent = rootRef.current ? rootRef.current.parentElement : null;
    const activeElement = parent.querySelector('.app-drawer-active');

    if (!enabled || !parent || !activeElement || !activeElement.scrollIntoView) {
      return undefined;
    }

    parent.scrollTop = savedScrollTop[slot];

    const activeBox = activeElement.getBoundingClientRect();

    if (activeBox.top < 0 || activeBox.top > window.innerHeight) {
      parent.scrollTop += activeBox.top - 8 - 32;
    }

    return () => {
      savedScrollTop[slot] = parent.scrollTop;
    };
  }, [enabled, slot]);

  return <div ref={rootRef}>{children}</div>;
}

PersistScroll.propTypes = {
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  slot: PropTypes.string.isRequired,
};

const ToolbarDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.45, 2),
  paddingRight: 0,
  height: 'var(--MuiDocs-header-height)',
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

const AppNavPaperComponent = styled('div')(({ theme }) => {
  return {
    width: 'var(--MuiDocs-navDrawer-width)',
    boxShadow: 'none',
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.up('xs')]: {
      borderRadius: '0px 10px 10px 0px',
    },
    [theme.breakpoints.up('sm')]: {
      borderRadius: '0px',
    },
  };
});

function renderNavItems(options) {
  const { pages, ...params } = options;

  return (
    <List sx={{ my: 0.5 }}>
      {pages.reduce(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        (items, page) => reduceChildRoutes({ items, page, ...params }),
        [],
      )}
    </List>
  );
}

/**
 * @param {object} context
 * @param {import('docs/src/pages').MuiPage} context.page
 */
function reduceChildRoutes(context) {
  const { onClose, activePage, items, depth, t } = context;
  let { page } = context;
  if (page.inSideNav === false) {
    return items;
  }

  const title = pageToTitleI18n(page, t);

  if (page.children && page.children.length >= 1) {
    const topLevel = activePage
      ? activePage.pathname.indexOf(`${page.pathname}`) === 0 ||
        page.scopePathnames?.some((pathname) => activePage.pathname.includes(pathname))
      : false;
    let firstChild = page.children[0];

    if (firstChild.subheader && firstChild.children) {
      firstChild = firstChild.children[0];
    }

    const subheader = Boolean(page.subheader);

    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={firstChild.pathname}
        legacy={page.legacy}
        plan={page.plan}
        icon={page.icon}
        subheader={subheader}
        topLevel={topLevel && !page.subheader}
        openImmediately={topLevel || subheader}
      >
        {renderNavItems({
          onClose,
          pages: page.children,
          activePage,
          depth: subheader ? depth : depth + 1,
          t,
        })}
      </AppNavDrawerItem>,
    );
  } else {
    page = page.children && page.children.length === 1 ? page.children[0] : page;

    items.push(
      <AppNavDrawerItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        legacy={page.legacy}
        plan={page.plan}
        icon={page.icon}
        subheader={Boolean(page.subheader)}
        onClick={onClose}
      />,
    );
  }

  return items;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition without
// dropping frames. The performance will be good enough.
// So: <SwipeableDrawer disableBackdropTransition={false} />
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function AppNavDrawer(props) {
  const { className, disablePermanent, mobileOpen, onClose, onOpen } = props;
  const { activePage, pages } = React.useContext(PageContext);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userLanguage = useUserLanguage();
  const languagePrefix = userLanguage === 'en' ? '' : `/${userLanguage}`;
  const t = useTranslate();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const drawer = React.useMemo(() => {
    const isProductScoped = isNewLocation(router.asPath);
    const asPathWithoutLang = router.asPath.replace(/^\/[a-zA-Z]{2}\//, '/');

    const navItems = renderNavItems({ onClose, pages, activePage, depth: 0, t });

    const renderVersionSelector = (versions = [], sx) => {
      if (!versions?.length) {
        return null;
      }
      return (
        <React.Fragment>
          <Button
            id="mui-version-selector"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            endIcon={
              versions.length > 1 ? (
                <ArrowDropDownRoundedIcon fontSize="small" sx={{ ml: -0.5 }} />
              ) : null
            }
            sx={[
              (theme) => ({
                py: 0.1,
                minWidth: 0,
                fontSize: theme.typography.pxToRem(13),
                fontWeight: 500,
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary[300]
                    : theme.palette.primary[600],
                '& svg': {
                  ml: -0.6,
                  width: 18,
                  height: 18,
                },
                ...(!isProductScoped && {
                  px: 1,
                  py: 0.4,
                  border: `1px solid ${
                    theme.palette.mode === 'dark'
                      ? theme.palette.primaryDark[700]
                      : theme.palette.grey[200]
                  }`,
                  '&:hover': {
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.primaryDark[600]
                        : theme.palette.grey[300],
                    background:
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.primaryDark[700], 0.4)
                        : theme.palette.grey[50],
                  },
                }),
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {versions[0].text}
          </Button>
          <Menu
            id="mui-version-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {versions.map((item) => {
              if (item.text === 'View all versions') {
                return [
                  <Divider key="divider" />,
                  <MenuItem key="all-versions" component="a" href={item.href} onClick={onClose}>
                    {/* eslint-disable-next-line material-ui/no-hardcoded-labels -- version string is untranslatable */}
                    {`View all versions`}
                  </MenuItem>,
                ];
              }
              return (
                <MenuItem
                  key={item.text}
                  {...(item.current
                    ? {
                        selected: true,
                        onClick: () => setAnchorEl(null),
                      }
                    : {
                        component: 'a',
                        href: item.href,
                        onClick: onClose,
                      })}
                >
                  {item.text} {item.current && <DoneRounded sx={{ fontSize: 16, ml: 0.25 }} />}
                </MenuItem>
              );
            })}
          </Menu>
        </React.Fragment>
      );
    };

    return (
      <React.Fragment>
        <ToolbarDiv>
          <NextLink href="/" passHref onClick={onClose}>
            <Box
              component="a"
              aria-label={t('goToHome')}
              sx={{
                pr: '12px',
                mr: '4px',
                borderRight: isProductScoped ? '1px solid' : '0px',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primary[100], 0.08)
                    : theme.palette.grey[200],
              }}
            >
              <SvgMuiLogo width={30} />
            </Box>
          </NextLink>
          {!isProductScoped &&
            renderVersionSelector(
              [
                { text: `v${process.env.LIB_VERSION}`, current: true },
                { text: 'v4', href: `https://v4.mui.com${languagePrefix}/` },
                {
                  text: 'View all versions',
                  href: `https://mui.com${languagePrefix}/versions/`,
                },
              ],
              { mr: 2 },
            )}
          {asPathWithoutLang.startsWith('/material-ui/') && (
            <ProductIdentifier
              name="Material UI"
              metadata="MUI Core"
              versionSelector={renderVersionSelector([
                { text: `v${materialPkgJson.version}`, current: true },
                {
                  text: 'v4',
                  href: `https://v4.mui.com${languagePrefix}/getting-started/installation/`,
                },
                {
                  text: 'View all versions',
                  href: `https://mui.com${languagePrefix}/versions/`,
                },
              ])}
            />
          )}
          {asPathWithoutLang.startsWith('/joy-ui/') && (
            <ProductIdentifier
              name="Joy UI"
              metadata="MUI Core"
              versionSelector={renderVersionSelector([
                { text: `v${joyPkgJson.version}`, current: true },
              ])}
            />
          )}
          {asPathWithoutLang.startsWith('/system/') && FEATURE_TOGGLE.enable_system_scope && (
            <ProductIdentifier
              name="MUI System"
              metadata="MUI Core"
              versionSelector={renderVersionSelector([
                { text: `v${systemPkgJson.version}`, current: true },
                { text: 'v4', href: `https://v4.mui.com${languagePrefix}/system/basics/` },
                {
                  text: 'View all versions',
                  href: `https://mui.com${languagePrefix}/versions/`,
                },
              ])}
            />
          )}
          {asPathWithoutLang.startsWith('/base/') && (
            <ProductIdentifier
              name="MUI Base"
              metadata="MUI Core"
              versionSelector={renderVersionSelector([
                { text: `v${basePkgJson.version}`, current: true },
              ])}
            />
          )}
          {asPathWithoutLang.startsWith('/x/advanced-components') && (
            <ProductIdentifier name="Advanced components" metadata="MUI X" />
          )}
          {(asPathWithoutLang.startsWith('/x/react-data-grid') ||
            asPathWithoutLang.startsWith('/x/api/data-grid')) && (
            <ProductIdentifier
              name="Data Grid"
              metadata="MUI X"
              versionSelector={renderVersionSelector([
                // DATA_GRID_VERSION is set from the X repo
                { text: `v${process.env.DATA_GRID_VERSION}`, current: true },
                { text: 'v4', href: `https://v4.mui.com${languagePrefix}/components/data-grid/` },
              ])}
            />
          )}
          {(asPathWithoutLang.startsWith('/x/react-date-pickers') ||
            asPathWithoutLang.startsWith('/x/api/date-pickers')) && (
            <ProductIdentifier
              name="Date pickers"
              metadata="MUI X"
              versionSelector={renderVersionSelector([
                // DATE_PICKERS_VERSION is set from the X repo
                { text: `v${process.env.DATE_PICKERS_VERSION}`, current: true },
              ])}
            />
          )}
        </ToolbarDiv>
        <Divider
          sx={{
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary[100], 0.08)
                : theme.palette.grey[100],
          }}
        />
        <DiamondSponsors spot="drawer" />
        {navItems}
      </React.Fragment>
    );
  }, [activePage, pages, onClose, languagePrefix, t, anchorEl, setAnchorEl, router.asPath]);

  return (
    <nav className={className} aria-label={t('mainNavigation')}>
      {disablePermanent || mobile ? (
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          variant="temporary"
          open={mobileOpen}
          onOpen={onOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            className: 'algolia-drawer',
            component: AppNavPaperComponent,
          }}
        >
          <PersistScroll slot="swipeable" enabled={mobileOpen}>
            {drawer}
          </PersistScroll>
        </SwipeableDrawer>
      ) : null}
      {disablePermanent || mobile ? null : (
        <StyledDrawer
          variant="permanent"
          PaperProps={{
            component: AppNavPaperComponent,
          }}
          open
        >
          <PersistScroll slot="side" enabled>
            {drawer}
          </PersistScroll>
        </StyledDrawer>
      )}
    </nav>
  );
}

AppNavDrawer.propTypes = {
  className: PropTypes.string,
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};
