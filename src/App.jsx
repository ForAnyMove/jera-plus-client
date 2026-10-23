import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { CareersPage } from './pages/CareersPage';
import { ContactsPage } from './pages/ContactsPage';

function RouteLanguageSync() {
  const location = useLocation();
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    if (location.pathname.startsWith('/eng') && lang !== 'en') {
      setLang('en');
    }
  }, [location.pathname, lang, setLang]);

  return null;
}

export function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('');

  const handleOpenQuote = (topic = '') => {
    setModalTopic(topic);
    setModalOpen(true);
  };

  return (
    <BrowserRouter>
      <RouteLanguageSync />
      <div className="app-layout">
        <Navbar onOpenQuote={() => handleOpenQuote('')} />
        
        <Routes>
          {/* Main Standard Routes */}
          <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
          <Route path="/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/products" element={<ProductsPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/products/:slug" element={<ProductDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/:slug" element={<ServiceDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/vacancy" element={<CareersPage />} />
          <Route path="/contacts" element={<ContactsPage />} />

          {/* Legacy & English Webcopy Routes (Exact 1:1 match with original www.jeraplus.com/eng/*) */}
          <Route path="/eng" element={<HomePage onOpenQuote={handleOpenQuote} />} />
          <Route path="/eng/about" element={<AboutPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/eng/products" element={<ProductsPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/eng/products/:slug" element={<ProductDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/eng/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/eng/services/:slug" element={<ServiceDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/eng/news" element={<NewsPage />} />
          <Route path="/eng/news/:slug" element={<NewsDetailPage />} />
          <Route path="/eng/vacancy" element={<CareersPage />} />
          <Route path="/eng/careers" element={<CareersPage />} />
          <Route path="/eng/contacts" element={<ContactsPage />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
        <ContactModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          prefilledTopic={modalTopic}
        />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ContentProvider>
          <AppContent />
        </ContentProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
