import pagesApi from './pagesApi';

const pages = [
  {
    pathname: '/system/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/system/getting-started/overview' },
      { pathname: '/system/getting-started/installation' },
      { pathname: '/system/getting-started/usage' },
      { pathname: '/system/getting-started/the-sx-prop' },
      { pathname: '/system/getting-started/custom-components' },
    ],
  },
  {
    pathname: '/style-utilities',
    icon: 'BuildIcon',
    children: [
      { pathname: '/system/properties' },
      { pathname: '/system/borders' },
      { pathname: '/system/display' },
      { pathname: '/system/flexbox' },
      { pathname: '/system/grid' },
      { pathname: '/system/palette' },
      { pathname: '/system/positions' },
      { pathname: '/system/shadows' },
      { pathname: '/system/sizing' },
      { pathname: '/system/spacing' },
      { pathname: '/system/screen-readers' },
      { pathname: '/system/typography' },
      { pathname: '/system/styled', title: 'styled' },
    ],
  },
  {
    pathname: '/system/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      { pathname: '/system/react-box', title: 'Box' },
      { pathname: '/system/react-container', title: 'Container' },
      { pathname: '/system/react-grid', title: 'Grid' },
      { pathname: '/system/react-stack', title: 'Stack' },
    ],
  },
  {
    title: 'Component API',
    pathname: '/system/api',
    icon: 'CodeIcon',
    children: pagesApi,
  },
  {
    pathname: '/system/experimental-api',
    title: 'Experimental APIs',
    icon: 'ExperimentIcon',
    children: [
      {
        pathname: '/system/experimental-api/configure-the-sx-prop',
        title: 'Configure the sx prop',
      },
    ],
  },
  {
    pathname: '/system/styles',
    title: 'Styles',
    legacy: true,
    icon: 'StyleIcon',
    children: [
      { pathname: '/system/styles/basics' },
      { pathname: '/system/styles/advanced' },
      { pathname: '/system/styles/api', title: 'API' },
    ],
  },
];

export default pages;
