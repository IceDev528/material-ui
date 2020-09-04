import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import debounce from '../utils/debounce';
import withStyles from '../styles/withStyles';
import isMuiElement from '../utils/isMuiElement';
import { ownerWindow } from '../utils';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  /* Styles applied to the `div` element that wraps the children. */
  tile: {
    position: 'relative',
    display: 'block', // In case it's not rendered with a div.
    height: '100%',
    overflow: 'hidden',
  },
  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%',
  },
  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%',
  },
};

const fit = (imgEl, classes) => {
  if (!imgEl || !imgEl.complete) {
    return;
  }

  if (
    imgEl.width / imgEl.height >
    imgEl.parentElement.offsetWidth / imgEl.parentElement.offsetHeight
  ) {
    imgEl.classList.remove(...classes.imgFullWidth.split(' '));
    imgEl.classList.add(...classes.imgFullHeight.split(' '));
  } else {
    imgEl.classList.remove(...classes.imgFullHeight.split(' '));
    imgEl.classList.add(...classes.imgFullWidth.split(' '));
  }
};

const ImageListItem = React.forwardRef(function ImageListItem(props, ref) {
  // cols rows default values are for docs only
  const {
    children,
    classes,
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cols = 1,
    component: Component = 'li',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rows = 1,
    ...other
  } = props;

  const imgRef = React.useRef(null);

  React.useEffect(() => {
    const img = imgRef.current;

    if (!img) {
      return undefined;
    }

    let listener;

    if (img.complete) {
      fit(img, classes);
    } else {
      listener = () => {
        fit(img, classes);
      };
      img.addEventListener('load', listener);
    }

    return () => {
      if (listener) {
        img.removeEventListener('load', listener);
      }
    };
  });

  React.useEffect(() => {
    const handleResize = debounce(() => {
      fit(imgRef.current, classes);
    });

    const containerWindow = ownerWindow(imgRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [classes]);

  return (
    <Component className={clsx(classes.root, className)} ref={ref} {...other}>
      <div className={classes.tile}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          if (child.type === 'img' || isMuiElement(child, ['Image'])) {
            return React.cloneElement(child, {
              ref: imgRef,
            });
          }

          return child;
        })}
      </div>
    </Component>
  );
});

ImageListItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case ImageListItem takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Width of the tile in number of grid cells.
   * @default 1
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Height of the tile in number of grid cells.
   * @default 1
   */
  rows: PropTypes.number,
};

export default withStyles(styles, { name: 'MuiImageListItem' })(ImageListItem);
