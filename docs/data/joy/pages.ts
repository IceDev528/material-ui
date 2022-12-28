const pages = [
  {
    pathname: '/joy-ui/getting-started',
    scopePathnames: ['/joy-ui/main-features'],
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/joy-ui/getting-started/overview' },
      { pathname: '/joy-ui/getting-started/installation' },
      { pathname: '/joy-ui/getting-started/usage' },
      { pathname: '/joy-ui/getting-started/tutorial' },
      { pathname: '/joy-ui/getting-started/templates' },
      {
        pathname: '/joy-ui/main-features',
        subheader: 'main-features',
        children: [
          { pathname: '/joy-ui/main-features/global-variants' },
          { pathname: '/joy-ui/main-features/color-inversion' },
          { pathname: '/joy-ui/main-features/automatic-adjustment' },
          { pathname: '/joy-ui/main-features/dark-mode-optimization' },
        ],
      },
    ],
  },
  {
    pathname: '/joy-ui/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/joy-ui/components/inputs',
        subheader: 'inputs',
        children: [
          { pathname: '/joy-ui/react-autocomplete' },
          { pathname: '/joy-ui/react-button' },
          { pathname: '/joy-ui/react-checkbox' },
          { pathname: '/joy-ui/react-input' },
          { pathname: '/joy-ui/react-radio-button', title: 'Radio Group' },
          { pathname: '/joy-ui/react-select' },
          { pathname: '/joy-ui/react-slider' },
          { pathname: '/joy-ui/react-switch' },
          { pathname: '/joy-ui/react-textarea' },
          { pathname: '/joy-ui/react-text-field', title: 'Text Field' },
        ],
      },
      {
        pathname: '/joy-ui/components/data-display',
        subheader: 'data-display',
        children: [
          { pathname: '/joy-ui/react-aspect-ratio', title: 'Aspect Ratio' },
          { pathname: '/joy-ui/react-avatar' },
          { pathname: '/joy-ui/react-badge' },
          { pathname: '/joy-ui/react-chip' },
          { pathname: '/joy-ui/react-divider' },
          { pathname: '/joy-ui/react-list' },
          { pathname: '/joy-ui/react-typography' },
          { pathname: '/joy-ui/react-tooltip' },
        ],
      },
      {
        pathname: '/joy-ui/components/feedback',
        subheader: 'feedback',
        children: [
          { pathname: '/joy-ui/react-alert' },
          { pathname: '/joy-ui/react-circular-progress', title: 'Circular Progress' },
          { pathname: '/joy-ui/react-linear-progress', title: 'Linear Progress' },
          { pathname: '/joy-ui/react-modal' },
        ],
      },
      {
        pathname: '/joy-ui/components/surfaces',
        subheader: 'surfaces',
        children: [{ pathname: '/joy-ui/react-card' }, { pathname: '/joy-ui/react-sheet' }],
      },
      {
        pathname: '/joy-ui/components/navigation',
        subheader: 'navigation',
        children: [
          { pathname: '/joy-ui/react-breadcrumbs' },
          { pathname: '/joy-ui/react-link' },
          { pathname: '/joy-ui/react-menu' },
          { pathname: '/joy-ui/react-tabs' },
        ],
      },
      {
        pathname: '/joy-ui/components/layout',
        subheader: 'layout',
        children: [{ pathname: '/joy-ui/react-grid' }, { pathname: '/joy-ui/react-stack' }],
      },
      {
        pathname: '/joy-ui/components/utils',
        subheader: 'utils',
        children: [{ pathname: '/joy-ui/react-css-baseline', title: 'CSS Baseline' }],
      },
    ],
  },
  {
    pathname: '/joy-ui/customization',
    icon: 'CreateIcon',
    children: [
      { pathname: '/joy-ui/customization/approaches' },
      { pathname: '/joy-ui/customization/dark-mode' },
      { pathname: '/joy-ui/customization/default-theme' },
      { pathname: '/joy-ui/customization/theme-tokens' },
      { pathname: '/joy-ui/customization/theme-typography' },
      { pathname: '/joy-ui/customization/themed-components' },
      { pathname: '/joy-ui/customization/using-css-variables', title: 'Using CSS variables' },
    ],
  },
  {
    pathname: '/joy-ui/guides',
    title: 'How-to guides',
    icon: 'VisibilityIcon',
    children: [
      {
        pathname: '/joy-ui/guides/using-joy-ui-and-material-ui-together',
        title: 'Joy UI and Material UI together',
      },
      {
        pathname: '/joy-ui/guides/using-icon-libraries',
        title: 'Using icon libraries',
      },
    ],
  },
];

export default pages;
