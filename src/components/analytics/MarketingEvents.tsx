import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { captureMarketingAttribution } from '../../utils/marketing/attribution';

type LeadIntentDetail = {
  action?: string;
  slug?: string;
  path?: string;
  modelName?: string;
  deviceId?: number | string;
  deviceName?: string;
  configurationUrl?: string;
};

type GtagArguments = [command: string, target: string | Date, params?: Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArguments) => void;
    lintrk?: (...args: unknown[]) => void;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

const marketingConfig = {
  gtmId: import.meta.env.VITE_GTM_ID as string | undefined,
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined,
  googleAdsId: import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined,
  googleAdsQuoteConversionLabel: import.meta.env.VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL as string | undefined,
  linkedInPartnerId: import.meta.env.VITE_LINKEDIN_PARTNER_ID as string | undefined,
  linkedInQuoteConversionId: import.meta.env.VITE_LINKEDIN_QUOTE_CONVERSION_ID as string | undefined
};

const appendScript = (id: string, src: string) => {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const pushDataLayer = (payload: Record<string, unknown>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
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

const sendPageView = () => {
  const pageLocation = window.location.href;
  const pagePath = `${window.location.pathname}${window.location.search}`;
  const pageTitle = document.title;

  pushDataLayer({
    event: 'page_view',
    page_location: pageLocation,
    page_path: pagePath,
    page_title: pageTitle
  });

  if (marketingConfig.gaMeasurementId) {
    window.gtag?.('event', 'page_view', {
      send_to: marketingConfig.gaMeasurementId,
      page_location: pageLocation,
      page_path: pagePath,
      page_title: pageTitle
    });
  }
};

const sendConfiguratorLeadIntent = (detail: LeadIntentDetail) => {
  const action = detail.action || 'unknown';
  const payload = {
    event: 'configurator_lead_intent',
    configurator_action: action,
    configurator_slug: detail.slug,
    configurator_path: detail.path || window.location.pathname,
    configurator_model_name: detail.modelName,
    configurator_device_id: detail.deviceId,
    configurator_device_name: detail.deviceName,
    configurator_url: detail.configurationUrl || window.location.href
  };

  pushDataLayer(payload);
  window.gtag?.('event', 'configurator_lead_intent', payload);

  if (
    action === 'quote_submit_success' &&
    marketingConfig.googleAdsId &&
    marketingConfig.googleAdsQuoteConversionLabel
  ) {
    window.gtag?.('event', 'conversion', {
      send_to: `${marketingConfig.googleAdsId}/${marketingConfig.googleAdsQuoteConversionLabel}`
    });
  }

  if (action === 'quote_submit_success' && marketingConfig.linkedInQuoteConversionId) {
    pushDataLayer({
      event: 'linkedin_quote_conversion',
      conversion_id: marketingConfig.linkedInQuoteConversionId
    });
    window.lintrk?.('track', { conversion_id: marketingConfig.linkedInQuoteConversionId });
  }
};

const MarketingEvents: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initializeGoogleTagManager();
    initializeGoogleTag();
    initializeLinkedInInsight();
  }, []);

  useEffect(() => {
    const attribution = captureMarketingAttribution();
    pushDataLayer({
      event: 'marketing_attribution',
      first_landing_page: attribution.firstLandingPage,
      landing_page: attribution.landingPage,
      first_referrer: attribution.firstReferrer,
      referrer: attribution.referrer,
      utm_source: attribution.utmSource,
      utm_medium: attribution.utmMedium,
      utm_campaign: attribution.utmCampaign
    });
    const timer = window.setTimeout(sendPageView, 0);
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
