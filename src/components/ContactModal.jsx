import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactModal = ({ isOpen, onClose, prefilledTopic = '' }) => {
  const { lang, t } = useLanguage();
  const { submitMessage } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project: prefilledTopic,
    message: '',
    hp: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (prefilledTopic) {
      setFormData((prev) => ({ ...prev, project: prefilledTopic }));
    }
  }, [prefilledTopic]);

  if (!isOpen) return null;

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
    } else {
      setError(t('form_error'));
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '36px' }}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: '#fff',
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

        <h3 style={{ fontSize: '1.45rem', fontWeight: 700, marginBottom: '6px', color: 'var(--card-light-title)' }}>
          {t('btn_quote')}
        </h3>
        <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
          {lang === 'ru'
            ? 'Свяжитесь с отделом трейдинга Jera Plus для согласования условий отгрузки и цен.'
            : 'Get in touch with Jera Plus trading desk to receive pricing, availability, and logistics terms.'}
        </p>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ color: 'var(--card-light-title)', fontSize: '1.2rem', marginBottom: '8px' }}>
              {t('form_success_title')}
            </h4>
            <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {t('form_success_desc')}
            </p>
            <button onClick={handleClose} className="btn btn-primary" style={{ padding: '10px 24px' }}>
              {t('btn_close')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="company_url_hp"
              tabIndex={-1}
              autoComplete="off"
              value={formData.hp || ''}
              onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
              style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
            />

            {error && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--card-light-title)', marginBottom: '4px' }}>
                  {t('form_name')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-dark)', fontSize: '0.9rem' }}
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--card-light-title)', marginBottom: '4px' }}>
                  {t('form_email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-dark)', fontSize: '0.9rem' }}
                  placeholder="email@company.com"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--card-light-title)', marginBottom: '4px' }}>
                  {t('form_company')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-dark)', fontSize: '0.9rem' }}
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--card-light-title)', marginBottom: '4px' }}>
                  {t('form_phone')}
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-dark)', fontSize: '0.9rem' }}
                  placeholder="+382 ..."
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--card-light-title)', marginBottom: '4px' }}>
                {t('form_project')}
              </label>
              <input
                type="text"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-dark)', fontSize: '0.9rem' }}
                placeholder="Product / Target volume / Destination"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--card-light-title)', marginBottom: '4px' }}>
                {t('form_message')}
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-dark)', fontSize: '0.9rem', resize: 'vertical' }}
                placeholder={lang === 'ru' ? 'Опишите ваши требования к товару и условиям доставки...' : 'Provide details regarding product grade, delivery terms, etc.'}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', marginTop: '6px' }}
            >
              <Send size={16} />
              <span>{submitting ? t('btn_sending') : t('btn_send_message')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
