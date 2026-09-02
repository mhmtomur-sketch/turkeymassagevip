import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ShowcaseGrid from './components/showcase/ShowcaseGrid';
import StoryViewer from './components/stories/StoryViewer';
import VideoFeed from './components/video/VideoFeed';
import SeoContent from './components/seo/SeoContent';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.href.includes('admin') || window.location.search.includes('admin');
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.includes('admin') || window.location.pathname.includes('admin') || window.location.search.includes('admin')) {
        setIsAdminView(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-slate-950 text-white relative">
        <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 999999 }}>
          <button
            onClick={() => {
              setIsAdminView(false);
              window.history.pushState(null, '', '/');
            }}
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              fontWeight: 'bold',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
          >
            ← Ana Sayfaya Dön
          </button>
        </div>
        <AdminPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col relative selection:bg-amber-500 selection:text-black font-sans">
      <Header />
      
      {/* CANLI VE HER ZAMAN GÖRÜNEN SABİT YÖNETİCİ PANELİ BUTONU */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999999 }}>
        <button
          onClick={() => setIsAdminView(true)}
          style={{
            backgroundColor: '#D4AF37',
            color: '#000000',
            fontWeight: '900',
            fontSize: '15px',
            padding: '14px 24px',
            borderRadius: '50px',
            boxShadow: '0 6px 25px rgba(212, 175, 55, 0.6)',
            border: '2px solid #ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.2s ease-in-out'
          }}
        >
          👑 VIP Yönetici Paneli
        </button>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full space-y-12">
        <StoryViewer />
        <ShowcaseGrid />
        <VideoFeed />
        <SeoContent />
      </main>

      <Footer />
    </div>
  );
}
