import emailjs from '@emailjs/browser';
import { EmailFormData } from '../types';

class EmailService {
  private isInitialized = false;
  private readonly publicKey = 'NQwR0JNR9LtmNzV7O';
  private readonly serviceId = 'service_9bxmxjj';
  private readonly templateId = 'template_bhwkpw9';

  async init() {
    if (this.isInitialized) return;
    
    try {
      emailjs.init(this.publicKey);
      this.isInitialized = true;
    } catch (error) {
      console.error('Email service initialization failed', error);
      throw error;
    }
  }

  async sendForm(form: HTMLFormElement) {
    if (!this.isInitialized) {
      await this.init();
    }

    try {
      const result = await emailjs.sendForm(
        this.serviceId,
        this.templateId,
        form,
        this.publicKey
      );

      if (result.status !== 200) {
        throw new Error(`Email send failed with status ${result.status}`);
      }

      console.log('Email sent successfully', result);
    } catch (error) {
      console.error('Email send error', error);
      throw error;
    }
  }

  async sendEmail(data: EmailFormData) {
    if (!this.isInitialized) {
      await this.init();
    }

    try {
      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        {
          from_name: `${data.firstName} ${data.lastName}`,
          from_email: data.email,
          company: data.company || '',
          message: data.message,
          to_name: 'EudTech Team'
        },
        this.publicKey
      );

      if (result.status !== 200) {
        throw new Error(`Email send failed with status ${result.status}`);
      }

      console.log('Email sent successfully', result);
    } catch (error) {
      console.error('Email send error', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();