import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { canonicalNavigationPath } from '../../utils/seo/navigationUrl';

export const SiteLink = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const target = typeof to === 'string'
    ? canonicalNavigationPath(to)
    : { ...to, ...(to.pathname ? { pathname: canonicalNavigationPath(to.pathname) } : {}) };
  return <Link {...props} ref={ref} to={target} />;
});
SiteLink.displayName = 'SiteLink';
