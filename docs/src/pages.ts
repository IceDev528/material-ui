import pagesApi from './pagesApi';

export interface MuiPage {
  pathname: string;
  children?: MuiPage[];
  disableDrawer?: boolean;
  icon?: string;
  /**
   * Indicates if the pages are regarding some legacy API.
   */
  legacy?: boolean;
  /**
   * In case the children have pathnames out of pathname value, use this field to scope other pathnames
   */
  scopePathnames?: string[];
  /**
   * Pages are considered to be ordered depth-first.
   * If a page should be excluded from this order, set `order: false`.
   * You want to set `inSideNav: false` if you don't want the page to appear in an ordered list e.g. for previous/next page navigation.
   */
  inSideNav?: boolean;
  /**
   * Props spread to the Link component
   */
  linkProps?: Record<string, unknown>;
  subheader?: string;
  /**
   * Overrides the default page title.
   */
  title?: string;
}

export interface OrderedMuiPage extends MuiPage {
  ordered?: true;
}

const pages: readonly MuiPage[] = [
  {
    pathname: '/getting-started',
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/getting-started/installation' },
      { pathname: '/getting-started/usage' },
      { pathname: '/getting-started/example-projects' },
      { pathname: '/getting-started/templates' },
      { pathname: '/getting-started/learn', title: 'Learning resources' },
      { pathname: '/getting-started/faq', title: 'FAQs' },
      { pathname: '/getting-started/supported-components' },
      { pathname: '/getting-started/supported-platforms' },
      { pathname: '/getting-started/support' },
    ],
  },
  {
    pathname: '/components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/components',
        subheader: '/components/inputs',
        children: [
          { pathname: '/components/autocomplete' },
          { pathname: '/components/buttons', title: 'Button' },
          { pathname: '/components/button-group' },
          { pathname: '/components/checkboxes', title: 'Checkbox' },
          { pathname: '/components/floating-action-button' },
          { pathname: '/components/radio-buttons', title: 'Radio button' },
          { pathname: '/components/rating' },
          { pathname: '/components/selects', title: 'Select' },
          { pathname: '/components/slider' },
          { pathname: '/components/switches', title: 'Switch' },
          { pathname: '/components/text-fields', title: 'Text field' },
          { pathname: '/components/transfer-list' },
          { pathname: '/components/toggle-button' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/data-display',
        children: [
          { pathname: '/components/avatars', title: 'Avatar' },
          { pathname: '/components/badges', title: 'Badge' },
          { pathname: '/components/chips', title: 'Chip' },
          { pathname: '/components/dividers', title: 'Divider' },
          { pathname: '/components/icons' },
          { pathname: '/components/material-icons' },
          { pathname: '/components/lists', title: 'List' },
          { pathname: '/components/tables', title: 'Table' },
          { pathname: '/components/tooltips', title: 'Tooltip' },
          { pathname: '/components/typography' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/feedback',
        children: [
          { pathname: '/components/alert' },
          { pathname: '/components/backdrop' },
          { pathname: '/components/dialogs' },
          { pathname: '/components/progress' },
          { pathname: '/components/skeleton' },
          { pathname: '/components/snackbars', title: 'Snackbar' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/surfaces',
        children: [
          { pathname: '/components/accordion' },
          { pathname: '/components/app-bar' },
          { pathname: '/components/cards', title: 'Card' },
          { pathname: '/components/paper' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/navigation',
        children: [
          { pathname: '/components/bottom-navigation' },
          { pathname: '/components/breadcrumbs' },
          { pathname: '/components/drawers', title: 'Drawer' },
          { pathname: '/components/links', title: 'Link' },
          { pathname: '/components/menus', title: 'Menu' },
          { pathname: '/components/pagination' },
          { pathname: '/components/speed-dial' },
          { pathname: '/components/steppers', title: 'Stepper' },
          { pathname: '/components/tabs' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/layout',
        children: [
          { pathname: '/components/box' },
          { pathname: '/components/container' },
          { pathname: '/components/grid' },
          { pathname: '/components/stack' },
          { pathname: '/components/image-list' },
          { pathname: '/components/hidden' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/utils',
        children: [
          { pathname: '/components/click-away-listener' },
          { pathname: '/components/css-baseline', title: 'CSS Baseline' },
          { pathname: '/components/modal' },
          { pathname: '/components/no-ssr', title: 'No SSR' },
          { pathname: '/components/popover' },
          { pathname: '/components/popper' },
          { pathname: '/components/portal' },
          { pathname: '/components/textarea-autosize' },
          { pathname: '/components/transitions' },
          { pathname: '/components/use-media-query', title: 'useMediaQuery' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/data-grid',
        children: [
          {
            pathname: '/components/data-grid',
            subheader: '/components/data-grid/overview',
            title: 'Overview',
          },
          { pathname: '/components/data-grid/demo' },
          { pathname: '/components/data-grid/getting-started' },
          { pathname: '/components/data-grid/layout' },
          { pathname: '/components/data-grid/columns' },
          { pathname: '/components/data-grid/rows' },
          { pathname: '/components/data-grid/editing' },
          { pathname: '/components/data-grid/sorting' },
          { pathname: '/components/data-grid/filtering' },
          { pathname: '/components/data-grid/pagination' },
          { pathname: '/components/data-grid/selection' },
          { pathname: '/components/data-grid/events' },
          { pathname: '/components/data-grid/export' },
          { pathname: '/components/data-grid/components' },
          { pathname: '/components/data-grid/style' },
          { pathname: '/components/data-grid/localization' },
          { pathname: '/components/data-grid/virtualization' },
          { pathname: '/components/data-grid/accessibility' },
          { pathname: '/components/data-grid/group-pivot', title: 'Group & Pivot' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/lab',
        children: [
          { pathname: '/components/about-the-lab', title: 'About the lab 🧪' },
          { pathname: '/components/lab-date-and-time-pickers', title: 'Date & Time Pickers' },
          { pathname: '/components/masonry' },
          { pathname: '/components/timeline' },
          { pathname: '/components/tree-view' },
        ],
      },
    ],
  },
  {
    title: 'Component API',
    pathname: '/api-docs',
    icon: 'CodeIcon',
    children: [
      ...pagesApi,
      {
        pathname: '/api-docs/data-grid',
        title: 'Data Grid',
        children: [
          { pathname: '/api-docs/data-grid', title: 'API Reference' },
          { pathname: '/api-docs/data-grid/data-grid', title: 'DataGrid' },
          { pathname: '/api-docs/data-grid/data-grid-pro', title: 'DataGridPro' },
          { pathname: '/api-docs/data-grid/grid-api', title: 'GridApi' },
          { pathname: '/api-docs/data-grid/grid-col-def', title: 'GridColDef' },
          { pathname: '/api-docs/data-grid/grid-cell-params', title: 'GridCellParams' },
          { pathname: '/api-docs/data-grid/grid-row-params', title: 'GridRowParams' },
          {
            pathname: '/api-docs/data-grid/grid-csv-export-options',
            title: 'GridCSVExportOptions',
          },
          {
            pathname: '/api-docs/data-grid/grid-print-export-options',
            title: 'GridPrintExportOptions',
          },
        ].map((page) => {
          return {
            ...page,
            linkProps: { linkAs: `${page.pathname.replace(/^\/api-docs/, '/api')}/` },
          };
        }),
      },
    ]
      .sort((a, b) =>
        a.pathname.replace('/api-docs/', '').localeCompare(b.pathname.replace('/api-docs/', '')),
      )
      .map((page) => {
        return {
          ...page,
          linkProps: { linkAs: `${page.pathname.replace(/^\/api-docs/, '/api')}/` },
        };
      }),
  },
  {
    pathname: '/system',
    icon: 'BuildIcon',
    children: [
      { pathname: '/system/basics' },
      { pathname: '/system/properties' },
      { pathname: '/system/the-sx-prop', title: 'The sx prop' },
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
      { pathname: '/system/advanced' },
      { pathname: '/system/box' },
      { pathname: '/system/styled', title: 'styled' },
    ],
  },
  {
    pathname: '/customization',
    icon: 'CreateIcon',
    children: [
      {
        pathname: '/customization',
        subheader: '/customization/theme',
        children: [
          { pathname: '/customization/theming' },
          { pathname: '/customization/palette' },
          { pathname: '/customization/dark-mode', title: 'Dark mode' },
          { pathname: '/customization/typography' },
          { pathname: '/customization/spacing' },
          { pathname: '/customization/breakpoints' },
          { pathname: '/customization/density' },
          { pathname: '/customization/z-index', title: 'z-index' },
          { pathname: '/customization/transitions' },
          { pathname: '/customization/theme-components', title: 'Components' },
          { pathname: '/customization/default-theme', title: 'Default Theme' },
        ],
      },
      { pathname: '/customization/how-to-customize' },
      { pathname: '/customization/color' },
      { pathname: '/customization/unstyled-components' },
    ],
  },
  {
    pathname: '/guides',
    title: 'How To Guides',
    icon: 'VisibilityIcon',
    children: [
      { pathname: '/guides/api', title: 'API design approach' },
      { pathname: '/guides/understand-mui-packages', title: 'Understand MUI packages' },
      { pathname: '/guides/typescript', title: 'TypeScript' },
      { pathname: '/guides/interoperability', title: 'Style library interoperability' },
      { pathname: '/guides/styled-engine' },
      { pathname: '/guides/minimizing-bundle-size' },
      { pathname: '/guides/composition' },
      { pathname: '/guides/routing' },
      { pathname: '/guides/server-rendering' },
      { pathname: '/guides/responsive-ui', title: 'Responsive UI' },
      { pathname: '/guides/pickers-migration', title: 'Migration from @material-ui/pickers' },
      { pathname: '/guides/migration-v4', title: 'Migration from v4' },
      { pathname: '/guides/migration-v3', title: 'Migration from v3' },
      { pathname: '/guides/migration-v0x', title: 'Migration from v0.x' },
      { pathname: '/guides/testing' },
      { pathname: '/guides/localization' },
      { pathname: '/guides/content-security-policy', title: 'Content Security Policy' },
      { pathname: '/guides/right-to-left', title: 'Right-to-left' },
      { pathname: '/guides/flow' },
    ],
  },
  {
    pathname: '/experimental-api',
    title: 'Experimental APIs',
    icon: 'ExperimentIcon',
    children: [
      { pathname: '/experimental-api/classname-generator', title: 'ClassName generator' },
      { pathname: '/experimental-api/css-variables', title: 'CSS variables' },
    ],
  },
  {
    pathname: '/styles',
    title: 'Styles',
    icon: 'StyleIcon',
    legacy: true,
    children: [
      { pathname: '/styles/basics' },
      { pathname: '/styles/advanced' },
      { pathname: '/styles/api', title: 'API' },
    ],
  },
  {
    pathname: '/discover-more',
    icon: 'AddIcon',
    children: [
      { pathname: '/discover-more/showcase' },
      { pathname: '/discover-more/related-projects' },
      { pathname: '/discover-more/roadmap' },
      { pathname: '/discover-more/backers', title: 'Sponsors & Backers' },
      { pathname: '/discover-more/vision' },
      { pathname: '/discover-more/changelog' },
      { pathname: '/discover-more/languages' },
      { pathname: '/about', title: 'About us' },
    ],
  },
  {
    pathname: 'https://mui.com/store/',
    title: 'Templates',
    icon: 'ReaderIcon',
    linkProps: {
      'data-ga-event-category': 'store',
      'data-ga-event-action': 'click',
      'data-ga-event-label': 'sidenav',
    },
  },
  { pathname: '/versions', inSideNav: false },
  { pathname: '/', inSideNav: false, disableDrawer: true },
  { pathname: '/blog', title: 'Blog', icon: 'BookIcon' },
];

export default pages;
