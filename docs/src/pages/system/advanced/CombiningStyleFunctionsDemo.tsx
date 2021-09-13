import * as React from 'react';
import styled from 'styled-components';
import { palette, PaletteProps, spacing, SpacingProps } from '@mui/system';
import NoSsr from '@mui/core/NoSsr';

const Div = styled.div<PaletteProps & SpacingProps>`
  ${palette}
  ${spacing}
`;

export default function CombiningStyleFunctionsDemo() {
  return (
    <NoSsr>
      <Div color="white" bgcolor="palevioletred" p={1}>
        Styled components
      </Div>
    </NoSsr>
  );
}
