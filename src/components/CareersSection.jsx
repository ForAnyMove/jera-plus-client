import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { Users, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const DEFAULT_VACANCIES = [
  {
    title_en: 'Senior LPG Trader & Logistics Manager',
    title_ru: 'Ведущий трейдер СУГ (LPG) и менеджер логистики',
    location_en: 'Europe / Remote / Podgorica HQ',
    location_ru: 'Европа / Удаленно / Офис в Подгорице',
    resp_en: [
      'Organizing wholesale supply chains of liquefied petroleum gas (LPG) from European refineries and ports.',
      'Contract negotiations with terminal operators, fuel stations, and regional gas distributors.',
      'Logistics coordination by specialized road gas trucks and rail tank cars.'
    ],
    resp_ru: [
      'Организация оптовых поставок сжиженного углеводородного газа (СУГ) с европейских заводов и терминалов.',
      'Проведение переговоров с операторами ГНС, сетями АЗС и оптовыми дистрибьюторами.',
      'Контроль ритмичности отгрузок автогазовозами и ж/д цистернами.'
    ],
    req_en: 'Min. 2 years of proven trading experience in LPG/energy commodities with established market contacts.',
    req_ru: 'Опыт работы в оптовом трейдинге СУГ от 2 лет, знание специфики рынка и наличие деловых связей.'
  },
  {
    title_en: 'Agricultural Commodities & Flax Trader',
    title_ru: 'Трейдер агрокультур и масличного льна',
    location_en: 'EU Countries / Remote',
    location_ru: 'Страны ЕС / Удаленно',
    resp_en: [
      'Developing wholesale export routes of golden and brown flax seeds to European crushers and food producers.',
      'Sourcing from agricultural elevators and farmer associations with phytosanitary oversight.',
      'Executing forward contracts and international logistics management.'
    ],
    resp_ru: [
      'Развитие экспортных поставок масличного и золотистого льна переработчикам в странах ЕС.',
      'Взаимодействие с элеваторами и производителями, контроль качества и фитосанитарных норм.',
      'Заключение форвардных контрактов и координация доставки.'
    ],
    req_en: 'Min. 2 years experience in grain or oilseed export to EU nations, understanding of GAFTA/FOSFA contracts.',
    req_ru: 'Опыт в экспорте зерновых или масличных культур от 2 лет, понимание европейских регламентов качества.'
  }
];

export const CareersSection = () => {
  const { lang, t } = useLanguage();
  const { content } = useContent();

  const rawVacancies = content?.vacancies && content.vacancies.length > 0
    ? content.vacancies.filter((v) => v.is_active !== false)
    : DEFAULT_VACANCIES;

  const vacancies = rawVacancies.length > 0 ? rawVacancies : DEFAULT_VACANCIES;

  return (
    <section id="careers" className="section section-light-alt" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <div className="badge badge-navy">
            <Users size={14} color="var(--hover-accent)" />
            <span>{t('badge_careers')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ru' ? 'Карьера в компании' : 'Careers at Jera Plus'}
          </h2>
          <div className="section-divider section-divider-cyan" style={{ margin: '8px auto 20px' }} />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {lang === 'ru'
              ? 'Приглашаем опытных специалистов в области международной торговли нефтепродуктами и агросырьем.'
              : 'We invite ambitious trading professionals and freight managers to join our expanding team.'}
          </p>
        </div>

        {/* Vacancies Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '28px',
          marginBottom: '36px'
        }}>
          {vacancies.map((v, idx) => {
            const title = (lang === 'ru' ? v.title_ru : v.title_en) || v.title_en || 'Career Opportunity';
            const location = (lang === 'ru' ? v.location_ru : v.location_en) || v.location_en || 'Podgorica / Remote';
            const rawResps = lang === 'ru' ? (v.resp_ru || v.resp_en) : (v.resp_en || v.resp_ru);
            const resps = Array.isArray(rawResps)
              ? rawResps
              : (typeof rawResps === 'string' ? rawResps.split('\n').map(s => s.trim()).filter(Boolean) : []);
            const req = (lang === 'ru' ? v.req_ru : v.req_en) || v.req_en || '';

            return (
              <div
                key={idx}
                className="card-light"
                style={{
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--card-light-title)' }}>
                    {title}
                  </h3>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#0eb0ee', fontWeight: 700, textTransform: 'uppercase', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>📍 {location}</span>
                </div>

                <div style={{ marginBottom: '20px', flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: '#30355d', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '10px' }}>
                    {lang === 'ru' ? 'Обязанности:' : 'Key Responsibilities:'}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {resps.map((r, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#475569', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} color="#0eb0ee" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#475569' }}>
                    <strong style={{ color: '#30355d' }}>{lang === 'ru' ? 'Требования: ' : 'Profile: '}</strong>{req}
                  </span>
                </div>

                <a
                  href={`mailto:office@jeraplus.com?subject=Job Application: ${encodeURIComponent(v.title_en)}`}
                  className="btn btn-outline-cyan"
                  style={{ width: '100%', padding: '12px', fontSize: '0.86rem' }}
                >
                  <Mail size={16} />
                  <span>{lang === 'ru' ? 'Отправить резюме' : 'Send CV / Application'}</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.92rem' }}>
          {lang === 'ru' ? 'Резюме и предложения о сотрудничестве:' : 'Submit your CV or cooperation proposal to:'}{' '}
          <a href="mailto:office@jeraplus.com" style={{ color: '#0eb0ee', fontWeight: 700 }}>office@jeraplus.com</a>
        </div>
      </div>
    </section>
  );
};
