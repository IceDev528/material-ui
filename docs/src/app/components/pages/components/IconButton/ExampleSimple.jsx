import React from 'react';
import IconButton from 'material-ui/lib/IconButton';

const IconButtonExampleSimple = () => (
  <div>
    <IconButton iconClassName="muidocs-icon-custom-github" />
    <IconButton iconClassName="muidocs-icon-custom-github" disabled={true} />
  </div>
);

export default IconButtonExampleSimple;
