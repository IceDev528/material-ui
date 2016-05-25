/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {stub} from 'sinon';
import FlatButton from './FlatButton';
import getMuiTheme from '../styles/getMuiTheme';
import ActionAndroid from '../svg-icons/action/android';

describe('<FlatButton />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const flatButtonTheme = muiTheme.flatButton;
  const testChildren = <div className="unique">Hello World</div>;

  it('renders an enhanced button', () => {
    const wrapper = shallowWithContext(
      <FlatButton>Button</FlatButton>
    );
    assert.ok(wrapper.is('EnhancedButton'));
  });

  it('renders children', () => {
    const wrapper = shallowWithContext(
      <FlatButton>{testChildren}</FlatButton>
    );
    assert.ok(wrapper.contains(testChildren), 'should contain the children');
  });

  it('passes props to the enhanced button', () => {
    const props = {
      ariaLabel: 'Say hello world',
      disabled: true,
      href: 'http://google.com',
      name: 'Hello World',
    };

    const wrapper = shallowWithContext(
      <FlatButton {...props}>Button</FlatButton>
    );

    assert.ok(wrapper.is('EnhancedButton'));
    assert.ok(wrapper.is(props));
  });

  it('renders a label with an icon before', () => {
    const wrapper = shallowWithContext(
      <FlatButton
        icon={<span className="test-icon" />}
        label="Hello"
      />
    );
    const icon = wrapper.children().at(0);
    const label = wrapper.children().at(1);
    assert.ok(icon.is('span'), );
    assert.ok(icon.hasClass('test-icon'));
    assert.ok(label.is('FlatButtonLabel'));
    assert.strictEqual(label.node.props.label, 'Hello', 'says hello');
  });

  it('renders a label with an icon after', () => {
    const wrapper = shallowWithContext(
      <FlatButton
        icon={<span className="test-icon" />}
        label="Hello"
        labelPosition="before"
      />
    );
    const icon = wrapper.children().at(1);
    const label = wrapper.children().at(0);
    assert.ok(icon.is('span'), );
    assert.ok(icon.hasClass('test-icon'));
    assert.ok(label.is('FlatButtonLabel'));
    assert.strictEqual(label.node.props.label, 'Hello', 'says hello');
  });

  it('colors the button the primary theme color', () => {
    const wrapper = shallowWithContext(
      <FlatButton
        label="Button"
        icon={<span className="test-icon" />}
        primary={true}
      />
    );
    const icon = wrapper.children().at(0);
    assert.ok(wrapper.is('EnhancedButton'));
    assert.ok(wrapper.is({
      style: {
        color: flatButtonTheme.primaryTextColor,
      },
    }));
    assert.ok(icon.is('span'));
    assert.ok(icon.is({color: flatButtonTheme.primaryTextColor}));
  });

  it('colors the icon with the passed color in prop', () => {
    const color = 'white';
    const wrapper = shallowWithContext(
      <FlatButton
        backgroundColor="#a4c639"
        hoverColor="#8AA62F"
        icon={<ActionAndroid color={color} />}
      />
    );
    const icon = wrapper.find('ActionAndroid');
    assert.strictEqual(icon.prop('color'), color, 'icon should have same color as that of color prop');
  });

  it('colors the button the secondary theme color', () => {
    const wrapper = shallowWithContext(
      <FlatButton secondary={true} icon={<span className="test-icon" />}>Button</FlatButton>
    );
    assert.ok(wrapper.is('EnhancedButton'));
    assert.ok(wrapper.is({
      style: {
        color: flatButtonTheme.secondaryTextColor,
      },
    }));
  });

  it('overrides hover and background color styles via props', () => {
    const wrapper = shallowWithContext(
      <FlatButton
        backgroundColor="rgba(159,159,159)"
        hoverColor="yellow"
        label="Button"
      />
    );

    assert.ok(wrapper.is({
      style: {
        backgroundColor: 'rgba(159,159,159)',
      },
    }), 'should have the custom background color');

    wrapper.setState({hovered: true});

    assert.ok(wrapper.is({
      style: {
        backgroundColor: 'yellow',
      },
    }), 'should have the custom hover background color');
  });

  it('overrides the ripple color via props', () => {
    const wrapper = shallowWithContext(
      <FlatButton rippleColor="yellow" label="Button" />
    );
    assert.strictEqual(wrapper.node.props.focusRippleColor, 'yellow', 'should be yellow');
    assert.strictEqual(wrapper.node.props.touchRippleColor, 'yellow', 'should be yellow');
  });

  describe('propTypes', () => {
    let consoleStub;

    beforeEach(() => {
      consoleStub = stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore(); // eslint-disable-line no-console
    });

    it('should throw when using wrong properties', () => {
      shallowWithContext(
        <FlatButton />
      );
      assert.strictEqual(consoleStub.callCount, 1);
      assert.strictEqual(
        consoleStub.args[0][0],
        'Warning: Failed propType: Required prop label or children or icon was not specified in FlatButton.'
      );
    });

    it('should not throw when using a valid properties', () => {
      shallowWithContext(
        <FlatButton label={0} />
      );
      assert.strictEqual(consoleStub.callCount, 0);
    });
  });
});
