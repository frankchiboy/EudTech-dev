import { emailService } from '../services/emailService';

console.log('開始測試 EmailJS 發送功能...');

// 測試發送郵件函數
const testSendEmail = async () => {
  try {
    const testData = {
      firstName: '測試',
      lastName: '用戶',
      email: 'test@example.com',
      company: '測試公司',
      message: '這是一條測試訊息 - ' + new Date().toISOString(),
      privacy: true
    };

    console.log('準備發送測試郵件:', testData);
    await emailService.sendEmail(testData);
    console.log('🟢 測試郵件發送成功！');
    return true;
  } catch (error) {
    console.error('🔴 測試郵件發送失敗:', error);
    return false;
  }
};

// 執行測試
testSendEmail();