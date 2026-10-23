import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { Advantages } from './components/Advantages';
import { CompanyOverview } from './components/CompanyOverview';
import { ProductsSection } from './components/ProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { NewsSection } from './components/NewsSection';
import { CareersSection } from './components/CareersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('');
  const { lang } = useLanguage();
  const { content } = useContent();

  // Dynamic SEO meta tag update
  useEffect(() => {
    const seo = content?.seo;
    const title = (lang === 'ru' ? seo?.title_ru : seo?.title_en) ||
      'Jera Plus | International Petroleum & Commodity Trading';
    const desc = (lang === 'ru' ? seo?.description_ru : seo?.description_en) ||
      'Jera Plus is a European trading and logistics company delivering LPG, diesel, base oils, petrochemicals and raw materials.';

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;
  }, [content?.seo, lang]);

  const handleOpenQuote = (topic = '') => {
    setModalTopic(topic);
    setModalOpen(true);
  };

  return (
    <div className="app-layout">
      <Navbar onOpenQuote={() => handleOpenQuote('')} />
      <main>
        <HeroSlider onOpenQuote={() => handleOpenQuote('')} />
        <Advantages />
        <CompanyOverview />
        <ProductsSection onSelectProductForQuote={(title) => handleOpenQuote(`Inquiry: ${title}`)} />
        <ServicesSection onSelectServiceForQuote={(title) => handleOpenQuote(`Service: ${title}`)} />
        <NewsSection />
        <CareersSection />
        <ContactSection initialTopic={modalTopic} />
      </main>
      <Footer />
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prefilledTopic={modalTopic}
      />
    </div>
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
