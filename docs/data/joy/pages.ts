const pages = [
  {
    pathname: '/joy-ui/getting-started',
    scopePathnames: ['/joy-ui/core-features'],
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/joy-ui/getting-started/overview' },
      { pathname: '/joy-ui/getting-started/usage' },
      { pathname: '/joy-ui/getting-started/tutorial' },
      { pathname: '/joy-ui/getting-started/templates' },
      {
        pathname: '/joy-ui/core-features',
        subheader: 'core-features',
        children: [
          { pathname: '/joy-ui/core-features/global-variant' },
          { pathname: '/joy-ui/core-features/automatic-adjustment' },
          { pathname: '/joy-ui/core-features/perfect-dark-mode' },
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
          { pathname: '/joy-ui/react-button' },
          { pathname: '/joy-ui/react-checkbox' },
          { pathname: '/joy-ui/react-slider' },
          { pathname: '/joy-ui/react-switch' },
        ],
      },
      {
        pathname: '/joy-ui/components/data-display',
        subheader: 'data-display',
        children: [
          { pathname: '/joy-ui/react-aspect-ratio' },
          { pathname: '/joy-ui/react-avatar' },
          { pathname: '/joy-ui/react-badge' },
          { pathname: '/joy-ui/react-chip' },
          { pathname: '/joy-ui/react-list' },
          { pathname: '/joy-ui/react-typography' },
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
        children: [{ pathname: '/joy-ui/react-link' }],
      },
    ],
  },
  {
    pathname: '/joy-ui/customization',
    icon: 'CreateIcon',
    children: [
      { pathname: '/joy-ui/customization/approaches' },
      { pathname: '/joy-ui/customization/default-theme' },
      { pathname: '/joy-ui/customization/theme-tokens' },
      { pathname: '/joy-ui/customization/themed-components' },
      { pathname: '/joy-ui/customization/using-css-variables', title: 'Using CSS variables' },
    ],
  },
  {
    pathname: '/joy-ui/guides',
    title: 'How To Guides',
    icon: 'VisibilityIcon',
    children: [{ pathname: '/joy-ui/guides/apply-dark-mode', title: 'Apply dark mode' }],
  },
];

export default pages;
