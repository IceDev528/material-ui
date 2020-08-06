import * as React from 'react';
import LZString from 'lz-string';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import copy from 'clipboard-copy';
import { useSelector, useDispatch } from 'react-redux';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { JavaScript as JavaScriptIcon, TypeScript as TypeScriptIcon } from '@material-ui/docs';
import NoSsr from '@material-ui/core/NoSsr';
import EditIcon from '@material-ui/icons/Edit';
import CodeIcon from '@material-ui/icons/Code';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import ResetFocusIcon from '@material-ui/icons/CenterFocusWeak';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import DemoSandboxed from 'docs/src/modules/components/DemoSandboxed';
import { AdCarbonInline } from 'docs/src/modules/components/AdCarbon';
import getDemoConfig from 'docs/src/modules/utils/getDemoConfig';
import getJsxPreview from 'docs/src/modules/utils/getJsxPreview';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { ACTION_TYPES, CODE_VARIANTS } from 'docs/src/modules/constants';

function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function addHiddenInput(form, name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

function getDemoName(location) {
  return location.replace(/(.+?)(\w+)\.\w+$$/, '$2');
}

function getDemoData(codeVariant, demo, githubLocation) {
  if (codeVariant === CODE_VARIANTS.TS && demo.rawTS) {
    return {
      codeVariant: CODE_VARIANTS.TS,
      githubLocation: githubLocation.replace(/\.js$/, '.tsx'),
      raw: demo.rawTS,
      Component: demo.tsx,
      sourceLanguage: 'tsx',
    };
  }

  return {
    codeVariant: CODE_VARIANTS.JS,
    githubLocation,
    raw: demo.raw,
    Component: demo.js,
    sourceLanguage: 'jsx',
  };
}

// TODO: replace with React.useOpaqueReference if it is released
function useUniqueId(prefix) {
  // useOpaqueReference
  const [id, setId] = React.useState();
  React.useEffect(() => {
    setId(Math.random().toString(36).slice(2));
  }, []);

  return id ? `${prefix}${id}` : id;
}

const useDemoToolbarStyles = makeStyles(
  (theme) => {
    return {
      root: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
          flip: false,
          top: 0,
          right: theme.spacing(1),
          height: theme.spacing(6),
        },
        justifyContent: 'space-between',
      },
      toggleButtonGroup: {
        margin: '8px 0',
      },
      toggleButton: {
        padding: '4px 9px',
      },
      tooltip: {
        zIndex: theme.zIndex.appBar - 1,
      },
    };
  },
  { name: 'DemoToolbar' },
);

const alwaysTrue = () => true;

/**
 *
 * @param {React.Ref<HTMLElement>[]} controlRefs
 * @param {object} [options]
 * @param {(index: number) => boolean} [options.isFocusableControl] In case certain controls become unfocusable
 * @param {number} [options.defaultActiveIndex]
 */
function useToolbar(controlRefs, options = {}) {
  const { defaultActiveIndex = 0, isFocusableControl = alwaysTrue } = options;
  const [activeControlIndex, setActiveControlIndex] = React.useState(defaultActiveIndex);

  // TODO: do we need to do this during layout practically? It's technically
  // a bit too late since we allow user interaction between layout and passive effects
  React.useEffect(() => {
    setActiveControlIndex((currentActiveControlIndex) => {
      if (!isFocusableControl(currentActiveControlIndex)) {
        return defaultActiveIndex;
      }
      return currentActiveControlIndex;
    });
  }, [defaultActiveIndex, isFocusableControl]);

  // controlRefs.findIndex(controlRef => controlRef.current = element)
  function findControlIndex(element) {
    let controlIndex = -1;
    controlRefs.forEach((controlRef, index) => {
      if (controlRef.current === element) {
        controlIndex = index;
      }
    });
    return controlIndex;
  }

  function handleControlFocus(event) {
    const nextActiveControlIndex = findControlIndex(event.target);
    if (nextActiveControlIndex !== -1) {
      setActiveControlIndex(nextActiveControlIndex);
    } else {
      // make sure DCE works
      // eslint-disable-next-line no-lonely-if
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'Material-UI: The toolbar contains a focusable element that is not controlled by the toolbar. ' +
            'Make sure you have attached `getControlProps(index)` to every focusable element within this toolbar.',
        );
      }
    }
  }

  let handleToolbarFocus;
  if (process.env.NODE_ENV !== 'production') {
    handleToolbarFocus = (event) => {
      if (findControlIndex(event.target) === -1) {
        console.error(
          'Material-UI: The toolbar contains a focusable element that is not controlled by the toolbar. ' +
            'Make sure you have attached `getControlProps(index)` to every focusable element within this toolbar.',
        );
      }
    };
  }

  const { direction } = useTheme();

  function handleToolbarKeyDown(event) {
    // We handle toolbars where controls can be hidden temporarily.
    // When a control is hidden we can't move focus to it and have to exclude
    // it from the order.
    let currentFocusableControlIndex = -1;
    const focusableControls = [];
    controlRefs.forEach((controlRef, index) => {
      const { current: control } = controlRef;
      if (index === activeControlIndex) {
        currentFocusableControlIndex = focusableControls.length;
      }
      if (control !== null && isFocusableControl(index)) {
        focusableControls.push(control);
      }
    });

    const prevControlKey = direction === 'ltr' ? 'ArrowLeft' : 'ArrowRight';
    const nextControlKey = direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft';

    let nextFocusableIndex = -1;
    switch (event.key) {
      case prevControlKey:
        nextFocusableIndex =
          (currentFocusableControlIndex - 1 + focusableControls.length) % focusableControls.length;
        break;
      case nextControlKey:
        nextFocusableIndex = (currentFocusableControlIndex + 1) % focusableControls.length;
        break;
      case 'Home':
        nextFocusableIndex = 0;
        break;
      case 'End':
        nextFocusableIndex = focusableControls.length - 1;
        break;
      default:
        break;
    }

    if (nextFocusableIndex !== -1) {
      event.preventDefault();
      focusableControls[nextFocusableIndex].focus();
    }
  }

  function getControlProps(index) {
    return {
      onFocus: handleControlFocus,
      ref: controlRefs[index],
      tabIndex: index === activeControlIndex ? 0 : -1,
    };
  }

  return {
    getControlProps,
    toolbarProps: {
      // TODO: good opportunity to warn on missing `aria-label`
      onFocus: handleToolbarFocus,
      onKeyDown: handleToolbarKeyDown,
      role: 'toolbar',
    },
  };
}

function DemoToolbar(props) {
  const {
    codeOpen,
    codeVariant,
    demo,
    demoData,
    demoId,
    demoHovered,
    demoName,
    demoOptions,
    demoSourceId,
    initialFocusRef,
    onCodeOpenChange,
    onResetDemoClick,
    openDemoSource,
    showPreview,
  } = props;

  const classes = useDemoToolbarStyles();

  const dispatch = useDispatch();
  const t = useSelector((state) => state.options.t);

  const hasTSVariant = demo.rawTS;
  const renderedCodeVariant = () => {
    if (codeVariant === CODE_VARIANTS.TS && hasTSVariant) {
      return CODE_VARIANTS.TS;
    }
    return CODE_VARIANTS.JS;
  };

  const handleCodeLanguageClick = (event, clickedCodeVariant) => {
    if (codeVariant !== clickedCodeVariant) {
      dispatch({
        type: ACTION_TYPES.OPTIONS_CHANGE,
        payload: {
          codeVariant: clickedCodeVariant,
        },
      });
    }
  };

  const handleCodeSandboxClick = () => {
    const demoConfig = getDemoConfig(demoData);
    const parameters = compress({
      files: {
        'package.json': {
          content: {
            title: demoConfig.title,
            description: demoConfig.description,
            dependencies: demoConfig.dependencies,
            devDependencies: {
              'react-scripts': 'latest',
              ...demoConfig.devDependencies,
            },
            main: demoConfig.main,
            scripts: demoConfig.scripts,
          },
        },
        ...Object.keys(demoConfig.files).reduce((files, name) => {
          files[name] = { content: demoConfig.files[name] };
          return files;
        }, {}),
      },
    });

    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://codeSandbox.io/api/v1/sandboxes/define';
    addHiddenInput(form, 'parameters', parameters);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleCopyClick = async () => {
    try {
      await copy(demoData.raw);
      setSnackbarMessage(t('copiedSource'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const handleStackBlitzClick = () => {
    const demoConfig = getDemoConfig(demoData);
    const form = document.createElement('form');
    form.method = 'POST';
    form.target = '_blank';
    form.action = 'https://stackblitz.com/run';
    addHiddenInput(form, 'project[template]', 'javascript');
    addHiddenInput(form, 'project[title]', demoConfig.title);
    addHiddenInput(form, 'project[description]', demoConfig.description);
    addHiddenInput(form, 'project[dependencies]', JSON.stringify(demoConfig.dependencies));
    addHiddenInput(form, 'project[devDependencies]', JSON.stringify(demoConfig.devDependencies));
    Object.keys(demoConfig.files).forEach((key) => {
      const value = demoConfig.files[key];
      addHiddenInput(form, `project[files][${key}]`, value);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    handleMoreClose();
  };

  const createHandleCodeSourceLink = (anchor) => async () => {
    try {
      await copy(`${window.location.href.split('#')[0]}#${anchor}`);
      setSnackbarMessage(t('copiedSourceLink'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const [sourceHintSeen, setSourceHintSeen] = React.useState(false);
  React.useEffect(() => {
    setSourceHintSeen(getCookie('sourceHintSeen'));
  }, []);
  const handleCodeOpenClick = () => {
    document.cookie = `sourceHintSeen=true;path=/;max-age=31536000`;
    onCodeOpenChange();
    setSourceHintSeen(true);
  };

  function handleResetFocusClick() {
    initialFocusRef.current.focusVisible();
  }

  const showSourceHint = demoHovered && !sourceHintSeen;

  let showCodeLabel;
  if (codeOpen) {
    showCodeLabel = showPreview ? t('hideFullSource') : t('hideSource');
  } else {
    showCodeLabel = showPreview ? t('showFullSource') : t('showSource');
  }

  const atLeastSmallViewport = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const controlRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ];
  // if the code is not open we hide the first two language controls
  const isFocusableControl = React.useCallback((index) => (codeOpen ? true : index >= 2), [
    codeOpen,
  ]);
  const { getControlProps, toolbarProps } = useToolbar(controlRefs, {
    defaultActiveIndex: 2,
    isFocusableControl,
  });

  return (
    <React.Fragment>
      <div aria-label={t('demoToolbarLabel')} className={classes.root} {...toolbarProps}>
        <NoSsr defer>
          <Fade in={codeOpen}>
            <ToggleButtonGroup
              className={classes.toggleButtonGroup}
              exclusive
              value={renderedCodeVariant()}
              onChange={handleCodeLanguageClick}
            >
              <ToggleButton
                className={classes.toggleButton}
                value={CODE_VARIANTS.JS}
                aria-label={t('showJSSource')}
                data-ga-event-category="demo"
                data-ga-event-action="source-js"
                data-ga-event-label={demoOptions.demo}
                {...getControlProps(0)}
              >
                <JavaScriptIcon />
              </ToggleButton>
              <ToggleButton
                className={classes.toggleButton}
                value={CODE_VARIANTS.TS}
                disabled={!hasTSVariant}
                aria-label={t('showTSSource')}
                data-ga-event-category="demo"
                data-ga-event-action="source-ts"
                data-ga-event-label={demoOptions.demo}
                {...getControlProps(1)}
              >
                <TypeScriptIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Fade>
          <div>
            <Tooltip
              classes={{ popper: classes.tooltip }}
              key={showSourceHint}
              open={showSourceHint && atLeastSmallViewport ? true : undefined}
              PopperProps={{ disablePortal: true }}
              title={showCodeLabel}
              placement="top"
            >
              <IconButton
                aria-controls={openDemoSource ? demoSourceId : null}
                aria-label={showCodeLabel}
                data-ga-event-category="demo"
                data-ga-event-label={demoOptions.demo}
                data-ga-event-action="expand"
                onClick={handleCodeOpenClick}
                color={demoHovered ? 'primary' : 'default'}
                {...getControlProps(2)}
              >
                <CodeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            {demoOptions.hideEditButton ? null : (
              <Tooltip
                classes={{ popper: classes.tooltip }}
                title={t('codesandbox')}
                placement="top"
              >
                <IconButton
                  aria-label={t('codesandbox')}
                  data-ga-event-category="demo"
                  data-ga-event-label={demoOptions.demo}
                  data-ga-event-action="codesandbox"
                  onClick={handleCodeSandboxClick}
                  {...getControlProps(3)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip classes={{ popper: classes.tooltip }} title={t('copySource')} placement="top">
              <IconButton
                aria-label={t('copySource')}
                data-ga-event-category="demo"
                data-ga-event-label={demoOptions.demo}
                data-ga-event-action="copy"
                onClick={handleCopyClick}
                {...getControlProps(4)}
              >
                <FileCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip classes={{ popper: classes.tooltip }} title={t('resetFocus')} placement="top">
              <IconButton
                aria-label={t('resetFocus')}
                data-ga-event-category="demo"
                data-ga-event-label={demoOptions.demo}
                data-ga-event-action="reset-focus"
                onClick={handleResetFocusClick}
                {...getControlProps(5)}
              >
                <ResetFocusIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip classes={{ popper: classes.tooltip }} title={t('resetDemo')} placement="top">
              <IconButton
                aria-controls={demoId}
                aria-label={t('resetDemo')}
                data-ga-event-category="demo"
                data-ga-event-label={demoOptions.demo}
                data-ga-event-action="reset"
                onClick={onResetDemoClick}
                {...getControlProps(6)}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={handleMoreClick}
              aria-owns={anchorEl ? 'demo-menu-more' : undefined}
              aria-haspopup="true"
              aria-label={t('seeMore')}
              {...getControlProps(7)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              id="demo-menu-more"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMoreClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                data-ga-event-category="demo"
                data-ga-event-label={demoOptions.demo}
                data-ga-event-action="github"
                component="a"
                href={demoData.githubLocation}
                target="_blank"
                rel="noopener nofollow"
                onClick={handleMoreClose}
              >
                {t('viewGitHub')}
              </MenuItem>
              {demoOptions.hideEditButton ? null : (
                <MenuItem
                  data-ga-event-category="demo"
                  data-ga-event-label={demoOptions.demo}
                  data-ga-event-action="stackblitz"
                  onClick={handleStackBlitzClick}
                >
                  {t('stackblitz')}
                </MenuItem>
              )}
              <MenuItem
                data-ga-event-category="demo"
                data-ga-event-label={demoOptions.demo}
                data-ga-event-action="copy-js-source-link"
                onClick={createHandleCodeSourceLink(`${demoName}.js`)}
              >
                {t('copySourceLinkJS')}
              </MenuItem>
              <MenuItem
                data-ga-event-category="demo"
                data-ga-event-label={demoOptions.demo}
                data-ga-event-action="copy-ts-source-link"
                onClick={createHandleCodeSourceLink(`${demoName}.tsx`)}
              >
                {t('copySourceLinkTS')}
              </MenuItem>
            </Menu>
          </div>
        </NoSsr>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}

DemoToolbar.propTypes = {
  codeOpen: PropTypes.bool.isRequired,
  codeVariant: PropTypes.string.isRequired,
  demo: PropTypes.object.isRequired,
  demoData: PropTypes.object.isRequired,
  demoHovered: PropTypes.bool.isRequired,
  demoId: PropTypes.string,
  demoName: PropTypes.string.isRequired,
  demoOptions: PropTypes.object.isRequired,
  demoSourceId: PropTypes.string,
  initialFocusRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  onCodeOpenChange: PropTypes.func.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
  openDemoSource: PropTypes.bool.isRequired,
  showPreview: PropTypes.bool.isRequired,
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginBottom: 40,
      marginLeft: -theme.spacing(2),
      marginRight: -theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0, 1),
        marginLeft: 0,
        marginRight: 0,
      },
    },
    demo: {
      position: 'relative',
      outline: 0,
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.up('sm')]: {
        borderRadius: theme.shape.borderRadius,
      },
    },
    /* Isolate the demo with an outline. */
    demoBgOutlined: {
      padding: theme.spacing(3),
      border: `1px solid ${fade(theme.palette.action.active, 0.12)}`,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      [theme.breakpoints.up('sm')]: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
      },
    },
    /* Prepare the background to display an inner elevation. */
    demoBgTrue: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.level2,
    },
    /* Make no difference between the demo and the markdown. */
    demoBgInline: {
      // Maintain alignment with the markdown text
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(3),
      },
    },
    demoHiddenToolbar: {
      paddingTop: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(3),
      },
    },
    code: {
      display: 'none',
      padding: 0,
      marginBottom: theme.spacing(1),
      marginRight: 0,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      '& pre': {
        overflow: 'auto',
        lineHeight: 1.5,
        margin: '0 !important',
        maxHeight: 'min(68vh, 1000px)',
      },
    },
    anchorLink: {
      marginTop: -64, // height of toolbar
      position: 'absolute',
    },
    initialFocus: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: theme.spacing(4),
      height: theme.spacing(4),
      pointerEvents: 'none',
    },
  }),
  { name: 'Demo' },
);

function Demo(props) {
  const { demo, demoOptions, githubLocation } = props;
  const classes = useStyles();
  const t = useSelector((state) => state.options.t);
  const codeVariant = useSelector((state) => state.options.codeVariant);
  const demoData = getDemoData(codeVariant, demo, githubLocation);

  const [demoHovered, setDemoHovered] = React.useState(false);
  const handleDemoHover = (event) => {
    setDemoHovered(event.type === 'mouseenter');
  };

  const DemoComponent = demoData.Component;
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

  const jsx = getJsxPreview(demoData.raw || '');
  const showPreview =
    !demoOptions.hideToolbar &&
    demoOptions.defaultCodeOpen !== false &&
    jsx !== demoData.raw &&
    jsx.split(/\n/).length <= 17;

  const [demoKey, resetDemo] = React.useReducer((key) => key + 1, 0);

  const demoId = useUniqueId('demo-');
  const demoSourceId = useUniqueId(`demoSource-`);
  const openDemoSource = codeOpen || showPreview;

  const initialFocusRef = React.useRef(null);

  const [showAd, setShowAd] = React.useState(false);

  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.demo, {
          [classes.demoHiddenToolbar]: demoOptions.hideToolbar,
          [classes.demoBgOutlined]: demoOptions.bg === 'outlined',
          [classes.demoBgTrue]: demoOptions.bg === true,
          [classes.demoBgInline]: demoOptions.bg === 'inline',
        })}
        id={demoId}
        onMouseEnter={handleDemoHover}
        onMouseLeave={handleDemoHover}
      >
        <IconButton
          aria-label={t('initialFocusLabel')}
          className={classes.initialFocus}
          action={initialFocusRef}
          tabIndex={-1}
        />
        <DemoSandboxed
          key={demoKey}
          style={demoSandboxedStyle}
          component={DemoComponent}
          iframe={demoOptions.iframe}
          name={demoName}
          onResetDemoClick={resetDemo}
        />
      </div>
      <div className={classes.anchorLink} id={`${demoName}.js`} />
      <div className={classes.anchorLink} id={`${demoName}.tsx`} />
      {demoOptions.hideToolbar ? null : (
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
      )}
      <Collapse in={openDemoSource} unmountOnExit>
        <div>
          <HighlightedCode
            className={classes.code}
            id={demoSourceId}
            code={showPreview && !codeOpen ? jsx : demoData.raw}
            language={demoData.sourceLanguage}
          />
        </div>
      </Collapse>
      {showAd ? <AdCarbonInline /> : null}
    </div>
  );
}

Demo.propTypes = {
  demo: PropTypes.object.isRequired,
  demoOptions: PropTypes.object.isRequired,
  githubLocation: PropTypes.string.isRequired,
};

export default Demo;
