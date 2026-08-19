import React from 'react';
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
import CareersPage from './CareersPage';
import AtomicComponentsDemo from './demo/AtomicComponentsDemo';
import GrandoConfigurator from './configurator/GrandoConfigurator';
import SEOHead from './common/SEOHead';
import ConfiguratorSolutionPage from './pages/ConfiguratorSolutionPage';
import AiAgentSolutionPage from './pages/AiAgentSolutionPage';
import MarketingEvents from './analytics/MarketingEvents';
import ProductDetails from './ProductDetails';
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
        <Routes>
            <Route path="/" element={
              <>
                <SEOHead
                  title={isEnglish ? 'Agent SOR, AI Infrastructure, and Social Intelligence' : 'Agent SOR、AI 運算與社群情報'}
                  description={
                    isEnglish
                      ? 'EudTech provides an Agent System of Record and Action Layer for ChatGPT and Claude, AI GPU infrastructure, and Cyabra social intelligence solutions.'
                      : 'EudTech 提供以 ChatGPT／Claude 為介面的 Agent System of Record + Action Layer、AI GPU 運算基礎設施及 Cyabra 社群情報解決方案。'
                  }
                  keywords={
                    isEnglish
                      ? 'Agent SOR, agent system of record, MCP gateway, AI GPU server, Comino Grando, Cyabra social intelligence'
                      : 'Agent SOR, AI Agent System of Record, MCP Gateway, AI GPU 伺服器, Comino Grando, Cyabra 社群情報'
                  }
                  url="https://eudaemonia.tech/"
                  image={getConfiguratorSocialPreviewPath('/')}
                  imageAlt={isEnglish ? 'EudTech Agent SOR and AI infrastructure' : 'EudTech Agent SOR 與 AI 運算基礎設施'}
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
      </main>
    </>
  );
};

export default AppRoutes;