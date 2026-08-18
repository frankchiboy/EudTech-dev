const { readConfiguratorSeoPages } = require('./read-configurator-seo-pages.cjs');
const { canonicalPageUrl } = require('./seo-url-helpers.cjs');
const { SITE_INFORMATION_ROUTES } = require('./site-information-routes.cjs');

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
      title: 'AI Agent 與 Headless SaaS、GPU 運算與社群情報｜EudTech',
      description: 'EudTech 提供整合的 AI Agent 與 Headless SaaS 導入、AI GPU 運算基礎設施及 Cyabra 社群情報解決方案。',
      sourceImage: DEFAULT_SOURCE_IMAGE,
      imageAlt: 'EudTech AI Agent 與 Headless SaaS、GPU 運算與社群情報解決方案'
    },
    {
      path: '/configurator',
      title: 'Comino Grando GPU 伺服器報價配置器',
      description: '配置 Comino Grando GPU 伺服器、RTX PRO 6000 工作站、NVIDIA H200 系統、儲存、電源與網路，並送出可供 RFQ 使用的報價需求。',
      sourceImage: DEFAULT_SOURCE_IMAGE,
      imageAlt: 'Comino Grando GPU 伺服器報價配置器'
    },
    ...productRoutes,
    {
      path: '/solutions',
      title: 'AI 與數位服務解決方案總覽｜EudTech',
      description: '從 AI Agent 與 Headless SaaS、AI 運算工作負載或社群情報需求，選擇 EudTech 三大導入路徑。',
      sourceImage: DEFAULT_SOURCE_IMAGE,
      imageAlt: 'EudTech AI 解決方案總覽'
    },
    {
      path: '/solutions/ai-agent',
      title: '企業 AI Agent、Claude Managed Agents 與 Headless SaaS 導入｜EudTech',
      description: '導入 Microsoft 或 Claude Managed Agents，包含自管 Sandbox、MCP 與企業系統整合、人員核准及稽核。',
      sourceImage: '/comino-facility-1.jpg',
      imageAlt: 'EudTech 企業 AI Agent、Claude Managed Agents 與 Headless SaaS 導入服務'
    },
    ...SITE_INFORMATION_ROUTES.map((route) => ({
      path: route.path,
      title: route.title,
      description: route.description,
      sourceImage: route.sourceImage,
      imageAlt: route.imageAlt
    })),
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
