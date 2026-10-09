import discoveryDates from '../../../public/discovery-lastmod.json';

const canonicalPaths = new Map(Object.keys(discoveryDates.entries).map(value => {
  const pathname = new URL(value).pathname;
  return [pathname.replace(/\/$/, '') || '/', pathname];
}));

// Navigation keeps query parameters and fragments, unlike canonical metadata.
// Only published local pages are normalized; downloads and external URLs stay intact.
export const canonicalNavigationPath = (value: string): string => {
  if (!value.startsWith('/') || value.startsWith('//')) return value;
  const url = new URL(value, 'https://eudaemonia.tech');
  const alias = url.pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
  const pathname = canonicalPaths.get(alias);
  return pathname ? `${pathname}${url.search}${url.hash}` : value;
};
