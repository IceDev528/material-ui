/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import Badge from './Badge';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Badge />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});
  const badgeTheme = muiTheme.badge;
  const testChildren = <div className="unique">Hello World</div>;

  it('renders children and badgeContent', () => {
    const wrapper = shallowWithContext(
      <Badge badgeContent={10}>{testChildren}</Badge>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.ok(wrapper.find('span').length, 'should contain the badgeContent');
  });

  it('renders children and overwrite badge styles', () => {
    const badgeStyle = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <Badge badgeContent={10} badgeStyle={badgeStyle}>{testChildren}</Badge>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.equal(wrapper.find('span').node.props.style.backgroundColor,
    badgeStyle.backgroundColor, 'should overwrite badge backgroundColor');
  });

  it('renders children by default', () => {
    const wrapper = shallowWithContext(
      <Badge>{testChildren}</Badge>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
  });

  it('renders children and className', () => {
    const wrapper = shallowWithContext(
      <Badge className="testClassName">{testChildren}</Badge>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.ok(wrapper.is('.testClassName'), 'should contain the className');
  });

  it('renders children and have primary styles', () => {
    const wrapper = shallowWithContext(
      <Badge badgeContent={10} primary={true}>{testChildren}</Badge>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.equal(wrapper.find('span').node.props.style.backgroundColor,
    badgeTheme.primaryColor, 'should have primary badge backgroundColor');
    assert.equal(wrapper.find('span').node.props.style.color,
    badgeTheme.primaryTextColor, 'should have primary badge text color');
  });

  it('renders children and have secondary styles', () => {
    const wrapper = shallowWithContext(
      <Badge badgeContent={10} secondary={true}>{testChildren}</Badge>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.equal(wrapper.find('span').node.props.style.backgroundColor,
    badgeTheme.secondaryColor, 'should have secondary badge backgroundColor');
    assert.equal(wrapper.find('span').node.props.style.color,
    badgeTheme.secondaryTextColor, 'should have secondary badge text color');
  });

  it('renders children and overwrite root styles', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallowWithContext(
      <Badge style={style}>{testChildren}</Badge>
    );

    assert.ok(wrapper.contains(testChildren), 'should contain the children');
    assert.equal(wrapper.node.props.style.backgroundColor, style.backgroundColor,
    'should overwrite badge backgroundColor');
  });
});
