import React from 'react';
import clsx from 'clsx';
import MuiBadge from '@material-ui/core/Badge';
import { BADGE } from '../../theme/core';

const Badge = ({ className, dotted, children, ...props }) => (
  <MuiBadge className={clsx(BADGE.root, className, dotted && BADGE.dotted)} {...props}>
    {children}
  </MuiBadge>
);

export default Badge;
