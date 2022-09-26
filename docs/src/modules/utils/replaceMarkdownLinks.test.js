import { expect } from 'chai';
import replaceMarkdownLinks, {
  replaceMaterialLinks,
  replaceAPILinks,
  replaceComponentLinks,
} from './replaceMarkdownLinks';

describe('replaceMarkdownLinks', () => {
  it('replace material related links', () => {
    expect(
      replaceMaterialLinks(`
      [reading this guide on minimizing bundle size](/guides/minimizing-bundle-size/)
      [default props](/customization/theme-components/#default-props)
      [Get started](/getting-started/usage/)
      [Tree view](/discover-more/related-projects/)
    `),
    ).to.equal(`
      [reading this guide on minimizing bundle size](/material-ui/guides/minimizing-bundle-size/)
      [default props](/material-ui/customization/theme-components/#default-props)
      [Get started](/material-ui/getting-started/usage/)
      [Tree view](/material-ui/discover-more/related-projects/)
    `);
  });

  it('should not change if links have been updated', () => {
    expect(
      replaceMaterialLinks(`
      [reading this guide on minimizing bundle size](/material-ui/guides/minimizing-bundle-size/)
      [default props](/material-ui/customization/theme-components/#default-props)
      [Get started](/material-ui/getting-started/usage/)
      [Tree view](/material-ui/discover-more/related-projects/)
    `),
    ).to.equal(`
      [reading this guide on minimizing bundle size](/material-ui/guides/minimizing-bundle-size/)
      [default props](/material-ui/customization/theme-components/#default-props)
      [Get started](/material-ui/getting-started/usage/)
      [Tree view](/material-ui/discover-more/related-projects/)
    `);
  });

  it('replace correct component links', () => {
    expect(
      replaceComponentLinks(`
      [ButtonGroup](/components/button-group/)
      [Buttons](/components/buttons/)
      [text](/components/checkboxes/#main-content)
      [text](/components/radio-buttons#main-content)
      [text](/components/selects/#main-content)
      [text](/components/switches/#main-content)
      [text](/components/text-fields/#main-content)
      [text](/components/avatars/#main-content)
      [text](/components/badges/#main-content)
      [text](/components/chips/#main-content)
      [text](/components/dividers/#main-content)
      [text](/components/icons/#main-content)
      [text](/components/material-icons/#main-content)
      [text](/components/lists/#main-content)
      [text](/components/tables/#main-content)
      [text](/components/tooltips/#main-content)
      [text](/components/dialogs/#main-content)
      [text](/components/snackbars/#main-content)
      [text](/components/cards/#main-content)
      [text](/components/breadcrumbs/#main-content)
      [text](/components/drawers/#main-content)
      [text](/components/links/#main-content)
      [text](/components/menus/#main-content)
      [text](/components/steppers/#main-content)
      [text](/components/tabs/#main-content)
      [text](/components/transitions/#main-content)
      [text](/components/pickers/#main-content)
      [text](/components/trap-focus/#main-content)
      [text](/components/css-baseline/#main-content)
      [text](/components/no-ssr/#main-content)
      [text](/components/image-list/#main-content)
      [text](/components/progress/#main-content)
      -
      [Tree view](/components/tree-view/)
      [Demo](/components/data-grid/demo/)
    `),
    ).to.equal(`
      [ButtonGroup](/material-ui/react-button-group/)
      [Buttons](/material-ui/react-button/)
      [text](/material-ui/react-checkbox/#main-content)
      [text](/material-ui/react-radio-button#main-content)
      [text](/material-ui/react-select/#main-content)
      [text](/material-ui/react-switch/#main-content)
      [text](/material-ui/react-text-field/#main-content)
      [text](/material-ui/react-avatar/#main-content)
      [text](/material-ui/react-badge/#main-content)
      [text](/material-ui/react-chip/#main-content)
      [text](/material-ui/react-divider/#main-content)
      [text](/material-ui/icons/#main-content)
      [text](/material-ui/material-icons/#main-content)
      [text](/material-ui/react-list/#main-content)
      [text](/material-ui/react-table/#main-content)
      [text](/material-ui/react-tooltip/#main-content)
      [text](/material-ui/react-dialog/#main-content)
      [text](/material-ui/react-snackbar/#main-content)
      [text](/material-ui/react-card/#main-content)
      [text](/material-ui/react-breadcrumbs/#main-content)
      [text](/material-ui/react-drawer/#main-content)
      [text](/material-ui/react-link/#main-content)
      [text](/material-ui/react-menu/#main-content)
      [text](/material-ui/react-stepper/#main-content)
      [text](/material-ui/react-tabs/#main-content)
      [text](/material-ui/transitions/#main-content)
      [text](/material-ui/pickers/#main-content)
      [text](/material-ui/react-trap-focus/#main-content)
      [text](/material-ui/react-css-baseline/#main-content)
      [text](/material-ui/react-no-ssr/#main-content)
      [text](/material-ui/react-image-list/#main-content)
      [text](/material-ui/react-progress/#main-content)
      -
      [Tree view](/material-ui/react-tree-view/)
      [Demo](/x/react-data-grid/demo/)
    `);
  });

  it('should do nothing if the components have updated', () => {
    expect(
      replaceComponentLinks(`
      [ButtonGroup](/material-ui/react-button-group/)
      [Buttons](/material-ui/react-button/)
      [text](/material-ui/react-checkbox/#main-content)
      [text](/material-ui/react-radio-button#main-content)
      [text](/material-ui/react-select/#main-content)
      [text](/material-ui/react-switch/#main-content)
      [text](/material-ui/react-text-field/#main-content)
      [text](/material-ui/react-avatar/#main-content)
      [text](/material-ui/react-badge/#main-content)
      [text](/material-ui/react-chip/#main-content)
      [text](/material-ui/react-divider/#main-content)
      [text](/material-ui/icons/#main-content)
      [text](/material-ui/material-icons/#main-content)
      [text](/material-ui/react-list/#main-content)
      [text](/material-ui/react-table/#main-content)
      [text](/material-ui/react-tooltip/#main-content)
      [text](/material-ui/react-dialog/#main-content)
      [text](/material-ui/react-snackbar/#main-content)
      [text](/material-ui/react-card/#main-content)
      [text](/material-ui/react-breadcrumbs/#main-content)
      [text](/material-ui/react-drawer/#main-content)
      [text](/material-ui/react-link/#main-content)
      [text](/material-ui/react-menu/#main-content)
      [text](/material-ui/react-stepper/#main-content)
      [text](/material-ui/react-tabs/#main-content)
      [text](/material-ui/transitions/#main-content)
      [text](/material-ui/pickers/#main-content)
      -
      [Tree view](/material-ui/react-tree-view/)
      [Demo](/x/react-data-grid/demo/)
    `),
    ).to.equal(`
      [ButtonGroup](/material-ui/react-button-group/)
      [Buttons](/material-ui/react-button/)
      [text](/material-ui/react-checkbox/#main-content)
      [text](/material-ui/react-radio-button#main-content)
      [text](/material-ui/react-select/#main-content)
      [text](/material-ui/react-switch/#main-content)
      [text](/material-ui/react-text-field/#main-content)
      [text](/material-ui/react-avatar/#main-content)
      [text](/material-ui/react-badge/#main-content)
      [text](/material-ui/react-chip/#main-content)
      [text](/material-ui/react-divider/#main-content)
      [text](/material-ui/icons/#main-content)
      [text](/material-ui/material-icons/#main-content)
      [text](/material-ui/react-list/#main-content)
      [text](/material-ui/react-table/#main-content)
      [text](/material-ui/react-tooltip/#main-content)
      [text](/material-ui/react-dialog/#main-content)
      [text](/material-ui/react-snackbar/#main-content)
      [text](/material-ui/react-card/#main-content)
      [text](/material-ui/react-breadcrumbs/#main-content)
      [text](/material-ui/react-drawer/#main-content)
      [text](/material-ui/react-link/#main-content)
      [text](/material-ui/react-menu/#main-content)
      [text](/material-ui/react-stepper/#main-content)
      [text](/material-ui/react-tabs/#main-content)
      [text](/material-ui/transitions/#main-content)
      [text](/material-ui/pickers/#main-content)
      -
      [Tree view](/material-ui/react-tree-view/)
      [Demo](/x/react-data-grid/demo/)
    `);
  });

  it('replace correct API links', () => {
    expect(
      replaceAPILinks(`
      [Button](/api/button)
      [No Ssr](/api/no-ssr)
      [Portal](/api/portal)
      [Textarea Autosize](/api/textarea-autosize)
      [ButtonBase](/api/button-base)
      [TabPanel](/api/tab-panel)
      [TabsList](/api/tab-panel)
      [ButtonUnstyled](/api/button-unstyled)
      [TabPanelUnstyled](/api/tab-panel-unstyled)
      [TabsListUnstyled](/api/tabs-list-unstyled)
      [FocusTrap](/api/focus-trap)
      [ClickAwayListener](/api/click-away-listener)
      [IconButton](/api/icon-button)
      [LoadingButton](/api/loading-button)
      [DataGrid](/api/data-grid/data-grid)
      [DataGridPro](/api/data-grid/data-grid-pro)
      [System](/system/basics)
    `),
    ).to.equal(`
      [Button](/material-ui/api/button)
      [No Ssr](/base/api/no-ssr)
      [Portal](/base/api/portal)
      [Textarea Autosize](/base/api/textarea-autosize)
      [ButtonBase](/material-ui/api/button-base)
      [TabPanel](/material-ui/api/tab-panel)
      [TabsList](/material-ui/api/tab-panel)
      [ButtonUnstyled](/base/api/button-unstyled)
      [TabPanelUnstyled](/base/api/tab-panel-unstyled)
      [TabsListUnstyled](/base/api/tabs-list-unstyled)
      [FocusTrap](/base/api/focus-trap)
      [ClickAwayListener](/base/api/click-away-listener)
      [IconButton](/material-ui/api/icon-button)
      [LoadingButton](/material-ui/api/loading-button)
      [DataGrid](/x/api/data-grid/data-grid)
      [DataGridPro](/x/api/data-grid/data-grid-pro)
      [System](/system/basics)
    `);
  });

  it('should do nothing if the APIs have updated', () => {
    expect(
      replaceAPILinks(`
      [Button](/material-ui/api/button)
      [ButtonBase](/material-ui/api/button-base)
      [ButtonUnstyled](/base/api/button-unstyled)
      [IconButton](/material-ui/api/icon-button)
      [LoadingButton](/material-ui/api/loading-button)
      [DataGrid](/x/api/data-grid/data-grid)
      [DataGridPro](/x/api/data-grid/data-grid-pro)
      [System](/system/basics)
      `),
    ).to.equal(`
      [Button](/material-ui/api/button)
      [ButtonBase](/material-ui/api/button-base)
      [ButtonUnstyled](/base/api/button-unstyled)
      [IconButton](/material-ui/api/icon-button)
      [LoadingButton](/material-ui/api/loading-button)
      [DataGrid](/x/api/data-grid/data-grid)
      [DataGridPro](/x/api/data-grid/data-grid-pro)
      [System](/system/basics)
      `);
  });

  it('only replace links for components, api', () => {
    expect(
      replaceMarkdownLinks(
        `
        [ButtonGroup](/components/button-group/)
        [Buttons](/components/buttons/)
        [text](/components/checkboxes/#main-content)
        [text](/components/radio-buttons#main-content)
        [text](/components/selects/#main-content)
        [text](/components/switches/#main-content)
        [text](/components/text-fields/#main-content)
        [text](/components/avatars/#main-content)
        [text](/components/badges/#main-content)
        [text](/components/chips/#main-content)
        [text](/components/dividers/#main-content)
        [text](/components/icons/#main-content)
        [text](/components/material-icons/#main-content)
        [text](/components/lists/#main-content)
        [text](/components/tables/#main-content)
        [text](/components/tooltips/#main-content)
        [text](/components/dialogs/#main-content)
        [text](/components/snackbars/#main-content)
        [text](/components/cards/#main-content)
        [text](/components/breadcrumbs/#main-content)
        [text](/components/drawers/#main-content)
        [text](/components/links/#main-content)
        [text](/components/menus/#main-content)
        [text](/components/steppers/#main-content)
        [text](/components/tabs/#main-content)
        [text](/components/transitions/#main-content)
        [text](/components/pickers/#main-content)
        -
        [Tree view](/components/tree-view/)
        [Demo](/components/data-grid/demo/)

        [Button](/material-ui/api/button)
        [ButtonBase](/material-ui/api/button-base)
        [ButtonUnstyled](/base/api/button-unstyled)
        [IconButton](/material-ui/api/icon-button)
        [LoadingButton](/material-ui/api/loading-button)
        [DataGrid](/x/api/data-grid/data-grid)
        [DataGridPro](/x/api/data-grid/data-grid-pro)
        [System](/system/basics)
    `,
      ),
    ).to.equal(`
        [ButtonGroup](/material-ui/react-button-group/)
        [Buttons](/material-ui/react-button/)
        [text](/material-ui/react-checkbox/#main-content)
        [text](/material-ui/react-radio-button#main-content)
        [text](/material-ui/react-select/#main-content)
        [text](/material-ui/react-switch/#main-content)
        [text](/material-ui/react-text-field/#main-content)
        [text](/material-ui/react-avatar/#main-content)
        [text](/material-ui/react-badge/#main-content)
        [text](/material-ui/react-chip/#main-content)
        [text](/material-ui/react-divider/#main-content)
        [text](/material-ui/icons/#main-content)
        [text](/material-ui/material-icons/#main-content)
        [text](/material-ui/react-list/#main-content)
        [text](/material-ui/react-table/#main-content)
        [text](/material-ui/react-tooltip/#main-content)
        [text](/material-ui/react-dialog/#main-content)
        [text](/material-ui/react-snackbar/#main-content)
        [text](/material-ui/react-card/#main-content)
        [text](/material-ui/react-breadcrumbs/#main-content)
        [text](/material-ui/react-drawer/#main-content)
        [text](/material-ui/react-link/#main-content)
        [text](/material-ui/react-menu/#main-content)
        [text](/material-ui/react-stepper/#main-content)
        [text](/material-ui/react-tabs/#main-content)
        [text](/material-ui/transitions/#main-content)
        [text](/material-ui/pickers/#main-content)
        -
        [Tree view](/material-ui/react-tree-view/)
        [Demo](/x/react-data-grid/demo/)

        [Button](/material-ui/api/button)
        [ButtonBase](/material-ui/api/button-base)
        [ButtonUnstyled](/base/api/button-unstyled)
        [IconButton](/material-ui/api/icon-button)
        [LoadingButton](/material-ui/api/loading-button)
        [DataGrid](/x/api/data-grid/data-grid)
        [DataGridPro](/x/api/data-grid/data-grid-pro)
        [System](/system/basics)
    `);
    expect(replaceMarkdownLinks(`[Styles](/styles/api/)`)).to.equal(
      `[Styles](/system/styles/api/)`,
    );
  });

  it('does not change after transformed', () => {
    expect(
      replaceMarkdownLinks(
        `
        [ButtonGroup](/material-ui/react-button-group/)
        [Buttons](/material-ui/react-button/)
        [text](/material-ui/react-checkbox/#main-content)
        [text](/material-ui/react-radio-button#main-content)
        [text](/material-ui/react-select/#main-content)
        [text](/material-ui/react-switch/#main-content)
    `,
      ),
    ).to.equal(`
        [ButtonGroup](/material-ui/react-button-group/)
        [Buttons](/material-ui/react-button/)
        [text](/material-ui/react-checkbox/#main-content)
        [text](/material-ui/react-radio-button#main-content)
        [text](/material-ui/react-select/#main-content)
        [text](/material-ui/react-switch/#main-content)
    `);
  });

  it('does not trasform material-ui', () => {
    expect(
      replaceMarkdownLinks(`[Focus Trap](https://mui.com/material-ui/react-trap-focus/)`),
    ).to.equal(`[Focus Trap](https://mui.com/material-ui/react-trap-focus/)`);
  });
});
