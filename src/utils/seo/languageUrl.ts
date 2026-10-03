export const isEnglishPath = (pathname: string) => /^\/en(?:\/|$)/.test(pathname);

export const languagePath = (value: string, english: boolean) => {
  const url = new URL(value, window.location.origin);
  const path = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  url.pathname = english ? `/en${path}` : path;
  return `${url.pathname}${url.search}${url.hash}`;
};
