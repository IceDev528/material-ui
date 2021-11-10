import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformance, createRenderer, fireEvent } from 'test/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NativeSelectInput from './NativeSelectInput';
import nativeSelectClasses from './nativeSelectClasses';

describe('<NativeSelectInput />', () => {
  const { render } = createRenderer();

  describeConformance(<NativeSelectInput IconComponent="div" />, () => ({
    only: ['refForwarding'],
    refInstanceof: window.HTMLSelectElement,
    muiName: 'MuiNativeSelectInput',
  }));

  it('should render a native select', () => {
    const { container } = render(
      <NativeSelectInput IconComponent="div" onChange={() => {}} value={10}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelectInput>,
    );

    expect(container.firstChild.value).to.equal('10');
  });

  it('should respond to update event', () => {
    const handleChange = spy();
    render(
      <NativeSelectInput defaultValue={10} IconComponent="div" onChange={handleChange}>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelectInput>,
    );

    fireEvent.change(document.querySelector('select'), { target: { value: 20 } });

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][0].target.value).to.equal('20');
  });

  it('should apply outlined class', () => {
    const { container } = render(
      <NativeSelectInput
        IconComponent="div"
        variant="outlined"
        classes={{ outlined: 'outlined' }}
      />,
    );

    expect(container.firstChild).to.have.class(nativeSelectClasses.outlined);
  });

  it('should apply filled class', () => {
    const { container } = render(
      <NativeSelectInput IconComponent="div" variant="filled" classes={{ filled: 'filled' }} />,
    );

    expect(container.firstChild).to.have.class(nativeSelectClasses.filled);
  });

  it('should apply multiple class to `select` slot', () => {
    const { container } = render(<NativeSelectInput IconComponent="div" multiple />);

    expect(container.firstChild).to.have.class(nativeSelectClasses.multiple);
  });

  describe('prop: multiple', () => {
    it('should be able to override `multiple` rule name in `select` slot', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const selectStyle = {
        marginLeft: '10px',
        marginTop: '10px',
      };

      const multipleStyle = {
        marginTop: '14px',
      };

      const theme = createTheme({
        components: {
          MuiNativeSelect: {
            styleOverrides: {
              select: selectStyle,
              multiple: multipleStyle,
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <NativeSelectInput IconComponent="div" multiple>
            <option value={'first'}>First</option>
            <option value={'second'}>Second</option>
          </NativeSelectInput>
        </ThemeProvider>,
      );

      const combinedStyle = { ...selectStyle, ...multipleStyle };

      expect(
        container.getElementsByClassName(nativeSelectClasses.select)[0],
      ).to.toHaveComputedStyle(combinedStyle);
    });
  });
});
