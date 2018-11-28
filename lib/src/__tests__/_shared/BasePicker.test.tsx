import * as React from 'react';
import { render } from 'react-dom';
import { BasePicker } from '../../_shared/BasePicker';
import { shallow, utilsToUse } from '../test-utils';

const renderComponent = (Component: React.ComponentType<any>) => {
  const div = (global as any).document.createElement('div');

  render(<Component />, div);
};

const getRenderFuncMock = () => jest.fn(() => null);
const getFirstParamFromMock = (mock: any) => mock.mock.calls[0][0];

describe('BasePicker', () => {
  describe('initialDate', () => {
    it('passes value as date if value is provided', () => {
      const value = utilsToUse.date('2018-01-01');
      const renderFuncMock = getRenderFuncMock();

      renderComponent(() => (
        <BasePicker value={value} utils={utilsToUse} onChange={jest.fn()}>
          {renderFuncMock}
        </BasePicker>
      ));

      const renderCallParam = getFirstParamFromMock(renderFuncMock);
      expect(utilsToUse.isEqual(renderCallParam.date, value)).toBe(true);
    });

    it('passes value as date if value and initialFocusedDate are provided', () => {
      const value = utilsToUse.date('2018-01-01');
      const initialFocusedDate = utilsToUse.date('2018-02-02');
      const renderFuncMock = getRenderFuncMock();

      renderComponent(() => (
        <BasePicker
          value={value}
          initialFocusedDate={initialFocusedDate}
          utils={utilsToUse}
          onChange={jest.fn()}
        >
          {renderFuncMock}
        </BasePicker>
      ));

      const renderCallParam = getFirstParamFromMock(renderFuncMock);
      expect(utilsToUse.isEqual(renderCallParam.date, value)).toBe(true);
    });

    it('passes initialFocusedDate as date if value is not provided', () => {
      const initialFocusedDate = utilsToUse.date('2018-01-01');
      const renderFuncMock = getRenderFuncMock();

      renderComponent(() => (
        <BasePicker
          initialFocusedDate={initialFocusedDate}
          utils={utilsToUse}
          onChange={jest.fn()}
          value={null}
        >
          {renderFuncMock}
        </BasePicker>
      ));

      const renderCallParam = getFirstParamFromMock(renderFuncMock);
      expect(utilsToUse.isEqual(renderCallParam.date, initialFocusedDate)).toBe(true);
    });

    it('passes updated initialFocusedDate as date if value is not provided and initialFocusedDate has changed', () => {
      const initialFocusedDate = utilsToUse.date('2018-01-01');
      const newInitialFocusedDate = utilsToUse.date('2018-02-01');
      const renderFuncMock = getRenderFuncMock();

      const component = shallow(
        <BasePicker
          initialFocusedDate={initialFocusedDate}
          utils={utilsToUse}
          onChange={jest.fn()}
          value={null}
        >
          {renderFuncMock}
        </BasePicker>
      );

      component.setProps({ initialFocusedDate: newInitialFocusedDate });
      expect(component.state('date')).toEqual(newInitialFocusedDate);
    });

    it('passes utils.date() as date if value and initialFocusedDate are not provided', () => {
      const renderFuncMock = getRenderFuncMock();

      renderComponent(() => (
        <BasePicker utils={utilsToUse} onChange={jest.fn()} value={null}>
          {renderFuncMock}
        </BasePicker>
      ));
      const renderCallParam = getFirstParamFromMock(renderFuncMock);
      // fuzzy match on same day since utils.date() calls could be off by a couple of
      // milliseconds
      expect(utilsToUse.isSameDay(renderCallParam.date, utilsToUse.date())).toBe(true);
    });
  });
});
