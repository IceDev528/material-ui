import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { getClasses, createMount, createClientRender, describeConformance } from 'test/utils';
import CardMedia from './CardMedia';

describe('<CardMedia />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();
  before(() => {
    classes = getClasses(<CardMedia image="/foo.jpg" />);
  });

  describeConformance(<CardMedia image="/foo.jpg" />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  it('should have the backgroundImage specified', () => {
    const { container } = render(<CardMedia image="/foo.jpg" />);
    const cardMedia = container.firstChild;
    expect(cardMedia.style.backgroundImage).to.match(/\/foo\.jpg/m);
  });

  it('should have backgroundImage specified even though custom styles got passed', () => {
    const { container } = render(<CardMedia image="/foo.jpg" style={{ height: 200 }} />);
    const cardMedia = container.firstChild;
    expect(cardMedia.style.backgroundImage).to.match(/\/foo\.jpg/m);
    expect(cardMedia.style.height).to.equal('200px');
  });

  it('should be possible to overwrite backgroundImage via custom styles', () => {
    const { container } = render(
      <CardMedia image="/foo.jpg" style={{ backgroundImage: 'url(/bar.jpg)' }} />,
    );
    const cardMedia = container.firstChild;
    expect(cardMedia.style.backgroundImage).to.match(/\/bar\.jpg/m);
  });

  describe('prop: component', () => {
    it('should have `src` prop when media component specified', () => {
      const { container } = render(<CardMedia image="/foo.jpg" component="iframe" />);
      const cardMedia = container.firstChild;
      expect(cardMedia).to.have.attribute('src', '/foo.jpg');
    });

    it('should not have `src` prop when picture media component specified', () => {
      const { container } = render(
        <CardMedia component="picture">
          <source media="(min-width: 600px)" srcSet="big-cat.jpg" />
          <img src="cat.jpg" alt="hello" />
        </CardMedia>,
      );
      const cardMedia = container.firstChild;
      expect(cardMedia).to.not.have.attribute('src');
    });

    it('should not have default inline style when media component specified', () => {
      const { container } = render(<CardMedia src="/foo.jpg" component="picture" />);
      const cardMedia = container.firstChild;
      expect(cardMedia.style.backgroundImage).to.equal('');
    });

    it('should not have `src` prop if not media component specified', () => {
      const { container } = render(<CardMedia image="/foo.jpg" component="table" />);
      const cardMedia = container.firstChild;
      expect(cardMedia).to.not.have.attribute('src');
    });
  });

  describe('warnings', () => {
    before(() => {
      PropTypes.resetWarningCache();
    });

    it('warns when neither `children`, nor `image`, nor `src`, nor `component` are provided', () => {
      expect(() => {
        PropTypes.checkPropTypes(CardMedia.Naked.propTypes, { classes: {} }, 'prop', 'MockedName');
      }).toErrorDev(
        'Material-UI: Either `children`, `image`, `src` or `component` prop must be specified.',
      );
    });
  });
});
