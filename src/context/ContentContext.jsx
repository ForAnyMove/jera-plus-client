import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import fallbackData from '../data/fallbackContent.json';

const ContentContext = createContext();

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [isServerOnline, setIsServerOnline] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/content`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.products && data.products.length > 0) {
          setContent(data);
          setIsServerOnline(true);
          return;
        }
      }
      throw new Error('API response empty or invalid');
    } catch (err) {
      console.warn('Backend API unavailable, using embedded local content:', err.message);
      setContent(fallbackData);
      setIsServerOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Submit contact message (tries server, falls back gracefully)
  const submitMessage = async (messageData) => {
    try {
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });
      if (res.ok) {
        return { success: true };
      }
    } catch (err) {
      console.warn('Server offline, storing message in localStorage fallback:', err);
    }

    // Local fallback store
    try {
      const saved = JSON.parse(localStorage.getItem('jeraplus_local_inbox') || '[]');
      saved.unshift({
        id: 'local-' + Date.now(),
        ...messageData,
        status: 'new',
        created_at: new Date().toISOString()
      });
      localStorage.setItem('jeraplus_local_inbox', JSON.stringify(saved));
      return { success: true, localOnly: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // Subscribe to newsletter
  const subscribeNewsletter = async (email, hp = '') => {
    try {
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hp })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Subscription failed');
      }
      return { success: true, message: data.message };
    } catch (err) {
      // Local fallback in case server is temporarily offline
      try {
        const subs = JSON.parse(localStorage.getItem('jeraplus_local_subscribers') || '[]');
        if (!subs.includes(email)) subs.unshift(email);
        localStorage.setItem('jeraplus_local_subscribers', JSON.stringify(subs));
        return { success: true, localOnly: true };
      } catch (e) {
        return { success: false, error: err.message };
      }
    }
  };

  return (
    <ContentContext.Provider value={{ content, loading, isServerOnline, fetchContent, submitMessage, subscribeNewsletter }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
