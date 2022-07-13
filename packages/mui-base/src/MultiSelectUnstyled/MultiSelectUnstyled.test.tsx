import * as React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import MultiSelectUnstyled from '@mui/base/MultiSelectUnstyled';
import { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';
import {
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  userEvent,
  act,
  fireEvent,
} from 'test/utils';

describe('MultiSelectUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const componentToTest = (
    <MultiSelectUnstyled defaultListboxOpen>
      <OptionGroupUnstyled label="Group">
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </OptionGroupUnstyled>
    </MultiSelectUnstyled>
  );

  describeConformanceUnstyled(componentToTest, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSelect',
    slots: {
      root: {
        expectedClassName: selectUnstyledClasses.root,
      },
      listbox: {
        expectedClassName: selectUnstyledClasses.listbox,
        testWithElement: 'ul',
      },
      popper: {
        expectedClassName: selectUnstyledClasses.popper,
        testWithElement: null,
      },
    },
  }));

  describe('keyboard navigation', () => {
    ['Enter', 'ArrowDown', 'ArrowUp'].forEach((key) => {
      it(`opens the dropdown when the "${key}" key is down on the button`, () => {
        // can't use the default native `button` as it doesn't treat enter or space press as a click
        const { getByRole } = render(<MultiSelectUnstyled components={{ Root: 'div' }} />);
        const button = getByRole('button');
        act(() => {
          button.focus();
        });
        fireEvent.keyDown(button, { key });

        expect(button).to.have.attribute('aria-expanded', 'true');
        expect(getByRole('listbox')).not.to.equal(null);
        expect(document.activeElement).to.equal(getByRole('listbox'));
      });
    });

    it(`opens the dropdown when the " " key is let go on the button`, () => {
      // can't use the default native `button` as it doesn't treat enter or space press as a click
      const { getByRole } = render(<MultiSelectUnstyled components={{ Root: 'div' }} />);
      const button = getByRole('button');
      act(() => {
        button.focus();
      });
      fireEvent.keyUp(button, { key: ' ' });

      expect(button).to.have.attribute('aria-expanded', 'true');
      expect(getByRole('listbox')).not.to.equal(null);
      expect(document.activeElement).to.equal(getByRole('listbox'));
    });

    describe('item selection', () => {
      ['Enter', ' '].forEach((key) =>
        it(`selects a highlighted item using the "${key}" key`, () => {
          const { getByRole } = render(
            <MultiSelectUnstyled>
              <OptionUnstyled value={1}>1</OptionUnstyled>
              <OptionUnstyled value={2}>2</OptionUnstyled>
            </MultiSelectUnstyled>,
          );

          const button = getByRole('button');
          act(() => {
            button.click();
          });

          const listbox = getByRole('listbox');

          userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '1'
          userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '2'
          userEvent.keyPress(listbox, { key });

          expect(button).to.have.text('2');
        }),
      );
    });

    it('closes the listbox without selecting an option when "Escape" is pressed', () => {
      const { getByRole, queryByRole } = render(
        <MultiSelectUnstyled defaultValue={[1]}>
          <OptionUnstyled value={1}>1</OptionUnstyled>
          <OptionUnstyled value={2}>2</OptionUnstyled>
        </MultiSelectUnstyled>,
      );

      const button = getByRole('button');

      act(() => {
        button.click();
      });

      const listbox = getByRole('listbox');
      userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '2'
      userEvent.keyPress(listbox, { key: 'Escape' });

      expect(button).to.have.attribute('aria-expanded', 'false');
      expect(button).to.have.text('1');
      expect(queryByRole('listbox')).to.equal(null);
    });
  });

  it('does not call onChange if `value` is modified externally', () => {
    function TestComponent({ onChange }: { onChange: (value: number[]) => void }) {
      const [value, setValue] = React.useState([1]);
      const handleChange = (newValue: number[]) => {
        setValue(newValue);
        onChange(newValue);
      };

      return (
        <div>
          <button onClick={() => setValue([1, 2])}>Update value</button>
          <MultiSelectUnstyled value={value} onChange={handleChange}>
            <OptionUnstyled value={1}>1</OptionUnstyled>
            <OptionUnstyled value={2}>2</OptionUnstyled>
          </MultiSelectUnstyled>
        </div>
      );
    }

    const onChange = sinon.spy();
    const { getByText } = render(<TestComponent onChange={onChange} />);

    const button = getByText('Update value');
    act(() => button.click());
    expect(onChange.notCalled).to.equal(true);
  });

  it('sets a value correctly when interacted by a user and external code', () => {
    function TestComponent() {
      const [value, setValue] = React.useState<number[]>([]);

      return (
        <div>
          <button data-testid="update-externally" onClick={() => setValue([1])}>
            Update value
          </button>
          <MultiSelectUnstyled
            value={value}
            onChange={setValue}
            componentsProps={{
              root: {
                'data-testid': 'select',
              } as any,
            }}
          >
            <OptionUnstyled value={1}>1</OptionUnstyled>
            <OptionUnstyled value={2}>2</OptionUnstyled>
          </MultiSelectUnstyled>
        </div>
      );
    }

    const { getByTestId, getByText } = render(<TestComponent />);
    const updateButton = getByTestId('update-externally');
    const selectButton = getByTestId('select');

    act(() => updateButton.click());
    act(() => selectButton.click());

    const option2 = getByText('2');
    act(() => option2.click());

    expect(selectButton).to.have.text('1, 2');
  });

  it('closes the listbox without selecting an option when focus is lost', () => {
    const { getByRole, getByTestId } = render(
      <div>
        <MultiSelectUnstyled defaultValue={[1]}>
          <OptionUnstyled value={1}>1</OptionUnstyled>
          <OptionUnstyled value={2}>2</OptionUnstyled>
        </MultiSelectUnstyled>
        <p data-testid="focus-target" tabIndex={0}>
          focus target
        </p>
      </div>,
    );

    const button = getByRole('button');

    act(() => {
      button.click();
    });

    const listbox = getByRole('listbox');
    userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '2'

    const focusTarget = getByTestId('focus-target');
    act(() => {
      focusTarget.focus();
    });

    expect(button).to.have.attribute('aria-expanded', 'false');
    expect(button).to.have.text('1');
  });

  it('focuses the listbox after it is opened', () => {
    const { getByRole } = render(
      <MultiSelectUnstyled>
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </MultiSelectUnstyled>,
    );

    const button = getByRole('button');
    act(() => {
      button.click();
    });

    expect(document.activeElement).to.equal(getByRole('listbox'));
  });
});
