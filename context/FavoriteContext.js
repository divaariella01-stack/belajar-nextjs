"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // 1. Ambil data favorit dari API saat aplikasi/halaman dimuat
  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites");
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    } catch (err) {
      console.error("Gagal mengambil data favorit:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // 2. Simpan atau Hapus Favorit ke API Backend
  const toggleFavorite = async (user) => {
    if (!user || !user.id) return;

    const exists = favorites.some((item) => String(item.id) === String(user.id));

    try {
      if (exists) {
        // Hapus dari favorit di backend
        await fetch(`/api/favorites/${user.id}`, {
          method: "DELETE",
        });
      } else {
        // Tambah ke favorit di backend
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }

      // Ambil ulang data terbaru dari API agar state selalu relevan
      await fetchFavorites();
    } catch (error) {
      console.error("Gagal memperbarui status favorit di API:", error);
    }
  };

  const isFavorite = (userId) => {
    return favorites.some((item) => String(item.id) === String(userId));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite, fetchFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  return useContext(FavoriteContext);
}