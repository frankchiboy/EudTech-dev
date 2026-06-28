interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

interface PageView {
  path: string;
  title?: string;
  timestamp?: number;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private isEnabled: boolean = true;
  private queue: AnalyticsEvent[] = [];
  private supportedEvents = new Set([
    'page_view',
    'user_interaction',
    'form_submission',
    'product_view'
  ]);

  static getInstance(): AnalyticsService {
    if (!this.instance) {
      this.instance = new AnalyticsService();
    }
    return this.instance;
  }

  // 初始化分析服務
  initialize(config: { enabled?: boolean } = {}): void {
    this.isEnabled = config.enabled ?? true;
    
    if (this.isEnabled) {
      console.log('Analytics service initialized');
      this.processQueue();
    }
  }

  // 追蹤頁面瀏覽
  trackPageView(pageView: PageView): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name: 'page_view',
      properties: {
        path: pageView.path,
        title: pageView.title || document.title,
        referrer: document.referrer,
        user_agent: navigator.userAgent
      },
      timestamp: pageView.timestamp || Date.now()
    };

    this.trackEvent(event);
  }

  // 追蹤事件
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isEnabled) return;

    const enrichedEvent: AnalyticsEvent = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      properties: {
        ...event.properties,
        url: window.location.href,
        timestamp: Date.now()
      }
    };

    if (import.meta.env.DEV) {
      console.log('Analytics Event:', enrichedEvent);
    }

    this.sendEvent(enrichedEvent);
  }

  // 追蹤用戶互動
  trackInteraction(element: string, action: string, properties?: Record<string, unknown>): void {
    this.trackEvent({
      name: 'user_interaction',
      properties: {
        element,
        action,
        ...properties
      }
    });
  }

  // 追蹤表單提交
  trackFormSubmission(formName: string, success: boolean, properties?: Record<string, unknown>): void {
    this.trackEvent({
      name: 'form_submission',
      properties: {
        form_name: formName,
        success,
        ...properties
      }
    });
  }

  // 追蹤產品查看
  trackProductView(productId: number, productName: string): void {
    this.trackEvent({
      name: 'product_view',
      properties: {
        product_id: productId,
        product_name: productName
      }
    });
  }

  private getDefaultEndpoint(): string | undefined {
    const { hostname } = window.location;
    const hasNetlifyFunctions =
      hostname.endsWith('.netlify.app') ||
      hostname === 'eudaemonia.tech' ||
      hostname === 'www.eudaemonia.tech';

    return hasNetlifyFunctions ? '/.netlify/functions/marketing-event' : undefined;
  }

  private getEndpoint(): string | undefined {
    return import.meta.env.VITE_MARKETING_EVENT_ENDPOINT || this.getDefaultEndpoint();
  }

  private buildFirstPartyPayload(event: AnalyticsEvent): Record<string, unknown> | undefined {
    if (!this.supportedEvents.has(event.name)) {
      return undefined;
    }

    const properties = event.properties || {};
    return {
      event: event.name,
      event_id: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      source: 'eudtech_analytics_service',
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`,
      page_title: document.title,
      event_context: {
        path: properties.path,
        title: properties.title,
        element: properties.element,
        action: properties.action,
        form_name: properties.form_name,
        success: properties.success,
        product_id: properties.product_id,
        product_name: properties.product_name
      }
    };
  }

  private sendEvent(event: AnalyticsEvent): void {
    const endpoint = this.getEndpoint();
    const payload = this.buildFirstPartyPayload(event);
    if (!endpoint || !payload) {
      return;
    }

    const data = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon(endpoint, new Blob([data], { type: 'application/json' }));
      if (sent) return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
      keepalive: true
    }).catch((error) => {
      if (import.meta.env.DEV) {
        console.error('Failed to send analytics event:', error);
      }
    });
  }

  // 處理排隊的事件
  private processQueue(): void {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        this.sendEvent(event);
      }
    }
  }

  // 啟用/禁用分析
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    
    if (enabled) {
      this.processQueue();
    }
  }

  // 獲取當前狀態
  isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }
}

export const analyticsService = AnalyticsService.getInstance();
