import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProfileDetailPage } from './pages/ProfileDetailPage';
import { AdminPage } from './pages/AdminPage';
import { CityLandingPage } from './pages/CityLandingPage';
import { CategoryListingPage } from './pages/CategoryListingPage';
import { PackagesPage } from './pages/PackagesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdSubmitModal } from './components/forms/AdSubmitModal';
import { PackageType } from './types';

export function App() {
  const location = useLocation();
  const [isAdminState, setIsAdminState] = useState(() => {
    return window.location.href.toLowerCase().includes('admin');
  });
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [selectedPackageForAd, setSelectedPackageForAd] = useState<PackageType>('DIAMOND');

  const handleOpenAdModal = (pkg: PackageType = 'DIAMOND') => {
    setSelectedPackageForAd(pkg);
    setIsAdModalOpen(true);
  };

  useEffect(() => {
    if (window.location.href.toLowerCase().includes('admin')) {
      setIsAdminState(true);
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ADRES VEYA BUTON İLE ADMIN TETİKLENDİĞİNDE DOĞRUDAN PANELE GEÇ
  if (isAdminState || location.pathname.startsWith('/admin')) {
    return (
      <div className="min-h-screen bg-slate-950 text-white relative">
        <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 999999 }}>
          <button
            onClick={() => {
              setIsAdminState(false);
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* SAĞ ALT KÖŞEDE HER ZAMAN GÖRÜNEN YÖNETİCİ GİRİŞİ BUTONU */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999999 }}>
        <button
          onClick={() => setIsAdminState(true)}
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
            cursor: 'pointer'
          }}
        >
          👑 VIP Yönetici Girişi
        </button>
      </div>

      <Header onOpenAdModal={() => handleOpenAdModal('DIAMOND')} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profil/:slug" element={<ProfileDetailPage />} />
          <Route path="/paketler" element={<PackagesPage onOpenAdModal={handleOpenAdModal} />} />
          <Route path="/ilan-ver" element={<PackagesPage onOpenAdModal={handleOpenAdModal} />} />
          <Route path="/kategori/:categorySlug" element={<CategoryListingPage />} />
          <Route path="/:citySlug" element={<CityLandingPage />} />
          <Route path="/:citySlug/:districtOrCategory" element={<CityLandingPage />} />
          <Route path="/:citySlug/:districtOrCategory/:categorySlug" element={<CityLandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      <AdSubmitModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
        initialPackage={selectedPackageForAd}
      />
    </div>
  );
}

export default App;
