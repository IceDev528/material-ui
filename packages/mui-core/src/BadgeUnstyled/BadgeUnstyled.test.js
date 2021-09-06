import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformance } from 'test/utils';
import BadgeUnstyled, { badgeUnstyledClasses as classes } from '@mui/core/BadgeUnstyled';

describe('<BadgeUnstyled />', () => {
  const render = createClientRender();

  describeConformance(
    <BadgeUnstyled>
      <div />
    </BadgeUnstyled>,
    () => ({
      classes,
      inheritComponent: 'span',
      render,
      refInstanceof: window.HTMLSpanElement,
      testComponentPropWith: 'div',
      skip: [
        'themeDefaultProps', // unstyled
        'themeStyleOverrides', // unstyled
        'themeVariants', // unstyled
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

    render(<BadgeUnstyled components={{ Root }} />);

    expect(ownerState).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <BadgeUnstyled
        components={{
          Root: 'span',
        }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('ownerState')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });
});
