import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';

function App() {
  const [isEnglish, setIsEnglish] = useState(false);
  
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <NavBar toggleLanguage={toggleLanguage} isEnglish={isEnglish} />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection isEnglish={isEnglish} />
              <ProductsSection isEnglish={isEnglish} />
              <AboutSection isEnglish={isEnglish} />
              <ContactSection isEnglish={isEnglish} />
            </>
          } />
          <Route path="/products/:id" element={<ProductDetails isEnglish={isEnglish} />} />
        </Routes>
        <Footer isEnglish={isEnglish} />
      </div>
    </Router>
  );
}

export default App;