import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Newspaper, Calendar, ArrowRight, X } from 'lucide-react';

export const NewsSection = () => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const news = content?.news || [];

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const displayedNews = news.slice(0, visibleCount);

  return (
    <section
      id="news"
      className="section section-green"
      style={{
        borderBottom: '4px solid #0eb0ee',
        position: 'relative',
        backgroundImage: 'var(--colored-overlay-news), url("/images/parallax/progress.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <div className="badge" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.25)' }}>
            <Newspaper size={14} color="#0eb0ee" />
            <span>{t('badge_news')}</span>
          </div>
          <h2 className="section-title" style={{ color: '#ffffff' }}>
            {lang === 'ru' ? 'Новости и события' : 'News & Press Releases'}
          </h2>
          <div className="section-divider section-divider-cyan" style={{ margin: '8px auto 20px' }} />
          <p className="section-subtitle" style={{ color: 'var(--text-light-muted)', margin: '0 auto' }}>
            {lang === 'ru'
              ? 'Официальные сообщения компании Jera Plus об участии в конференциях, новых рынках и стратегических партнерствах.'
              : 'Official company press releases on market developments, international conferences, and global trading routes.'}
          </p>
        </div>

        {/* News Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '28px',
          marginBottom: '36px'
        }}>
          {displayedNews.map((item) => {
            const title = lang === 'ru' ? item.title_ru : item.title_en;
            const excerpt = lang === 'ru' ? item.excerpt_ru : item.excerpt_en;
            const itemUrl = `/news/${item.slug || item.id}`;

            return (
              <article
                key={item.id}
                className="card-light"
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Link to={itemUrl} style={{ height: '210px', overflow: 'hidden', position: 'relative', display: 'block' }}>
                  <img
                    src={item.image_url || '/images/bn_1.jpg'}
                    alt={title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'var(--category-pill-bg)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    color: 'var(--category-pill-text)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}>
                    <Calendar size={13} color="var(--hover-accent)" />
                    <span>{item.published_at || '2024'}</span>
                  </div>
                </Link>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', fontWeight: 800, lineHeight: 1.35, color: 'var(--card-light-title)' }}>
                    <Link to={itemUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {title}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                    {excerpt}
                  </p>

                  <Link
                    to={itemUrl}
                    style={{
                      color: 'var(--hover-accent)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      marginTop: 'auto',
                      width: 'fit-content'
                    }}
                  >
                    <span>{t('btn_more')}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All News Page CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/news"
            className="btn btn-navy"
            style={{ padding: '14px 32px', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span>{t('btn_all_news')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '36px' }}>
            <button
              onClick={() => setSelectedArticle(null)}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--hover-accent)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>
              <Calendar size={14} />
              <span>{selectedArticle.published_at}</span>
            </div>

            <h2 style={{ fontSize: '1.6rem', marginBottom: '12px', lineHeight: 1.3, color: 'var(--card-light-title)' }}>
              {lang === 'ru' ? selectedArticle.title_ru : selectedArticle.title_en}
            </h2>
            <div className="section-divider section-divider-cyan" style={{ marginBottom: '20px' }} />

            {selectedArticle.image_url && (
              <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '20px', maxHeight: '320px' }}>
                <img
                  src={selectedArticle.image_url}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <div style={{ color: 'var(--text-dark-muted)', lineHeight: 1.8, fontSize: '0.98rem', whiteSpace: 'pre-line' }}>
              {lang === 'ru' ? selectedArticle.content_ru : selectedArticle.content_en}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
