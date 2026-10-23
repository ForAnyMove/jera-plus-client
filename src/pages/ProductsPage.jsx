import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { SEO } from '../components/SEO';
import { Droplet, ArrowRight, Send, Search, ShieldCheck, Truck, Award } from 'lucide-react';

export const ProductsPage = ({ onOpenQuote }) => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const products = content?.products || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label_en: 'All Products', label_ru: 'Вся продукция' },
    { id: 'petroleum', label_en: 'Petroleum & Gas', label_ru: 'Нефтепродукты и Газ' },
    { id: 'petrochemicals', label_en: 'Petrochemicals', label_ru: 'Нефтехимия' },
    { id: 'polymers', label_en: 'Polymers', label_ru: 'Полимеры' },
    { id: 'agri', label_en: 'Agriculture', label_ru: 'Агропродукция' },
    { id: 'minerals', label_en: 'Minerals', label_ru: 'Минералы' }
  ];

  const filtered = products.filter((p) => {
    // Category match
    if (activeCategory !== 'all') {
      const cat = (p.category_en || '').toLowerCase();
      if (activeCategory === 'petroleum' && !(cat.includes('petroleum') || cat.includes('gas'))) return false;
      if (activeCategory === 'petrochemicals' && !cat.includes('petrochemical')) return false;
      if (activeCategory === 'polymers' && !(cat.includes('polymer') || cat.includes('plastic'))) return false;
      if (activeCategory === 'agri' && !(cat.includes('agricultural') || cat.includes('seed'))) return false;
      if (activeCategory === 'minerals' && !cat.includes('mineral')) return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleEn = (p.title_en || '').toLowerCase();
      const titleRu = (p.title_ru || '').toLowerCase();
      const descEn = (p.description_en || '').toLowerCase();
      const descRu = (p.description_ru || '').toLowerCase();
      return titleEn.includes(q) || titleRu.includes(q) || descEn.includes(q) || descRu.includes(q);
    }

    return true;
  });

  const pageTitle = lang === 'ru'
    ? 'Каталог нефтепродуктов, СУГ, масел и полимеров'
    : 'Wholesale Petroleum, LPG, Oils & Polymer Catalog';

  const pageDesc = lang === 'ru'
    ? 'Полный каталог продукции Jera Plus: прямые оптовые поставки СУГ (пропан-бутан), дизеля ULSD 10 ppm, бензина, базовых масел SN 150/500, нефтехимии, пластиков и семян льна по Европе и миру.'
    : 'Complete product catalog by Jera Plus: wholesale direct deliveries of LPG, ULSD diesel, gasoline, base oils SN 150/500, petrochemical solvents, polymers, and linseeds across Europe.';

  const keywords = lang === 'ru'
    ? 'купить СУГ оптом, дизельное топливо оптом, базовые масла SN 150, базовые масла SN 500, бензин А-95 оптом, нефтехимия растворители, полиэтилен полипропилен оптом, семена льна экспорт'
    : 'wholesale LPG supply, buy diesel fuel bulk Europe, base oils SN 150 SN 500, wholesale gasoline, petrochemical solvents, industrial polymers exporter, flax seeds bulk';

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
            <span style={{ color: 'var(--text-main)' }}>{t('nav_products')}</span>
          </nav>

          {/* Header Banner */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
            <div className="badge badge-navy">
              <Droplet size={14} color="var(--hover-accent)" />
              <span>{t('badge_products')}</span>
            </div>
            <h1 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '14px' }}>
              {pageTitle}
            </h1>
            <div className="section-divider section-divider-cyan" style={{ margin: '8px auto 20px' }} />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {pageDesc}
            </p>
          </div>

          {/* Search Bar & Categories */}
          <div style={{
            background: 'var(--card-light-bg)',
            border: '1px solid var(--border-light)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '40px',
            boxShadow: 'var(--card-light-shadow)'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'ru' ? 'Поиск по наименованию (например: СУГ, Дизель, Масла, Лён)...' : 'Search products (e.g., LPG, Diesel, Base Oils, Flax)...'}
                style={{
                  width: '100%',
                  padding: '12px 18px 12px 46px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <Search size={18} color="var(--text-dark-muted)" style={{ position: 'absolute', left: '16px', top: '15px' }} />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
          </div>

          {/* Results Count */}
          <div style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-dark-muted)' }}>
            {lang === 'ru'
              ? `Найдено товаров: ${filtered.length}`
              : `Showing ${filtered.length} products`}
          </div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px',
            marginBottom: '60px'
          }}>
            {filtered.map((p) => {
              const title = lang === 'ru' ? p.title_ru : p.title_en;
              const category = lang === 'ru' ? p.category_ru : p.category_en;
              const excerpt = lang === 'ru' ? p.excerpt_ru : p.excerpt_en;
              const productUrl = `/products/${p.slug || p.id}`;

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
                  <Link to={productUrl} style={{ position: 'relative', height: '220px', overflow: 'hidden', display: 'block' }}>
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
                      top: '12px',
                      left: '12px',
                      background: 'var(--category-pill-bg)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--category-pill-text)',
                      border: '1px solid var(--category-pill-border)'
                    }}>
                      {category}
                    </div>
                  </Link>

                  {/* Body */}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '10px', fontWeight: 800, color: 'var(--card-light-title)' }}>
                      <Link to={productUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {title}
                      </Link>
                    </h2>
                    <p style={{ color: 'var(--text-dark-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                      {excerpt}
                    </p>

                    <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                      <Link
                        to={productUrl}
                        className="btn btn-outline-cyan"
                        style={{ flex: 1, padding: '10px 16px', fontSize: '0.84rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <span>{t('btn_more')}</span>
                        <ArrowRight size={15} />
                      </Link>

                      <button
                        onClick={() => onOpenQuote(`Inquiry: ${title}`)}
                        className="btn btn-primary"
                        style={{ padding: '10px 18px', fontSize: '0.84rem' }}
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

          {/* SEO Keyword & Trust Content Block (Crucial for Client's SEO Requirements) */}
          <div style={{
            background: 'var(--card-light-bg)',
            border: '1px solid var(--border-light)',
            borderRadius: '16px',
            padding: '36px',
            boxShadow: 'var(--card-light-shadow)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--card-light-title)', marginBottom: '16px' }}>
              {lang === 'ru'
                ? 'Надежные оптовые поставки сырья и энергоносителей от Jera Plus'
                : 'Reliable Wholesale Energy & Commodity Supplies by Jera Plus'}
            </h3>
            <div style={{ color: 'var(--text-dark-muted)', fontSize: '0.95rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p>
                {lang === 'ru'
                  ? 'Компания Jera Plus осуществляет комплексные поставки сырья и продуктов переработки для энергетического, транспортного, химического и агропромышленного секторов. Мы сотрудничаем напрямую с сертифицированными нефтеперерабатывающими заводами Европы и гарантируем полное соответствие спецификаций стандартам EN 589 (для сжиженного углеводородного газа СУГ / LPG), EN 590 (для ультранизкосернистого дизельного топлива ULSD 10 ppm), а также международным нормам качества ASTM и ГОСТ.'
                  : 'Jera Plus delivers integrated raw material and refined fuel supplies for the energy, transport, chemical, and agricultural sectors. Sourcing directly from certified European refineries, we ensure full compliance with EN 589 (Liquefied Petroleum Gas / LPG), EN 590 (Ultra-Low Sulfur Diesel ULSD 10 ppm), and global ASTM/ISO benchmarks.'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '10px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <ShieldCheck size={22} color="#0eb0ee" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--card-light-title)' }}>
                      {lang === 'ru' ? 'Гарантированное качество' : 'Guaranteed Quality Parameters'}
                    </strong>
                    <div style={{ fontSize: '0.86rem', marginTop: '2px' }}>
                      {lang === 'ru' ? 'Паспорта качества, сертификаты соответствия SGS/Saybolt на каждую отгрузку.' : 'Quality passports and SGS/Saybolt inspection reports for every shipment.'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Truck size={22} color="#0eb0ee" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--card-light-title)' }}>
                      {lang === 'ru' ? 'Мультимодальная логистика' : 'Multimodal Transport Network'}
                    </strong>
                    <div style={{ fontSize: '0.86rem', marginTop: '2px' }}>
                      {lang === 'ru' ? 'Доставка автогазовозами (ADR), ж/д цистернами и морскими танкерами на условиях FCA, DAP, CIF.' : 'Road gas tankers (ADR), rail cars, and sea vessel charters on FCA, DAP, and CIF terms.'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Award size={22} color="#0eb0ee" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--card-light-title)' }}>
                      {lang === 'ru' ? 'Гибкие условия расчетов' : 'Structured Trade Finance'}
                    </strong>
                    <div style={{ fontSize: '0.86rem', marginTop: '2px' }}>
                      {lang === 'ru' ? 'Аккредитивы (LC), банковские гарантии (SBLC) и форвардные контракты.' : 'Letters of credit (LC), standby letters (SBLC), and flexible hedging contracts.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
