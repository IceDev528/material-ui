import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { exactProp } from '@mui/utils';
import NoSsr from '@mui/material/NoSsr';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';
import AppLayoutDocsFooter from 'docs/src/modules/components/AppLayoutDocsFooter';

const TOC_WIDTH = 240;
const NAV_WIDTH = 280;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'disableToc',
})(({ disableToc, theme }) => ({
  display: 'flex',
  width: '100%',
  ...(disableToc && {
    [theme.breakpoints.up('lg')]: {
      marginRight: '5%',
    },
  }),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH}px)`,
  },
}));

const StyledAppContainer = styled(AppContainer, {
  shouldForwardProp: (prop) => prop !== 'disableAd' && prop !== 'disableToc',
})(({ disableAd, disableToc, theme }) => {
  return {
    position: 'relative',
    ...(!disableAd && {
      '&& .description': {
        marginBottom: 198,
      },
      '&& .description.ad': {
        marginBottom: 40,
      },
      ...(!disableToc && {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${TOC_WIDTH}px)`,
        },
      }),
      ...(!disableToc && {
        [theme.breakpoints.up('lg')]: {
          paddingLeft: '60px',
          paddingRight: '60px',
        },
      }),
    }),
  };
});

const ActionsDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: -10,
  marginBottom: -15,
  [theme.breakpoints.up('lg')]: {
    justifyContent: 'flex-end',
  },
}));

function AppLayoutDocs(props) {
  const router = useRouter();
  const {
    children,
    description,
    disableAd = false,
    disableToc = false,
    location,
    title,
    toc,
  } = props;

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  const asPathWithoutLang = router.asPath.replace(/^\/[a-zA-Z]{2}\//, '/');
  let productName = 'MUI';
  if (asPathWithoutLang.startsWith('/material')) {
    productName = 'Material UI';
  }
  if (asPathWithoutLang.startsWith('/base')) {
    productName = 'Base UI';
  }
  if (asPathWithoutLang.startsWith('/x')) {
    productName = 'MUI X';
  }

  return (
    <AppFrame>
      <AdManager>
        <Head title={`${title} - ${productName}`} description={description} />
        {disableAd ? null : (
          <AdGuest>
            <Ad />
          </AdGuest>
        )}
        <Main disableToc={disableToc}>
          {/*
            Render the TOCs first to avoid layout shift when the HTML is streamed.
            See https://jakearchibald.com/2014/dont-use-flexbox-for-page-layout/ for more details.
          */}
          {disableToc ? null : <AppTableOfContents toc={toc} />}
          <StyledAppContainer disableAd={disableAd} disableToc={disableToc}>
            <ActionsDiv>{location && <EditPage markdownLocation={location} />}</ActionsDiv>
            {children}
            <NoSsr>
              <AppLayoutDocsFooter />
            </NoSsr>
          </StyledAppContainer>
        </Main>
      </AdManager>
    </AppFrame>
  );
}

AppLayoutDocs.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  disableAd: PropTypes.bool.isRequired,
  disableToc: PropTypes.bool.isRequired,
  location: PropTypes.string,
  title: PropTypes.string.isRequired,
  toc: PropTypes.array.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  AppLayoutDocs.propTypes = exactProp(AppLayoutDocs.propTypes);
}

export default AppLayoutDocs;
