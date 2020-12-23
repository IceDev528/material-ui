/* eslint-env mocha */
import React from 'react';
import PropTypes from 'prop-types';
import {
  act,
  buildQueries,
  cleanup,
  fireEvent as rtlFireEvent,
  queries,
  render as testingLibraryRender,
  prettyDOM,
  within,
} from '@testing-library/react/pure';
import userEvent from './user-event';

// holes are *All* selectors which aren't necessary for id selectors
const [queryDescriptionOf, , getDescriptionOf, , findDescriptionOf] = buildQueries(
  function queryAllDescriptionsOf(container, element) {
    return container.querySelectorAll(`#${element.getAttribute('aria-describedby')}`);
  },
  function getMultipleError() {
    return `Found multiple descriptions. An element should be described by a unique element.`;
  },
  function getMissingError() {
    return `Found no describing element.`;
  },
);

// https://github.com/testing-library/dom-testing-library/issues/723
// hide ByLabelText queries since they only support firefox >= 56, not IE 1:
// - HTMLInputElement.prototype.labels https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels

function queryAllByLabelText(container, label) {
  throw new Error(
    `*ByLabelText() relies on features that are not available in older browsers. Prefer \`*ByRole(someRole, { name: '${label}' })\` `,
  );
}
const [
  queryByLabelText,
  getAllByLabelText,
  getByLabelText,
  findAllByLabelText,
  findByLabelText,
] = buildQueries(
  queryAllByLabelText,
  function getMultipleError() {
    throw new Error('not implemented');
  },
  function getMissingError() {
    throw new Error('not implemented');
  },
);

const customQueries = {
  queryDescriptionOf,
  getDescriptionOf,
  findDescriptionOf,
  queryAllByLabelText,
  queryByLabelText,
  getAllByLabelText,
  getByLabelText,
  findAllByLabelText,
  findByLabelText,
};

/**
 * @typedef {object} RenderOptions
 * @property {HTMLElement} [options.baseElement] - https://testing-library.com/docs/react-testing-library/api#baseelement-1
 * @property {HTMLElement} [options.container] - https://testing-library.com/docs/react-testing-library/api#container
 * @property {boolean} [options.disableUnnmount] - if true does not cleanup before mount
 * @property {boolean} [options.hydrate] - https://testing-library.com/docs/react-testing-library/api#hydrate
 * @property {boolean} [options.strict] - wrap in React.StrictMode?
 */

/**
 * @param {React.ReactElement} element
 * @param {RenderOptions} [options]
 * @returns {import('@testing-library/react').RenderResult<typeof queries & typeof customQueries> & { setProps(props: object): void}}
 * TODO: type return RenderResult in setProps
 */
function clientRender(element, options = {}) {
  const {
    baseElement,
    container,
    hydrate,
    strict = true,
    wrapper: InnerWrapper = React.Fragment,
  } = options;

  const Mode = strict ? React.StrictMode : React.Fragment;
  function Wrapper({ children }) {
    return (
      <Mode>
        <InnerWrapper>{children}</InnerWrapper>
      </Mode>
    );
  }
  Wrapper.propTypes = { children: PropTypes.node };

  const result = testingLibraryRender(element, {
    baseElement,
    container,
    hydrate,
    queries: { ...queries, ...customQueries },
    wrapper: Wrapper,
  });

  /**
   * convenience helper. Better than repeating all props.
   */
  result.setProps = function setProps(props) {
    result.rerender(React.cloneElement(element, props));
    return result;
  };

  result.forceUpdate = function forceUpdate() {
    result.rerender(
      React.cloneElement(element, {
        'data-force-update': String(Math.random()),
      }),
    );
    return result;
  };

  return result;
}

/**
 * @param {RenderOptions} globalOptions
 * @returns {clientRender}
 */
export function createClientRender(globalOptions = {}) {
  const { strict: globalStrict } = globalOptions;

  // save stack to re-use in test-hooks
  const { stack: createClientRenderStack } = new Error();

  /**
   * Flag whether `createClientRender` was called in a suite i.e. describe() block.
   * For legacy reasons `createClientRender` might accidentally be called in a before(Each) hook.
   */
  let wasCalledInSuite = false;
  before(() => {
    wasCalledInSuite = true;
  });

  beforeEach(() => {
    if (!wasCalledInSuite) {
      const error = new Error(
        'Unable to run `before` hook for `createClientRender`. This usually indicates that `createClientRender` was called in a `before` hook instead of in a `describe()` block.',
      );
      error.stack = createClientRenderStack;
      throw error;
    }
  });

  afterEach(() => {
    if (setTimeout.hasOwnProperty('clock')) {
      const error = Error(
        "Can't cleanup before fake timers are restored.\n" +
          'Be sure to:\n' +
          '  1. Restore the clock in `afterEach` instead of `after`.\n' +
          '  2. Move the test hook to restore the clock before the call to `createClientRender()`.',
      );
      // Use saved stack otherwise the stack trace will not include the test location.
      error.stack = createClientRenderStack;
      throw error;
    }

    cleanup();
  });

  return function configuredClientRender(element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return clientRender(element, { ...localOptions, strict });
  };
}

const originalFireEventKeyDown = rtlFireEvent.keyDown;
const originalFireEventKeyUp = rtlFireEvent.keyUp;
/**
 * @type {typeof rtlFireEvent}
 */
const fireEvent = (...args) => rtlFireEvent(...args);
Object.assign(fireEvent, rtlFireEvent, {
  keyDown(element, options = {}) {
    // `element` shouldn't be `document` but we catch this later anyway
    const document = element.ownerDocument || element;
    const target = document.activeElement || document.body || document.documentElement;
    if (target !== element) {
      // see https://www.w3.org/TR/uievents/#keydown
      const error = new Error(
        `\`keydown\` events can only be targeted at the active element which is ${prettyDOM(
          target,
          undefined,
          { maxDepth: 1 },
        )}`,
      );
      // We're only interested in the callsite of fireEvent.keyDown
      error.stack = error.stack
        .split('\n')
        .filter((line) => !/at Function.key/.test(line))
        .join('\n');
      throw error;
    }

    originalFireEventKeyDown(element, options);
  },
  keyUp(element, options = {}) {
    // `element` shouldn't be `document` but we catch this later anyway
    const document = element.ownerDocument || element;
    const target = document.activeElement || document.body || document.documentElement;
    if (target !== element) {
      // see https://www.w3.org/TR/uievents/#keyup
      const error = new Error(
        `\`keyup\` events can only be targeted at the active element which is ${prettyDOM(
          target,
          undefined,
          { maxDepth: 1 },
        )}`,
      );
      // We're only interested in the callsite of fireEvent.keyUp
      error.stack = error.stack
        .split('\n')
        .filter((line) => !/at Function.key/.test(line))
        .join('\n');
      throw error;
    }

    originalFireEventKeyUp(element, options);
  },
});

/**
 *
 * @param {Element} target
 * @param {'touchmove' | 'touchend'} type
 * @param {object} options
 * @param {Array<Pick<TouchInit, 'clientX' | 'clientY'>} options.changedTouches
 * @returns void
 */
export function fireTouchChangedEvent(target, type, options) {
  const { changedTouches } = options;
  const originalGetBoundingClientRect = target.getBoundingClientRect;
  target.getBoundingClientRect = () => ({
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  });

  const event = new window.TouchEvent(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    changedTouches: changedTouches.map(
      (opts) =>
        new window.Touch({
          target,
          identifier: 0,
          ...opts,
        }),
    ),
  });

  fireEvent(target, event);
  target.getBoundingClientRect = originalGetBoundingClientRect;
}

export * from '@testing-library/react/pure';
export { act, cleanup, fireEvent, userEvent };
// We import from `@testing-library/react` and `@testing-library/dom` before creating a JSDOM.
// At this point a global document isn't available yet. Now it is.
export const screen = within(document.body);

export function render() {
  throw new Error(
    "Don't use `render` directly. Instead use the return value from `createClientRender`",
  );
}
