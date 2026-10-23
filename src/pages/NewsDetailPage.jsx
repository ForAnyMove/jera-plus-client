import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';
import { Calendar, ArrowLeft, ArrowRight, Newspaper } from 'lucide-react';

export const NewsDetailPage = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const news = content?.news || [];

  const article = news.find(
    (n) => n.slug === slug || String(n.id) === String(slug)
  );

  if (!article) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--card-light-title)' }}>
          {lang === 'ru' ? 'Новость не найдена' : 'Article Not Found'}
        </h2>
        <p style={{ color: 'var(--text-dark-muted)', marginBottom: '24px' }}>
          {lang === 'ru'
            ? 'Запрошенная статья не найдена или была удалена.'
            : 'The requested article could not be found or has been removed.'}
        </p>
        <Link to="/news" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>{lang === 'ru' ? 'Все новости' : 'All News'}</span>
        </Link>
      </div>
    );
  }

  const title = (lang === 'ru' ? article.title_ru : article.title_en) || article.title_en;
  const excerpt = (lang === 'ru' ? article.excerpt_ru : article.excerpt_en) || article.excerpt_en;
  const body = (lang === 'ru' ? article.content_ru : article.content_en) || excerpt;

  const seoTitle = `${title} | Jera Plus News`;
  const seoDesc = excerpt;
  const seoKeywords = `${title}, Jera Plus, новости энергетики, СУГ, дизель, европейский рынок, пресс-релиз`;

  // Other recent articles
  const recentArticles = news
    .filter((n) => n.id !== article.id)
    .slice(0, 2);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        image={article.image_url}
        type="article"
      />

      <div style={{ padding: '40px 0 80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Breadcrumbs */}
          <nav style={{ fontSize: '0.86rem', marginBottom: '28px', color: 'var(--text-dark-muted)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#0eb0ee', textDecoration: 'none' }}>
              {t('nav_home')}
            </Link>
            <span>/</span>
            <Link to="/news" style={{ color: '#0eb0ee', textDecoration: 'none' }}>
              {t('nav_news')}
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{title}</span>
          </nav>

          {/* Article Header */}
          <header style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'rgba(14, 176, 238, 0.12)',
              color: '#0eb0ee',
              fontWeight: 700,
              fontSize: '0.82rem',
              marginBottom: '16px'
            }}>
              <Calendar size={14} />
              <span>{article.published_at || '2024'}</span>
            </div>

            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              lineHeight: 1.3,
              color: 'var(--card-light-title)',
              marginBottom: '20px'
            }}>
              {title}
            </h1>

            <div className="section-divider section-divider-cyan" style={{ margin: '0 0 24px 0' }} />

            <div style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              fontWeight: 600,
              color: 'var(--card-light-title)',
              marginBottom: '28px'
            }}>
              {excerpt}
            </div>
          </header>

          {/* Featured Image */}
          {article.image_url && (
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '36px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--card-light-shadow)'
            }}>
              <img
                src={article.image_url}
                alt={title}
                style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          {/* Article Body */}
          <div style={{
            fontSize: '1.05rem',
            lineHeight: 1.85,
            color: 'var(--text-dark-muted)',
            marginBottom: '48px',
            whiteSpace: 'pre-line'
          }}>
            {body}
          </div>

          {/* Back Button */}
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px', marginBottom: '60px' }}>
            <Link to="/news" className="btn btn-outline-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <ArrowLeft size={16} />
              <span>{lang === 'ru' ? 'Ко всем новостям' : 'Back to All News'}</span>
            </Link>
          </div>

          {/* Recent News Widget */}
          {recentArticles.length > 0 && (
            <div style={{
              background: 'var(--card-light-bg)',
              border: '1px solid var(--border-light)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: 'var(--card-light-shadow)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--card-light-title)', marginBottom: '18px' }}>
                {lang === 'ru' ? 'Читайте также' : 'Related Press Releases'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {recentArticles.map((ra) => (
                  <Link
                    key={ra.id}
                    to={`/news/${ra.slug || ra.id}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '14px', alignItems: 'center' }}
                  >
                    <div style={{ width: '70px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={ra.image_url || '/images/bn_1.jpg'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--card-light-title)', margin: '0 0 4px', lineHeight: 1.3 }}>
                        {lang === 'ru' ? ra.title_ru : ra.title_en}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: '#0eb0ee' }}>
                        {ra.published_at}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
