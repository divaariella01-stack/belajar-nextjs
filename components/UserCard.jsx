"use client";

import { useFavorite } from "../context/FavoriteContext";

export default function UserCard({ user }) {
  const { toggleFavorite, isFavorite, favorites } = useFavorite() || {};

  if (!user) return null;

  // Cek apakah user ini ada di daftar favorit context
  const active = typeof isFavorite === "function" ? isFavorite(user.id) : false;

  // Ambil data user dari favorites jika ada (untuk mendapatkan nilai 'note' terbaru dari API/Context)
  const favoriteItem = Array.isArray(favorites)
    ? favorites.find((item) => String(item.id) === String(user.id))
    : null;

  // Catatan diambil dari favorit jika ada, atau dari properti user langsung
  const note = favoriteItem?.note || user.note;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (typeof toggleFavorite === "function") {
      await toggleFavorite(user);
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#0F6E56]/15 bg-[#E1F5EE] p-5 shadow-sm transition hover:shadow-md">
      <div>
        {/* Header Avatar & Nama */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0F6E56] text-xs font-bold text-white">
            {initials}
          </div>
          <h3 className="font-semibold text-sm tracking-tight text-[#2C2C2A]">
            {user.name}
          </h3>
        </div>

        {/* Info Email & Perusahaan */}
        <div className="mt-4 space-y-1 text-xs text-[#888780]">
          <p className="font-medium text-[#2C2C2A]/80">{user.email}</p>
          <p>{user.company_name || user.company || "Perusahaan / Komunitas"}</p>
        </div>

        {/* --- TAMPILAN NOTE / CATATAN PRIBADI --- */}
        {note && (
          <div className="mt-3 rounded-lg bg-white/80 p-2.5 text-xs text-[#0F6E56] border border-[#0F6E56]/20 shadow-xs">
            📌 <strong className="font-semibold">Catatan:</strong> {note}
          </div>
        )}
      </div>

      {/* Group Tombol Aksi */}
      <div className="mt-6 flex items-center gap-2">
        <button
          type="button"
          className="flex-1 rounded-full bg-[#0F6E56] py-2 text-center text-xs font-semibold text-white transition hover:bg-[#0C5844]"
        >
          View Profile
        </button>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`relative z-10 flex cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all ${
            active
              ? "bg-[#B3006B] text-white hover:bg-[#8F0055]"
              : "border border-[#888780]/30 bg-white text-[#2C2C2A] hover:bg-[#F1EFE8]"
          }`}
        >
          <span>{active ? "♥" : "♡"}</span>
          <span>{active ? "Favourite" : "Add Favourite"}</span>
        </button>
      </div>
    </div>
  );
}