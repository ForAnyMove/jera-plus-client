import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  ArrowLeft,
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock
} from 'lucide-react';

const iconMap = {
  Truck,
  Compass,
  Building2,
  Banknote,
  BarChart3,
  Briefcase
};

export const ServiceDetailPage = ({ onOpenQuote }) => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const services = content?.services || [];

  const service = services.find(
    (s) => s.slug === slug || String(s.id) === String(slug)
  );

  if (!service) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--card-light-title)' }}>
          {lang === 'ru' ? 'Услуга не найдена' : 'Service Not Found'}
        </h2>
        <p style={{ color: 'var(--text-dark-muted)', marginBottom: '24px' }}>
          {lang === 'ru'
            ? 'Запрошенная услуга не найдена или была переименована.'
            : 'The requested service could not be found or has been renamed.'}
        </p>
        <Link to="/services" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>{lang === 'ru' ? 'Вернуться к списку услуг' : 'Back to Services'}</span>
        </Link>
      </div>
    );
  }

  const IconComp = iconMap[service.icon] || Briefcase;
  const title = (lang === 'ru' ? service.title_ru : service.title_en) || service.title_en;
  const excerpt = (lang === 'ru' ? service.excerpt_ru : service.excerpt_en) || service.excerpt_en;
  const description = (lang === 'ru' ? service.description_ru : service.description_en) || excerpt;
  const stages = Array.isArray(service.stages) ? service.stages : [];

  const seoTitle = `${title} | Jera Plus Services`;
  const seoDesc = `${excerpt} Комплексные решения в области международной логистики, таможни и торгового финансирования от Jera Plus.`;
  const seoKeywords = `${title}, логистика нефтепродуктов, Jera Plus, торговое финансирование, таможенное оформление, перевозка СУГ`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        image={service.image_url}
        type="article"
      />

      <div style={{ padding: '40px 0 80px', minHeight: '80vh' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav style={{ fontSize: '0.86rem', marginBottom: '28px', color: 'var(--text-dark-muted)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#0eb0ee', textDecoration: 'none' }}>
              {t('nav_home')}
            </Link>
            <span>/</span>
            <Link to="/services" style={{ color: '#0eb0ee', textDecoration: 'none' }}>
              {t('nav_services')}
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{title}</span>
          </nav>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '48px',
            alignItems: 'start'
          }}>
            {/* Left Content */}
            <div>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(14, 176, 238, 0.12)',
                border: '1px solid rgba(14, 176, 238, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0eb0ee',
                marginBottom: '20px'
              }}>
                <IconComp size={32} />
              </div>

              <h1 style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                color: 'var(--card-light-title)',
                lineHeight: 1.25,
                marginBottom: '16px'
              }}>
                {title}
              </h1>

              <div className="section-divider section-divider-cyan" style={{ margin: '0 0 24px 0' }} />

              <div style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--text-dark-muted)',
                marginBottom: '36px'
              }}>
                {description}
              </div>

              {/* Stages List */}
              {stages.length > 0 && (
                <div style={{
                  background: 'var(--card-light-bg)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '16px',
                  padding: '32px',
                  marginBottom: '36px',
                  boxShadow: 'var(--card-light-shadow)'
                }}>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--card-light-title)', marginBottom: '20px' }}>
                    {lang === 'ru' ? 'Этапы реализации услуги' : 'Implementation Stages'}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {stages.map((st, i) => (
                      <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--hover-accent)',
                          color: '#0e1428',
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {i + 1}
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--card-light-title)', margin: '4px 0 4px' }}>
                            {lang === 'ru' ? (st.title_ru || st.title) : (st.title_en || st.title)}
                          </h3>
                          {(st.desc_ru || st.desc_en) && (
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-dark-muted)', margin: 0 }}>
                              {lang === 'ru' ? (st.desc_ru || st.desc_en) : (st.desc_en || st.desc_ru)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Card: Request Inquiry & Guarantees */}
            <div>
              <div style={{
                background: 'var(--card-light-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: 'var(--card-light-shadow)',
                position: 'sticky',
                top: '90px'
              }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--card-light-title)', marginBottom: '12px' }}>
                  {lang === 'ru' ? 'Заказать консультацию' : 'Request Consultation'}
                </h3>
                <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                  {lang === 'ru'
                    ? 'Свяжитесь с нашими специалистами для индивидуального расчета стоимости и логистического аудита.'
                    : 'Get in touch with our experts for a personalized cost calculation and freight audit.'}
                </p>

                <button
                  onClick={() => onOpenQuote(`Service Consultation: ${title}`)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.95rem', fontWeight: 700, marginBottom: '24px' }}
                >
                  <Send size={16} />
                  <span>{lang === 'ru' ? 'Отправить запрос на услугу' : 'Inquire About This Service'}</span>
                </button>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-dark-muted)' }}>
                    <ShieldCheck size={18} color="#0eb0ee" />
                    <span>{lang === 'ru' ? 'Финансовая надежность и аудит' : 'Financial stability and full compliance'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-dark-muted)' }}>
                    <Clock size={18} color="#0eb0ee" />
                    <span>{lang === 'ru' ? 'Оперативный ответ в течение 24 часов' : 'Prompt response within 24 hours'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
