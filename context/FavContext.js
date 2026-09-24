"use client";
import { createContext, useContext, useState } from "react";

const FavContext = createContext();

export function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (user) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === user.id);
      if (exists) {
        return prev.filter((item) => item.id !== user.id); // Hapus jika sudah ada
      }
      return [...prev, user]; // Tambahkan jika belum ada
    });
  };

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavContext.Provider>
  );
}

export const useFav = () => useContext(FavContext);