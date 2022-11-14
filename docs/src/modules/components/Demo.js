import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { debounce } from '@mui/material/utils';
import { alpha, styled } from '@mui/material/styles';
import { styled as joyStyled } from '@mui/joy/styles';
import { unstable_useId as useId } from '@mui/utils';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import NoSsr from '@mui/material/NoSsr';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import DemoSandbox from 'docs/src/modules/components/DemoSandbox';
import ReactRunner from 'docs/src/modules/components/ReactRunner';
import DemoEditor from 'docs/src/modules/components/DemoEditor';
import DemoEditorError from 'docs/src/modules/components/DemoEditorError';
import { AdCarbonInline } from 'docs/src/modules/components/AdCarbon';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import { useCodeVariant } from 'docs/src/modules/utils/codeVariant';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';
import BrandingProvider from 'docs/src/BrandingProvider';

/**
 * Removes leading spaces (indentation) present in the `.tsx` previews
 * to be able to replace the existing code with the incoming dynamic code
 * @param {string} input
 */
function trimLeadingSpaces(input = '') {
  return input.replace(/^\s+/gm, '');
}

const DemoToolbar = React.lazy(() => import('./DemoToolbar'));
// Sync with styles from DemoToolbar
// Importing the styles results in no bundle size reduction
const DemoToolbarFallbackRoot = styled('div')(({ theme }) => {
  return {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: theme.spacing(8),
    },
  };
});
export function DemoToolbarFallback() {
  const t = useTranslate();

  return <DemoToolbarFallbackRoot aria-busy aria-label={t('demoToolbarLabel')} role="toolbar" />;
}

function getDemoName(location) {
  return location.replace(/(.+?)(\w+)\.\w+$$/, '$2');
}

function useDemoData(codeVariant, demo, githubLocation) {
  const userLanguage = useUserLanguage();
  const router = useRouter();
  const { canonicalAs } = pathnameToLanguage(router.asPath);

  return React.useMemo(() => {
    let product;
    let name = 'Material UI';
    if (canonicalAs.startsWith('/joy-ui/')) {
      product = 'joy-ui';
      name = 'Joy UI';
    } else if (canonicalAs.startsWith('/base/')) {
      product = 'base';
      name = 'MUI Base';
    } else if (canonicalAs.startsWith('/x/')) {
      name = 'MUI X';
    }

    return {
      scope: demo.scope,
      jsxPreview: demo.jsxPreview,
      ...(codeVariant === CODE_VARIANTS.TS && demo.rawTS
        ? {
            codeVariant: CODE_VARIANTS.TS,
            githubLocation: githubLocation.replace(/\.js$/, '.tsx'),
            raw: demo.rawTS,
            Component: demo.tsx,
            sourceLanguage: 'tsx',
          }
        : {
            codeVariant: CODE_VARIANTS.JS,
            githubLocation,
            raw: demo.raw,
            Component: demo.js,
            sourceLanguage: 'jsx',
          }),
      title: `${getDemoName(githubLocation)} demo — ${name}`,
      product,
      language: userLanguage,
    };
  }, [canonicalAs, codeVariant, demo, githubLocation, userLanguage]);
}

function useDemoElement({ demoOptions, demoData, editorCode, setDebouncedError }) {
  const debouncedSetError = React.useMemo(
    () => debounce(setDebouncedError, 300),
    [setDebouncedError],
  );

  React.useEffect(() => {
    return () => {
      debouncedSetError.clear();
    };
  }, [debouncedSetError]);

  // Memoize to avoid rendering the demo more than it needs to be.
  // For example, avoid a render when the demo is hovered.
  const BundledComponent = React.useMemo(() => <demoData.Component />, [demoData]);
  const LiveComponent = React.useMemo(
    () => (
      <ReactRunner
        scope={demoData.scope}
        onError={debouncedSetError}
        code={
          editorCode.isPreview
            ? trimLeadingSpaces(demoData.raw).replace(
                trimLeadingSpaces(demoData.jsxPreview),
                editorCode.value,
              )
            : editorCode.value
        }
      />
    ),
    [demoData, debouncedSetError, editorCode.isPreview, editorCode.value],
  );

  const renderBundledComponent =
    // No need for a live environment if the code matches with the component rendered server-side.
    editorCode.value === editorCode.initialEditorCode ||
    // A limitation from https://github.com/nihgwu/react-runner, we can inject the `window` of the iframe
    demoOptions.disableLiveEdit;

  return renderBundledComponent ? BundledComponent : LiveComponent;
}

const Root = styled('div')(({ theme }) => ({
  marginBottom: 24,
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const DemoRootMaterial = styled('div', {
  shouldForwardProp: (prop) => prop !== 'hiddenToolbar' && prop !== 'bg',
})(({ theme, hiddenToolbar, bg }) => ({
  position: 'relative',
  outline: 0,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    borderRadius: 10,
    ...(bg === 'outlined' && {
      borderLeftWidth: 1,
      borderRightWidth: 1,
    }),
    /* Make no difference between the demo and the markdown. */
    ...(bg === 'inline' && {
      padding: theme.spacing(0),
    }),
    ...(hiddenToolbar && {
      paddingTop: theme.spacing(1),
    }),
  },
  /* Isolate the demo with an outline. */
  ...(bg === 'outlined' && {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  }),
  /* Prepare the background to display an inner elevation. */
  ...(bg === true && {
    padding: theme.spacing(3),
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
  }),
  /* Mostly meant for introduction demos. */
  ...(bg === 'gradient' && {
    padding: theme.spacing(20, 8),
    border: `1px solid ${
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primaryDark[500], 0.7)
        : alpha(theme.palette.primary[100], 0.5)
    }`,
    overflow: 'hidden',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primaryDark[800]
        : alpha(theme.palette.primary[50], 0.5),
    backgroundClip: 'padding-box',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? `radial-gradient(at 51% 52%, ${alpha(
            theme.palette.primaryDark[700],
            0.5,
          )} 0px, transparent 50%),
        radial-gradient(at 80% 0%, ${theme.palette.primaryDark[700]} 0px, transparent 50%),
        radial-gradient(at 0% 95%, ${theme.palette.primaryDark[600]} 0px, transparent 50%),
        radial-gradient(at 0% 20%, ${theme.palette.primaryDark[600]} 0px, transparent 35%),
        radial-gradient(at 93% 85%, ${alpha(
          theme.palette.primaryDark[500],
          0.8,
        )} 0px, transparent 50%),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23003A75' fill-opacity='0.15'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`
        : `radial-gradient(at 51% 52%, ${alpha(
            theme.palette.primary[50],
            0.5,
          )} 0px, transparent 50%),
        radial-gradient(at 80% 0%, #FFFFFF 0px, transparent 20%),
        radial-gradient(at 0% 95%, ${alpha(theme.palette.primary[100], 0.3)}, transparent 40%),
        radial-gradient(at 0% 20%, ${theme.palette.primary[50]} 0px, transparent 50%),
        radial-gradient(at 93% 85%, ${alpha(theme.palette.primary[100], 0.2)} 0px, transparent 50%),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23003A75' fill-opacity='0.03'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`,
  }),
  ...(hiddenToolbar && {
    paddingTop: theme.spacing(2),
  }),
}));

const DemoRootJoy = joyStyled('div', {
  shouldForwardProp: (prop) => prop !== 'hiddenToolbar' && prop !== 'bg',
})(({ theme, hiddenToolbar, bg }) => ({
  position: 'relative',
  outline: 0,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    borderRadius: 10,
    ...(bg === 'outlined' && {
      borderLeftWidth: 1,
      borderRightWidth: 1,
    }),
    /* Make no difference between the demo and the markdown. */
    ...(bg === 'inline' && {
      padding: theme.spacing(0),
    }),
    ...(hiddenToolbar && {
      paddingTop: theme.spacing(1),
    }),
  },
  /* Isolate the demo with an outline. */
  ...(bg === 'outlined' && {
    padding: theme.spacing(3),
    backgroundColor: theme.vars.palette.background.surface,
    border: `1px solid`,
    borderColor: theme.vars.palette.divider,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  }),
  /* Prepare the background to display an inner elevation. */
  ...(bg === true && {
    padding: theme.spacing(3),
    backgroundColor: theme.vars.palette.background.level2,
  }),
  ...(hiddenToolbar && {
    paddingTop: theme.spacing(3),
  }),
}));

const DemoCodeViewer = styled(HighlightedCode)(({ theme }) => ({
  '& pre': {
    margin: 0,
    maxHeight: 'min(68vh, 1000px)',
    maxWidth: 'initial',
    borderRadius: 0,
    [theme.breakpoints.up('sm')]: {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const AnchorLink = styled('div')({
  marginTop: -64, // height of toolbar
  position: 'absolute',
});

const InitialFocus = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: theme.spacing(4),
  height: theme.spacing(4),
  pointerEvents: 'none',
}));

export default function Demo(props) {
  const { demo, demoOptions, disableAd, githubLocation, mode } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (demoOptions.hideToolbar === false) {
      throw new Error(
        [
          '"hiddenToolbar": false is already the default.',
          `Please remove the property in {{"demo": "${demoOptions.demo}", …}}.`,
        ].join('\n'),
      );
    }
  }

  const t = useTranslate();
  const codeVariant = useCodeVariant();
  const demoData = useDemoData(codeVariant, demo, githubLocation);

  const [demoHovered, setDemoHovered] = React.useState(false);
  const handleDemoHover = (event) => {
    setDemoHovered(event.type === 'mouseenter');
  };

  const demoName = getDemoName(demoData.githubLocation);
  const demoSandboxedStyle = React.useMemo(
    () => ({
      maxWidth: demoOptions.maxWidth,
      height: demoOptions.height,
    }),
    [demoOptions.height, demoOptions.maxWidth],
  );

  if (demoOptions.bg == null) {
    demoOptions.bg = 'outlined';
  }

  if (demoOptions.iframe) {
    demoOptions.bg = true;
  }

  const [codeOpen, setCodeOpen] = React.useState(demoOptions.defaultCodeOpen || false);
  const shownOnce = React.useRef(false);
  if (codeOpen) {
    shownOnce.current = true;
  }

  React.useEffect(() => {
    const navigatedDemoName = getDemoName(window.location.hash);
    if (demoName === navigatedDemoName) {
      setCodeOpen(true);
    }
  }, [demoName]);

  const showPreview =
    !demoOptions.hideToolbar &&
    demoOptions.defaultCodeOpen !== false &&
    Boolean(demoData.jsxPreview);

  const [demoKey, setDemoKey] = React.useReducer((key) => key + 1, 0);

  const demoId = `demo-${useId()}`;
  const demoSourceId = `demoSource-${useId()}`;
  const openDemoSource = codeOpen || showPreview;

  const initialFocusRef = React.useRef(null);

  const [showAd, setShowAd] = React.useState(false);
  const adVisibility = showAd && !disableAd && !demoOptions.disableAd;

  const DemoRoot = demoData.product === 'joy-ui' ? DemoRootJoy : DemoRootMaterial;
  const Wrapper = demoData.product === 'joy-ui' ? BrandingProvider : React.Fragment;

  const isPreview = !codeOpen && showPreview;
  const initialEditorCode = isPreview
    ? demoData.jsxPreview
    : // Prettier remove all the leading lines except for the last one, remove it as we don't
      // need it in the live edit view.
      demoData.raw.replace(/\n$/, '');

  const [editorCode, setEditorCode] = React.useState({
    value: initialEditorCode,
    isPreview,
    initialEditorCode,
  });

  const resetDemo = () => {
    setEditorCode({
      value: initialEditorCode,
      isPreview,
      initialEditorCode,
    });
    setDemoKey();
  };

  React.useEffect(() => {
    setEditorCode({
      value: initialEditorCode,
      isPreview,
      initialEditorCode,
    });
  }, [initialEditorCode, isPreview]);

  const [debouncedError, setDebouncedError] = React.useState(null);

  const demoElement = useDemoElement({
    demoOptions,
    demoData,
    editorCode,
    setDebouncedError,
  });

  return (
    <Root>
      <AnchorLink id={`${demoName}`} />
      <DemoRoot
        hiddenToolbar={demoOptions.hideToolbar}
        bg={demoOptions.bg}
        id={demoId}
        onMouseEnter={handleDemoHover}
        onMouseLeave={handleDemoHover}
      >
        <Wrapper {...(demoData.product === 'joy-ui' && { mode })}>
          <InitialFocus
            aria-label={t('initialFocusLabel')}
            action={initialFocusRef}
            tabIndex={-1}
          />
        </Wrapper>
        <DemoSandbox
          key={demoKey}
          style={demoSandboxedStyle}
          iframe={demoOptions.iframe}
          name={demoName}
          onResetDemoClick={resetDemo}
        >
          {demoElement}
        </DemoSandbox>
      </DemoRoot>
      <AnchorLink id={`${demoName}.js`} />
      <AnchorLink id={`${demoName}.tsx`} />
      <Wrapper {...(demoData.product === 'joy-ui' ? { mode } : {})}>
        {demoOptions.hideToolbar ? null : (
          <NoSsr defer fallback={<DemoToolbarFallback />}>
            <React.Suspense fallback={<DemoToolbarFallback />}>
              <DemoToolbar
                codeOpen={codeOpen}
                codeVariant={codeVariant}
                demo={demo}
                demoData={demoData}
                demoHovered={demoHovered}
                demoId={demoId}
                demoName={demoName}
                demoOptions={demoOptions}
                demoSourceId={demoSourceId}
                initialFocusRef={initialFocusRef}
                onCodeOpenChange={() => {
                  setCodeOpen((open) => !open);
                  setShowAd(true);
                }}
                onResetDemoClick={resetDemo}
                openDemoSource={openDemoSource}
                showPreview={showPreview}
              />
            </React.Suspense>
          </NoSsr>
        )}
        <Collapse in={openDemoSource} unmountOnExit>
          {demoOptions.disableLiveEdit ? (
            <DemoCodeViewer
              code={editorCode.value}
              id={demoSourceId}
              language={demoData.sourceLanguage}
              copyButtonProps={{
                'data-ga-event-category': codeOpen ? 'demo-expand' : 'demo',
                'data-ga-event-label': demoOptions.demo,
                'data-ga-event-action': 'copy-click',
              }}
            />
          ) : (
            <DemoEditor
              value={editorCode.value}
              onChange={(value) => {
                setEditorCode({
                  ...editorCode,
                  value,
                });
              }}
              id={demoSourceId}
              language={demoData.sourceLanguage}
              copyButtonProps={{
                'data-ga-event-category': codeOpen ? 'demo-expand' : 'demo',
                'data-ga-event-label': demoOptions.demo,
                'data-ga-event-action': 'copy-click',
              }}
            >
              <DemoEditorError>{debouncedError}</DemoEditorError>
            </DemoEditor>
          )}
        </Collapse>
        {adVisibility ? <AdCarbonInline /> : null}
      </Wrapper>
    </Root>
  );
}

Demo.propTypes = {
  demo: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  disableAd: PropTypes.bool.isRequired,
  githubLocation: PropTypes.string.isRequired,
  mode: PropTypes.string, // temporary, just to make Joy docs work.
};
