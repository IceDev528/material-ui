/* eslint-disable flowtype/require-valid-file-annotation, no-console */

import { assert } from 'chai';
import consoleErrorMock from './consoleErrorMock';

describe('consoleErrorMock()', () => {
  it('should throw error when calling callCount() before spy()', () => {
    let errorCalledFlag = false;

    try {
      consoleErrorMock.callCount();
    } catch (error) {
      errorCalledFlag = true;
    }

    assert.strictEqual(errorCalledFlag, true);
  });

  describe('spy()', () => {
    it('should place a spy in console.error', () => {
      consoleErrorMock.spy();
      assert.ok(console.error.hasOwnProperty('isSinonProxy'));
      consoleErrorMock.reset();
      assert.notOk(console.error.hasOwnProperty('isSinonProxy'));
    });

    it('should keep the call count', () => {
      consoleErrorMock.spy();
      console.error();
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      consoleErrorMock.reset();
    });
  });
});
