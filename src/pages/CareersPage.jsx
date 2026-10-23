import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { CareersSection } from '../components/CareersSection';

export const CareersPage = () => {
  const { lang, t } = useLanguage();

  const pageTitle = lang === 'ru'
    ? 'Карьера в компании Jera Plus — Вакансии трейдеров и логистов'
    : 'Careers at Jera Plus — Open Trading & Logistics Positions';

  const pageDesc = lang === 'ru'
    ? 'Присоединяйтесь к международной команде Jera Plus: открытые вакансии для опытных трейдеров СУГ, светлых нефтепродуктов, масличных культур и менеджеров мультимодальной логистики.'
    : 'Join the international Jera Plus team: open opportunities for experienced LPG traders, fuel wholesale managers, and multimodal logistics coordinators.';

  const keywords = lang === 'ru'
    ? 'работа в трейдинге, вакансия трейдер СУГ, вакансия менеджер по логистике, карьера Jera Plus, оптовая торговля нефтепродуктами работа'
    : 'petroleum trader jobs, LPG wholesale manager vacancy, commodity logistics jobs Europe, Jera Plus careers, oil trading employment';

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
            <span style={{ color: 'var(--text-main)' }}>{t('nav_careers')}</span>
          </nav>
        </div>

        <CareersSection />
      </div>
    </>
  );
};
