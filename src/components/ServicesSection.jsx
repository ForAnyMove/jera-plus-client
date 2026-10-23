import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Truck, Compass, Building2, Banknote, BarChart3, Briefcase, ArrowRight, CheckCircle, X } from 'lucide-react';

const iconMap = {
  Truck,
  Compass,
  Building2,
  Banknote,
  BarChart3,
  Briefcase
};

export const ServicesSection = ({ onSelectServiceForQuote }) => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const services = content?.services || [];

  const [activeModalService, setActiveModalService] = useState(null);

  return (
    <section id="services" className="section section-light-alt" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <div className="badge badge-navy">
            <Briefcase size={14} color="var(--hover-accent)" />
            <span>{t('badge_services')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ru' ? 'Услуги и консалтинг' : 'Logistics, Consulting & Trade Finance'}
          </h2>
          <div className="section-divider section-divider-cyan" style={{ margin: '8px auto 20px' }} />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {lang === 'ru'
              ? 'Комплексное сопровождение товарных цепочек поставок, таможенное оформление и финансирование контрактов.'
              : 'End-to-end management of commodity supply chains, dangerous-goods customs clearance, and structured trade financing.'}
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '28px'
        }}>
          {services.map((srv) => {
            const IconComp = iconMap[srv.icon] || Briefcase;
            const title = lang === 'ru' ? srv.title_ru : srv.title_en;
            const excerpt = lang === 'ru' ? srv.excerpt_ru : srv.excerpt_en;
            const stages = srv.stages || [];

            return (
              <div
                key={srv.id}
                className="card-light"
                style={{
                  padding: '32px',
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

                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 800, lineHeight: 1.35, color: 'var(--card-light-title)' }}>
                  <Link to={`/services/${srv.slug || srv.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {title}
                  </Link>
                </h3>

                <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                  {excerpt}
                </p>

                {/* Stages List */}
                {stages.length > 0 && (
                  <div style={{ marginBottom: '24px', background: 'var(--bg-subtle)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--hover-accent)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '8px' }}>
                      {lang === 'ru' ? 'Ключевые этапы:' : 'Key Execution Stages:'}
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {stages.slice(0, 3).map((st, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontSize: '0.84rem' }}>
                          <CheckCircle size={14} color="var(--stage-check-color)" />
                          <span>{lang === 'ru' ? (st.title_ru || st.title) : (st.title_en || st.title)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <Link
                    to={`/services/${srv.slug || srv.id}`}
                    className="btn btn-outline-cyan"
                    style={{ flex: 1, padding: '10px', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <span>{t('btn_more')}</span>
                    <ArrowRight size={14} />
                  </Link>

                  <button
                    onClick={() => onSelectServiceForQuote(title)}
                    className="btn btn-primary"
                    style={{ padding: '10px 20px', fontSize: '0.82rem' }}
                  >
                    <span>{t('btn_quote')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Services CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            to="/services"
            className="btn btn-navy"
            style={{ padding: '14px 32px', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>{lang === 'ru' ? 'Все услуги и консалтинг' : 'Explore All Services & Advisory'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="modal-overlay" onClick={() => setActiveModalService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '36px' }}>
            <button
              onClick={() => setActiveModalService(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                color: 'var(--card-light-title)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '1.65rem', marginBottom: '8px', lineHeight: 1.3, color: 'var(--card-light-title)' }}>
              {lang === 'ru' ? activeModalService.title_ru : activeModalService.title_en}
            </h2>
            <div className="section-divider section-divider-cyan" style={{ marginBottom: '18px' }} />

            <p style={{ color: 'var(--text-dark-muted)', lineHeight: 1.8, marginBottom: '24px', fontSize: '0.98rem' }}>
              {lang === 'ru' ? activeModalService.description_ru : activeModalService.description_en}
            </p>

            {/* Stages Detail */}
            {activeModalService.stages && activeModalService.stages.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--card-light-title)', marginBottom: '12px', fontWeight: 700 }}>
                  {lang === 'ru' ? 'Этапы предоставления услуги:' : 'Service Delivery Process:'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeModalService.stages.map((st, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-light)'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--category-pill-bg)',
                        color: 'var(--category-pill-text)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {i + 1}
                      </div>
                      <span style={{ color: 'var(--card-light-title)', fontSize: '0.9rem', fontWeight: 600 }}>
                        {lang === 'ru' ? st.title_ru : st.title_en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                const srvTitle = lang === 'ru' ? activeModalService.title_ru : activeModalService.title_en;
                setActiveModalService(null);
                onSelectServiceForQuote(srvTitle);
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              <span>{t('btn_quote')}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
