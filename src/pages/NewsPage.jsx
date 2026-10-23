import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';
import { Newspaper, Calendar, ArrowRight } from 'lucide-react';

export const NewsPage = () => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const news = content?.news || [];

  const pageTitle = lang === 'ru'
    ? 'Новости компании и аналитика энергетического рынка'
    : 'Company News & Commodity Market Insights';

  const pageDesc = lang === 'ru'
    ? 'Официальные пресс-релизы Jera Plus: участие в международных форумах Argus LPG, Lubricant Expo, аналитика рынка нефтепродуктов и новые маршруты поставок.'
    : 'Official Jera Plus press releases: international Argus LPG conference attendance, Lubricant Expo developments, and market expansion.';

  const keywords = lang === 'ru'
    ? 'новости Jera Plus, конференция Argus LPG, рынок СУГ, выставка Lubricant Expo, оптовая торговля энергоносителями'
    : 'Jera Plus news, Argus LPG conference, Lubricant Expo Düsseldorf, wholesale energy insights, European commodity market';

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
            <span style={{ color: 'var(--text-main)' }}>{t('nav_news')}</span>
          </nav>

          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
            <div className="badge badge-navy">
              <Newspaper size={14} color="var(--hover-accent)" />
              <span>{t('badge_news')}</span>
            </div>
            <h1 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '14px' }}>
              {pageTitle}
            </h1>
            <div className="section-divider section-divider-cyan" style={{ margin: '8px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {pageDesc}
            </p>
          </div>

          {/* News Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '32px'
          }}>
            {news.map((item) => {
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
                  <Link to={itemUrl} style={{ height: '220px', overflow: 'hidden', position: 'relative', display: 'block' }}>
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
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 800, lineHeight: 1.35, color: 'var(--card-light-title)' }}>
                      <Link to={itemUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {title}
                      </Link>
                    </h2>
                    <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
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
                        marginTop: 'auto'
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
        </div>
      </div>
    </>
  );
};
