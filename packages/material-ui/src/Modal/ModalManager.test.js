import { assert, expect } from 'chai';
import getScrollbarSize from '../utils/getScrollbarSize';
import ModalManager from './ModalManager';

describe('ModalManager', () => {
  let modalManager;
  let container1;

  before(() => {
    modalManager = new ModalManager();
    container1 = document.createElement('div');
    container1.style.paddingRight = '20px';
    Object.defineProperty(container1, 'scrollHeight', {
      value: 100,
      writable: false,
    });
    Object.defineProperty(container1, 'clientHeight', {
      value: 90,
      writable: false,
    });
    document.body.appendChild(container1);
  });

  after(() => {
    document.body.removeChild(container1);
  });

  it('should add a modal only once', () => {
    const modal = {};
    const modalManager2 = new ModalManager();
    const idx = modalManager2.add(modal, container1);
    modalManager2.mount(modal, {});
    assert.strictEqual(modalManager2.add(modal, container1), idx);
    modalManager2.remove(modal);
  });

  describe('managing modals', () => {
    let modal1;
    let modal2;
    let modal3;

    before(() => {
      modal1 = { modalRef: document.createElement('div') };
      modal2 = { modalRef: document.createElement('div') };
      modal3 = { modalRef: document.createElement('div') };
    });

    it('should add modal1', () => {
      const idx = modalManager.add(modal1, container1);
      modalManager.mount(modal1, {});
      assert.strictEqual(idx, 0, 'should be the first modal');
      assert.strictEqual(modalManager.isTopModal(modal1), true);
    });

    it('should add modal2', () => {
      const idx = modalManager.add(modal2, container1);
      assert.strictEqual(idx, 1, 'should be the second modal');
      assert.strictEqual(modalManager.isTopModal(modal2), true);
    });

    it('should add modal3', () => {
      const idx = modalManager.add(modal3, container1);
      assert.strictEqual(idx, 2, 'should be the third modal');
      assert.strictEqual(modalManager.isTopModal(modal3), true);
    });

    it('should remove modal2', () => {
      const idx = modalManager.remove(modal2);
      assert.strictEqual(idx, 1, 'should be the second modal');
    });

    it('should add modal2 2', () => {
      const idx = modalManager.add(modal2, container1);
      modalManager.mount(modal2, {});
      assert.strictEqual(idx, 2, 'should be the "third" modal');
      assert.strictEqual(modalManager.isTopModal(modal2), true);
      assert.strictEqual(
        modalManager.isTopModal(modal3),
        false,
        'modal3 should not be the top modal',
      );
    });

    it('should remove modal3', () => {
      const idx = modalManager.remove(modal3);
      assert.strictEqual(idx, 1);
    });

    it('should remove modal2 2', () => {
      const idx = modalManager.remove(modal2);
      assert.strictEqual(idx, 1);
      assert.strictEqual(modalManager.isTopModal(modal1), true);
    });

    it('should remove modal1', () => {
      const idx = modalManager.remove(modal1);
      assert.strictEqual(idx, 0);
    });

    it('should not do anything', () => {
      const idx = modalManager.remove({ nonExisting: true });
      assert.strictEqual(idx, -1);
    });
  });

  describe('overflow', () => {
    let fixedNode;

    beforeEach(() => {
      container1.style.paddingRight = '20px';

      fixedNode = document.createElement('div');
      fixedNode.classList.add('mui-fixed');
      document.body.appendChild(fixedNode);
      window.innerWidth += 1; // simulate a scrollbar
    });

    afterEach(() => {
      document.body.removeChild(fixedNode);
      window.innerWidth -= 1;
    });

    it('should handle the scroll', () => {
      fixedNode.style.paddingRight = '14px';

      const modal = {};
      modalManager.add(modal, container1);
      modalManager.mount(modal, {});
      assert.strictEqual(container1.style.overflow, 'hidden');
      assert.strictEqual(container1.style.paddingRight, `${20 + getScrollbarSize()}px`);
      assert.strictEqual(fixedNode.style.paddingRight, `${14 + getScrollbarSize()}px`);
      modalManager.remove(modal);
      assert.strictEqual(container1.style.overflow, '');
      assert.strictEqual(container1.style.paddingRight, '20px');
      assert.strictEqual(fixedNode.style.paddingRight, '14px');
    });

    it('should disable the scroll even when not overflowing', () => {
      // simulate non-overflowing container
      const container2 = document.createElement('div');
      Object.defineProperty(container2, 'scrollHeight', {
        value: 100,
        writable: false,
      });
      Object.defineProperty(container2, 'clientHeight', {
        value: 100,
        writable: false,
      });
      document.body.appendChild(container2);

      const modal = {};
      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      assert.strictEqual(container2.style.overflow, 'hidden');
      modalManager.remove(modal);
      assert.strictEqual(container2.style.overflow, '');

      document.body.removeChild(container2);
    });

    it('should restore styles correctly if none existed before', () => {
      const modal = {};
      modalManager.add(modal, container1);
      modalManager.mount(modal, {});
      assert.strictEqual(container1.style.overflow, 'hidden');
      assert.strictEqual(container1.style.paddingRight, `${20 + getScrollbarSize()}px`);
      assert.strictEqual(fixedNode.style.paddingRight, `${0 + getScrollbarSize()}px`);
      modalManager.remove(modal);
      assert.strictEqual(container1.style.overflow, '');
      assert.strictEqual(container1.style.paddingRight, '20px');
      assert.strictEqual(fixedNode.style.paddingRight, '');
    });
  });

  describe('multi container', () => {
    let container3;
    let container4;

    beforeEach(() => {
      container3 = document.createElement('div');
      document.body.appendChild(container3);
      container3.appendChild(document.createElement('div'));

      container4 = document.createElement('div');
      document.body.appendChild(container4);
      container4.appendChild(document.createElement('div'));
    });

    it('should work will multiple containers', () => {
      modalManager = new ModalManager();
      const modal1 = {};
      const modal2 = {};
      modalManager.add(modal1, container3);
      modalManager.mount(modal1, {});
      expect(container3.children[0]).to.be.ariaHidden;

      modalManager.add(modal2, container4);
      modalManager.mount(modal2, {});
      expect(container4.children[0]).to.be.ariaHidden;

      modalManager.remove(modal2);
      expect(container4.children[0]).not.to.be.ariaHidden;

      modalManager.remove(modal1);
      expect(container3.children[0]).not.to.be.ariaHidden;
    });

    afterEach(() => {
      document.body.removeChild(container3);
      document.body.removeChild(container4);
    });
  });

  describe('container aria-hidden', () => {
    let modalRef1;
    let container2;

    beforeEach(() => {
      container2 = document.createElement('div');
      document.body.appendChild(container2);

      modalRef1 = document.createElement('div');
      container2.appendChild(modalRef1);

      modalManager = new ModalManager();
    });

    afterEach(() => {
      document.body.removeChild(container2);
    });

    it('should not contain aria-hidden on modal', () => {
      const modal2 = document.createElement('div');
      modal2.setAttribute('aria-hidden', 'true');

      expect(modal2).to.be.ariaHidden;
      modalManager.add({ modalRef: modal2 }, container2);
      expect(modal2).not.to.be.ariaHidden;
    });

    it('should add aria-hidden to container siblings', () => {
      modalManager.add({}, container2);
      expect(container2.children[0]).to.be.ariaHidden;
    });

    it('should add aria-hidden to previous modals', () => {
      const modal2 = document.createElement('div');
      const modal3 = document.createElement('div');

      container2.appendChild(modal2);
      container2.appendChild(modal3);

      modalManager.add({ modalRef: modal2 }, container2);
      // Simulate the main React DOM true.
      expect(container2.children[0]).to.be.ariaHidden;
      expect(container2.children[1]).not.to.be.ariaHidden;

      modalManager.add({ modalRef: modal3 }, container2);
      expect(container2.children[0]).to.be.ariaHidden;
      expect(container2.children[1]).to.be.ariaHidden;
      expect(container2.children[2]).not.to.be.ariaHidden;
    });

    it('should remove aria-hidden on siblings', () => {
      const modal = { modalRef: container2.children[0] };

      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(container2.children[0]).not.to.be.ariaHidden;
      modalManager.remove(modal, container2);
      expect(container2.children[0]).to.be.ariaHidden;
    });

    it('should keep previous aria-hidden siblings hidden', () => {
      const modal = { modalRef: container2.children[0] };
      const sibling1 = document.createElement('div');
      const sibling2 = document.createElement('div');

      sibling1.setAttribute('aria-hidden', 'true');

      container2.appendChild(sibling1);
      container2.appendChild(sibling2);

      modalManager.add(modal, container2);
      modalManager.mount(modal, {});
      expect(container2.children[0]).not.to.be.ariaHidden;
      modalManager.remove(modal, container2);
      expect(container2.children[0]).to.be.ariaHidden;
      expect(container2.children[1]).to.be.ariaHidden;
      expect(container2.children[2]).not.to.be.ariaHidden;
    });
  });
});
