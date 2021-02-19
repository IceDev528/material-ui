import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses, describeConformance, fireEvent, screen } from 'test/utils';
import PickersDay from '@material-ui/lab/PickersDay';
import {
  adapterToUse,
  createPickerMount,
  createPickerRender,
} from '../internal/pickers/test-utils';

describe('<PickersDay />', () => {
  const mount = createPickerMount();
  const render = createPickerRender();
  let classes: Record<string, string>;

  before(() => {
    classes = getClasses(
      <PickersDay
        day={adapterToUse.date()}
        outsideCurrentMonth={false}
        selected
        onDaySelect={() => {}}
      />,
    );
  });

  describeConformance(
    <PickersDay
      day={adapterToUse.date()}
      outsideCurrentMonth={false}
      selected
      onDaySelect={() => {}}
    />,
    () => ({
      classes,
      inheritComponent: 'button',
      mount,
      refInstanceof: window.HTMLButtonElement,
      // cannot test reactTestRenderer because of required context
      skip: ['componentProp', 'reactTestRenderer'],
    }),
  );

  it('selects the date on click, Enter and Space', () => {
    const handleDaySelect = spy();
    const day = adapterToUse.date();
    render(<PickersDay day={day} outsideCurrentMonth={false} onDaySelect={handleDaySelect} />);
    const targetDay = screen.getByRole('button', {
      name: `${adapterToUse.format(day, 'fullDate')}`,
    });

    // A native button implies Enter and Space keydown behavior
    // These keydown events only trigger click behavior if they're trusted (programmatically dispatched events aren't trusted).
    // If this breaks, make sure to add tests for
    // - fireEvent.keyDown(targetDay, { key: 'Enter' })
    // - fireEvent.keyUp(targetDay, { key: 'Space' })
    expect(targetDay.tagName).to.equal('BUTTON');

    fireEvent.click(targetDay);

    expect(handleDaySelect.callCount).to.equal(1);
    expect(handleDaySelect.args[0][0]).toEqualDateTime(day);
  });
});
