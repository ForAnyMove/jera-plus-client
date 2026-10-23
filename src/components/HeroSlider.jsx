import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';

export const HeroSlider = ({ onOpenQuote }) => {
  const { lang, t } = useLanguage();
  const { content } = useContent();
  const slides = content?.hero_slides || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const title = lang === 'ru' ? currentSlide.title_ru : currentSlide.title_en;
  const subtitle = lang === 'ru' ? currentSlide.subtitle_ru : currentSlide.subtitle_en;

  return (
    <section id="home" style={{ position: 'relative', minHeight: '82vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background Image with Dynamic Fade */}
      {slides.map((slide, index) => (
        <div
          key={slide.id || index}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 1.2s ease-in-out, transform 7s ease-out',
            zIndex: 1
          }}
        />
      ))}

      {/* Cinematic Navy Gradient Overlay (matching webcopy #30355d tone) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(48, 53, 93, 0.92) 0%, rgba(48, 53, 93, 0.78) 55%, rgba(48, 53, 93, 0.45) 100%)',
        zIndex: 2
      }} />

      {/* Hero Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3, padding: '80px 24px' }}>
        <div style={{ maxWidth: '840px' }}>
          <div className="badge badge-cyan">
            <ShieldCheck size={14} color="var(--hover-accent)" />
            <span>{t('badge_experience')}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)',
              lineHeight: 1.18,
              marginBottom: '20px',
              textShadow: '0 3px 15px rgba(0,0,0,0.5)',
              fontWeight: 800,
              color: '#ffffff'
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: '#e2e8f0',
              marginBottom: '36px',
              lineHeight: 1.6,
              maxWidth: '680px'
            }}
          >
            {subtitle}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenQuote}
              className="btn btn-primary"
              style={{ fontSize: '1rem', padding: '16px 36px' }}
            >
              <span>{t('btn_quote')}</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#products"
              className="btn btn-outline-white"
              style={{ fontSize: '1rem', padding: '16px 32px' }}
            >
              {t('btn_all_products')}
            </a>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(48, 53, 93, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s'
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(48, 53, 93, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#fff',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s'
            }}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            gap: '10px'
          }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? '36px' : '10px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === currentIndex ? '#0eb0ee' : 'rgba(255, 255, 255, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
