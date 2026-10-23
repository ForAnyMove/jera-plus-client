import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const ContactSection = ({ initialTopic = '' }) => {
  const { lang, t } = useLanguage();
  const { submitMessage, content } = useContent();
  const company = content?.company_info || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project: initialTopic || '',
    message: '',
    hp: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(lang === 'ru' ? 'Пожалуйста, заполните обязательные поля (*)' : 'Please fill all required fields (*)');
      return;
    }

    setSubmitting(true);
    setError('');

    const res = await submitMessage(formData);
    setSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        project: '',
        message: '',
        hp: ''
      });
    } else {
      setError(t('form_error'));
    }
  };

  return (
    <section id="contacts" className="section section-light" style={{ borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <div className="badge badge-navy">
            <Mail size={14} color="#0eb0ee" />
            <span>{t('badge_contacts')}</span>
          </div>
          <h2 className="section-title" style={{ color: '#30355d' }}>
            {lang === 'ru' ? 'Контакты и обратная связь' : 'Contact Us & Quotations'}
          </h2>
          <div className="section-divider section-divider-navy" style={{ margin: '8px auto 20px' }} />
          <p className="section-subtitle" style={{ color: '#64748b', margin: '0 auto' }}>
            {lang === 'ru'
              ? 'Свяжитесь с отделом трейдинга и логистики в Подгорице для оперативного расчета стоимости и условий поставки.'
              : 'Our sales and logistics department in Podgorica will provide price quotes and shipping schedules.'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left Column: Headquarters Details Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card-green" style={{ padding: '36px', background: 'var(--card-colored-bg)', border: '1px solid var(--card-colored-border)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: 800, color: '#fff' }}>
                {lang === 'ru' ? 'Головной офис' : 'Headquarters & Desk'}
              </h3>
              <div className="section-divider section-divider-cyan" style={{ marginBottom: '24px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="teaser-icon-round teaser-icon-round-green" style={{ flexShrink: 0 }}>
                    <MapPin size={22} color="var(--hover-accent)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      {lang === 'ru' ? 'Адрес' : 'Location'}
                    </div>
                    <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.98rem' }}>
                      {company.address || 'Podgorica, Montenegro'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="teaser-icon-round teaser-icon-round-green" style={{ flexShrink: 0 }}>
                    <Phone size={22} color="var(--hover-accent)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      {lang === 'ru' ? 'Телефон' : 'Phone'}
                    </div>
                    <a href="tel:+38267952403" style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.98rem' }}>
                      {company.phone || '+382 67 952403'}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="teaser-icon-round teaser-icon-round-green" style={{ flexShrink: 0 }}>
                    <Mail size={22} color="var(--hover-accent)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Email
                    </div>
                    <a href="mailto:office@jeraplus.com" style={{ color: 'var(--hover-accent)', fontWeight: 700, fontSize: '0.98rem' }}>
                      {company.email || 'office@jeraplus.com'}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div className="teaser-icon-round teaser-icon-round-green" style={{ flexShrink: 0 }}>
                    <Clock size={22} color="var(--hover-accent)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      {lang === 'ru' ? 'Режим работы' : 'Trading Desk Hours'}
                    </div>
                    <div style={{ color: '#ffffff', fontSize: '0.92rem' }}>
                      Mon – Fri: 08:30 – 18:00 (CET)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="card-light" style={{ padding: '12px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '170px', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe
                  title="Podgorica Montenegro Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?q=Podgorica,%20Montenegro&t=&z=13&ie=UTF8&iwloc=&output=embed"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="card-light" style={{ padding: '38px', borderTop: '4px solid var(--footer-card-topborder)', boxShadow: 'var(--card-light-shadow)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '4px', color: 'var(--section-title-light)' }}>
              {t('form_title')}
            </h3>
            <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              {t('form_desc')}
            </p>

            {success ? (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                padding: '28px',
                textAlign: 'center'
              }}>
                <CheckCircle size={44} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: '#15803d', fontSize: '1.2rem', marginBottom: '6px', fontWeight: 700 }}>
                  {t('form_success_title')}
                </h4>
                <p style={{ color: '#374151', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {t('form_success_desc')}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn btn-outline-cyan"
                  style={{ marginTop: '18px', padding: '10px 22px' }}
                >
                  {lang === 'ru' ? 'Отправить еще запрос' : 'Send Another Request'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="user_website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.hp || ''}
                  onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                  style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                />

                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#30355d', marginBottom: '4px' }}>
                      {t('form_name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        color: '#1e293b',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#30355d', marginBottom: '4px' }}>
                      {t('form_email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        color: '#1e293b',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                      placeholder="email@company.com"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#30355d', marginBottom: '4px' }}>
                      {t('form_phone')}
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        color: '#1e293b',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                      placeholder="+382 ... / +49 ..."
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#30355d', marginBottom: '4px' }}>
                      {t('form_company')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        color: '#1e293b',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                      placeholder="Enterprise / Trading House"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#30355d', marginBottom: '4px' }}>
                    {t('form_project')}
                  </label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      color: '#1e293b',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                    placeholder="e.g. LPG Mix, 500 MT, CIF Bar Port"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#30355d', marginBottom: '4px' }}>
                    {t('form_message')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      color: '#1e293b',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    placeholder={lang === 'ru' ? 'Укажите требуемый объем, базис поставки Incoterms (CIF, FOB, DAP) и желаемые сроки...' : 'Specify target volumes, Incoterms delivery basis (CIF, FOB, DAP), and timeline...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '15px', marginTop: '6px' }}
                >
                  <Send size={18} />
                  <span>{submitting ? t('btn_sending') : t('btn_send_message')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
