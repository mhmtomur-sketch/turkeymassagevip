import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import ShowcaseGrid from './components/showcase/ShowcaseGrid';
import StoryViewer from './components/showcase/StoryViewer';
import VideoFeed from './components/showcase/VideoFeed';
import SeoContent from './components/seo/SeoContent';
import Footer from './components/layout/Footer';
import { getProfilesFromStorage, Profile } from './services/db';

export default function App() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('İzmir');

  const loadLiveProfiles = () => {
    const data = getProfilesFromStorage();
    setProfiles(data);
  };

  useEffect(() => {
    loadLiveProfiles();
    
    // Otomatik Konum Algılama
    try {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data && data.city) {
            const cityMap: { [key: string]: string } = {
              'Izmir': 'İzmir',
              'Istanbul': 'İstanbul',
              'Ankara': 'Ankara',
              'Antalya': 'Antalya',
              'Bursa': 'Bursa'
            };
            if (cityMap[data.city]) {
              setSelectedCity(cityMap[data.city]);
            }
          }
        })
        .catch(() => {});
    } catch (e) {}

    // Panelden üye eklendiğinde vitrini anında güncelle
    window.addEventListener('storage', loadLiveProfiles);
    window.addEventListener('tmv_storage_updated', loadLiveProfiles);
    return () => {
      window.removeEventListener('storage', loadLiveProfiles);
      window.removeEventListener('tmv_storage_updated', loadLiveProfiles);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col font-sans">
      <Header selectedCity={selectedCity} onCitySelect={setSelectedCity} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-10">
        <StoryViewer profiles={profiles} />
        <ShowcaseGrid profiles={profiles} selectedCity={selectedCity} onCityChange={setSelectedCity} />
        <VideoFeed profiles={profiles} />
        <SeoContent city={selectedCity} />
      </main>

      <Footer />
    </div>
  );
}
