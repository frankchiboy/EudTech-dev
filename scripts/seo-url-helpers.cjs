const DEFAULT_SITE_ORIGIN = 'https://eudaemonia.tech';

function hasFileExtension(pathname) {
  const segment = pathname.split('/').filter(Boolean).pop() || '';
  return segment.includes('.');
}

function canonicalPageUrl(value, siteOrigin = DEFAULT_SITE_ORIGIN) {
  const url = new URL(value, siteOrigin);

  if (!url.pathname.endsWith('/') && !hasFileExtension(url.pathname)) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}

function withoutTrailingPageSlash(value) {
  const url = new URL(value, DEFAULT_SITE_ORIGIN);

  if (url.pathname !== '/' && url.pathname.endsWith('/') && !hasFileExtension(url.pathname)) {
    url.pathname = url.pathname.slice(0, -1);
  }

  return url.toString();
}

module.exports = {
  DEFAULT_SITE_ORIGIN,
  canonicalPageUrl,
  withoutTrailingPageSlash
};
