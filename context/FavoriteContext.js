"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          setFavorites(data);
        }
      } catch (err) {
        console.error("Gagal fetch favorites:", err);
      }
    }
    fetchFavorites();
  }, []);

  const toggleFavorite = (user) => {
    if (!user || !user.id) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => String(item.id) === String(user.id));
      return exists
        ? prev.filter((item) => String(item.id) !== String(user.id))
        : [...prev, user];
    });
  };

  const isFavorite = (userId) => {
    return favorites.some((item) => String(item.id) === String(userId));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    return {
      favorites: [],
      toggleFavorite: () => {},
      isFavorite: () => false,
    };
  }
  return context;
}