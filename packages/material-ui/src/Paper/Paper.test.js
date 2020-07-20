import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses, createMount, describeConformance } from 'test/utils';
import * as PropTypes from 'prop-types';
import Paper from './Paper';
import { createMuiTheme, ThemeProvider } from '../styles';

describe('<Paper />', () => {
  const mount = createMount();
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Paper />);
  });

  describeConformance(<Paper />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'header',
  }));

  describe('prop: square', () => {
    it('can disable the rounded class', () => {
      const wrapper = mount(<Paper square>Hello World</Paper>);
      expect(wrapper.find(`.${classes.root}`).some(`.${classes.rounded}`)).to.equal(false);
    });

    it('adds a rounded class to the root when omitted', () => {
      const wrapper = mount(<Paper>Hello World</Paper>);
      expect(wrapper.find(`.${classes.root}`).every(`.${classes.rounded}`)).to.equal(true);
    });
  });

  describe('prop: variant', () => {
    it('adds a outlined class', () => {
      const wrapper = mount(<Paper variant="outlined">Hello World</Paper>);
      expect(wrapper.find(`.${classes.root}`).some(`.${classes.outlined}`)).to.equal(true);
    });
  });

  it('should set the elevation elevation class', () => {
    const wrapper = shallow(<Paper elevation={16}>Hello World</Paper>);
    expect(wrapper.hasClass(classes.elevation16)).to.equal(true);
    wrapper.setProps({ elevation: 24 });
    expect(wrapper.hasClass(classes.elevation24)).to.equal(true);
    wrapper.setProps({ elevation: 2 });
    expect(wrapper.hasClass(classes.elevation2)).to.equal(true);
  });

  it('allows custom elevations via theme.shadows', () => {
    const theme = createMuiTheme();
    theme.shadows.push('20px 20px');
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Paper data-testid="paper" classes={{ elevation25: 'custom-elevation' }} elevation={25} />
      </ThemeProvider>,
    );

    expect(wrapper.find('div[data-testid="paper"]').hasClass('custom-elevation')).to.equal(true);
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('warns if the given `elevation` is not implemented in the theme', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Paper.Naked.propTypes,
          { classes: { elevation24: 'elevation-24', elevation26: 'elevation-26' }, elevation: 25 },
          'prop',
          'MockedPaper',
        );
      }).toErrorDev('Material-UI: This elevation `25` is not implemented.');
    });
  });
});
