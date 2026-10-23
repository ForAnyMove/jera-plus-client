import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image = '/images/logo.png',
  type = 'website'
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    const fullTitle = title
      ? `${title} | Jera Plus`
      : 'Jera Plus | International Petroleum & Commodity Trading';
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (name, content, isProperty = false) => {
      if (!content) return;
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('description', description || 'Jera Plus is a European trading company supplying LPG, diesel fuel, base oils, petrochemicals, polymers, flax seeds and minerals.');
    if (keywords) {
      setMeta('keywords', keywords);
    }

    // 3. OpenGraph Tags
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://jeraplus.com';
    const currentUrl = `${origin}${location.pathname}`;
    const fullImageUrl = image.startsWith('http') ? image : `${origin}${image}`;

    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', currentUrl, true);
    setMeta('og:image', fullImageUrl, true);
    setMeta('og:site_name', 'Jera Plus', true);

    // 4. Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullImageUrl);

    // 5. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || currentUrl);

    // 6. Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description, keywords, canonical, image, type, location.pathname]);

  return null;
};
