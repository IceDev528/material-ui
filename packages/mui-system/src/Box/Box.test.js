import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { Box } from '@mui/system';

describe('<Box />', () => {
  const { render } = createRenderer();

  describeConformance(<Box />, () => ({
    render,
    inheritComponent: 'div',
    skip: [
      'componentProp',
      'componentsProp',
      'rootClass',
      'themeVariants',
      'themeStyleOverrides',
      'themeDefaultProps',
    ],
    refInstanceof: window.HTMLDivElement,
  }));

  const testChildren = (
    <div data-testid="child" className="unique">
      Hello World
    </div>
  );

  it('does not forward style props as DOM attributes', () => {
    const elementRef = React.createRef();
    render(
      <Box
        color="primary.main"
        fontFamily="Comic Sans"
        fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element).not.to.have.attribute('color');
    expect(element).not.to.have.attribute('font-family');
    expect(element).not.to.have.attribute('font-size');
  });

  it('renders children and box content', () => {
    const { container, getByTestId } = render(
      <Box component="span" sx={{ m: 1 }}>
        {testChildren}
      </Box>,
    );
    expect(container.firstChild).contain(getByTestId('child'));
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  it('respect properties order when generating the CSS', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      this.skip();
    }

    const testCaseBorderColorWins = render(<Box border={1} borderColor="rgb(0, 0, 255)" />);

    expect(testCaseBorderColorWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 255)',
      borderRightColor: 'rgb(0, 0, 255)',
      borderBottomColor: 'rgb(0, 0, 255)',
      borderLeftColor: 'rgb(0, 0, 255)',
    });

    const testCaseBorderWins = render(<Box borderColor={'rgb(0, 0, 255)'} border={1} />);

    expect(testCaseBorderWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 0)',
      borderRightColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgb(0, 0, 0)',
      borderLeftColor: 'rgb(0, 0, 0)',
    });
  });

  it('respect border-*-color properties order when generating the CSS', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      this.skip();
    }

    const testCaseBorderPositionColorWins = render(
      <Box
        borderTop={1}
        borderTopColor="rgb(0, 0, 25)"
        borderRight={2}
        borderRightColor="rgb(0, 0, 50)"
        borderBottom={3}
        borderBottomColor="rgb(0, 0, 75)"
        borderLeft={4}
        borderLeftColor="rgb(0, 0, 100)"
      />,
    );

    expect(testCaseBorderPositionColorWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '2px',
      borderBottomWidth: '3px',
      borderLeftWidth: '4px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 25)',
      borderRightColor: 'rgb(0, 0, 50)',
      borderBottomColor: 'rgb(0, 0, 75)',
      borderLeftColor: 'rgb(0, 0, 100)',
    });

    const testCaseBorderPositionWins = render(
      <Box
        borderTopColor="rgb(0, 0, 25)"
        borderTop={1}
        borderRightColor="rgb(0, 0, 50)"
        borderRight={2}
        borderBottomColor="rgb(0, 0, 75)"
        borderBottom={3}
        borderLeftColor="rgb(0, 0, 100)"
        borderLeft={4}
      />,
    );

    expect(testCaseBorderPositionWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '2px',
      borderBottomWidth: '3px',
      borderLeftWidth: '4px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 0)',
      borderRightColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgb(0, 0, 0)',
      borderLeftColor: 'rgb(0, 0, 0)',
    });
  });

  it('respect properties order when generating the CSS from the sx prop', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      this.skip();
    }

    const testCaseBorderColorWins = render(
      <Box sx={{ border: 1, borderColor: 'rgb(0, 0, 255)' }} />,
    );

    expect(testCaseBorderColorWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 255)',
      borderRightColor: 'rgb(0, 0, 255)',
      borderBottomColor: 'rgb(0, 0, 255)',
      borderLeftColor: 'rgb(0, 0, 255)',
    });

    const testCaseBorderWins = render(<Box sx={{ borderColor: 'rgb(0, 0, 255)', border: 1 }} />);

    expect(testCaseBorderWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '1px',
      borderBottomWidth: '1px',
      borderLeftWidth: '1px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 0)',
      borderRightColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgb(0, 0, 0)',
      borderLeftColor: 'rgb(0, 0, 0)',
    });

    const testCaseBorderPositionColorWins = render(
      <Box
        sx={{
          borderTop: 1,
          borderTopColor: 'rgb(0, 0, 25)',
          borderRight: 2,
          borderRightColor: 'rgb(0, 0, 50)',
          borderBottom: 3,
          borderBottomColor: 'rgb(0, 0, 75)',
          borderLeft: 4,
          borderLeftColor: 'rgb(0, 0, 100)',
        }}
      />,
    );

    expect(testCaseBorderPositionColorWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '2px',
      borderBottomWidth: '3px',
      borderLeftWidth: '4px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 25)',
      borderRightColor: 'rgb(0, 0, 50)',
      borderBottomColor: 'rgb(0, 0, 75)',
      borderLeftColor: 'rgb(0, 0, 100)',
    });

    const testCaseBorderPositionWins = render(
      <Box
        sx={{
          borderTopColor: 'rgb(0, 0, 25)',
          borderTop: 1,
          borderRightColor: 'rgb(0, 0, 50)',
          borderRight: 2,
          borderBottomColor: 'rgb(0, 0, 75)',
          borderBottom: 3,
          borderLeftColor: 'rgb(0, 0, 100)',
          borderLeft: 4,
        }}
      />,
    );

    expect(testCaseBorderPositionWins.container.firstChild).toHaveComputedStyle({
      borderTopWidth: '1px',
      borderRightWidth: '2px',
      borderBottomWidth: '3px',
      borderLeftWidth: '4px',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderTopColor: 'rgb(0, 0, 0)',
      borderRightColor: 'rgb(0, 0, 0)',
      borderBottomColor: 'rgb(0, 0, 0)',
      borderLeftColor: 'rgb(0, 0, 0)',
    });
  });

  it('combines system properties with the sx prop', () => {
    const { container } = render(<Box mt={2} mr={1} sx={{ marginRight: 5, mb: 2 }} />);

    expect(container.firstChild).toHaveComputedStyle({
      marginTop: '16px',
      marginRight: '40px',
      marginBottom: '16px',
    });
  });

  it('adds the utility mui class', () => {
    const { getByTestId } = render(
      <React.Fragment>
        <Box data-testid="regular-box" />
      </React.Fragment>,
    );

    expect(getByTestId('regular-box')).to.have.class('MuiBox-root');
  });
});
