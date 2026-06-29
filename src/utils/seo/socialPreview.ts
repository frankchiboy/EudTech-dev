import { SITE_ORIGIN } from '../../data/configuratorSeoPages';

const SOCIAL_IMAGE_DIR = '/social/configurator';

const socialImageFilename = (routePath: string) => {
  if (routePath === '/') {
    return 'home.jpg';
  }

  return `${routePath
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()}.jpg`;
};

const routePathname = (value: string) => new URL(value, SITE_ORIGIN).pathname || '/';

export const getConfiguratorSocialPreviewPath = (routePath: string) =>
  `${SOCIAL_IMAGE_DIR}/${socialImageFilename(routePathname(routePath))}`;

export const getConfiguratorSocialPreviewUrl = (routePath: string) =>
  `${SITE_ORIGIN}${getConfiguratorSocialPreviewPath(routePath)}`;
