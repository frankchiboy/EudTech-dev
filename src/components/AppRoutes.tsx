import React, { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useLanguageContext } from '../contexts/LanguageContext';
import NavBar from './navigation/NavBar';
import HeroSection from './hero/HeroSection';
import HomeSolutionsSection from './HomeSolutionsSection';
import HomeBrandPartnersSection from './HomeBrandPartnersSection';
import Footer from './Footer';
import ScrollToTop from './common/ScrollToTop';
import SkipToContent from './common/SkipToContent';
import SEOHead from './common/SEOHead';
import MarketingEvents from './analytics/MarketingEvents';
import { canonicalPageUrl } from '../utils/seo/canonicalUrl';
import { getConfiguratorSocialPreviewPath } from '../utils/seo/socialPreview';

const CareersPage = lazy(() => import('./CareersPage'));
const AtomicComponentsDemo = lazy(() => import('./demo/AtomicComponentsDemo'));
const GrandoConfigurator = lazy(() => import('./configurator/GrandoConfigurator'));
const ConfiguratorSolutionPage = lazy(() => import('./pages/ConfiguratorSolutionPage'));
const AiAgentSolutionPage = lazy(() => import('./pages/AiAgentSolutionPage'));
const ProductDetails = lazy(() => import('./ProductDetails'));
const SolutionsOverviewPage = lazy(() => import('./pages/SolutionsOverviewPage'));
const AiInfrastructureSolutionPage = lazy(() => import('./pages/AiInfrastructureSolutionPage'));
const SocialIntelligenceSolutionPage = lazy(() => import('./pages/SocialIntelligenceSolutionPage'));
const ProductsOverviewPage = lazy(() => import('./pages/ProductsOverviewPage'));
const ResourcesOverviewPage = lazy(() => import('./pages/ResourcesOverviewPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));

const RouteLoadingFallback = () => (
  <div
    className="flex min-h-[50vh] items-center justify-center bg-white px-6 text-slate-700 dark:bg-slate-950 dark:text-slate-200"
    role="status"
    aria-live="polite"
  >
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-500" aria-hidden="true" />
    <span className="sr-only">Loading</span>
  </div>
);

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
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={
              <>
                <SEOHead
                  title={isEnglish ? 'AI agents & Headless SaaS, GPU Infrastructure, and Social Intelligence' : 'AI Agent 與 Headless SaaS、GPU 運算與社群情報'}
                  description={
                    isEnglish
                      ? 'EudTech provides one integrated AI agent and headless SaaS service, AI GPU infrastructure, and Cyabra social intelligence solutions.'
                      : 'EudTech 提供整合的 AI Agent 與 Headless SaaS 導入服務、AI GPU 運算基礎設施及 Cyabra 社群情報解決方案。'
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
                <HomeBrandPartnersSection isEnglish={isEnglish} />
                <Footer isEnglish={isEnglish} />
              </>
            } />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/configurator" element={<GrandoConfigurator />} />
            <Route path="/configurator/:pid" element={<GrandoConfigurator />} />
            <Route path="/solutions" element={<SolutionsOverviewPage />} />
            <Route path="/solutions/ai-agent" element={<AiAgentSolutionPage />} />
            <Route path="/solutions/headless-saas" element={<Navigate replace to="/solutions/ai-agent" />} />
            <Route path="/solutions/ai-infrastructure" element={<AiInfrastructureSolutionPage />} />
            <Route path="/solutions/social-intelligence" element={<SocialIntelligenceSolutionPage />} />
            <Route path="/solutions/:slug" element={<ConfiguratorSolutionPage />} />
            <Route path="/products" element={<ProductsOverviewPage />} />
            <Route path="/resources" element={<ResourcesOverviewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/components-demo" element={import.meta.env.DEV ? <AtomicComponentsDemo /> : <Navigate replace to="/" />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default AppRoutes;
