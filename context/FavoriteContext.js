"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Fetch data favorit dari API Route saat pertama kali dimuat
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

  // Fungsi Menghapus Favorit yang disesuaikan agar fleksibel membaca id/user_id
  async function removeFavorite(userId) {
    const res = await fetch(`/api/favorites/${userId}`, { method: "DELETE" });

    if (res.ok) {
      setFavorites((prev) => 
        prev.filter((f) => String(f.id || f.user_id || f.app_users?.id) !== String(userId))
      );
    }
  }

  // Fungsi Cek apakah sudah menjadi favorit
  const isFavorite = (userId) => {
    return favorites.some((f) => 
      String(f.id || f.user_id || f.app_users?.id) === String(userId)
    );
  };

  // Fungsi Toggle Favorit (Tambah / Hapus)
  const toggleFavorite = async (user) => {
    if (!user || !user.id) return;

    const userId = user.id;
    const exists = isFavorite(userId);

    try {
      if (exists) {
        await removeFavorite(userId);
      } else {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        
        if (res.ok) {
          await fetchFavorites();
        }
      }
    } catch (error) {
      console.error("Gagal memperbarui favorit di API:", error);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite, fetchFavorites, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  return useContext(FavoriteContext);
}