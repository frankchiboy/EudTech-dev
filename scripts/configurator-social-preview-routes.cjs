const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');

const SOCIAL_IMAGE_WIDTH = 1200;
const SOCIAL_IMAGE_HEIGHT = 630;
const SOCIAL_IMAGE_MAX_BYTES = 5_000_000;
const SOCIAL_IMAGE_DIR = '/social/configurator';
const DEFAULT_SOURCE_IMAGE = '/grando-8gpu-server.jpg';

const getZh = (value) => value.zh;

function socialImageFilename(routePath) {
  if (routePath === '/') {
    return 'home.jpg';
  }

  return `${routePath
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()}.jpg`;
}

function normalizeAssetPath(assetPath) {
  if (!assetPath) {
    return DEFAULT_SOURCE_IMAGE;
  }

  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    const parsed = new URL(assetPath);
    return parsed.pathname;
  }

  return assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
}

function absoluteAssetUrl(assetPath, siteOrigin) {
  return `${siteOrigin}${normalizeAssetPath(assetPath)}`;
}

function buildRoute(route, siteOrigin) {
  const socialImage = `${SOCIAL_IMAGE_DIR}/${socialImageFilename(route.path)}`;
  const sourceImage = normalizeAssetPath(route.sourceImage);

  return {
    ...route,
    sourceImage,
    sourceImageUrl: absoluteAssetUrl(sourceImage, siteOrigin),
    socialImage,
    socialImageUrl: absoluteAssetUrl(socialImage, siteOrigin),
    canonicalUrl: canonicalPageUrl(`${siteOrigin}${route.path}`, siteOrigin),
    ogType: route.ogType || 'website'
  };
}

function getConfiguratorSocialPreviewRoutes() {
  const { SITE_ORIGIN, CONFIGURATOR_SEO_PAGES, CONFIGURATOR_PRODUCT_SEO } = readConfiguratorSeoPages();
  const siteOrigin = SITE_ORIGIN || 'https://eudaemonia.tech';
  const productRoutes = CONFIGURATOR_PRODUCT_SEO.map((product) => ({
    path: product.configuratorHref,
    title: getZh(product.title),
    description: getZh(product.description),
    sourceImage: product.image,
    imageAlt: getZh(product.imageAlt),
    productId: product.productId
  }));
  const solutionRoutes = CONFIGURATOR_SEO_PAGES.map((page) => ({
    path: `/solutions/${page.slug}`,
    title: getZh(page.title),
    description: getZh(page.description),
    sourceImage: page.image,
    imageAlt: getZh(page.imageAlt),
    ogType: page.kind === 'comparison' || page.kind === 'guide' || page.kind === 'checklist' ? 'article' : 'website'
  }));

  const routes = [
    {
      path: '/',
      title: 'AI GPU 伺服器與 Comino 配置器',
      description: 'EudTech 提供 AI GPU 伺服器、Comino Grando 液冷系統，以及可送出 GPU 伺服器與工作站報價需求的配置器。',
      sourceImage: DEFAULT_SOURCE_IMAGE,
      imageAlt: 'EudTech AI GPU 伺服器與 Comino 配置器'
    },
    {
      path: '/configurator',
      title: 'Comino Grando GPU 伺服器配置器',
      description: '配置 Comino Grando GPU 伺服器、RTX PRO 工作站、NVIDIA H200 系統、儲存、電源與網路，並向 EudTech 取得報價。',
      sourceImage: DEFAULT_SOURCE_IMAGE,
      imageAlt: 'Comino Grando GPU 伺服器配置器'
    },
    ...productRoutes,
    {
      path: '/solutions',
      title: '配置器解決方案與 GPU 伺服器報價指南',
      description: 'EudTech 配置器入口索引，集中 GPU 伺服器報價、NVIDIA H200、RTX PRO 6000 工作站、RFQ 檢核表與液冷 AI 伺服器採購頁面。',
      sourceImage: DEFAULT_SOURCE_IMAGE,
      imageAlt: 'EudTech GPU 伺服器報價配置器解決方案'
    },
    ...solutionRoutes
  ];

  return routes
    .filter((route, index, allRoutes) => allRoutes.findIndex((candidate) => candidate.path === route.path) === index)
    .map((route) => buildRoute(route, siteOrigin));
}

module.exports = {
  SOCIAL_IMAGE_WIDTH,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_MAX_BYTES,
  SOCIAL_IMAGE_DIR,
  getConfiguratorSocialPreviewRoutes
};
