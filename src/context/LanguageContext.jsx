import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_products: 'Products',
    nav_services: 'Services',
    nav_news: 'News',
    nav_careers: 'Careers',
    nav_contacts: 'Contacts',
    btn_quote: 'Request Quote',
    btn_more: 'Learn More',
    btn_all_products: 'Explore All Products',
    btn_all_services: 'View All Services',
    btn_all_news: 'All Press Releases',
    btn_send_message: 'Send Message',
    btn_sending: 'Sending...',
    btn_close: 'Close',
    badge_experience: 'Established 2018 • European Standards',
    badge_company: 'Corporate Profile',
    badge_products: 'Commodity Trading',
    badge_services: 'Comprehensive Solutions',
    badge_news: 'Market Insights',
    badge_careers: 'Career Opportunities',
    badge_contacts: 'Global Reach',
    form_title: 'Direct Inquiry to Sales & Logistics',
    form_desc: 'Fill out the form below to receive commercial offers, specifications, and freight calculations within 24 hours.',
    form_name: 'Full Name / Contact Person *',
    form_email: 'Corporate Email *',
    form_phone: 'Direct Phone / WhatsApp',
    form_company: 'Company Name *',
    form_project: 'Commodity / Volume / Destination Port',
    form_message: 'Detailed Inquiry Specifications *',
    form_success_title: 'Inquiry Successfully Submitted!',
    form_success_desc: 'Thank you! Your request has been forwarded to our trading desk in Podgorica. A senior manager will respond shortly.',
    form_error: 'Failed to send message. Please try again or email us directly at office@jeraplus.com',
    specs_heading: 'Technical Specifications',
    request_spec_btn: 'Request COA & Quotation',
    stat_experience: 'Years of Growth',
    stat_supplies: 'Contract Fulfillment',
    stat_geography: 'Countries Reached',
    stat_categories: 'Core Commodity Sectors',
    footer_text: 'Jera Plus is an independent European trading and logistics house specializing in petroleum products, gas supply, mineral concentrates, and agricultural commodities.',
    rights: 'All rights reserved.'
  },
  ru: {
    nav_home: 'Главная',
    nav_about: 'О компании',
    nav_products: 'Продукция',
    nav_services: 'Услуги',
    nav_news: 'Новости',
    nav_careers: 'Карьера',
    nav_contacts: 'Контакты',
    btn_quote: 'Запросить расчет',
    btn_more: 'Подробнее',
    btn_all_products: 'Вся продукция',
    btn_all_services: 'Все услуги',
    btn_all_news: 'Все пресс-релизы',
    btn_send_message: 'Отправить заявку',
    btn_sending: 'Отправка...',
    btn_close: 'Закрыть',
    badge_experience: 'Основана в 2018 г. • Европейские стандарты',
    badge_company: 'О компании',
    badge_products: 'Товарная номенклатура',
    badge_services: 'Комплексные решения',
    badge_news: 'Новости и события',
    badge_careers: 'Вакансии',
    badge_contacts: 'Связаться с нами',
    form_title: 'Запрос в отдел трейдинга и логистики',
    form_desc: 'Заполните форму для получения коммерческого предложения, паспортов качества и расчета фрахта в течение 24 часов.',
    form_name: 'Ваше имя / Контактное лицо *',
    form_email: 'Рабочий Email *',
    form_phone: 'Телефон / WhatsApp',
    form_company: 'Название компании *',
    form_project: 'Товарная позиция / Объем / Пункт назначения',
    form_message: 'Детали запроса и спецификация *',
    form_success_title: 'Заявка успешно отправлена!',
    form_success_desc: 'Спасибо! Ваш запрос передан в департамент трейдинга в Подгорице. Наш специалист свяжется с вами в ближайшее время.',
    form_error: 'Не удалось отправить заявку. Пожалуйста, напишите нам напрямую на office@jeraplus.com',
    specs_heading: 'Технические характеристики',
    request_spec_btn: 'Запросить паспорт качества и КП',
    stat_experience: 'Лет стабильной работы',
    stat_supplies: 'Исполнение обязательств',
    stat_geography: 'Стран присутствия',
    stat_categories: 'Товарных направлений',
    footer_text: 'Jera Plus — европейская торговая и логистическая компания, специализирующаяся на оптовых поставках нефтепродуктов, сжиженного газа, минерального сырья и агрокультур.',
    rights: 'Все права защищены.'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('jeraplus_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('jeraplus_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
