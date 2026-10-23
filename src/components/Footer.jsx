import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { MapPin, Phone, Mail, ArrowUp, Send, CheckCircle2 } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer = () => {
  const { lang, t } = useLanguage();
  const { isServerOnline, content, subscribeNewsletter } = useContent();
  const company = content?.company_info || {};

  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubError(lang === 'ru' ? 'Введите корректный email' : 'Please enter a valid email');
      return;
    }
    setSubmitting(true);
    setSubError('');
    try {
      const res = await subscribeNewsletter(email, hp);
      if (res.success) {
        setSubscribed(true);
        setEmail('');
      } else {
        setSubError(res.error || (lang === 'ru' ? 'Ошибка подписки' : 'Subscription failed'));
      }
    } catch (err) {
      setSubError(err.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--footer-bg)',
      color: 'var(--footer-text)',
      fontSize: '0.92rem',
      transition: 'background 0.3s ease'
    }}>
      {/* Main Footer Container */}
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        {/* Newsletter Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '28px 32px',
          marginBottom: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div style={{ maxWidth: '520px' }}>
            <h4 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
              {lang === 'ru' ? 'Подписка на котировки и аналитику рынка' : 'Subscribe to Commodity & Price Updates'}
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
              {lang === 'ru'
                ? 'Получайте свежие рыночные индикативы, графики поставок и коммерческие предложения прямо на вашу почту.'
                : 'Get weekly price indications, logistics updates, and wholesale product offers delivered to your inbox.'}
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flex: '1 1 320px', maxWidth: '440px', position: 'relative' }}>
            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="company_tax_id"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
            />

            {subscribed ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#34d399',
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '12px 18px',
                borderRadius: '8px',
                width: '100%',
                fontWeight: 600,
                fontSize: '0.92rem'
              }}>
                <CheckCircle2 size={18} />
                <span>{lang === 'ru' ? 'Спасибо! Вы успешно подписаны.' : 'Thank you! You are subscribed.'}</span>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === 'ru' ? 'Ваш рабочий email' : 'Your corporate email'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  {subError && (
                    <div style={{ position: 'absolute', bottom: '-20px', left: 0, color: '#f87171', fontSize: '0.75rem' }}>
                      {subError}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: 'var(--hover-accent)',
                    color: '#0e1428',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: submitting ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Send size={15} />
                  <span>{submitting ? '...' : (lang === 'ru' ? 'Подписаться' : 'Subscribe')}</span>
                </button>
              </>
            )}
          </form>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Col 1: Brand Logo & Goal */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <img
                src="/images/logo.png"
                alt="Jera Plus"
                style={{ height: '42px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p style={{ lineHeight: 1.6, marginBottom: '20px', color: '#ffffff' }}>
              {lang === 'ru'
                ? 'Наша цель — удовлетворение потребностей клиентов с гарантированным качеством, эффективной логистикой и лучшими ценами.'
                : 'Our goal is to meet the needs of our customers with guaranteed quality, efficient logistics, and better prices.'}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={company.linkedin || 'https://www.linkedin.com/company/jera-plus/'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hover-accent)';
                  e.currentTarget.style.color = 'var(--hover-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {lang === 'ru' ? 'Навигация' : 'Quick Navigation'}
            </h4>
            <div className="section-divider section-divider-cyan" style={{ width: '30px', height: '2px', marginBottom: '16px' }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#about" style={{ color: '#c5c8e1' }}>{t('nav_about')}</a></li>
              <li><a href="#products" style={{ color: '#c5c8e1' }}>{t('nav_products')}</a></li>
              <li><a href="#services" style={{ color: '#c5c8e1' }}>{t('nav_services')}</a></li>
              <li><a href="#news" style={{ color: '#c5c8e1' }}>{t('nav_news')}</a></li>
              <li><a href="#careers" style={{ color: '#c5c8e1' }}>{t('nav_careers')}</a></li>
              <li><a href="#contacts" style={{ color: '#c5c8e1' }}>{t('nav_contacts')}</a></li>
            </ul>
          </div>

          {/* Col 3: Product Highlights */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {lang === 'ru' ? 'Продукция' : 'Core Commodities'}
            </h4>
            <div className="section-divider section-divider-cyan" style={{ width: '30px', height: '2px', marginBottom: '16px' }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: '#c5c8e1' }}>
              <li>LPG (Propane, Butane, Mix)</li>
              <li>Diesel Fuel (ULSD 10 ppm) & Gasoline</li>
              <li>Base Oils (SN 150, SN 500)</li>
              <li>Petrochemical Solvents & Aromatics</li>
              <li>Plastics & Polymer Resins</li>
              <li>Flax Seeds (Linseeds)</li>
              <li>Minerals (Rutile & Ilmenite)</li>
            </ul>
          </div>

          {/* Col 4: Contact Teaser */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {lang === 'ru' ? 'Контакты' : 'Contact Us'}
            </h4>
            <div className="section-divider section-divider-cyan" style={{ width: '30px', height: '2px', marginBottom: '16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="#0eb0ee" />
                <span style={{ color: '#ffffff' }}>{company.address || 'Podgorica, Montenegro'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="#0eb0ee" />
                <a href={`tel:${company.phone || '+38267952403'}`} style={{ color: '#ffffff', fontWeight: 600 }}>
                  {company.phone || '+382 67 952403'}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="#0eb0ee" />
                <a href={`mailto:${company.email || 'office@jeraplus.com'}`} style={{ color: '#0eb0ee', fontWeight: 600 }}>
                  {company.email || 'office@jeraplus.com'}
                </a>
              </div>

              {/* Status Badge */}
              <div style={{
                marginTop: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '0.75rem',
                color: '#ffffff',
                width: 'fit-content'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0eb0ee' }} />
                <span>{isServerOnline ? 'Live Supabase Cloud' : 'Local Fast Cache'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div style={{
        background: 'var(--footer-copyright-bg)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '20px 0',
        transition: 'background 0.3s ease'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.84rem' }}>
          <div style={{ color: '#cbd5e1' }}>
            2026 <strong>© Jera Plus</strong>. {t('rights')}
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
