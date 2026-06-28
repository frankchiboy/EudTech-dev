import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MarketingAttribution, captureMarketingAttribution } from '../../utils/marketing/attribution';

type LeadIntentDetail = {
  action?: string;
  slug?: string;
  path?: string;
  modelName?: string;
  deviceId?: number | string;
  deviceName?: string;
  productType?: string;
  moduleKey?: string;
  optionId?: number | string;
  optionName?: string;
  quantity?: number;
  filterValue?: string;
  validationErrors?: string[];
  configurationUrl?: string;
  shareMethod?: string;
};

type GtagArguments = [command: string, target: string | Date, params?: Record<string, unknown>];
type FbqFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push?: FbqFunction;
  loaded?: boolean;
  version?: string;
};
type UetQueue = {
  push: (...args: unknown[]) => unknown;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArguments) => void;
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
    lintrk?: (...args: unknown[]) => void;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
    UET?: new (options: Record<string, unknown>) => UetQueue;
    uetq?: UetQueue | unknown[];
    __eudtechMetaPixelInitialized?: boolean;
    __eudtechMicrosoftUetInitialized?: boolean;
  }
}

const marketingConfig = {
  gtmId: import.meta.env.VITE_GTM_ID as string | undefined,
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined,
  googleAdsId: import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined,
  googleAdsQuoteConversionLabel: import.meta.env.VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL as string | undefined,
  linkedInPartnerId: import.meta.env.VITE_LINKEDIN_PARTNER_ID as string | undefined,
  linkedInQuoteConversionId: import.meta.env.VITE_LINKEDIN_QUOTE_CONVERSION_ID as string | undefined,
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID as string | undefined,
  metaQuoteEventName: (import.meta.env.VITE_META_QUOTE_EVENT_NAME as string | undefined) || 'Lead',
  microsoftUetTagId: import.meta.env.VITE_MICROSOFT_UET_TAG_ID as string | undefined,
  microsoftQuoteEventName:
    (import.meta.env.VITE_MICROSOFT_UET_QUOTE_EVENT as string | undefined) || 'quote_submit_success',
  eventEndpoint: import.meta.env.VITE_MARKETING_EVENT_ENDPOINT as string | undefined
};

const getDefaultEventEndpoint = () => {
  const { hostname } = window.location;
  const hasNetlifyFunctions =
    hostname.endsWith('.netlify.app') ||
    hostname === 'eudaemonia.tech' ||
    hostname === 'www.eudaemonia.tech';

  return hasNetlifyFunctions ? '/.netlify/functions/marketing-event' : undefined;
};

const getMarketingEventEndpoint = () => marketingConfig.eventEndpoint || getDefaultEventEndpoint();

const getSessionId = () => {
  const key = 'eudtech_marketing_session_id';
  try {
    const existing = window.sessionStorage.getItem(key);
    if (existing) return existing;
    const next = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(key, next);
    return next;
  } catch {
    return undefined;
  }
};

const getEventId = () => window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const appendScript = (id: string, src: string, onLoad?: () => void) => {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing) {
    return existing;
  }

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  if (onLoad) {
    script.onload = onLoad;
  }
  document.head.appendChild(script);
  return script;
};

const pushDataLayer = (payload: Record<string, unknown>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};

const attributionPayload = (attribution: MarketingAttribution) => ({
  first_landing_page: attribution.firstLandingPage,
  landing_page: attribution.landingPage,
  first_referrer: attribution.firstReferrer,
  referrer: attribution.referrer,
  utm_source: attribution.utmSource,
  utm_medium: attribution.utmMedium,
  utm_campaign: attribution.utmCampaign,
  utm_term: attribution.utmTerm,
  utm_content: attribution.utmContent,
  gclid: attribution.gclid,
  fbclid: attribution.fbclid,
  li_fat_id: attribution.liFatId,
  msclkid: attribution.msclkid
});

const getConfiguratorItem = (detail: LeadIntentDetail) => ({
  item_id: detail.deviceId ? String(detail.deviceId) : detail.optionId ? String(detail.optionId) : 'configurator',
  item_name: detail.optionName || detail.modelName || detail.deviceName || 'Comino Grando configurator',
  item_category: detail.productType || 'configurator',
  item_variant: detail.moduleKey,
  quantity: detail.quantity
});

const sendRecommendedEvent = (eventName: string, params: Record<string, unknown>) => {
  const payload = { event: eventName, ...params };
  pushDataLayer(payload);

  if (marketingConfig.gaMeasurementId) {
    window.gtag?.('event', eventName, params);
  }
};

const sendFirstPartyEvent = (payload: Record<string, unknown>) => {
  const endpoint = getMarketingEventEndpoint();
  if (!endpoint) {
    return;
  }

  const body = JSON.stringify({
    ...payload,
    event_id: getEventId(),
    source: 'eudtech_frontend',
    session_id: getSessionId()
  });

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    if (sent) {
      return;
    }
  }

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body,
    keepalive: true
  }).catch(() => {
    // First-party analytics must never block the site or quote workflow.
  });
};

const initializeGoogleTag = () => {
  const tagIds = [marketingConfig.gaMeasurementId, marketingConfig.googleAdsId].filter(Boolean) as string[];
  if (tagIds.length === 0) {
    return;
  }

  appendScript('eudtech-google-tag', `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagIds[0])}`);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: GtagArguments) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  tagIds.forEach((tagId) => {
    window.gtag?.('config', tagId, { send_page_view: false });
  });
};

const initializeGoogleTagManager = () => {
  if (!marketingConfig.gtmId || document.getElementById('eudtech-google-tag-manager')) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  pushDataLayer({ 'gtm.start': Date.now(), event: 'gtm.js' });
  appendScript(
    'eudtech-google-tag-manager',
    `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(marketingConfig.gtmId)}`
  );
};

const initializeLinkedInInsight = () => {
  if (!marketingConfig.linkedInPartnerId || document.getElementById('eudtech-linkedin-insight')) {
    return;
  }

  window._linkedin_partner_id = marketingConfig.linkedInPartnerId;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(marketingConfig.linkedInPartnerId);
  appendScript('eudtech-linkedin-insight', 'https://snap.licdn.com/li.lms-analytics/insight.min.js');
};

const initializeMetaPixel = () => {
  if (!marketingConfig.metaPixelId || window.__eudtechMetaPixelInitialized) {
    return;
  }

  if (!window.fbq) {
    const queuedCalls: unknown[] = [];
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
        return;
      }
      queuedCalls.push(args);
    }) as FbqFunction;

    fbq.loaded = true;
    fbq.push = fbq;
    fbq.version = '2.0';
    fbq.queue = queuedCalls;
    window.fbq = fbq;
    window._fbq = fbq;
  }

  window.__eudtechMetaPixelInitialized = true;
  window.fbq?.('init', marketingConfig.metaPixelId);
  appendScript('eudtech-meta-pixel', 'https://connect.facebook.net/en_US/fbevents.js');
};

const initializeMicrosoftUet = () => {
  if (!marketingConfig.microsoftUetTagId || window.__eudtechMicrosoftUetInitialized) {
    return;
  }

  window.__eudtechMicrosoftUetInitialized = true;
  window.uetq = window.uetq || [];
  appendScript('eudtech-microsoft-uet', 'https://bat.bing.com/bat.js', () => {
    if (!window.UET || !Array.isArray(window.uetq)) {
      return;
    }

    const queue = window.uetq;
    window.uetq = new window.UET({
      ti: marketingConfig.microsoftUetTagId,
      enableAutoSpaTracking: true,
      q: queue
    });
  });
};

const sendMetaPageView = () => {
  if (!marketingConfig.metaPixelId) {
    return;
  }

  window.fbq?.('track', 'PageView');
};

const sendMicrosoftPageView = (pagePath: string, pageTitle: string) => {
  if (!marketingConfig.microsoftUetTagId) {
    return;
  }

  window.uetq = window.uetq || [];
  window.uetq.push('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle
  });
};

const sendPageView = (attribution: MarketingAttribution) => {
  const pageLocation = window.location.href;
  const pagePath = `${window.location.pathname}${window.location.search}`;
  const pageTitle = document.title;

  const payload = {
    event: 'page_view',
    page_location: pageLocation,
    page_path: pagePath,
    page_title: pageTitle
  };

  pushDataLayer(payload);
  sendFirstPartyEvent({
    ...payload,
    attribution: attributionPayload(attribution)
  });

  if (marketingConfig.gaMeasurementId) {
    window.gtag?.('event', 'page_view', {
      send_to: marketingConfig.gaMeasurementId,
      page_location: pageLocation,
      page_path: pagePath,
      page_title: pageTitle
    });
  }

  sendMetaPageView();
  sendMicrosoftPageView(pagePath, pageTitle);
};

const sendConfiguratorLeadIntent = (detail: LeadIntentDetail) => {
  const action = detail.action || 'unknown';
  const attribution = captureMarketingAttribution();
  const item = getConfiguratorItem(detail);
  const payload = {
    event: 'configurator_lead_intent',
    configurator_action: action,
    configurator_slug: detail.slug,
    configurator_path: detail.path || window.location.pathname,
    configurator_model_name: detail.modelName,
    configurator_device_id: detail.deviceId,
    configurator_device_name: detail.deviceName,
    configurator_product_type: detail.productType,
    configurator_module_key: detail.moduleKey,
    configurator_option_id: detail.optionId,
    configurator_option_name: detail.optionName,
    configurator_quantity: detail.quantity,
    configurator_filter_value: detail.filterValue,
    configurator_validation_errors: detail.validationErrors,
    configurator_share_method: detail.shareMethod,
    configurator_url: detail.configurationUrl || window.location.href
  };

  pushDataLayer(payload);
  sendFirstPartyEvent({
    event: 'configurator_lead_intent',
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    attribution: attributionPayload(attribution),
    configurator: {
      action,
      slug: detail.slug,
      path: detail.path || window.location.pathname,
      model_name: detail.modelName,
      device_id: detail.deviceId,
      device_name: detail.deviceName,
      product_type: detail.productType,
      module_key: detail.moduleKey,
      option_id: detail.optionId,
      option_name: detail.optionName,
      quantity: detail.quantity,
      filter_value: detail.filterValue,
      validation_errors: detail.validationErrors,
      share_method: detail.shareMethod,
      url: detail.configurationUrl || window.location.href
    }
  });
  window.gtag?.('event', 'configurator_lead_intent', payload);

  if (action === 'view_item') {
    sendRecommendedEvent('view_item', {
      item_list_name: 'configurator',
      items: [item]
    });
  }

  if (['product_card_customize', 'product_card_quote', 'option_select'].includes(action)) {
    sendRecommendedEvent('select_item', {
      item_list_name: action === 'option_select' ? 'configurator_options' : 'configurator_products',
      items: [item]
    });
  }

  if (action === 'share') {
    sendRecommendedEvent('share', {
      method: detail.shareMethod || 'copy',
      content_type: 'configurator',
      item_id: item.item_id,
      item_name: item.item_name
    });
  }

  if (action === 'quote_submit_success') {
    sendRecommendedEvent('generate_lead', {
      method: 'configurator_quote_form',
      item_id: item.item_id,
      item_name: item.item_name
    });
  }

  if (
    action === 'quote_submit_success' &&
    marketingConfig.googleAdsId &&
    marketingConfig.googleAdsQuoteConversionLabel
  ) {
    window.gtag?.('event', 'conversion', {
      send_to: `${marketingConfig.googleAdsId}/${marketingConfig.googleAdsQuoteConversionLabel}`
    });
  }

  if (action === 'quote_submit_success') {
    if (marketingConfig.metaPixelId) {
      window.fbq?.('track', marketingConfig.metaQuoteEventName, {
        content_name: detail.modelName,
        content_category: 'configurator_quote',
        content_ids: detail.deviceId ? [String(detail.deviceId)] : undefined
      });
      sendFirstPartyEvent({
        event: 'meta_quote_conversion',
        conversion_id: marketingConfig.metaPixelId,
        page_location: window.location.href,
        page_path: `${window.location.pathname}${window.location.search}`,
        page_title: document.title,
        attribution: attributionPayload(attribution),
        configurator: {
          action,
          model_name: detail.modelName,
          device_id: detail.deviceId,
          device_name: detail.deviceName,
          conversion_id: marketingConfig.metaPixelId
        }
      });
    }
    if (marketingConfig.microsoftUetTagId) {
      window.uetq = window.uetq || [];
      window.uetq.push('event', marketingConfig.microsoftQuoteEventName, {
        event_category: 'configurator',
        event_label: detail.modelName || action
      });
      sendFirstPartyEvent({
        event: 'microsoft_quote_conversion',
        conversion_id: marketingConfig.microsoftUetTagId,
        page_location: window.location.href,
        page_path: `${window.location.pathname}${window.location.search}`,
        page_title: document.title,
        attribution: attributionPayload(attribution),
        configurator: {
          action,
          model_name: detail.modelName,
          device_id: detail.deviceId,
          device_name: detail.deviceName,
          conversion_id: marketingConfig.microsoftUetTagId
        }
      });
    }
    if (marketingConfig.linkedInQuoteConversionId) {
      pushDataLayer({
        event: 'linkedin_quote_conversion',
        conversion_id: marketingConfig.linkedInQuoteConversionId
      });
      sendFirstPartyEvent({
        event: 'linkedin_quote_conversion',
        conversion_id: marketingConfig.linkedInQuoteConversionId,
        page_location: window.location.href,
        page_path: `${window.location.pathname}${window.location.search}`,
        page_title: document.title,
        attribution: attributionPayload(attribution),
        configurator: {
          action,
          model_name: detail.modelName,
          device_id: detail.deviceId,
          device_name: detail.deviceName,
          conversion_id: marketingConfig.linkedInQuoteConversionId
        }
      });
      window.lintrk?.('track', { conversion_id: marketingConfig.linkedInQuoteConversionId });
    }
  }
};

const MarketingEvents: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initializeGoogleTagManager();
    initializeGoogleTag();
    initializeLinkedInInsight();
    initializeMetaPixel();
    initializeMicrosoftUet();
  }, []);

  useEffect(() => {
    const attribution = captureMarketingAttribution();
    const payload = {
      event: 'marketing_attribution',
      ...attributionPayload(attribution)
    };
    pushDataLayer(payload);
    sendFirstPartyEvent({
      ...payload,
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`,
      page_title: document.title,
      attribution: attributionPayload(attribution)
    });
    const timer = window.setTimeout(() => sendPageView(attribution), 0);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleLeadIntent = (event: Event) => {
      sendConfiguratorLeadIntent((event as CustomEvent<LeadIntentDetail>).detail || {});
    };

    window.addEventListener('configurator-lead-intent', handleLeadIntent);
    return () => {
      window.removeEventListener('configurator-lead-intent', handleLeadIntent);
    };
  }, []);

  return null;
};

export default MarketingEvents;
