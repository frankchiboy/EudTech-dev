import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Cpu, HardDrive, Zap, Thermometer } from 'lucide-react';
import { useProductData } from '../hooks/business/useProductData';
import { useLanguageContext } from '../contexts/LanguageContext';
import { useThemeContext } from '../contexts/ThemeContext';
import NavBar from './navigation/NavBar';
import Footer from './Footer';
import Section from './layout/Section';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import ProductSpecsTable from './products/ProductSpecsTable';
import ProductImageGallery from './products/ProductImageGallery';
import SEOHead from './common/SEOHead';
import LoadingSpinner from './ui/LoadingSpinner';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isEnglish, toggleLanguage } = useLanguageContext();
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { getProductById, loading, error } = useProductData(isEnglish);

  const productId = parseInt(id || '0', 10);
  const product = getProductById(productId);

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
        <Card className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isEnglish ? 'Product Not Found' : '找不到產品'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {isEnglish 
              ? 'The product you are looking for does not exist.'
              : '您尋找的產品不存在。'
            }
          </p>
          <Button onClick={() => navigate('/')}>
            {isEnglish ? 'Back to Home' : '返回首頁'}
          </Button>
        </Card>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate('/', { state: { fromSection: `product-${product.id}` } });
  };

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
          <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Button
                variant="ghost"
                onClick={handleBackClick}
                className="mb-8 inline-flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {isEnglish ? 'Back to Products' : '返回產品'}
              </Button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    {product.icon}
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white ml-4">
                      {product.title}
                    </h1>
                  </div>
                  
                  {product.comingSoon && (
                    <Badge variant="info" size="lg" className="mb-4">
                      {isEnglish ? 'Coming Soon' : '即將推出'}
                    </Badge>
                  )}
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/', { state: { fromSection: 'contact' } });
                      }}
                    >
                      <Button variant="primary" size="lg">
                        {isEnglish ? 'Get Quote' : '取得報價'}
                      </Button>
                    </a>
                    <a
                      href="#specifications"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('specifications')?.scrollIntoView({ 
                          behavior: 'smooth' 
                        });
                      }}
                    >
                      <Button variant="outline" size="lg">
                        {isEnglish ? 'View Specifications' : '查看規格'}
                      </Button>
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <Section background="white" padding="xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isEnglish ? 'Key Features' : '主要特色'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Discover the advanced capabilities that make this solution stand out.'
                  : '探索讓這個解決方案脫穎而出的先進功能。'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature, index) => (
                <Card key={index} variant="elevated" padding="lg" hover>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* Technical Specifications */}
          <Section id="specifications" background="gray" padding="xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isEnglish ? 'Technical Specifications' : '技術規格'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {isEnglish
                  ? 'Detailed technical information and performance specifications.'
                  : '詳細的技術資訊和效能規格。'
                }
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <ProductSpecsTable 
                specs={product.specs} 
                isEnglish={isEnglish}
              />
            </div>
          </Section>

          {/* Detailed Description */}
          {product.detailedDescription && (
            <Section background="white" padding="xl">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {isEnglish ? 'Product Overview' : '產品概述'}
                  </h2>
                </div>
                
                <div className="space-y-12">
                  {/* Introduction */}
                  <Card variant="elevated" padding="lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {isEnglish ? 'Introduction' : '產品介紹'}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {product.detailedDescription.introduction}
                    </p>
                  </Card>

                  {/* Key Features */}
                  <Card variant="elevated" padding="lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {isEnglish ? 'Advanced Features' : '進階功能'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.detailedDescription.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-2 w-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Applications */}
                  {product.detailedDescription.applications && (
                    <Card variant="elevated" padding="lg">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {isEnglish ? 'Applications' : '應用場景'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.detailedDescription.applications.map((application, index) => (
                          <div key={index} className="flex items-start">
                            <div className="h-2 w-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300">{application}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </Section>
          )}

          {/* CTA Section */}
          <Section background="gradient" padding="xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isEnglish ? 'Ready to Get Started?' : '準備開始了嗎？'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {isEnglish
                  ? 'Contact our team to learn more about this solution and how it can benefit your organization.'
                  : '聯絡我們的團隊，了解更多關於此解決方案以及它如何為您的組織帶來效益。'
                }
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/', { state: { fromSection: 'contact' } });
                }}
              >
                <Button variant="primary" size="lg">
                  {isEnglish ? 'Contact Sales' : '聯絡業務'}
                </Button>
              </a>
            </div>
          </Section>
        </main>

        <Footer isEnglish={isEnglish} />
      </div>
    </>
  );
};

export default ProductDetails;