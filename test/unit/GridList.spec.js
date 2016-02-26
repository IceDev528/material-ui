import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import GridList from 'src/grid-list/grid-list';
import GridTile from 'src/grid-list/grid-tile';

describe('<GridList />', () => {
  const tilesData = [
    {
      img: 'images/grid-list/00-52-29-429_640.jpg',
      title: 'Breakfast',
      author: 'jill111',
    },
    {
      img: 'images/grid-list/burger-827309_640.jpg',
      title: 'Tasty burger',
      author: 'pashminu',
    },
  ];

  it('renders children and change cellHeight', () => {
    const cellHeight = 250;
    const wrapper = shallow(
      <GridList cellHeight={cellHeight}>
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find(GridTile).length, 2, 'should contain the children');
    assert.equal(wrapper.children().at(0).prop('style').height, cellHeight + 4, 'should have height to 254');
  });

  it('renders children by default', () => {
    const wrapper = shallow(
      <GridList>
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find(GridTile).length, 2, 'should contain the children');
  });

  it('renders children and change cols', () => {
    const wrapper = shallow(
      <GridList cols={4}>
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find(GridTile).length, 2, 'should contain the children');
    assert.equal(wrapper.children().at(0).prop('style').width, '25%', 'should have 25% of width');
  });

  it('renders children and change padding', () => {
    const padding = 10;
    const wrapper = shallow(
      <GridList padding={padding}>
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find(GridTile).length, 2, 'should contain the children');
    assert.equal(wrapper.children().at(0).prop('style').padding, padding / 2, 'should have 5 of padding');
  });

  it('renders children and overwrite style', () => {
    const style = {
      backgroundColor: 'red',
    };
    const wrapper = shallow(
      <GridList style={style}>
        {tilesData.map((tile) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<span>by <b>{tile.author}</b></span>}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    );

    assert.equal(wrapper.find(GridTile).length, 2, 'should contain the children');
    assert.equal(wrapper.prop('style').backgroundColor, style.backgroundColor, 'should have a red backgroundColor');
  });
});
