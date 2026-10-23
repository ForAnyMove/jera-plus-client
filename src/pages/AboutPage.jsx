import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';
import { CompanyOverview } from '../components/CompanyOverview';
import { Advantages } from '../components/Advantages';
import { Building2, Globe2, ShieldCheck, Award, Users } from 'lucide-react';

export const AboutPage = ({ onOpenQuote }) => {
  const { lang, t } = useLanguage();
  const { content } = useContent();

  const pageTitle = lang === 'ru'
    ? 'О компании Jera Plus — Европейский трейдинг и логистика'
    : 'About Jera Plus — European Petroleum Trading & Logistics';

  const pageDesc = lang === 'ru'
    ? 'Узнайте больше о компании Jera Plus: многолетний опыт руководства в поставках СУГ, светлых нефтепродуктов, базовых масел и агросырья. Прямые контракты, безопасность перевозок и безупречная репутация.'
    : 'Learn about Jera Plus: decades of executive trading expertise in LPG, distillates, base oils, and agricultural commodities. Direct refinery contracts and multimodal logistics.';

  const keywords = lang === 'ru'
    ? 'о компании Jera Plus, европейский трейдер нефтепродуктов, поставщик СУГ, история компании, Подгорица Черногория, международная торговля сырьем'
    : 'about Jera Plus, European petroleum trading house, LPG supplier Podgorica Montenegro, international logistics management, commodity executives';

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
            <span style={{ color: 'var(--text-main)' }}>{t('nav_about')}</span>
          </nav>
        </div>

        {/* Reusable rich CompanyOverview section */}
        <CompanyOverview />

        {/* Advantages & Values */}
        <Advantages />

        {/* Corporate Values Block */}
        <section className="section section-light" style={{ borderTop: '1px solid var(--border-light)', padding: '60px 0 80px' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
              <div className="badge badge-navy">
                <Award size={14} color="var(--hover-accent)" />
                <span>{lang === 'ru' ? 'Наши принципы' : 'Corporate Values'}</span>
              </div>
              <h2 className="section-title">
                {lang === 'ru' ? 'Основа долгосрочного партнерства' : 'Foundations of Long-Term Partnership'}
              </h2>
              <div className="section-divider section-divider-cyan" style={{ margin: '8px auto 20px' }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}>
              <div className="card-light" style={{ padding: '32px' }}>
                <ShieldCheck size={32} color="#0eb0ee" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--card-light-title)', marginBottom: '10px' }}>
                  {lang === 'ru' ? 'Безупречное исполнение контрактов' : '100% Contract Fulfilment'}
                </h3>
                <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {lang === 'ru'
                    ? 'Мы строго соблюдаем согласованные графики отгрузок и ценовые условия независимо от рыночной волатильности.'
                    : 'We strictly adhere to agreed shipment schedules and pricing terms regardless of market volatility.'}
                </p>
              </div>

              <div className="card-light" style={{ padding: '32px' }}>
                <Globe2 size={32} color="#0eb0ee" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--card-light-title)', marginBottom: '10px' }}>
                  {lang === 'ru' ? 'Глобальный охват логистики' : 'Global Logistics Reach'}
                </h3>
                <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {lang === 'ru'
                    ? 'Поставки автогазовозами, железнодорожными цистернами и морскими танкерами в более чем 15 стран мира.'
                    : 'Shipments by road gas trucks, rail tank cars, and sea vessels across more than 15 countries.'}
                </p>
              </div>

              <div className="card-light" style={{ padding: '32px' }}>
                <Users size={32} color="#0eb0ee" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--card-light-title)', marginBottom: '10px' }}>
                  {lang === 'ru' ? 'Индивидуальный подход' : 'Tailored Commercial Solutions'}
                </h3>
                <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {lang === 'ru'
                    ? 'Гибкие финансовые инструменты (LC/SBLC), фиксация форвардных цен и консалтинг по оптимизации поставок.'
                    : 'Structured financing instruments (LC/SBLC), forward price hedging, and freight optimization consulting.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
