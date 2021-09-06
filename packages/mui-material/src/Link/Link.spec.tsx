import * as React from 'react';
import Link from '@mui/material/Link';
import { expectType } from '@mui/types';

<Link
  ref={(elem) => {
    expectType<HTMLAnchorElement | null, typeof elem>(elem);
  }}
>
  Home
</Link>;

<Link
  component="button"
  // @ts-expect-error Implicit any
  ref={(elem) => {
    expectType<any, typeof elem>(elem);
  }}
>
  Home
</Link>;

<Link
  component="button"
  ref={(elem: HTMLButtonElement | null) => {
    expectType<HTMLButtonElement | null, typeof elem>(elem);
  }}
>
  Home
</Link>;
