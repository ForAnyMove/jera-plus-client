import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Droplet, ArrowRight, X, FileText, Send } from 'lucide-react';

export const ProductsSection = ({ onSelectProductForQuote }) => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const products = content?.products || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: 'all', label_en: 'All Products', label_ru: 'Вся продукция' },
    { id: 'petroleum', label_en: 'Petroleum & Gas', label_ru: 'Нефтепродукты и Газ' },
    { id: 'petrochemicals', label_en: 'Petrochemicals', label_ru: 'Нефтехимия' },
    { id: 'polymers', label_en: 'Polymers', label_ru: 'Полимеры' },
    { id: 'agri', label_en: 'Agriculture', label_ru: 'Агропродукция' },
    { id: 'minerals', label_en: 'Minerals', label_ru: 'Минералы' }
  ];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    const cat = (p.category_en || '').toLowerCase();
    if (activeCategory === 'petroleum') return cat.includes('petroleum') || cat.includes('gas');
    if (activeCategory === 'petrochemicals') return cat.includes('petrochemical');
    if (activeCategory === 'polymers') return cat.includes('polymer') || cat.includes('plastic');
    if (activeCategory === 'agri') return cat.includes('agricultural') || cat.includes('seed');
    if (activeCategory === 'minerals') return cat.includes('mineral');
    return true;
  });

  return (
    <section id="products" className="section section-pattern" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <div className="badge badge-navy">
            <Droplet size={14} color="var(--hover-accent)" />
            <span>{t('badge_products')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ru' ? 'Продукция компании' : 'Wholesale Product Portfolio'}
          </h2>
          <div className="section-divider section-divider-cyan" style={{ margin: '8px auto 20px' }} />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {lang === 'ru'
              ? 'Прямые оптовые поставки сертифицированных энергоносителей, полимеров и сырья с контролем параметров качества.'
              : 'Direct bulk supplies of certified petroleum commodities, petrochemicals, and minerals with certified quality parameters.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-tab ${isSelected ? 'active' : ''}`}
              >
                {lang === 'ru' ? cat.label_ru : cat.label_en}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '28px'
        }}>
          {filteredProducts.map((p) => {
            const title = lang === 'ru' ? p.title_ru : p.title_en;
            const category = lang === 'ru' ? p.category_ru : p.category_en;
            const excerpt = lang === 'ru' ? p.excerpt_ru : p.excerpt_en;

            return (
              <div
                key={p.id}
                className="card-light"
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={p.image_url || '/images/bn_2.jpg'}
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
                    top: '14px',
                    left: '14px',
                    background: 'var(--category-pill-bg)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--category-pill-text)',
                    border: '1px solid var(--category-pill-border)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}>
                    {category}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.22rem', marginBottom: '10px', fontWeight: 800, color: 'var(--card-light-title)' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                    {excerpt}
                  </p>

                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="btn btn-outline-cyan"
                      style={{ flex: 1, padding: '10px 16px', fontSize: '0.82rem' }}
                    >
                      <FileText size={15} />
                      <span>{t('btn_more')}</span>
                    </button>

                    <button
                      onClick={() => onSelectProductForQuote(title)}
                      className="btn btn-primary"
                      style={{ padding: '10px 18px', fontSize: '0.82rem' }}
                      title="Request Quote"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '36px' }}>
            <button
              onClick={() => setSelectedProduct(null)}
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
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--hover-accent)', textTransform: 'uppercase', fontWeight: 700 }}>
                {lang === 'ru' ? selectedProduct.category_ru : selectedProduct.category_en}
              </span>
              <h2 style={{ fontSize: '1.75rem', marginTop: '4px', color: 'var(--card-light-title)' }}>
                {lang === 'ru' ? selectedProduct.title_ru : selectedProduct.title_en}
              </h2>
              <div className="section-divider section-divider-cyan" style={{ marginTop: '8px', marginBottom: '16px' }} />
            </div>

            <p style={{ color: 'var(--text-dark-muted)', lineHeight: 1.7, marginBottom: '24px', fontSize: '0.98rem' }}>
              {lang === 'ru' ? selectedProduct.description_ru : selectedProduct.description_en}
            </p>

            {/* Specs Table */}
            {selectedProduct.specs && selectedProduct.specs.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1.02rem', color: 'var(--card-light-title)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                  <FileText size={18} color="var(--hover-accent)" />
                  {t('specs_heading')}
                </h4>
                <div style={{ background: 'var(--bg-subtle)', borderRadius: '10px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                  {selectedProduct.specs.map((spec, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '11px 16px',
                        borderBottom: i < selectedProduct.specs.length - 1 ? '1px solid var(--border-light)' : 'none',
                        background: i % 2 === 0 ? 'var(--card-light-bg)' : 'var(--bg-subtle)'
                      }}
                    >
                      <span style={{ color: 'var(--text-dark-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {lang === 'ru' ? spec.name_ru : spec.name_en}
                      </span>
                      <span style={{ color: 'var(--card-light-title)', fontWeight: 700, fontSize: '0.9rem', textAlign: 'right' }}>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                const prodTitle = lang === 'ru' ? selectedProduct.title_ru : selectedProduct.title_en;
                setSelectedProduct(null);
                onSelectProductForQuote(prodTitle);
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '15px' }}
            >
              <span>{t('request_spec_btn')}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
