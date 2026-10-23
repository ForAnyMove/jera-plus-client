import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';
import { HeroSlider } from '../components/HeroSlider';
import { Advantages } from '../components/Advantages';
import { CompanyOverview } from '../components/CompanyOverview';
import { ProductsSection } from '../components/ProductsSection';
import { ServicesSection } from '../components/ServicesSection';
import { NewsSection } from '../components/NewsSection';
import { CareersSection } from '../components/CareersSection';
import { ContactSection } from '../components/ContactSection';

export const HomePage = ({ onOpenQuote }) => {
  const { lang } = useLanguage();
  const { content } = useContent();
  const seo = content?.seo;

  const title = (lang === 'ru' ? seo?.title_ru : seo?.title_en) ||
    'Jera Plus | International Petroleum & Commodity Trading';
  const description = (lang === 'ru' ? seo?.description_ru : seo?.description_en) ||
    'Jera Plus is a European trading and logistics company delivering LPG, diesel, base oils, petrochemicals, polymers, flax seeds and minerals.';
  const keywords = lang === 'ru'
    ? 'Jera Plus, СУГ, пропан, бутан, дизельное топливо, бензин, базовые масла, нефтехимия, полимеры, семена льна, рутил, ильменит, оптовые поставки, международный трейдинг'
    : 'Jera Plus, LPG, propane, butane, diesel fuel, gasoline, base oils, petrochemicals, polymers, plastics, flax seeds, rutile, ilmenite, wholesale commodity trading, European logistics';

  return (
    <>
      <SEO
        title={title.replace(' | Jera Plus', '')}
        description={description}
        keywords={keywords}
      />
      <main>
        <HeroSlider onOpenQuote={() => onOpenQuote('')} />
        <Advantages />
        <CompanyOverview />
        <ProductsSection onSelectProductForQuote={(prodTitle) => onOpenQuote(`Inquiry: ${prodTitle}`)} />
        <ServicesSection onSelectServiceForQuote={(srvTitle) => onOpenQuote(`Service: ${srvTitle}`)} />
        <NewsSection />
        <CareersSection />
        <ContactSection />
      </main>
    </>
  );
};
