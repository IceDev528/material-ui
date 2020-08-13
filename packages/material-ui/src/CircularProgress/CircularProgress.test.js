import * as React from 'react';
import * as PropTypes from 'prop-types';
import { expect } from 'chai';
import { stub } from 'sinon';
import { createClientRender } from 'test/utils/createClientRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import CircularProgress from './CircularProgress';

describe('<CircularProgress />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<CircularProgress />);
  });

  describeConformance(<CircularProgress />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render with the primary color by default', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorPrimary);
  });

  it('should render with the primary color', () => {
    const { container } = render(<CircularProgress color="primary" />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorPrimary);
  });

  it('should render with the secondary color', () => {
    const { container } = render(<CircularProgress color="secondary" />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorSecondary);
  });

  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    const svg = circularProgress.firstChild;
    expect(svg.tagName).to.equal('svg');
    expect(circularProgress).to.have.class(classes.indeterminate);
    expect(svg.firstChild.tagName).to.equal('circle', 'should be a circle');
    expect(svg.firstChild).to.have.class(classes.circle, 'should have the circle class');
  });

  it('should render intermediate variant by default', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.root);
    const svg = circularProgress.firstChild;
    expect(svg.firstChild).to.have.class(
      classes.circleIndeterminate,
      'should have the circleIndeterminate class',
    );
  });

  it('should render with a different size', () => {
    const { container } = render(<CircularProgress size={60} />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.root);
    expect(circularProgress.style.width).to.equal('60px', 'should have width correctly set');
    expect(circularProgress.style.height).to.equal('60px', 'should have height correctly set');
    const svg = circularProgress.firstChild;
    expect(svg.tagName).to.equal('svg');
    const circle = svg.firstChild;
    expect(circle.tagName).to.equal('circle');
    expect(circle).to.have.attribute('cx', '44');
    expect(circle).to.have.attribute('cy', '44');
  });

  describe('prop: variant="static', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
      stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore();
    });

    it('should set strokeDasharray of circle', () => {
      const { container } = render(<CircularProgress variant="static" value={70} />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle.style.strokeDasharray).to.match(
        /126\.920?(px)?/gm,
        'should have strokeDasharray set',
      );
      expect(circle.style.strokeDashoffset).to.equal(
        '38.076px',
        'should have strokeDashoffset set',
      );
      expect(circularProgress).to.have.attribute('aria-valuenow', '70');
    });

    it('issues a warning for variant="static"', () => {
      PropTypes.checkPropTypes(
        CircularProgress.Naked.propTypes,
        {
          variant: 'static',
        },
        'props',
        'Avatar',
      );

      expect(console.error.callCount).to.equal(1);
      expect(console.error.firstCall.args[0]).to.equal(
        'Warning: Failed props type: Material-UI: `variant="static"` was deprecated. Use `variant="determinate"` instead.',
      );
    });
  });

  describe('prop: variant="determinate"', () => {
    it('should render with determinate classes', () => {
      const { container } = render(<CircularProgress variant="determinate" />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      expect(svg.tagName).to.equal('svg');
      expect(svg).to.not.have.class(
        classes.svgIndeterminate,
        'should not have the svgIndeterminate class',
      );
    });

    it('should set strokeDasharray of circle', () => {
      const { container } = render(<CircularProgress variant="determinate" value={70} />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle.style.strokeDasharray).to.match(
        /126\.920?(px)?/gm,
        'should have strokeDasharray set',
      );
      expect(circle.style.strokeDashoffset).to.equal(
        '38.076px',
        'should have strokeDashoffset set',
      );
      expect(circularProgress).to.have.attribute('aria-valuenow', '70');
    });
  });

  describe('prop: disableShrink ', () => {
    it('should default to false', () => {
      const { container } = render(<CircularProgress variant="indeterminate" />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle.tagName).to.equal('circle');
      expect(circle).to.not.have.class(classes.circleDisableShrink);
    });

    it('should render without disableShrink class when set to false', () => {
      const { container } = render(
        <CircularProgress variant="indeterminate" disableShrink={false} />,
      );
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle.tagName).to.equal('circle');
      expect(circle).to.not.have.class(classes.circleDisableShrink);
    });

    it('should render with disableShrink class when set to true', () => {
      const { container } = render(<CircularProgress variant="indeterminate" disableShrink />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle.tagName).to.equal('circle');
      expect(circle).to.have.class(classes.circleDisableShrink);
    });
  });
});
