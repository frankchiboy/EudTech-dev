import React, { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useLanguageContext } from '../contexts/LanguageContext';
import NavBar from './navigation/NavBar';
import HeroSection from './hero/HeroSection';
import homepageContent from '../data/homepageContent.json';
import HomeSolutionsSection from './HomeSolutionsSection';
import HomeBrandPartnersSection from './HomeBrandPartnersSection';
import Footer from './Footer';
import ScrollToTop from './common/ScrollToTop';
import SkipToContent from './common/SkipToContent';
import NotFoundPage from './pages/NotFoundPage';
import SEOHead from './common/SEOHead';
import MarketingEvents from './analytics/MarketingEvents';
import { canonicalPageUrl } from '../utils/seo/canonicalUrl';
import { getConfiguratorSocialPreviewPath } from '../utils/seo/socialPreview';

const CareersPage = lazy(() => import('./CareersPage'));
const AtomicComponentsDemo = lazy(() => import('./demo/AtomicComponentsDemo'));
const GrandoConfigurator = lazy(() => import('./configurator/GrandoConfigurator'));
const ConfiguratorSolutionPage = lazy(() => import('./pages/ConfiguratorSolutionPage'));
const PqcAdvisoryPage = lazy(() => import('./pages/PqcAdvisoryPage'));
const AwsCloudSolutionPage = lazy(() => import('./pages/AwsCloudSolutionPage'));
const ProductDetails = lazy(() => import('./ProductDetails'));
const SolutionsOverviewPage = lazy(() => import('./pages/SolutionsOverviewPage'));
const AiInfrastructureSolutionPage = lazy(() => import('./pages/AiInfrastructureSolutionPage'));
const SocialIntelligenceSolutionPage = lazy(() => import('./pages/SocialIntelligenceSolutionPage'));
const ProductsOverviewPage = lazy(() => import('./pages/ProductsOverviewPage'));
const ResourcesOverviewPage = lazy(() => import('./pages/ResourcesOverviewPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const DocumentNotifierAccessPage = lazy(() => import('./pages/DocumentNotifierAccessPage'));

const AppRoutes: React.FC = () => {
  const { themeMode, isDarkModeActive, toggleDarkMode } = useThemeContext();
  const { isEnglish, toggleLanguage } = useLanguageContext();
  const homeStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'EudTech',
      alternateName: 'Eudaemonia Technology',
      url: canonicalPageUrl('https://eudaemonia.tech'),
      email: 'quote@eudaemonia.tech'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'EudTech',
      url: canonicalPageUrl('https://eudaemonia.tech')
    }
  ];

  return (
    <>
      <SkipToContent />
      <ScrollToTop />
      <NavBar 
        isEnglish={isEnglish}
        toggleLanguage={toggleLanguage}
        themeMode={themeMode}
        isDarkMode={isDarkModeActive}
        toggleDarkMode={toggleDarkMode}
      />
      <MarketingEvents />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<p role="status" className="p-24 text-center">{isEnglish ? 'Loading…' : '載入中…'}</p>}>
        <Routes>
            <Route path="/" element={
              <>
                <SEOHead
                  title={homepageContent[isEnglish ? 'en' : 'zh'].seo.title}
                  description={homepageContent[isEnglish ? 'en' : 'zh'].seo.description}
                  keywords={homepageContent[isEnglish ? 'en' : 'zh'].seo.keywords}
                  url="https://eudaemonia.tech/"
                  image={getConfiguratorSocialPreviewPath('/')}
                  imageAlt={homepageContent[isEnglish ? 'en' : 'zh'].seo.title}
                  structuredData={homeStructuredData}
                  isEnglish={isEnglish}
                />
                <HeroSection isEnglish={isEnglish} />
                <HomeSolutionsSection isEnglish={isEnglish} />
                <HomeBrandPartnersSection isEnglish={isEnglish} />
                <Footer isEnglish={isEnglish} />
              </>
            } />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/configurator" element={<GrandoConfigurator />} />
            <Route path="/configurator/:pid" element={<GrandoConfigurator />} />
            <Route path="/solutions" element={<SolutionsOverviewPage />} />
            <Route path="/solutions/pqc" element={<PqcAdvisoryPage />} />
            <Route path="/solutions/aws" element={<AwsCloudSolutionPage />} />
            <Route path="/solutions/ai-agent" element={<Navigate replace to="/solutions/aws" />} />
            <Route path="/solutions/headless-saas" element={<Navigate replace to="/solutions/aws" />} />
            <Route path="/solutions/ai-infrastructure" element={<AiInfrastructureSolutionPage />} />
            <Route path="/solutions/social-intelligence" element={<SocialIntelligenceSolutionPage />} />
            <Route path="/solutions/:slug" element={<ConfiguratorSolutionPage />} />
            <Route path="/products" element={<ProductsOverviewPage />} />
            <Route path="/resources" element={<ResourcesOverviewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/official-document-notifier" element={<DocumentNotifierAccessPage />} />
            <Route path="/components-demo" element={import.meta.env.DEV ? <AtomicComponentsDemo /> : <Navigate replace to="/" />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default AppRoutes;
