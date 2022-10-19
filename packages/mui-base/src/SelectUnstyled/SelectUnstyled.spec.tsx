import * as React from 'react';
import { expectType } from '@mui/types';
import {
  SelectUnstyled,
  SelectUnstyledRootSlotProps,
  SelectUnstyledPopperSlotProps,
  PopperUnstyled,
} from '@mui/base';

const SelectUnstyledComponentsPropsOverridesTest = (
  <SelectUnstyled
    slotProps={{
      root: {
        // @ts-expect-error - requires module augmentation
        size: 'red',
        className: 'test',
      },
      popper: {
        className: 'popper',
        disablePortal: true,
      },
      listbox: {
        className: 'listbox',
        onMouseOver: () => {},
      },
    }}
  />
);

function CustomRoot<TValue extends {}>(props: SelectUnstyledRootSlotProps<TValue>) {
  const { ownerState, ...other } = props;
  return <div {...other} />;
}

function CustomPopper<TValue extends {}>(props: SelectUnstyledPopperSlotProps<TValue>) {
  const { ownerState, ...other } = props;
  return <PopperUnstyled {...other} />;
}

const SelectUnstyledRootComponentOverridesTest = (
  <SelectUnstyled
    slots={{
      root: CustomRoot,
      listbox: 'ul',
      popper: PopperUnstyled,
    }}
  />
);

const SelectUnstyledPopperComponentOverridesTest = (
  <SelectUnstyled
    slots={{
      popper: CustomPopper,
    }}
  />
);

function InvalidPopper({ requiredProp }: { requiredProp: string }) {
  return <div />;
}

const SelectUnstyledComponentsOverridesUsingInvalidComponentTest = (
  <SelectUnstyled
    slots={{
      // @ts-expect-error - provided a component that requires a prop SelectUnstyled does not provide
      popper: InvalidPopper,
    }}
  />
);

const SelectUnstyledComponentsOverridesUsingHostComponentTest = (
  <SelectUnstyled
    slots={{
      // @ts-expect-error - provided a host element instead of a component
      popper: 'div',
    }}
  />
);

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> = () => <div />;

  return (
    <div>
      {/* @ts-expect-error */}
      <SelectUnstyled invalidProp={0} />

      <SelectUnstyled component="a" href="#" />

      <SelectUnstyled component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error */}
      <SelectUnstyled component={CustomComponent} />

      <SelectUnstyled
        component="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <SelectUnstyled<string, 'button'>
        component="button"
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
