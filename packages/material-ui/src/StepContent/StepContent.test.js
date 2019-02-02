import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Collapse from '../Collapse';
import StepContent from './StepContent';

describe('<StepContent />', () => {
  let shallow;
  let mount;
  const defaultProps = {
    orientation: 'vertical',
  };

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('renders a div', () => {
    const wrapper = shallow(<StepContent {...defaultProps}>Here is the content</StepContent>);
    assert.strictEqual(wrapper.type(), 'div');
  });

  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(
      <StepContent
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        data-role="Tabpanel"
        {...defaultProps}
      >
        Lorem ipsum
      </StepContent>,
    );
    const props = wrapper.props();
    assert.strictEqual(props.style.paddingRight, 200);
    assert.strictEqual(props.style.color, 'purple');
    assert.strictEqual(props.style.border, '1px solid tomato');
    assert.strictEqual(props['data-role'], 'Tabpanel');
  });

  it('renders children inside an Collapse component', () => {
    const wrapper = shallow(
      <StepContent {...defaultProps}>
        <div className="test-content">This is my content!</div>
      </StepContent>,
    );
    const collapse = wrapper.find(Collapse);
    assert.strictEqual(collapse.length, 1);
    const content = collapse.find('.test-content');
    assert.strictEqual(content.length, 1);
    assert.strictEqual(content.props().children, 'This is my content!');
  });

  describe('prop: transitionDuration', () => {
    it('should apply the auto property if supported', () => {
      const wrapper = shallow(
        <StepContent {...defaultProps}>
          <div />
        </StepContent>,
      );
      assert.strictEqual(wrapper.find(Collapse).props().timeout, 'auto');
    });

    it('should not apply the auto property if not supported', () => {
      const TransitionComponent = props => <div {...props} />;
      const wrapper = shallow(
        <StepContent {...defaultProps} TransitionComponent={TransitionComponent}>
          <div />
        </StepContent>,
      );
      assert.strictEqual(wrapper.find(TransitionComponent).props().timeout, undefined);
    });
  });
});
