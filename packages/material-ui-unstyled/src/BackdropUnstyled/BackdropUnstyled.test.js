import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformance } from 'test/utils';
import BackdropUnstyled, {
  backdropUnstyledClasses as classes,
} from '@material-ui/unstyled/BackdropUnstyled';

describe('<BackdropUnstyled />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformance(
    <BackdropUnstyled>
      <div />
    </BackdropUnstyled>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'div',
    }),
  );

  it('forwards style props on the Root component', () => {
    let styleProps = null;
    let theme = null;

    const Root = React.forwardRef(
      ({ styleProps: stylePropsProp, theme: themeProp, ...rest }, ref) => {
        styleProps = stylePropsProp;
        theme = themeProp;
        return <span ref={ref} {...rest} />;
      },
    );

    render(<BackdropUnstyled components={{ Root }} />);

    expect(styleProps).not.to.equal(null);
    expect(theme).not.to.equal(null);
  });

  it('does not forward style props as DOM attributes if component slot is primitive', () => {
    const elementRef = React.createRef();
    render(
      <BackdropUnstyled
        components={{
          Root: 'span',
        }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('styleProps')).to.equal(null);
    expect(element.getAttribute('theme')).to.equal(null);
  });
});
