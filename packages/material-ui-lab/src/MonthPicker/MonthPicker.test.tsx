import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { getClasses, createMount, fireEvent, screen, describeConformance } from 'test/utils';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import MonthPicker from '@material-ui/lab/MonthPicker';
import { adapterToUse, createPickerRender } from '../internal/pickers/test-utils';

describe('<MonthPicker />', () => {
  const mount = createMount();
  const render = createPickerRender();
  let classes: Record<string, string>;

  const localizedMount = (node: React.ReactNode) => {
    return mount(<LocalizationProvider dateAdapter={AdapterDateFns}>{node}</LocalizationProvider>);
  };

  before(() => {
    classes = getClasses(
      <MonthPicker
        minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
        date={adapterToUse.date()}
        onChange={() => {}}
      />,
    );
  });

  describeConformance(
    <MonthPicker
      minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
      maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
      date={adapterToUse.date()}
      onChange={() => {}}
    />,
    () => ({
      classes,
      inheritComponent: 'div',
      mount: localizedMount,
      refInstanceof: window.HTMLDivElement,
      // cannot test reactTestRenderer because of required context
      skip: ['componentProp', 'propsSpread', 'reactTestRenderer'],
    }),
  );

  it('allows to pick year standalone', () => {
    const onChangeMock = spy();
    render(
      <MonthPicker
        minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
        date={adapterToUse.date('2019-02-02T00:00:00.000')}
        onChange={onChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('May', { selector: 'button' }));
    expect((onChangeMock.args[0][0] as Date).getMonth()).to.equal(4); // month index starting from 0
  });

  it('does not allow to pick months out of range', () => {
    const onChangeMock = spy();
    render(
      <MonthPicker
        minDate={adapterToUse.date('2020-04-01T00:00:00.000')}
        maxDate={adapterToUse.date('2020-06-01T00:00:00.000')}
        date={adapterToUse.date('2020-04-02T00:00:00.000')}
        onChange={onChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('Mar', { selector: 'button' }));
    expect(onChangeMock.callCount).to.equal(0);

    fireEvent.click(screen.getByText('Apr', { selector: 'button' }));
    expect(onChangeMock.callCount).to.equal(1);
    expect((onChangeMock.args[0][0] as Date).getMonth()).to.equal(3); // month index starting from 0

    fireEvent.click(screen.getByText('Jul', { selector: 'button' }));
    expect(onChangeMock.callCount).to.equal(1);
  });
});
