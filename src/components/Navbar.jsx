import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Phone, MapPin, Globe, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

export const Navbar = ({ onOpenQuote }) => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/products', label: t('nav_products') },
    { to: '/services', label: t('nav_services') },
    { to: '/news', label: t('nav_news') },
    { to: '/careers', label: t('nav_careers') },
    { to: '/contacts', label: t('nav_contacts') }
  ];

  return (
    <>
      {/* Top Logo & Info Bar */}
      <div style={{
        background: 'var(--bg-topbar)',
        borderBottom: '1px solid var(--topbar-border)',
        padding: '16px 0',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/images/logo.png"
              alt="Jera Plus"
              style={{
                height: '46px',
                width: 'auto',
                filter: isDark ? 'brightness(1.15)' : 'none',
                transition: 'filter 0.3s'
              }}
            />
          </Link>

          {/* Teaser Contacts (matching webcopy teasers) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="teaser-icon-round">
                <MapPin size={20} color="#0eb0ee" />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--topbar-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
                  {lang === 'ru' ? 'Главный офис' : 'Headquarters'}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--topbar-text)' }}>
                  Podgorica, Montenegro
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="teaser-icon-round">
                <Phone size={20} color="#0eb0ee" />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--topbar-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
                  {lang === 'ru' ? 'Телефон' : 'Phone'}
                </div>
                <a href="tel:+38267952403" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--topbar-text)' }}>
                  +382 67 952403
                </a>
              </div>
            </div>

            {/* Theme Toggle (Day / Night Switcher) */}
            <button
              onClick={toggleTheme}
              title={isDark ? (lang === 'ru' ? 'Включить дневную тему' : 'Switch to Day theme') : (lang === 'ru' ? 'Включить ночную тему' : 'Switch to Night theme')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--topbar-icon-bg)',
                border: '1px solid var(--topbar-border)',
                borderRadius: '24px',
                padding: '6px 14px',
                color: 'var(--topbar-text)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 700,
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              {isDark ? (
                <>
                  <Sun size={15} color="#0eb0ee" />
                  <span>{lang === 'ru' ? 'День' : 'Day'}</span>
                </>
              ) : (
                <>
                  <Moon size={15} color="#0eb0ee" />
                  <span>{lang === 'ru' ? 'Ночь' : 'Night'}</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--topbar-icon-bg)',
              borderRadius: '24px',
              padding: '3px 4px',
              border: '1px solid var(--topbar-border)'
            }}>
              <Globe size={13} style={{ marginLeft: '6px', marginRight: '4px', color: 'var(--topbar-text)' }} />
              <button
                onClick={() => setLang('en')}
                style={{
                  background: lang === 'en' ? '#0eb0ee' : 'transparent',
                  color: lang === 'en' ? '#ffffff' : 'var(--topbar-muted)',
                  border: 'none',
                  padding: '3px 10px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ru')}
                style={{
                  background: lang === 'ru' ? '#0eb0ee' : 'transparent',
                  color: lang === 'ru' ? '#ffffff' : 'var(--topbar-muted)',
                  border: 'none',
                  padding: '3px 10px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                RU
              </button>
            </div>

            {/* CTA Button (theme_button color1) */}
            <button
              onClick={onOpenQuote}
              className="btn btn-primary"
              style={{ padding: '11px 24px', fontSize: '0.85rem' }}
            >
              <span>{t('btn_quote')}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'var(--nav-bg)',
        borderBottom: '2px solid var(--nav-border)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
        padding: '0',
        transition: 'background 0.3s ease'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Desktop Nav Items */}
          <nav style={{ display: 'none', gap: '0', alignItems: 'center' }} className="desktop-menu">
            {navLinks.map((link, idx) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: '700',
                    color: isActive ? 'var(--hover-accent)' : '#ffffff',
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '18px 22px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                    borderLeft: idx === 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
                    borderBottom: isActive ? '3px solid var(--hover-accent)' : '3px solid transparent',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--nav-link-hover)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick email display on right */}
          <div style={{ display: 'none', alignItems: 'center', gap: '8px', color: '#d5e2cf', fontSize: '0.85rem' }} className="header-email">
            <span>Direct Desk:</span>
            <a href="mailto:office@jeraplus.com" style={{ color: 'var(--hover-accent)', fontWeight: 600 }}>office@jeraplus.com</a>
          </div>

          {/* Mobile Hamburger Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '12px 0' }} className="mobile-header-bar">
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
              Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex'
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--nav-mobile-bg)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    color: isActive ? 'var(--hover-accent)' : '#ffffff',
                    padding: '10px 0',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 992px) {
          .desktop-menu { display: flex !important; }
          .header-email { display: flex !important; }
          .mobile-header-bar { display: none !important; }
        }
      `}</style>
    </>
  );
};
