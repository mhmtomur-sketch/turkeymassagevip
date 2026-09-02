import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
