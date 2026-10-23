import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';
import {
  Droplet,
  Send,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export const ProductDetailPage = ({ onOpenQuote }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const products = content?.products || [];

  // Find product by slug or id
  const product = products.find(
    (p) => p.slug === slug || String(p.id) === String(slug)
  );

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--card-light-title)' }}>
          {lang === 'ru' ? 'Товар не найден' : 'Product Not Found'}
        </h2>
        <p style={{ color: 'var(--text-dark-muted)', marginBottom: '24px' }}>
          {lang === 'ru'
            ? 'Запрошенный товар не найден или был перемещен в архив.'
            : 'The requested product could not be found or has been moved.'}
        </p>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>{lang === 'ru' ? 'Вернуться в каталог' : 'Back to Catalog'}</span>
        </Link>
      </div>
    );
  }

  const title = (lang === 'ru' ? product.title_ru : product.title_en) || product.title_en;
  const category = (lang === 'ru' ? product.category_ru : product.category_en) || product.category_en;
  const excerpt = (lang === 'ru' ? product.excerpt_ru : product.excerpt_en) || product.excerpt_en;
  const description = (lang === 'ru' ? product.description_ru : product.description_en) || excerpt;
  const specs = Array.isArray(product.specs) ? product.specs : [];

  // SEO fields
  const seoTitle = `${title} | ${category} | Jera Plus`;
  const seoDesc = `${excerpt} Прямые оптовые поставки от европейской компании Jera Plus. Гарантированные параметры качества, таможенное оформление и логистика.`;
  const seoKeywords = `${title}, ${category}, оптовые поставки, Jera Plus, купить ${title} оптом, спецификация, паспорт качества, доставка цистернами, FCA DAP CIF`;

  // Related products
  const related = products
    .filter((p) => p.id !== product.id && p.category_en === product.category_en)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        image={product.image_url}
        type="product"
      />

      <div style={{ padding: '40px 0 80px', minHeight: '80vh' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav style={{ fontSize: '0.86rem', marginBottom: '28px', color: 'var(--text-dark-muted)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#0eb0ee', textDecoration: 'none' }}>
              {t('nav_home')}
            </Link>
            <span>/</span>
            <Link to="/products" style={{ color: '#0eb0ee', textDecoration: 'none' }}>
              {t('nav_products')}
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{title}</span>
          </nav>

          {/* Product Header / Hero Split */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '48px',
            marginBottom: '60px',
            alignItems: 'start'
          }}>
            {/* Left: Product Media Card */}
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--card-light-shadow)',
                border: '1px solid var(--border-light)',
                background: 'var(--card-light-bg)',
                height: '380px'
              }}>
                <img
                  src={product.image_url || '/images/bn_2.jpg'}
                  alt={title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'var(--category-pill-bg)',
                  color: 'var(--category-pill-text)',
                  border: '1px solid var(--category-pill-border)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  {category}
                </div>
              </div>

              {/* Fast Quote CTA Box */}
              <div style={{
                marginTop: '24px',
                background: 'var(--card-light-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: 'var(--card-light-shadow)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileCheck2 size={24} color="#0eb0ee" />
                  <div>
                    <strong style={{ fontSize: '1rem', color: 'var(--card-light-title)' }}>
                      {lang === 'ru' ? 'Запросить коммерческое предложение' : 'Request Commercial Offer'}
                    </strong>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-dark-muted)' }}>
                      {lang === 'ru' ? 'Расчет стоимости с доставкой в ваш регион' : 'Price quote calculated with delivery to your destination'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenQuote(`Product Inquiry: ${title}`)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '0.92rem', fontWeight: 700 }}
                >
                  <Send size={16} />
                  <span>{lang === 'ru' ? 'Получить расчет стоимости' : 'Request Price & Specs'}</span>
                </button>
              </div>
            </div>

            {/* Right: Product Details & Specs */}
            <div>
              <div className="badge badge-navy" style={{ marginBottom: '12px' }}>
                <Droplet size={14} color="var(--hover-accent)" />
                <span>{category}</span>
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
                color: 'var(--text-dark-muted)',
                fontSize: '1.02rem',
                lineHeight: 1.7,
                marginBottom: '32px'
              }}>
                {description}
              </div>

              {/* Technical Specifications Table (Crucial for B2B Energy Buyers & SEO) */}
              <div style={{
                background: 'var(--card-light-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '32px',
                boxShadow: 'var(--card-light-shadow)'
              }}>
                <div style={{
                  padding: '16px 20px',
                  background: 'var(--bg-subtle)',
                  borderBottom: '1px solid var(--border-light)',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  color: 'var(--card-light-title)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <ShieldCheck size={18} color="#0eb0ee" />
                  <span>{lang === 'ru' ? 'Технические характеристики и параметры' : 'Technical Specifications & Parameters'}</span>
                </div>

                {specs && specs.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <tbody>
                        {specs.map((spec, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid var(--border-light)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-subtle)' }}>
                            <td style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--card-light-title)', width: '50%' }}>
                              {lang === 'ru' ? (spec.param_ru || spec.name_ru || spec.param || spec.name) : (spec.param_en || spec.name_en || spec.param || spec.name)}
                            </td>
                            <td style={{ padding: '12px 20px', color: 'var(--text-dark-muted)', fontWeight: 700 }}>
                              {lang === 'ru' ? (spec.val_ru || spec.value_ru || spec.val || spec.value) : (spec.val_en || spec.value_en || spec.val || spec.value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ padding: '24px 20px', color: 'var(--text-dark-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {lang === 'ru'
                      ? 'Подробный паспорт качества (COA) и протокол лабораторных испытаний предоставляются по запросу под конкретную партию отгрузки.'
                      : 'Detailed Certificate of Analysis (COA) and official laboratory test reports are provided upon request per specific delivery batch.'}
                  </div>
                )}
              </div>

              {/* Delivery & Supply Terms */}
              <div style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '20px 24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--card-light-title)', marginBottom: '12px' }}>
                  <Truck size={18} color="#0eb0ee" />
                  <span>{lang === 'ru' ? 'Условия поставки и логистика' : 'Delivery Terms & Transportation'}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '0.88rem', color: 'var(--text-dark-muted)' }}>
                  <div>&bull; Incoterms: <strong>FCA, DAP, CIF, CFR</strong></div>
                  <div>&bull; {lang === 'ru' ? 'Транспорт: автогазовозы / бензовозы' : 'Transport: Road Tankers (ADR)'}</div>
                  <div>&bull; {lang === 'ru' ? 'Ж/Д поставки: цистерны (RTC)' : 'Rail: Tank Cars (RTC)'}</div>
                  <div>&bull; {lang === 'ru' ? 'Морская логистика: танкеры' : 'Marine: Coastal & Sea Tankers'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {related.length > 0 && (
            <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--card-light-title)', marginBottom: '24px' }}>
                {lang === 'ru' ? 'Другие товары в этой категории' : 'Related Products in this Category'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/products/${rel.slug || rel.id}`}
                    className="card-light"
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                  >
                    <div style={{ height: '160px', overflow: 'hidden' }}>
                      <img
                        src={rel.image_url || '/images/bn_2.jpg'}
                        alt={rel.title_en}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--card-light-title)', marginBottom: '6px' }}>
                        {lang === 'ru' ? rel.title_ru : rel.title_en}
                      </h4>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-dark-muted)', marginBottom: '12px', flex: 1 }}>
                        {lang === 'ru' ? rel.excerpt_ru : rel.excerpt_en}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0eb0ee', fontWeight: 700, fontSize: '0.84rem' }}>
                        <span>{lang === 'ru' ? 'Подробнее' : 'Learn More'}</span>
                        <ArrowRight size={14} />
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
