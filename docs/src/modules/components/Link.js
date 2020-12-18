/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { linkAs, href, ...other } = props;

  return (
    <NextLink href={href} as={linkAs}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  href: PropTypes.string,
  linkAs: PropTypes.string,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const {
    activeClassName = 'active',
    className: classNameProps,
    href,
    innerRef,
    naked,
    role: roleProp,
    as: asProp = href,
    ...other
  } = props;

  const router = useRouter();

  const userLanguage = useUserLanguage();
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === href && activeClassName,
  });

  let linkAs = asProp;
  if (userLanguage !== 'en' && href.indexOf('/') === 0 && href.indexOf('/blog') !== 0) {
    linkAs = `/${userLanguage}${linkAs}`;
  }

  // catch role passed from ButtonBase. This is definitely a link
  const role = roleProp === 'button' ? undefined : roleProp;

  const isExternal = href.indexOf('https:') === 0 || href.indexOf('mailto:') === 0;

  if (isExternal) {
    if (naked) {
      return <a className={className} href={href} ref={innerRef} role={role} {...other} />;
    }

    return <MuiLink className={className} href={href} ref={innerRef} role={role} {...other} />;
  }

  if (naked) {
    return (
      <NextComposed
        linkAs={linkAs}
        className={className}
        href={href}
        ref={innerRef}
        role={role}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      linkAs={linkAs}
      component={NextComposed}
      className={className}
      href={href}
      ref={innerRef}
      role={role}
      {...other}
    />
  );
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  role: PropTypes.string,
};

export default React.forwardRef((props, ref) => <Link {...props} innerRef={ref} />);
