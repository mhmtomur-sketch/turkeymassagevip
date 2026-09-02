import { useState, useEffect } from 'react';
import { db } from '../services/db';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem('tmv_favorites');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [likes, setLikes] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem('tmv_likes');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (profileId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(profileId);
      const updated = isFav ? prev.filter((id) => id !== profileId) : [...prev, profileId];
      try {
        localStorage.setItem('tmv_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      if (!isFav) {
        db.logEvent({ profileId, eventType: 'favorite' });
      }
      return updated;
    });
  };

  const toggleLike = (profileId: string) => {
    setLikes((prev) => {
      const isLiked = prev.includes(profileId);
      const updated = isLiked ? prev.filter((id) => id !== profileId) : [...prev, profileId];
      try {
        localStorage.setItem('tmv_likes', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      if (!isLiked) {
        db.logEvent({ profileId, eventType: 'like' });
      }
      return updated;
    });
  };

  return {
    favorites,
    likes,
    isFavorite: (profileId: string) => favorites.includes(profileId),
    isLiked: (profileId: string) => likes.includes(profileId),
    toggleFavorite,
    toggleLike,
  };
}
