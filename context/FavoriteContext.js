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

  // Fungsi Toggle Favorit (Tambah / Hapus)
  const toggleFavorite = async (user) => {
    if (!user || !user.id) return;

    const exists = favorites.some((item) => String(item.id) === String(user.id));

    try {
      if (exists) {
        // Jika sudah ada, hapus dari API
        await fetch(`/api/favorites/${user.id}`, {
          method: "DELETE",
        });
      } else {
        // Jika belum ada, tambah ke API
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }

      // Ambil ulang data favorit terbaru agar state selalu sinkron
      await fetchFavorites();
    } catch (error) {
      console.error("Gagal memperbarui favorit di API:", error);
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