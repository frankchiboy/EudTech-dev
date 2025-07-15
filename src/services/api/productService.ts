import { Product } from '../../data/models/Product';

class ProductService {
  private products: Product[] = []; // 這裡應該從API獲取數據

  async getProducts(): Promise<Product[]> {
    // 模擬API調用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 100);
    });
  }

  async getProductById(id: number): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = this.products.find(p => p.id === id);
        resolve(product || null);
      }, 100);
    });
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 根據類別過濾產品
        resolve(this.products);
      }, 100);
    });
  }

  async searchProducts(query: string): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = this.products.filter(p => 
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 100);
    });
  }
}

export const productService = new ProductService();