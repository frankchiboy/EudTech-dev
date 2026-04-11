import { emailService } from '../services/emailService';

console.log('開始測試 EmailJS 初始化...');

// 測試 EmailJS 初始化
const testEmailInitialization = async () => {
  try {
    await emailService.init();
    console.log('🟢 EmailJS 初始化成功！');
    return true;
  } catch (error) {
    console.error('🔴 EmailJS 初始化失敗:', error);
    return false;
  }
};

// 執行測試
testEmailInitialization();