import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import MenuList from './MenuList';
import getScrollbarSize from '../utils/getScrollbarSize';
import List from '../List';

function setStyleWidthForJsdomOrBrowser(style, width) {
  style.width = '';
  style.width = 'calc(100% + 0px)';
  if (style.width !== 'calc(100% + 0px)') {
    // For jsdom
    Object.defineProperty(style, 'width', { writable: true, value: '' });
  }
  style.width = width;
}

describe('<MenuList />', () => {
  let mount;
  const render = createClientRender();

  before(() => {
    mount = createMount({ strict: true });
  });

  describeConformance(<MenuList />, () => ({
    classes: {},
    inheritComponent: List,
    mount,
    refInstanceof: window.HTMLUListElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
  }));

  describe('prop: children', () => {
    it('should support null children', () => {
      const { getAllByRole } = render(
        <MenuList>
          <div role="menuitem" />
          <div role="menuitem" />
          {null}
        </MenuList>,
      );

      expect(getAllByRole('menuitem')).to.have.length(2);
    });
  });

  describe('actions: adjustStyleForScrollbar', () => {
    const expectedPadding = `${getScrollbarSize(true)}px`;

    it('should not adjust style when container element height is greater', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 20 },
        { direction: 'ltr' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');
    });

    it('should adjust style when container element height is less', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      stub(list, 'clientHeight').get(() => 11);

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'ltr' },
      );

      expect(list.style).to.have.property('paddingRight', expectedPadding);
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', `calc(100% + ${expectedPadding})`);
    });

    it('should adjust paddingLeft when direction=rtl', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      stub(list, 'clientHeight').get(() => 11);

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', expectedPadding);
      expect(list.style).to.have.property('width', `calc(100% + ${expectedPadding})`);
    });

    it('should not adjust styles when width already specified', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      mount(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '10px');
      Object.defineProperty(list, 'clientHeight', { value: 11 });

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '10px');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '10px');
    });
  });
});
