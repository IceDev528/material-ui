import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import ModalUnstyled, { modalUnstyledClasses as classes } from '@mui/core/ModalUnstyled';

describe('<ModalUnstyled />', () => {
  const { render } = createRenderer();
  let savedBodyStyle;

  before(() => {
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle);
  });

  describeConformance(
    <ModalUnstyled open>
      <div />
    </ModalUnstyled>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'rootClass', // portal, can't determin the root
        'themeDefaultProps', // unstyled
        'themeStyleOverrides', // unstyled
        'themeVariants', // unstyled
        'reactTestRenderer', // portal https://github.com/facebook/react/issues/11565
      ],
    }),
  );

  it('forwards style props on the Root component', () => {
    let ownerState = null;
    let theme = null;

    const Root = React.forwardRef(
      ({ ownerState: ownerStateProp, theme: themeProp, ...other }, ref) => {
        ownerState = ownerStateProp;
        theme = themeProp;
        return <span ref={ref} {...other} />;
      },
    );

    render(
      <ModalUnstyled open components={{ Root }}>
        <div />
      </ModalUnstyled>,
    );

    expect(ownerState).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <ModalUnstyled
        open
        components={{
          Root: 'span',
        }}
        ref={elementRef}
      >
        <div />
      </ModalUnstyled>,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('ownerState')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });
});
