import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Link, HomePage } from './pages/HomePage';
import { Link, ProfileDetailPage } from './pages/ProfileDetailPage';
import { Link, CityLandingPage } from './pages/CityLandingPage';
import { Link, AdminPage } from './pages/AdminPage';
import Header from './components/layout/Header';
import { Link, Footer } from './components/layout/Footer';
import { Link, SeoHead } from './components/seo/SeoHead';

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
        <div className="fixed bottom-6 right-6 z-[999999]">
          <Link
            to="/admin"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-black text-sm px-5 py-3.5 rounded-full shadow-2xl border-2 border-white transform hover:scale-105 transition-all duration-200"
            style={{ textDecoration: 'none', boxShadow: '0 8px 30px rgba(212, 175, 55, 0.6)' }}
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


