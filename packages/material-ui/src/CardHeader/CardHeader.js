import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '../Typography';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import cardHeaderClasses, { getCardHeaderUtilityClass } from './cardHeaderClasses';

const overridesResolver = (props, styles) => {
  return deepmerge(
    {
      [`& .${cardHeaderClasses.avatar}`]: styles.avatar,
      [`& .${cardHeaderClasses.action}`]: styles.action,
      [`& .${cardHeaderClasses.content}`]: styles.content,
      [`& .${cardHeaderClasses.title}`]: styles.title,
      [`& .${cardHeaderClasses.subheader}`]: styles.subheader,
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
    avatar: ['avatar'],
    action: ['action'],
    content: ['content'],
    title: ['title'],
    subheader: ['subheader'],
  };

  return composeClasses(slots, getCardHeaderUtilityClass, classes);
};

const CardHeaderRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiCardHeader',
    slot: 'Root',
    overridesResolver,
  },
)({
  /* Styles applied to the root element. */
  display: 'flex',
  alignItems: 'center',
  padding: 16,
});

const CardHeaderAvatar = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiCardHeader',
    slot: 'Avatar',
  },
)({
  /* Styles applied to the avatar element. */
  display: 'flex',
  flex: '0 0 auto',
  marginRight: 16,
});

const CardHeaderAction = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiCardHeader',
    slot: 'Action',
  },
)({
  /* Styles applied to the action element. */
  flex: '0 0 auto',
  alignSelf: 'flex-start',
  marginTop: -4,
  marginRight: -8,
  marginBottom: -4,
});

const CardHeaderContent = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiCardHeader',
    slot: 'Content',
  },
)({
  /* Styles applied to the content wrapper element. */
  flex: '1 1 auto',
});

const CardHeader = React.forwardRef(function CardHeader(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiCardHeader' });
  const {
    action,
    avatar,
    className,
    component = 'div',
    disableTypography = false,
    subheader: subheaderProp,
    subheaderTypographyProps,
    title: titleProp,
    titleTypographyProps,
    ...other
  } = props;

  const styleProps = {
    ...props,
    component,
    disableTypography,
  };

  const classes = useUtilityClasses(styleProps);

  let title = titleProp;
  if (title != null && title.type !== Typography && !disableTypography) {
    title = (
      <Typography
        variant={avatar ? 'body2' : 'h5'}
        className={classes.title}
        component="span"
        display="block"
        {...titleTypographyProps}
      >
        {title}
      </Typography>
    );
  }

  let subheader = subheaderProp;
  if (subheader != null && subheader.type !== Typography && !disableTypography) {
    subheader = (
      <Typography
        variant={avatar ? 'body2' : 'body1'}
        className={classes.subheader}
        color="text.secondary"
        component="span"
        display="block"
        {...subheaderTypographyProps}
      >
        {subheader}
      </Typography>
    );
  }

  return (
    <CardHeaderRoot
      className={clsx(classes.root, className)}
      as={component}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {avatar && (
        <CardHeaderAvatar className={classes.avatar} styleProps={styleProps}>
          {avatar}
        </CardHeaderAvatar>
      )}

      <CardHeaderContent className={classes.content} styleProps={styleProps}>
        {title}
        {subheader}
      </CardHeaderContent>
      {action && (
        <CardHeaderAction className={classes.action} styleProps={styleProps}>
          {action}
        </CardHeaderAction>
      )}
    </CardHeaderRoot>
  );
});

CardHeader.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The action to display in the card header.
   */
  action: PropTypes.node,
  /**
   * The Avatar element to display.
   */
  avatar: PropTypes.node,
  /**
   * @ignore
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `title` text, and optional `subheader` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * The content of the component.
   */
  subheader: PropTypes.node,
  /**
   * These props will be forwarded to the subheader
   * (as long as disableTypography is not `true`).
   */
  subheaderTypographyProps: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The content of the component.
   */
  title: PropTypes.node,
  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   */
  titleTypographyProps: PropTypes.object,
};

export default CardHeader;
