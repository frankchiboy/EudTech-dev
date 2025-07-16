import { useState, useEffect } from 'react';
import { Product } from '../../data/models/Product';
import { getEudTechProducts, getCominoProducts } from '../../data/productData';

export const useProductData = (isEnglish: boolean) => {
  const [eudTechProducts, setEudTechProducts] = useState<Product[]>([]);
  const [cominoProducts, setCominoProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const eudTech = getEudTechProducts(isEnglish);
      const comino = getCominoProducts(isEnglish);
      
      setEudTechProducts(eudTech);
      setCominoProducts(comino);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [isEnglish]);

  const getProductById = (id: number): Product | undefined => {
    return [...eudTechProducts, ...cominoProducts].find(p => p.id === id);
  };

  const getProductsByCategory = (category: 'eudtech' | 'comino'): Product[] => {
    return category === 'eudtech' ? eudTechProducts : cominoProducts;
  };

  return {
    eudTechProducts,
    cominoProducts,
    loading,
    error,
    getProductById,
    getProductsByCategory
  };
};