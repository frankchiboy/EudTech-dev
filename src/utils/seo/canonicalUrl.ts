export const DEFAULT_SITE_ORIGIN = 'https://eudaemonia.tech';

const hasFileExtension = (pathname: string) => {
  const segment = pathname.split('/').filter(Boolean).pop() || '';
  return segment.includes('.');
};

export const canonicalPageUrl = (value: string, siteOrigin = DEFAULT_SITE_ORIGIN) => {
  const url = new URL(value, siteOrigin);
  url.pathname = url.pathname.replace(/\/{2,}/g, '/');

  if (!url.pathname.endsWith('/') && !hasFileExtension(url.pathname)) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
};
