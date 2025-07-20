import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, Database, Shield, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { useProductData } from '../hooks/business/useProductData';
import { useLanguageContext } from '../contexts/LanguageContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { analyticsService } from '../services/analytics/AnalyticsService';
import NavBar from './navigation/NavBar';
import Footer from './Footer';
import Section from './layout/Section';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import LoadingSpinner from './ui/LoadingSpinner';
import ProductSpecsTable from './products/ProductSpecsTable';
import ProductImageGallery from './products/ProductImageGallery';
import SEOHead from './common/SEOHead';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isEnglish, toggleLanguage } = useLanguageContext();
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { getProductById, loading, error } = useProductData(isEnglish);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(parseInt(id));
      setProduct(foundProduct);
      
      if (foundProduct) {
        analyticsService.trackProductView(foundProduct.id, foundProduct.title);
      }
    }
  }, [id, getProductById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isEnglish ? 'Product Not Found' : '找不到產品'}
          </h1>
          <Button onClick={() => navigate('/')} variant="primary">
            {isEnglish ? 'Back to Home' : '返回首頁'}
          </Button>
        </div>
      </div>
    );
  }

  const isFinSight = product.id === 3;

  return (
    <>
      <SEOHead
        title={product.title}
        description={product.description}
        isEnglish={isEnglish}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <NavBar 
          isEnglish={isEnglish}
          toggleLanguage={toggleLanguage}
          themeMode={themeMode}
          isDarkMode={isDarkModeActive}
          toggleDarkMode={toggleDarkMode}
        />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative h-96 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
            </div>
            <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8">
              <div className="mb-4">{product.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {product.title}
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                {product.description}
              </p>
            </div>
          </section>

          {/* Back Button */}
          <Section background="white" padding="sm">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isEnglish ? 'Back to Products' : '返回產品頁面'}
            </Button>
          </Section>

          {/* Product Overview */}
          <Section background="white" padding="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {isEnglish ? 'Product Overview' : '產品概述'}
                </h2>
                
                {product.detailedDescription && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {isEnglish ? 'Form Factor' : '產品形式'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {product.detailedDescription.formFactor}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {isEnglish ? 'Introduction' : '產品介紹'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.detailedDescription.introduction}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Card variant="elevated" padding="lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Key Features' : '主要特色'}
                  </h3>
                  <div className="space-y-3">
                    {(product.detailedDescription?.keyFeatures || product.features).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </Section>

          {/* Technical Specifications */}
          <Section background="gray" padding="lg">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                {isEnglish ? 'Technical Specifications' : '技術規格'}
              </h2>
              
              <ProductSpecsTable
                specs={product.detailedDescription?.technicalSpecs || product.specs}
                isEnglish={isEnglish}
              />
            </div>
          </Section>

          {/* Applications */}
          {product.detailedDescription?.applications && (
            <Section background="white" padding="lg">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  {isEnglish ? 'Applications' : '應用領域'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.detailedDescription.applications.map((application: string, index: number) => (
                    <Card key={index} variant="outlined" padding="md" hover>
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mr-3"></div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {application}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Section>
          )}

          {/* Product Images */}
          {product.images && product.images.length > 0 && (
            <Section background="gray" padding="lg">
              <div className="max-w-4xl mx-auto">
                <ProductImageGallery
                  images={product.images}
                  productName={product.title}
                  isEnglish={isEnglish}
                />
              </div>
            </Section>
          )}

          {/* Contact CTA */}
          <Section background="gradient" padding="xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {isEnglish ? 'Interested in this product?' : '對此產品感興趣？'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {isEnglish
                  ? 'Contact our team to learn more about pricing, customization options, and implementation.'
                  : '聯絡我們的團隊了解更多關於價格、客製化選項和實施方案。'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={() => navigate('/#contact')}
                  variant="primary"
                  size="lg"
                >
                  {isEnglish ? 'Get Quote' : '取得報價'}
                </Button>
                <Button
                  onClick={() => navigate('/#contact')}
                  variant="outline"
                  size="lg"
                >
                  {isEnglish ? 'Schedule Demo' : '預約展示'}
                </Button>
              </div>
            </div>
          </Section>
        </main>

        <Footer isEnglish={isEnglish} />
      </div>
    </>
  );
};

export default ProductDetails;