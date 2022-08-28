import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import MenuList from '@mui/joy/MenuList';
import List from '@mui/joy/List';
import ListItem, { listItemClasses as classes } from '@mui/joy/ListItem';

describe('Joy <ListItem />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    ThemeProvider,
    muiName: 'JoyListItem',
    refInstanceof: window.HTMLLIElement,
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot', 'themeVariants'],
  }));

  it('should have root className', () => {
    const { container } = render(<ListItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should accept className prop', () => {
    const { container } = render(<ListItem className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have sticky classes', () => {
    const { container } = render(<ListItem sticky />);
    expect(container.firstChild).to.have.class(classes.sticky);
  });

  it('should show startAction if provided', () => {
    const { getByText } = render(<ListItem startAction="foo" />);
    expect(getByText('foo')).toBeVisible();
    expect(getByText('foo')).to.have.class(classes.startAction);
  });

  it('should show endAction if provided', () => {
    const { getByText } = render(<ListItem endAction="foo" />);
    expect(getByText('foo')).toBeVisible();
    expect(getByText('foo')).to.have.class(classes.endAction);
  });

  describe('Consecutive ListItem', () => {
    it('should not be li', () => {
      const { getByRole } = render(
        <ListItem>
          <ListItem>test</ListItem>
        </ListItem>,
      );
      expect(getByRole('listitem').firstChild).to.have.tagName('DIV');
    });

    it('should use component prop', () => {
      const { getByRole } = render(
        <ListItem>
          <ListItem component="span">test</ListItem>
        </ListItem>,
      );
      expect(getByRole('listitem').firstChild).to.have.tagName('SPAN');
    });
  });

  describe('Semantics - Menu', () => {
    it('should have role="none" if the nearest parent List is not implicitly a list', () => {
      render(
        <MenuList>
          <ListItem>Foo</ListItem>
        </MenuList>,
      );

      expect(screen.getByText('Foo')).to.have.attribute('role', 'none');
    });
  });

  describe('Semantics - List', () => {
    it('should render div automatically if parent List component is not `ol`, `ul`, `menu`', () => {
      const { getByRole, getAllByRole } = render(
        <div>
          <List component="div" role="group">
            <ListItem>item 1</ListItem>
          </List>
          <List component="ul">
            <ListItem>item 1</ListItem>
          </List>
          <List component="ol">
            <ListItem>item 1</ListItem>
          </List>
          <List component="menu">
            <ListItem>item 1</ListItem>
          </List>
        </div>,
      );

      expect(getByRole('group').firstChild).to.have.tagName('DIV');
      const lists = getAllByRole('list');
      lists.forEach((list) => {
        expect(list.firstChild).to.have.tagName('LI');
      });
    });

    it('should use component prop', () => {
      const { getByRole } = render(
        <List component="div" role="group">
          <ListItem component="span">item 1</ListItem>
        </List>,
      );

      expect(getByRole('group').firstChild).to.have.tagName('SPAN');
    });

    it('should have role="none" if the nearest parent List has role="menu|menubar"', () => {
      render(
        <div>
          <List role="menu">
            <ListItem>Foo</ListItem>
          </List>
          <List role="menubar">
            <ListItem>Bar</ListItem>
          </List>
        </div>,
      );

      expect(screen.getByText('Foo')).to.have.attribute('role', 'none');
      expect(screen.getByText('Bar')).to.have.attribute('role', 'none');
    });

    it('should have role="presentation" if the nearest parent List has role="group"', () => {
      render(
        <List role="group">
          <ListItem>Foo</ListItem>
        </List>,
      );

      expect(screen.getByText('Foo')).to.have.attribute('role', 'presentation');
    });

    it('overridable role', () => {
      render(
        <List role="menu">
          <ListItem role="menuitem">Foo</ListItem>
        </List>,
      );

      expect(screen.getByText('Foo')).to.have.attribute('role', 'menuitem');
    });
  });
});
