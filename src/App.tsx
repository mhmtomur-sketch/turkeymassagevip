import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProfileDetailPage } from './pages/ProfileDetailPage';
import { CityLandingPage } from './pages/CityLandingPage';
import { AdminPage } from './pages/AdminPage';
import Header from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SeoHead } from './components/seo/SeoHead';

export function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <SeoHead
        title="Türkiye Masaj, Masöz, Masör, Spa ve Hamam Rehberi"
        description="Türkiye genelinde profesyonel masaj, bireysel masöz, masör, lüks spa salonu, geleneksel Türk hamamı, kese köpük ve otel spa vitrinlerini şehir ve ilçeye göre keşfedin."
        canonicalUrl="https://turkeymassagevip.com/"
      />

      {/* Sadece Normal Sitede Göster, Admin Panelinde Gizle */}
      {!isAdmin && <Header />}

            {/* CANLI VE HER ZAMAN GÖRÜNEN SABİT YÖNETİCİ PANELİ BUTONU */}
      {!isAdmin && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999999 }}>
          <Link
            to="/admin"
            style={{
              backgroundColor: '#D4AF37',
              color: '#000000',
              fontWeight: '900',
              fontSize: '15px',
              padding: '14px 24px',
              borderRadius: '50px',
              boxShadow: '0 6px 25px rgba(212, 175, 55, 0.7)',
              border: '2px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            👑 VIP Yönetici Girişi
          </Link>
        </div>
      )}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil/:slug" element={<ProfileDetailPage />} />
          <Route path="/admin/*" element={<AdminPage />} />

          {/* Kategori Landing Sayfaları */}
          <Route path="/kategori/:categorySlug" element={<CityLandingPage />} />

          {/* 81 İl, İlçe ve Alt Kategori SEO Landing Rotaları */}
          <Route path="/:citySlug" element={<CityLandingPage />} />
          <Route path="/:citySlug/:districtOrCategory" element={<CityLandingPage />} />
          <Route path="/:citySlug/:districtOrCategory/:categorySlug" element={<CityLandingPage />} />
        </Routes>
      </main>

      {/* Sadece Normal Sitede Göster, Admin Panelinde Gizle */}
      {!isAdmin && <Footer />}
    </div>
  );
}
export default App;

