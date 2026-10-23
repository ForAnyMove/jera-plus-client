import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export const CompanyOverview = () => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const youtubeId = content?.company_info?.youtube_id || '_DuaZLvPNHs';

  const defaultStats = [
    { label: t('stat_experience'), value: '8+ Years' },
    { label: t('stat_supplies'), value: '100%' },
    { label: t('stat_geography'), value: '15+ Nations' },
    { label: t('stat_categories'), value: '7 Sectors' }
  ];

  const stats = (content?.stats && Array.isArray(content.stats) && content.stats.length > 0)
    ? content.stats.map(s => ({
        value: s.value,
        label: (lang === 'ru' ? s.label_ru : s.label_en) || s.label_en || s.label_ru || ''
      }))
    : defaultStats;

  return (
    <section id="about" className="section section-light" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Column: Story & Stats */}
          <div>
            <div className="badge badge-navy">
              <Building2 size={14} color="var(--hover-accent)" />
              <span>{t('badge_company')}</span>
            </div>

            <h2 className="section-title" style={{ color: 'var(--section-title-light)' }}>
              {lang === 'ru' 
                ? 'Международный трейдинг и надежная цепочка поставок' 
                : 'A Global Partner in Petroleum & Commodity Supply'}
            </h2>

            <div className="section-divider section-divider-navy" />

            <div style={{ color: 'var(--text-dark-muted)', fontSize: '1.02rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <p style={{ fontWeight: 600, color: 'var(--section-title-light)', fontSize: '1.08rem' }}>
                {lang === 'ru'
                  ? 'Ищете надежного поставщика СУГ, Дизельного топлива, Бензина, Базовых масел, Нефтехимии, Полимеров и Минерального сырья?'
                  : 'Are you looking for a trusted supplier of LPG, Diesel, Gasoline, Base Oils, Petrochemical Products, Plastics, and Minerals?'}
              </p>
              <p>
                {lang === 'ru' ? (
                  <>
                    <strong>«Jera Plus»</strong> — европейская компания, созданная и управляемая опытными топ-менеджерами в области поставок нефтепродуктов для всех отраслей: от сельского хозяйства и розничных сетей АЗС до крупных промышленных и транспортных предприятий.
                  </>
                ) : (
                  <>
                    <strong>“Jera Plus”</strong> is a European trading and logistics company managed by experienced senior executives in the supply of petroleum products and raw materials for all key industries — from agricultural sector and gas stations to large industrial enterprises.
                  </>
                )}
              </p>
              <p>
                {lang === 'ru' ? (
                  <>
                    Наша команда обладает многолетним практическим опытом покупки и продажи нефтепродуктов, организации сложной мультимодальной логистики (ADR) и торгового финансирования.
                  </>
                ) : (
                  <>
                    Our team brings decades of practical experience in the purchase and sale of petroleum products, multimodal dangerous-goods transport, and trade finance structuring.
                  </>
                )}
              </p>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-light)'
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ background: 'var(--card-light-bg)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--section-title-light)', fontFamily: 'var(--font-heading)' }}>
                    <span style={{ color: 'var(--hover-accent)' }}>{stat.value}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dark-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px', fontWeight: 600 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Responsive Video Player */}
          <div>
            <div style={{
              background: 'var(--card-light-bg)',
              border: '2px solid var(--border-light)',
              borderRadius: '20px',
              padding: '14px',
              boxShadow: 'var(--card-light-shadow)'
            }}>
              {/* Responsive 16:9 Video Container */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '12px',
                background: '#30355d'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                  title="Jera Plus Corporate Presentation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div style={{ padding: '16px 8px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#64748b', fontSize: '0.86rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#30355d', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#0eb0ee" /> Corporate Video Presentation
                </span>
                <span style={{ fontWeight: 600 }}>Podgorica, Montenegro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
