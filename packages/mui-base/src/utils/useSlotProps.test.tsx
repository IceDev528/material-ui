import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { EventHandlers } from '@mui/base';
import { createRenderer } from 'test/utils';
import useSlotProps, { UseSlotPropsParameters, UseSlotPropsResult } from './useSlotProps';

const { render } = createRenderer();

function callUseSlotProps<
  ElementType extends React.ElementType,
  SlotProps,
  ExternalForwardedProps,
  ExternalSlotProps,
  AdditionalProps,
  OwnerState,
>(
  parameters: UseSlotPropsParameters<
    ElementType,
    SlotProps,
    ExternalForwardedProps,
    ExternalSlotProps,
    AdditionalProps,
    OwnerState
  >,
) {
  const TestComponent = React.forwardRef(
    (
      _: unknown,
      ref: React.Ref<
        UseSlotPropsResult<
          ElementType,
          SlotProps,
          ExternalForwardedProps,
          ExternalSlotProps,
          AdditionalProps,
          OwnerState
        >
      >,
    ) => {
      const slotProps = useSlotProps(parameters);
      React.useImperativeHandle(ref, () => slotProps as any);
      return null;
    },
  );

  const ref =
    React.createRef<
      UseSlotPropsResult<
        ElementType,
        SlotProps,
        ExternalForwardedProps,
        ExternalSlotProps,
        AdditionalProps,
        OwnerState
      >
    >();
  render(<TestComponent ref={ref} />);

  return ref.current!;
}

describe('useSlotProps', () => {
  it('returns the provided slot props if no overrides are present', () => {
    const clickHandler = () => {};
    const getSlotProps = (otherHandlers: EventHandlers) => {
      expect(otherHandlers).to.deep.equal({});

      return {
        id: 'test',
        onClick: clickHandler,
      };
    };

    const result = callUseSlotProps({
      elementType: 'div',
      getSlotProps,
      externalSlotProps: undefined,
      ownerState: undefined,
    });

    expect(result).to.deep.equal({
      id: 'test',
      onClick: clickHandler,
      ref: null,
    });
  });

  it('calls getSlotProps with the external event handlers', () => {
    const externalClickHandler = () => {};
    const internalClickHandler = () => {};

    const getSlotProps = (otherHandlers: EventHandlers) => {
      expect(otherHandlers).to.deep.equal({
        onClick: externalClickHandler,
      });

      return {
        id: 'internalId',
        onClick: internalClickHandler,
      };
    };

    const result = callUseSlotProps({
      elementType: 'div',
      getSlotProps,
      externalSlotProps: {
        className: 'externalClassName',
        id: 'externalId',
        onClick: externalClickHandler,
      },
      ownerState: undefined,
    });

    expect(result).to.deep.equal({
      className: 'externalClassName',
      id: 'externalId',
      onClick: internalClickHandler,
      ref: null,
    });
  });

  it('adds ownerState to props if the elementType is a component', () => {
    const getSlotProps = () => ({
      id: 'test',
    });

    const TestComponent = (props: any) => <div {...props} />;

    const result = callUseSlotProps({
      elementType: TestComponent,
      getSlotProps,
      externalSlotProps: undefined,
      ownerState: {
        foo: 'bar',
      },
    });

    expect(result).to.deep.equal({
      id: 'test',
      ref: null,
      ownerState: {
        foo: 'bar',
      },
    });
  });

  it('synchronizes refs provided by internal and external props', () => {
    const internalRef = React.createRef();
    const externalRef = React.createRef();

    const getSlotProps = () => ({
      ref: internalRef,
    });

    const result = callUseSlotProps({
      elementType: 'div',
      getSlotProps,
      externalSlotProps: {
        ref: externalRef,
      },
      ownerState: undefined,
    });

    result.ref('test');

    expect(internalRef.current).to.equal('test');
    expect(externalRef.current).to.equal('test');
  });

  // The "everything but the kitchen sink" test
  it('constructs props from complex parameters', () => {
    const internalRef = React.createRef();
    const externalRef = React.createRef();
    const additionalRef = React.createRef();

    const internalClickHandler = spy();
    const externalClickHandler = spy();
    const externalForwardedClickHandler = spy();

    const createInternalClickHandler = (otherHandlers: EventHandlers) => (e: React.MouseEvent) => {
      expect(otherHandlers).to.deep.equal({
        onClick: externalClickHandler,
      });

      otherHandlers.onClick(e);
      internalClickHandler(e);
    };

    // usually provided by the hook:
    const getSlotProps = (otherHandlers: EventHandlers) => ({
      id: 'internalId',
      onClick: createInternalClickHandler(otherHandlers),
      ref: internalRef,
      className: 'internal',
    });

    const ownerState = {
      test: true,
    };

    // provided by the user by appending additonal props on the unstyled component:
    const forwardedProps = {
      'data-test': 'externalForwarded',
      className: 'externalForwarded',
      onClick: externalForwardedClickHandler,
    };

    // provided by the user via componentsProps.*:
    const componentProps = (os: typeof ownerState) => ({
      'data-fromownerstate': os.test,
      'data-test': 'externalComponentsProps',
      className: 'externalComponentsProps',
      onClick: externalClickHandler,
      ref: externalRef,
      id: 'external',
      ownerState: {
        foo: 'bar',
      },
    });

    // set in the unstyled component:
    const additionalProps = {
      className: 'additional',
      ref: additionalRef,
    };

    const TestComponent = (props: any) => <div {...props} />;

    const result = callUseSlotProps({
      elementType: TestComponent,
      getSlotProps,
      externalForwardedProps: forwardedProps,
      externalSlotProps: componentProps,
      additionalProps,
      ownerState,
      className: ['another-class', 'yet-another-class'],
    });

    // `id` from componentProps overrides the one from getSlotProps
    expect(result).to.haveOwnProperty('id', 'external');

    // `componentsProps` is called with the ownerState
    expect(result).to.haveOwnProperty('data-fromownerstate', true);

    // class names are concatenated
    expect(result).to.haveOwnProperty(
      'className',
      'externalForwarded externalComponentsProps another-class yet-another-class additional internal',
    );

    // `data-test` from componentProps overrides the one from forwardedProps
    expect(result).to.haveOwnProperty('data-test', 'externalComponentsProps');

    // all refs should be synced
    result.ref('test');
    expect(internalRef.current).to.equal('test');
    expect(externalRef.current).to.equal('test');
    expect(additionalRef.current).to.equal('test');

    // event handler provided in componentsProps is called
    result.onClick({});
    expect(externalClickHandler.calledOnce).to.equal(true);

    // event handler provided in forwardedProps is not called (was overridden by componentsProps)
    expect(externalForwardedClickHandler.notCalled).to.equal(true);

    // internal event handler is called
    expect(internalClickHandler.calledOnce).to.equal(true);

    // internal ownerState is merged with the one provided by componentsProps
    expect(result.ownerState).to.deep.equal({
      test: true,
      foo: 'bar',
    });
  });
});
