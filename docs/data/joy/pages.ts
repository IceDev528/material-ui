const pages = [
  {
    pathname: '/joy-ui/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/joy-ui/getting-started/quick-start' },
      { pathname: '/joy-ui/getting-started/tutorial' },
      { pathname: '/joy-ui/getting-started/principles' },
    ],
  },
  {
    pathname: '/joy-ui/core-features',
    icon: 'ReaderIcon',
    children: [{ pathname: '/joy-ui/core-features/global-variant' }],
  },
  {
    pathname: '/joy-ui/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/joy-ui/components/inputs',
        subheader: 'inputs',
        children: [{ pathname: '/joy-ui/react-button' }],
      },
      {
        pathname: '/joy-ui/components/data-display',
        subheader: 'data-display',
        children: [{ pathname: '/joy-ui/react-avatar' }, { pathname: '/joy-ui/react-badge' }],
      },
    ],
  },
];

export default pages;
