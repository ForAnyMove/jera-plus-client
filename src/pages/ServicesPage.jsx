import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';
import {
  Briefcase,
  Truck,
  Compass,
  Building2,
  Banknote,
  BarChart3,
  ArrowRight,
  Send,
  CheckCircle2
} from 'lucide-react';

const iconMap = {
  Truck,
  Compass,
  Building2,
  Banknote,
  BarChart3,
  Briefcase
};

export const ServicesPage = ({ onOpenQuote }) => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const services = content?.services || [];

  const pageTitle = lang === 'ru'
    ? 'Логистика, консалтинг и торговое финансирование'
    : 'Commodity Logistics, Consulting & Trade Finance';

  const pageDesc = lang === 'ru'
    ? 'Комплексные логистические услуги Jera Plus: международная перевозка опасных грузов ADR (СУГ, дизель), ж/д экспедирование, аренда терминалов, торговое финансирование (аккредитивы LC) и консалтинг.'
    : 'Comprehensive commodity services by Jera Plus: international ADR dangerous-goods transport, rail forwarding, terminal transshipment, structured trade finance (LC/SBLC), and logistics advisory.';

  const keywords = lang === 'ru'
    ? 'логистика нефтепродуктов, перевозка СУГ автогазовозами, жд экспедирование цистерн, торговое финансирование нефтепродуктов, аккредитив LC, консалтинг топливный рынок'
    : 'petroleum logistics Europe, LPG road tanker transport, rail tank car forwarding, structured trade finance oil, letter of credit commodity, energy logistics consulting';

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDesc}
        keywords={keywords}
      />

      <div style={{ padding: '40px 0 80px', minHeight: '80vh' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav style={{ fontSize: '0.86rem', marginBottom: '24px', color: 'var(--text-dark-muted)' }}>
            <Link to="/" style={{ color: '#0eb0ee', textDecoration: 'none' }}>
              {t('nav_home')}
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text-main)' }}>{t('nav_services')}</span>
          </nav>

          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="badge badge-navy">
              <Briefcase size={14} color="var(--hover-accent)" />
              <span>{t('badge_services')}</span>
            </div>
            <h1 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '14px' }}>
              {pageTitle}
            </h1>
            <div className="section-divider section-divider-cyan" style={{ margin: '8px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {pageDesc}
            </p>
          </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            {services.map((srv) => {
              const IconComp = iconMap[srv.icon] || Briefcase;
              const title = lang === 'ru' ? srv.title_ru : srv.title_en;
              const excerpt = lang === 'ru' ? srv.excerpt_ru : srv.excerpt_en;
              const stages = Array.isArray(srv.stages) ? srv.stages : [];
              const srvUrl = `/services/${srv.slug || srv.id}`;

              return (
                <div
                  key={srv.id}
                  className="card-light"
                  style={{
                    padding: '36px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: 'rgba(14, 176, 238, 0.12)',
                    border: '1px solid rgba(14, 176, 238, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0eb0ee',
                    marginBottom: '20px'
                  }}>
                    <IconComp size={28} />
                  </div>

                  <h2 style={{ fontSize: '1.3rem', marginBottom: '12px', fontWeight: 800, color: 'var(--card-light-title)', lineHeight: 1.35 }}>
                    <Link to={srvUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {title}
                    </Link>
                  </h2>

                  <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                    {excerpt}
                  </p>

                  {/* Stages Preview */}
                  {stages.length > 0 && (
                    <div style={{ background: 'var(--bg-subtle)', padding: '14px 18px', borderRadius: '10px', marginBottom: '24px', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 800, color: '#0eb0ee', marginBottom: '8px' }}>
                        {lang === 'ru' ? 'Ключевые этапы:' : 'Key Stages:'}
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {stages.slice(0, 3).map((st, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--card-light-title)' }}>
                            <CheckCircle2 size={14} color="#0eb0ee" />
                            <span>{lang === 'ru' ? (st.title_ru || st.title) : (st.title_en || st.title)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <Link
                      to={srvUrl}
                      className="btn btn-outline-cyan"
                      style={{ flex: 1, padding: '10px', fontSize: '0.84rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <span>{t('btn_more')}</span>
                      <ArrowRight size={15} />
                    </Link>

                    <button
                      onClick={() => onOpenQuote(`Service Inquiry: ${title}`)}
                      className="btn btn-primary"
                      style={{ padding: '10px 20px', fontSize: '0.84rem' }}
                    >
                      <span>{t('btn_quote')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
