import { canonicalNavigationPath } from './navigationUrl';

export const isEnglishPath = (pathname: string) => /^\/en(?:\/|$)/.test(pathname);

export const languagePath = (value: string, english: boolean) => {
  const url = new URL(value, 'https://eudaemonia.tech');
  const path = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  url.pathname = english ? `/en${path}` : path;
  return canonicalNavigationPath(`${url.pathname}${url.search}${url.hash}`);
};
