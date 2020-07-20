import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses, describeConformance, createMount } from 'test/utils';
import DialogContentText from './DialogContentText';
import Typography from '../Typography';

describe('<DialogContentText />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<DialogContentText />);
  });

  describeConformance(<DialogContentText>foo</DialogContentText>, () => ({
    classes,
    inheritComponent: Typography,
    mount,
    refInstanceof: window.HTMLParagraphElement,
    skip: ['componentProp'],
  }));

  describe('prop: children', () => {
    it('should render children', () => {
      const children = <p />;
      const wrapper = shallow(<DialogContentText>{children}</DialogContentText>);
      expect(wrapper.children().equals(children)).to.equal(true);
    });
  });
});
