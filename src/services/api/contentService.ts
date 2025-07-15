import { ContentSection } from '../../data/models/Content';

class ContentService {
  async getContentBySection(sectionId: string, language: string = 'zh'): Promise<ContentSection | null> {
    // 模擬API調用
    return new Promise((resolve) => {
      setTimeout(() => {
        // 這裡應該從CMS或API獲取內容
        resolve(null);
      }, 100);
    });
  }

  async getAllSections(language: string = 'zh'): Promise<ContentSection[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 100);
    });
  }

  async updateContent(sectionId: string, content: Partial<ContentSection>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });
  }
}

export const contentService = new ContentService();