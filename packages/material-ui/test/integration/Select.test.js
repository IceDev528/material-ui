import React from 'react';
import { expect } from 'chai';
import { useFakeTimers } from 'sinon';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

describe('<Select> integration', () => {
  // StrictModeViolation: uses Fade
  const render = createClientRender({ strict: false });

  describe('with Dialog', () => {
    function SelectAndDialog() {
      const [value, setValue] = React.useState(10);
      const handleChange = event => {
        setValue(Number(event.target.value));
      };

      return (
        <Dialog open>
          <Select
            MenuProps={{
              transitionDuration: 0,
              BackdropProps: { 'data-testid': 'select-backdrop' },
            }}
            value={value}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Dialog>
      );
    }

    /**
     * @type {ReturnType<typeof useFakeTimers>}
     */
    let clock;
    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should focus the selected item', () => {
      const { getByTestId, getAllByRole, getByRole, queryByRole } = render(<SelectAndDialog />);

      const trigger = getByRole('button');
      // Let's open the select component
      // in the browser user click also focuses
      fireEvent.mouseDown(trigger);

      const options = getAllByRole('option');
      expect(options[1]).to.have.focus;

      // Now, let's close the select component
      getByTestId('select-backdrop').click();
      clock.tick(0);

      expect(queryByRole('listbox')).to.be.null;
      expect(trigger).to.have.focus;
    });

    it('should be able to change the selected item', () => {
      const { getAllByRole, getByRole, queryByRole } = render(<SelectAndDialog />);

      const trigger = getByRole('button');
      expect(trigger).to.have.accessibleName('Ten');
      // Let's open the select component
      // in the browser user click also focuses
      fireEvent.mouseDown(trigger);

      const options = getAllByRole('option');
      expect(options[1]).to.have.focus;

      // Now, let's close the select component
      options[2].click();
      clock.tick(0);

      expect(queryByRole('listbox')).to.be.null;
      expect(trigger).to.have.focus;
      expect(trigger).to.have.text('Twenty');
    });
  });

  describe('with label', () => {
    it('requires `id` and `labelId` for a proper accessible name', () => {
      const { getByRole } = render(
        <FormControl>
          <InputLabel id="label">Age</InputLabel>
          <Select id="input" labelId="label" value="10">
            <MenuItem value="">none</MenuItem>
            <MenuItem value="10">Ten</MenuItem>
          </Select>
        </FormControl>,
      );

      expect(getByRole('button')).to.have.accessibleName('Age Ten');
    });

    // we're somewhat abusing "focus" here. What we're actually interested in is
    // displaying it as "active". WAI-ARIA authoring practices do not consider the
    // the trigger part of the widget while a native <select /> will outline the trigger
    // as well
    it('is displayed as focused while open', () => {
      const { getByTestId, getByRole } = render(
        <FormControl>
          <InputLabel classes={{ focused: 'focused-label' }} data-testid="label">
            Age
          </InputLabel>
          <Select value="">
            <MenuItem value="">none</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>,
      );

      const trigger = getByRole('button');
      trigger.focus();
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });

      expect(getByTestId('label')).to.have.class('focused-label');
    });

    it('does not stays in an active state if an open action did not actually open', () => {
      // test for https://github.com/mui-org/material-ui/issues/17294
      // we used to set a flag to stop blur propagation when we wanted to open the
      // select but never considered what happened if the select never opened
      const { container, getByRole } = render(
        <FormControl>
          <InputLabel classes={{ focused: 'focused-label' }} htmlFor="age-simple">
            Age
          </InputLabel>
          <Select inputProps={{ id: 'age' }} open={false} value="">
            <MenuItem value="">none</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>,
      );

      getByRole('button').focus();

      expect(container.querySelector('[for="age-simple"]')).to.have.class('focused-label');

      fireEvent.keyDown(document.activeElement, { key: 'Enter' });

      expect(container.querySelector('[for="age-simple"]')).to.have.class('focused-label');

      getByRole('button').blur();

      expect(container.querySelector('[for="age-simple"]')).not.to.have.class('focused-label');
    });
  });
});
