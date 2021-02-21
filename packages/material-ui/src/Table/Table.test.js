import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import Table from './Table';
import TableContext from './TableContext';
import classes from './tableClasses';

describe('<Table />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(
    <Table>
      <tbody />
    </Table>,
    () => ({
      classes,
      inheritComponent: 'table',
      render,
      mount,
      muiName: 'MuiTable',
      testVariantProps: { variant: 'foo' },
      refInstanceof: window.HTMLTableElement,
      // can't test another component with tbody as a child
      testComponentPropWith: 'table',
      skip: ['componentsProp'],
    }),
  );

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<Table component="div">foo</Table>);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="table"', () => {
      const { container } = render(<Table component="div">foo</Table>);
      expect(container.firstChild).to.have.attribute('role', 'table');
    });
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Table>
        <tbody data-testid="children" />
      </Table>,
    );

    expect(getByTestId('children')).not.to.equal(null);
  });

  it('should define table in the child context', () => {
    let context;

    // TODO test integration with TableCell
    render(
      <Table>
        <TableContext.Consumer>
          {(value) => {
            context = value;
            return <tbody />;
          }}
        </TableContext.Consumer>
      </Table>,
    );

    expect(context).to.deep.equal({
      size: 'medium',
      padding: 'default',
      stickyHeader: false,
    });
  });
});
