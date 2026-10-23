import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { ContactSection } from '../components/ContactSection';

export const ContactsPage = () => {
  const { lang, t } = useLanguage();

  const pageTitle = lang === 'ru'
    ? 'Контакты Jera Plus — Офис в Подгорице и форма обратной связи'
    : 'Contact Jera Plus — Headquarters in Podgorica & Inquiry Form';

  const pageDesc = lang === 'ru'
    ? 'Свяжитесь с коммерческим отделом Jera Plus: центральный офис в Подгорице (Черногория), телефон +382 67 952403, email office@jeraplus.com. Быстрый расчет оптовых поставок.'
    : 'Contact Jera Plus commercial department: headquarters in Podgorica, Montenegro. Phone +382 67 952403, email office@jeraplus.com. Quick commodity price quotes.';

  const keywords = lang === 'ru'
    ? 'контакты Jera Plus, телефон Jera Plus, офис Подгорица Черногория, отправить заявку на топливо, связаться с отделом продаж'
    : 'Jera Plus contacts, phone number Montenegro, office Podgorica, commodity supplier inquiry, request petroleum quotation';

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDesc}
        keywords={keywords}
      />

      <div style={{ padding: '40px 0 0', minHeight: '80vh' }}>
        <div className="container" style={{ marginBottom: '20px' }}>
          {/* Breadcrumbs */}
          <nav style={{ fontSize: '0.86rem', color: 'var(--text-dark-muted)' }}>
            <Link to="/" style={{ color: '#0eb0ee', textDecoration: 'none' }}>
              {t('nav_home')}
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text-main)' }}>{t('nav_contacts')}</span>
          </nav>
        </div>

        <ContactSection />
      </div>
    </>
  );
};
