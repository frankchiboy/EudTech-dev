import emailjs from '@emailjs/browser';
import { EmailFormData } from '../types';

interface EmailServiceEnv {
  VITE_EMAILJS_PUBLIC_KEY?: string;
  VITE_EMAILJS_SERVICE_ID?: string;
  VITE_EMAILJS_TEMPLATE_ID?: string;
  VITE_EMAIL_API_ENDPOINT?: string;
  DEV?: boolean;
}

interface EmailJsResult {
  status: number;
  text?: string;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

function getEmailJsStatus(result: unknown) {
  const candidate = result as Partial<EmailJsResult>;
  return typeof candidate.status === 'number' ? candidate.status : undefined;
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function getDefaultApiEndpoint(): string | undefined {
  if (!isBrowser()) return undefined;

  const { hostname } = window.location;
  const hasNetlifyFunctions =
    hostname.endsWith('.netlify.app') ||
    hostname === 'eudaemonia.tech' ||
    hostname === 'www.eudaemonia.tech';

  return hasNetlifyFunctions ? '/.netlify/functions/send-email' : undefined;
}

class EmailService {
  private isInitialized = false;
  private readonly publicKey?: string;
  private readonly serviceId?: string;
  private readonly templateId?: string;
  private readonly apiEndpoint?: string;
  private readonly enabled: boolean;
  private readonly emailJsEnabled: boolean;
  private readonly simulateOnMissingConfig: boolean;

  constructor() {
    const env = import.meta.env as EmailServiceEnv;
    this.publicKey = env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
    this.serviceId = env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    this.templateId = env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    this.apiEndpoint = (env.VITE_EMAIL_API_ENDPOINT as string | undefined) || getDefaultApiEndpoint();
    this.emailJsEnabled = Boolean(this.publicKey && this.serviceId && this.templateId);
    this.enabled = Boolean(this.apiEndpoint || this.emailJsEnabled);
    // 在開發模式下若缺設定，採用模擬以避免阻塞流程；在生產環境缺設定則視為不可用並拋錯
    this.simulateOnMissingConfig = !this.enabled && Boolean(env?.DEV);

    if (isBrowser() && this.emailJsEnabled) {
      this.init().catch((error) => {
        console.warn('EmailJS 初始化時發生警告:', error);
      });
    }
  }

  private ensureConfigOrSimulate() {
    if (this.enabled) return;
    if (this.simulateOnMissingConfig) return; // 允許模擬
    throw new Error('Email service 未正確設定 (缺少環境變數)。');
  }

  isConfigured(): boolean {
    return this.enabled;
  }

  async init(): Promise<void> {
    if (this.isInitialized) return;
    if (!isBrowser()) {
      console.warn('EmailJS 需要瀏覽器環境，當前環境不支持');
      return;
    }
    if (!this.emailJsEnabled) {
      if (this.simulateOnMissingConfig) {
        console.info('[EmailService] 模擬模式啟用：未設定 EmailJS 環境變數');
        return;
      }
      throw new Error('Email service 未正確設定 (缺少環境變數)。');
    }
    try {
      emailjs.init(this.publicKey!);
      this.isInitialized = true;
      console.log('EmailJS 服務初始化成功');
    } catch (error) {
      console.error('EmailJS 服務初始化失敗:', error);
      throw error;
    }
  }

  private async withRetry<T>(fn: () => Promise<T>, retries = 2, baseDelayMs = 500): Promise<T> {
    let attempt = 0;
    let lastError: unknown;
    while (attempt <= retries) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        if (attempt === retries) break;
        const delay = baseDelayMs * Math.pow(2, attempt); // 500, 1000, 2000...
        await sleep(delay);
        attempt += 1;
      }
    }
    throw lastError instanceof Error ? lastError : new Error('Email 發送失敗');
  }

  async sendForm(form: HTMLFormElement): Promise<void> {
    this.ensureConfigOrSimulate();

    if (this.apiEndpoint) {
      const formData = new FormData(form);
      await this.sendEmail({
        firstName: String(formData.get('firstName') || ''),
        lastName: String(formData.get('lastName') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        company: String(formData.get('company') || ''),
        country: String(formData.get('country') || ''),
        subject: String(formData.get('subject') || ''),
        toEmail: String(formData.get('toEmail') || ''),
        message: String(formData.get('message') || ''),
        privacy: true
      });
      return;
    }

    if (!this.emailJsEnabled) {
      // 模擬模式：直接通過
      console.info('[EmailService] 模擬 sendForm 成功');
      return;
    }

    if (!this.isInitialized) await this.init();

    try {
      const result = await this.withRetry(() =>
        emailjs.sendForm(this.serviceId!, this.templateId!, form, this.publicKey!)
      );
      const status = getEmailJsStatus(result);
      if (status !== 200) {
        throw new Error(`郵件發送失敗，狀態碼: ${status ?? 'unknown'}`);
      }
      console.log('郵件發送成功:', result);
    } catch (error) {
      console.error('郵件發送錯誤:', error);
      throw new Error(error instanceof Error ? error.message : '郵件發送失敗，請稍後重試');
    }
  }

  async sendEmail(data: EmailFormData): Promise<void> {
    if (!isBrowser()) {
      throw new Error('EmailJS 只能在瀏覽器環境中使用');
    }

    // 驗證必要欄位
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      throw new Error('缺少必要欄位');
    }

    this.ensureConfigOrSimulate();

    if (this.apiEndpoint) {
      const response = await this.withRetry(() =>
        fetch(this.apiEndpoint!, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      );
      if (!response.ok) {
        let message = '郵件發送失敗，請稍後重試';
        try {
          const payload = (await response.json()) as { error?: string };
          if (payload.error) {
            message = payload.error;
          }
        } catch {
          // Keep the fallback message when the response is not JSON.
        }
        throw new Error(message);
      }
      return;
    }

    if (!this.emailJsEnabled) {
      // 模擬模式：延遲後視為成功
      console.info('[EmailService] 模擬 sendEmail 成功:', {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        company: data.company,
        messagePreview: data.message.slice(0, 64),
      });
      await sleep(300);
      return;
    }

    if (!this.isInitialized) await this.init();

    try {
      const timestamp = new Date().toISOString();
      const recipientEmail = data.toEmail || 'info@eudaemonia.tech';
      const subject = data.subject || `網站表單聯繫 - ${timestamp}`;
      console.log('開始發送郵件到 EmailJS...');
      const result = await this.withRetry(() =>
        emailjs.send(
          this.serviceId!,
          this.templateId!,
          {
            from_name: `${data.firstName} ${data.lastName}`,
            from_email: data.email,
            reply_to: data.email,
            phone: data.phone || '未提供',
            company: data.company || '未提供',
            country: data.country || '未提供',
            message: data.message,
            to_name: 'EudTech Team',
            to_email: recipientEmail,
            recipient_email: recipientEmail,
            subject,
            timestamp
          },
          this.publicKey!
        )
      );

      const status = getEmailJsStatus(result);
      if (status !== 200) {
        throw new Error(`郵件發送失敗，狀態碼: ${status ?? 'unknown'}`);
      }
      console.log('郵件發送成功:', result);
    } catch (error) {
      console.error('郵件發送錯誤:', error);
      throw new Error(error instanceof Error ? error.message : '郵件發送失敗，請稍後重試');
    }
  }
}

export const emailService = new EmailService();
