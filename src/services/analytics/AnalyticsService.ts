interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
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

    // 在開發環境中記錄到控制台
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', enrichedEvent);
    }

    // 在生產環境中發送到分析服務
    this.sendEvent(enrichedEvent);
  }

  // 追蹤用戶互動
  trackInteraction(element: string, action: string, properties?: Record<string, any>): void {
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
  trackFormSubmission(formName: string, success: boolean, properties?: Record<string, any>): void {
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

  // 發送事件到分析服務
  private sendEvent(event: AnalyticsEvent): void {
    // 這裡可以整合 Google Analytics, Mixpanel 等服務
    // 目前只是模擬發送
    
    if (navigator.sendBeacon) {
      // 使用 sendBeacon API 發送數據
      const data = JSON.stringify(event);
      navigator.sendBeacon('/api/analytics', data);
    } else {
      // 降級到普通的 fetch
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).catch(error => {
        console.error('Failed to send analytics event:', error);
      });
    }
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