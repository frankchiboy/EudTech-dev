export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms'
} as const;

export const SECTIONS = {
  HOME: 'home',
  PRODUCTS: 'eudtech-products',
  COMINO: 'comino-brand',
  ABOUT: 'about',
  CONTACT: 'contact'
} as const;

export const EXTERNAL_LINKS = {
  COMINO_WEBSITE: 'https://www.grando.ai/',
  COMINO_COMPANY: 'https://www.comino.com/en/company',
  CAREERS: 'https://www.104.com.tw/company/1a2x6bmxg5'
} as const;