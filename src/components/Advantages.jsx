import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Award, Ship, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

const iconMap = {
  Award,
  Ship,
  ShieldCheck,
  TrendingUp
};

export const Advantages = () => {
  const { lang } = useLanguage();
  const { content } = useContent();
  const advantages = content?.advantages || [];

  return (
    <section
      className="section section-green"
      style={{
        padding: '75px 0',
        borderBottom: '4px solid #0eb0ee',
        position: 'relative',
        backgroundImage: 'var(--colored-overlay-adv), url("/images/parallax/info.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '36px' }}>
          <h2 className="section-title" style={{ color: '#ffffff' }}>
            {lang === 'ru' ? 'Преимущества' : 'Advantages'}
          </h2>
          <div className="section-divider section-divider-cyan" />
        </div>

        {/* 4 Columns (matching webcopy col-md-3 col-sm-6 teasers) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {advantages.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const title = lang === 'ru' ? item.title_ru : item.title_en;
            const desc = lang === 'ru' ? item.desc_ru : item.desc_en;

            return (
              <div
                key={idx}
                className="card-green"
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  background: 'var(--card-colored-bg)',
                  border: '1px solid var(--card-colored-border)',
                  backdropFilter: 'blur(4px)'
                }}
              >
                <div className="teaser-icon-round teaser-icon-round-green" style={{ flexShrink: 0 }}>
                  <IconComponent size={24} color="#0eb0ee" />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    <span style={{ color: '#0eb0ee' }}>{title}</span>
                  </h3>
                  <p style={{ color: 'var(--text-light-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
