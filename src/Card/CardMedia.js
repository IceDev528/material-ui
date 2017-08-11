// @flow

import React from 'react';
import classNames from 'classnames';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';

export const styleSheet = createStyleSheet({
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

type DefaultProps = {
  classes: Object,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Image to be displayed as a background image.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: string,
};

type AllProps = DefaultProps & Props;

function CardMedia(props: AllProps) {
  const { classes, className, image, ...other } = props;

  return (
    <div
      className={classNames(classes.root, className)}
      style={{ backgroundImage: `url(${image})` }}
      {...other}
    />
  );
}

export default withStyles(styleSheet, { name: 'MuiCardMedia' })(CardMedia);
