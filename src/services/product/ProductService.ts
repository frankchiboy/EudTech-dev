import { Product } from '../../data/models/Product';
import { getEudTechProducts, getCominoProducts } from '../../data/productData';

export class ProductService {
  private static instance: ProductService;
  private cache: Map<string, Product[]> = new Map();

  static getInstance(): ProductService {
    if (!this.instance) {
      this.instance = new ProductService();
    }
    return this.instance;
  }

  async getEudTechProducts(isEnglish: boolean): Promise<Product[]> {
    const cacheKey = `eudtech-${isEnglish}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const products = getEudTechProducts(isEnglish);
    this.cache.set(cacheKey, products);
    return products;
  }

  async getCominoProducts(isEnglish: boolean): Promise<Product[]> {
    const cacheKey = `comino-${isEnglish}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const products = getCominoProducts(isEnglish);
    this.cache.set(cacheKey, products);
    return products;
  }

  async getAllProducts(isEnglish: boolean): Promise<Product[]> {
    const [eudTech, comino] = await Promise.all([
      this.getEudTechProducts(isEnglish),
      this.getCominoProducts(isEnglish)
    ]);
    
    return [...eudTech, ...comino];
  }

  async getProductById(id: number, isEnglish: boolean): Promise<Product | null> {
    const allProducts = await this.getAllProducts(isEnglish);
    return allProducts.find(p => p.id === id) || null;
  }

  async searchProducts(query: string, isEnglish: boolean): Promise<Product[]> {
    const allProducts = await this.getAllProducts(isEnglish);
    const lowercaseQuery = query.toLowerCase();
    
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.features.some(feature => 
        feature.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const productService = ProductService.getInstance();