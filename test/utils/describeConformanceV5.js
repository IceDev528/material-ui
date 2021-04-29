/* eslint-env mocha */
import { expect } from 'chai';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import {
  testComponentProp,
  testClassName,
  testPropsSpread,
  describeRef,
  findRootComponent,
  testReactTestRenderer,
  testRootClass,
} from './describeConformance';

function throwMissingPropError(field) {
  throw new Error(`missing "${field}" in options

  > describeConformanceV5(element, () => options)
`);
}

/**
 * Material-UI components have a `components` prop that allows rendering a different
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testComponentsProp(element, getOptions) {
  describe('prop components:', () => {
    it('can render another root component with the `components` prop', () => {
      const { mount, testComponentsRootPropWith: component = 'em' } = getOptions();

      const wrapper = mount(React.cloneElement(element, { components: { Root: component } }));

      expect(findRootComponent(wrapper, { component }).exists()).to.equal(true);
    });
  });
}

/**
 * Material-UI theme has a components section that allows specifying default props.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeDefaultProps(element, getOptions) {
  describe('theme default components:', () => {
    it("respect theme's defaultProps", () => {
      const testProp = 'data-id';
      const { muiName, render } = getOptions();

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      const theme = createTheme({
        components: {
          [muiName]: {
            defaultProps: {
              [testProp]: 'testProp',
            },
          },
        },
      });

      const { container } = render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

      expect(container.firstChild).to.have.attribute(testProp, 'testProp');
    });
  });
}

/**
 * Material-UI theme has a components section that allows specifying style overrides.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeStyleOverrides(element, getOptions) {
  describe('theme style overrides:', () => {
    it("respect theme's styleOverrides custom state", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
      const { muiName, testStateOverrides, render } = getOptions();

      if (!testStateOverrides) {
        return;
      }

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      const testStyle = {
        marginTop: '13px',
      };

      const theme = createTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              [testStateOverrides.styleKey]: testStyle,
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, {
            [testStateOverrides.prop]: testStateOverrides.value,
          })}
        </ThemeProvider>,
      );

      expect(container.firstChild).to.toHaveComputedStyle(testStyle);
    });

    it("respect theme's styleOverrides slots", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const {
        muiName,
        testDeepOverrides,
        testRootOverrides = { slotName: 'root' },
        render,
      } = getOptions();

      const testStyle = {
        mixBlendMode: 'darken',
      };

      const theme = createTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              [testRootOverrides.slotName]: {
                ...testStyle,
                ...(testDeepOverrides && {
                  [`& .${testDeepOverrides.slotClassName}`]: {
                    fontVariantCaps: 'all-petite-caps',
                  },
                }),
              },
              ...(testDeepOverrides && {
                [testDeepOverrides.slotName]: {
                  mixBlendMode: 'darken',
                },
              }),
            },
          },
        },
      });

      const { container, setProps } = render(
        <ThemeProvider theme={theme}>{element}</ThemeProvider>,
      );

      if (testRootOverrides.slotClassName) {
        expect(
          document.querySelector(`.${testRootOverrides.slotClassName}`),
        ).to.toHaveComputedStyle(testStyle);
      } else {
        expect(container.firstChild).to.toHaveComputedStyle(testStyle);
      }

      if (testDeepOverrides) {
        expect(
          document.querySelector(`.${testDeepOverrides.slotClassName}`),
        ).to.toHaveComputedStyle({
          fontVariantCaps: 'all-petite-caps',
          mixBlendMode: 'darken',
        });

        const themeWithoutRootOverrides = createTheme({
          components: {
            [muiName]: {
              styleOverrides: {
                ...(testDeepOverrides && {
                  [testDeepOverrides.slotName]: testStyle,
                }),
              },
            },
          },
        });

        setProps({ theme: themeWithoutRootOverrides });
        expect(
          document.querySelector(`.${testDeepOverrides.slotClassName}`),
        ).to.toHaveComputedStyle(testStyle);
      }
    });
  });
}

/**
 * Material-UI theme has a components section that allows specifying custom variants.
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeVariants(element, getOptions) {
  describe('theme variants:', () => {
    it("respect theme's variants", function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { muiName, testVariantProps, render } = getOptions();

      if (!testVariantProps) {
        throw new Error('missing testVariantProps');
      }

      if (!muiName) {
        throwMissingPropError('muiName');
      }

      if (!render) {
        throwMissingPropError('render');
      }

      const testStyle = {
        marginTop: '13px',
      };

      const theme = createTheme({
        components: {
          [muiName]: {
            variants: [
              {
                props: testVariantProps,
                style: testStyle,
              },
            ],
          },
        },
      });

      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, { ...testVariantProps, 'data-testid': 'with-props' })}
          {React.cloneElement(element, { 'data-testid': 'without-props' })}
        </ThemeProvider>,
      );

      expect(getByTestId('with-props')).to.toHaveComputedStyle(testStyle);
      expect(getByTestId('without-props')).not.to.toHaveComputedStyle(testStyle);
    });
  });
}

const fullSuite = {
  componentProp: testComponentProp,
  componentsProp: testComponentsProp,
  mergeClassName: testClassName,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
  rootClass: testRootClass,
  reactTestRenderer: testReactTestRenderer,
  themeDefaultProps: testThemeDefaultProps,
  themeStyleOverrides: testThemeStyleOverrides,
  themeVariants: testThemeVariants,
};

/**
 * Tests various aspects of a component that should be equal across Material-UI
 * components.
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {() => ConformanceOptions} getOptions
 */
export default function describeConformanceV5(minimalElement, getOptions) {
  const { after: runAfterHook = () => {}, only = Object.keys(fullSuite), skip = [] } = getOptions();

  const filteredTests = Object.keys(fullSuite).filter(
    (testKey) => only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1,
  );

  describe('Material-UI component API', () => {
    after(runAfterHook);

    filteredTests.forEach((testKey) => {
      const test = fullSuite[testKey];
      test(minimalElement, getOptions);
    });
  });
}
