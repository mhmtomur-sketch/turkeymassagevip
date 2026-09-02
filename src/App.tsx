import AdminPage from './pages/AdminPage';
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
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.href.includes('admin') || window.location.search.includes('admin');
  });

  if (isAdminView) {
    return (
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 99999 }}>
        <button
          onClick={() => setIsAdminView(true)}
          style={{
            backgroundColor: '#D4AF37',
            color: '#000',
            fontWeight: 'bold',
            padding: '12px 20px',
            borderRadius: '50px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            border: '2px solid #ffffff',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          👑 VIP Yönetici Paneli
        </button>
      </div>
      <div className="min-h-screen bg-slate-950 text-white relative">
        <div className="fixed top-4 right-4 z-[99999]">
          <button 
            onClick={() => setIsAdminView(false)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
          >
            ← Ana Sayfaya Dön
          </button>
        </div>
        <AdminPage />
      </div>
    );
  }
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 99999 }}>
        <button
          onClick={() => setIsAdminView(true)}
          style={{
            backgroundColor: '#D4AF37',
            color: '#000',
            fontWeight: 'bold',
            padding: '12px 20px',
            borderRadius: '50px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
            border: '2px solid #ffffff',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          👑 VIP Yönetici Paneli
        </button>
      </div>
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


