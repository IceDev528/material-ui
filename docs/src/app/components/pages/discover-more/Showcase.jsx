import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import MarkdownElement from '../../MarkdownElement';
import showcaseText from './showcase.md';

const styles = {
  gridList: {
    margin: 10,
  },
  gridTile: {
    cursor: 'pointer',
  },
};

const appList = [
  // Under development
  // {
  //   title: 'Call-Em-All',
  //   author: 'Call-Em-All',
  //   img: 'images/showcase/callemall.png',
  //   link: '',
  // },
  {
    title: 'SplitMe',
    author: 'Olivier Tassinari',
    img: 'images/showcase/splitme.png',
    link: 'https://splitme.net/',
  },
  {
    title: 'Syncano',
    author: 'Syncano',
    img: 'images/showcase/syncano.png',
    link: 'https://syncano.io/',
  },
  {
    title: 'Cloudcraft',
    author: 'Cloudcraft',
    img: 'images/showcase/cloudcraft.png',
    link: 'https://cloudcraft.co/',
  },
];

const Showcase = () => (
  <div>
    <MarkdownElement text={showcaseText} />
    <GridList
      cols={3}
      cellHeight={200}
      style={styles.gridList}
    >
      {appList.map((app) => (
        <GridTile
          key={app.title}
          rootClass="a"
          href={app.link}
          target="_blank"
          title={app.title}
          subtitle={<span>{'by '}<b>{app.author}</b></span>}
          style={styles.gridTile}
        >
          <img src={app.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default Showcase;
