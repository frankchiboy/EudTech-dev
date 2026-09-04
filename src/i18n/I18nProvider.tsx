import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * MVP 簡易 i18n：
 *  - 以 key:value 字典方式
 *  - 後續可擴充 lazy load、命名空間、複數規則
 */

export type Locale = 'en' | 'zh';

interface Dict {
  [key: string]: string;
}

interface I18nContextValue {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (l: Locale) => void;
}

const en: Dict = {
  'app.version.new': 'A new version is available',
  'app.version.reload': 'Reload',
  'app.version.later': 'Later',
  // Cyabra Testimonials
  'cyabra.testimonials.heading': 'Customer Testimonials',
  'cyabra.testimonials.subheading': 'Industry Leaders on Cyabra',
  'cyabra.testimonials.cta': 'Explore Cyabra Solutions',
  'cyabra.testimonials.lead': 'Cyabra is trusted by leading organizations across government, PR, entertainment, and cybersecurity sectors, providing actionable insights and defending against disinformation threats.',
  // Brand/Partners common
  'brand.partners.title': 'Compatible Technologies',
  'brand.authorized.distributor': 'Authorized Distributor',
  'brand.authorized.distributor.lead': 'EudTech is the official distributor for our partner brands in Taiwan.',
  // Contact section
  'contact.header.kicker': 'Contact EudTech',
  'contact.header.title': 'Get in touch',
  'contact.header.lead': 'Questions about AI agents, GPU servers, or social intelligence? Send the details and EudTech will follow up.',
  'contact.info.title': 'Contact information',
  'contact.info.lead': 'Fill in the form. EudTech replies within 24 hours.',
  'contact.info.onlineMeeting.label': 'Online meeting',
  'contact.info.onlineMeeting.value': 'By video call',
  'contact.info.email.label': 'Email',
  'contact.info.responseTime.label': 'Response time',
  'contact.info.responseTime.value': 'Within 24 hours',
  'contact.info.languages.label': 'Languages',
  'contact.info.languages.value': 'English, Chinese',
  'contact.booking.title': 'Book an online meeting',
  'contact.booking.lead': 'Choose a time to discuss your AI agent, GPU server, or social intelligence needs with EudTech.',
  'contact.booking.button.meeting': 'Book an online meeting',
  'contact.booking.or': 'OR',
  'contact.booking.button.email': 'Contact by email',
  'contact.booking.note': 'EudTech replies to every enquiry as soon as possible.',
  'contact.form.success': 'Your message has been sent. EudTech will contact you soon.',
  'contact.form.errorPrefix': 'An error occurred: ',
  'contact.form.errorFallback': 'The message could not be sent. Please try again.',
  'contact.form.labels.firstName': 'First name',
  'contact.form.labels.lastName': 'Last name',
  'contact.form.labels.email': 'Email',
  'contact.form.labels.company': 'Company',
  'contact.form.labels.message': 'Message',
  'contact.form.labels.privacy': 'I agree to the privacy policy and terms of service.',
  'contact.form.errors.firstNameRequired': 'First name is required',
  'contact.form.errors.lastNameRequired': 'Last name is required',
  'contact.form.errors.emailRequired': 'Email is required',
  'contact.form.errors.emailInvalid': 'Invalid email format',
  'contact.form.errors.messageRequired': 'Message is required',
  'contact.form.errors.privacyRequired': 'You must agree to the privacy policy',
  'contact.form.submitting': 'Sending…',
  'contact.form.submit': 'Send message',
};

const zh: Dict = {
  'app.version.new': '有新版本可以更新',
  'app.version.reload': '重新載入',
  'app.version.later': '稍後',
  // Cyabra Testimonials
  'cyabra.testimonials.heading': '客戶見證',
  'cyabra.testimonials.subheading': '行業領導者對Cyabra的評價',
  'cyabra.testimonials.cta': '探索Cyabra解決方案',
  'cyabra.testimonials.lead': 'Cyabra受到政府、公關、娛樂及網路安全等領域領先組織的信賴，提供可行洞見並抵禦假資訊威脅。',
  // Brand/Partners common
  'brand.partners.title': '相容技術',
  'brand.authorized.distributor': '授權經銷商',
  'brand.authorized.distributor.lead': '我們是各大合作品牌在台灣的官方授權經銷商。',
  // Contact section
  'contact.header.kicker': '聯絡 EudTech',
  'contact.header.title': '與 EudTech 聯絡',
  'contact.header.lead': '對 AI Agent、GPU 伺服器或社群情報有需求？留下需求，EudTech 會主動聯絡。',
  'contact.info.title': '聯絡資訊',
  'contact.info.lead': '填寫表單，EudTech 會在 24 小時內回覆。',
  'contact.info.onlineMeeting.label': '線上會議',
  'contact.info.onlineMeeting.value': '透過視訊會議',
  'contact.info.email.label': '電子郵件',
  'contact.info.responseTime.label': '回覆時間',
  'contact.info.responseTime.value': '24 小時內',
  'contact.info.languages.label': '語言',
  'contact.info.languages.value': '中文、英文',
  'contact.booking.title': '預約線上會議',
  'contact.booking.lead': '選擇方便的時間，與 EudTech 討論 AI Agent、GPU 伺服器或社群情報需求。',
  'contact.booking.button.meeting': '預約線上會議',
  'contact.booking.or': '或',
  'contact.booking.button.email': '以電子郵件聯絡',
  'contact.booking.note': 'EudTech 會盡快回覆每一則諮詢。',
  'contact.form.success': '訊息已送出，EudTech 會盡快與您聯絡。',
  'contact.form.errorPrefix': '發生錯誤：',
  'contact.form.errorFallback': '訊息無法送出，請再試一次。',
  'contact.form.labels.firstName': '名字',
  'contact.form.labels.lastName': '姓氏',
  'contact.form.labels.email': '電子郵件',
  'contact.form.labels.company': '公司',
  'contact.form.labels.message': '訊息',
  'contact.form.labels.privacy': '我同意隱私政策與服務條款。',
  'contact.form.errors.firstNameRequired': '名字為必填',
  'contact.form.errors.lastNameRequired': '姓氏為必填',
  'contact.form.errors.emailRequired': '電子郵件為必填',
  'contact.form.errors.emailInvalid': '電子郵件格式不正確',
  'contact.form.errors.messageRequired': '訊息為必填',
  'contact.form.errors.privacyRequired': '您必須同意隱私政策',
  'contact.form.submitting': '送出中…',
  'contact.form.submit': '送出訊息',
};

const dicts: Record<Locale, Dict> = { en, zh };

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ initialLocale?: Locale; children: React.ReactNode; }> = ({
  initialLocale = 'zh',
  children,
}) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = useCallback((key: string) => {
    const d = dicts[locale];
    return d[key] ?? key;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}
