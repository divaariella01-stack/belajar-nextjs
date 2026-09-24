"use client";
import { useFav } from "@/context/FavContext";

export default function UserCard({ user }) {
  const { favorites, toggleFavorite } = useFav();
  
  // Cek apakah user ini sudah ada di daftar favorit
  const isFav = favorites.some((item) => item.id === user.id);

  return (
    <div className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-white">
      <div>
        <h3 className="font-bold text-lg">{user.name}</h3>
        <p className="text-sm text-gray-600">Email: {user.email}</p>
        <p className="text-sm text-gray-500">Company: {user.company?.name || user.company}</p>
      </div>
      <button
        onClick={() => toggleFavorite(user)}
        className={`px-3 py-1 text-sm rounded ${
          isFav ? "bg-red-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {isFav ? "★ Favorit" : "☆ Tambah Favorit"}
      </button>
    </div>
  );
}