import * as React from 'react';
import { createMount, describeConformanceV5, createClientRender } from 'test/utils';
import DialogTitle from './DialogTitle';
import classes from './dialogTitleClasses';

describe('<DialogTitle />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<DialogTitle>foo</DialogTitle>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiDialogTitle',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { disableTypography: true },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render JSX children', () => {
    const children = <span data-testid="test-children" />;
    const { getByTestId } = render(<DialogTitle disableTypography>{children}</DialogTitle>);

    getByTestId('test-children');
  });

  it('should render string children as given string', () => {
    const children = 'Hello';
    const { getByText } = render(<DialogTitle>{children}</DialogTitle>);

    getByText('Hello');
  });
});
