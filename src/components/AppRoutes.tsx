import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useLanguageContext } from '../contexts/LanguageContext';
import NavBar from './navigation/NavBar';
import HeroSection from './hero/HeroSection';
import EudTechProductsSection from './EudTechProductsSection';
import ComimoBrandIntro from './ComimoBrandIntro';
import CyabraBrandIntro from './CyabraBrandIntro';
import HomeSolutionsSection from './HomeSolutionsSection';
import Footer from './Footer';
import ScrollToTop from './common/ScrollToTop';
import SkipToContent from './common/SkipToContent';
import LoadingSpinner from './ui/LoadingSpinner';
import CareersPage from './CareersPage';
import AtomicComponentsDemo from './demo/AtomicComponentsDemo';
import GrandoConfigurator from './configurator/GrandoConfigurator';
import SEOHead from './common/SEOHead';
import ConfiguratorSolutionPage from './pages/ConfiguratorSolutionPage';
import AiAgentSolutionPage from './pages/AiAgentSolutionPage';
import MarketingEvents from './analytics/MarketingEvents';
import { LazyProductDetails, LazyContactSection, LazyAboutSection } from '../utils/performance/codesplitting';
import { canonicalPageUrl } from '../utils/seo/canonicalUrl';
import { getConfiguratorSocialPreviewPath } from '../utils/seo/socialPreview';
import SolutionsOverviewPage from './pages/SolutionsOverviewPage';
import AiInfrastructureSolutionPage from './pages/AiInfrastructureSolutionPage';
import SocialIntelligenceSolutionPage from './pages/SocialIntelligenceSolutionPage';
import ProductsOverviewPage from './pages/ProductsOverviewPage';
import ResourcesOverviewPage from './pages/ResourcesOverviewPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';

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
      email: 'info@eudaemonia.tech',
      sameAs: [canonicalPageUrl('https://eudaemonia.tech/configurator')]
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
      <main id="main-content" role="main">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }>
          <Routes>
            <Route path="/" element={
              <>
                <SEOHead
                  title={isEnglish ? 'AI Agents, GPU Infrastructure, and Social Intelligence' : 'AI Agent、GPU 運算與社群情報'}
                  description={
                    isEnglish
                      ? 'EudTech provides enterprise AI Agent implementation, AI GPU infrastructure, and Cyabra social intelligence solutions.'
                      : 'EudTech 提供企業 AI Agent 導入、AI GPU 運算基礎設施與 Cyabra 社群情報解決方案。'
                  }
                  keywords={
                    isEnglish
                      ? 'AI GPU server, GPU server quote, Comino Grando, NVIDIA H200 server, RTX PRO 6000 workstation, liquid cooled GPU server, Taiwan AI workstation'
                      : 'AI GPU 伺服器, GPU 伺服器報價, Comino Grando, NVIDIA H200 伺服器, RTX PRO 6000 工作站, 液冷 GPU 伺服器, 台灣 AI 工作站'
                  }
                  url="https://eudaemonia.tech/"
                  image={getConfiguratorSocialPreviewPath('/')}
                  imageAlt={isEnglish ? 'EudTech AI GPU servers and Comino configurator' : 'EudTech AI GPU 伺服器與 Comino 配置器'}
                  structuredData={homeStructuredData}
                  isEnglish={isEnglish}
                />
                <HeroSection isEnglish={isEnglish} />
                <HomeSolutionsSection isEnglish={isEnglish} />
                <EudTechProductsSection isEnglish={isEnglish} />
                <ComimoBrandIntro isEnglish={isEnglish} />
                <CyabraBrandIntro isEnglish={isEnglish} />
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyAboutSection isEnglish={isEnglish} />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyContactSection />
                </Suspense>
                <Footer isEnglish={isEnglish} />
              </>
            } />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/configurator" element={<GrandoConfigurator />} />
            <Route path="/configurator/:pid" element={<GrandoConfigurator />} />
            <Route path="/solutions" element={<SolutionsOverviewPage />} />
            <Route path="/solutions/ai-agent" element={<AiAgentSolutionPage />} />
            <Route path="/solutions/ai-infrastructure" element={<AiInfrastructureSolutionPage />} />
            <Route path="/solutions/social-intelligence" element={<SocialIntelligenceSolutionPage />} />
            <Route path="/solutions/:slug" element={<ConfiguratorSolutionPage />} />
            <Route path="/products" element={<ProductsOverviewPage />} />
            <Route path="/resources" element={<ResourcesOverviewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/components-demo" element={<AtomicComponentsDemo />} />
            <Route path="/products/:id" element={
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <LoadingSpinner size="lg" />
                </div>
              }>
                <LazyProductDetails />
              </Suspense>
            } />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default AppRoutes;
