"use client";

import { useFavorite } from "../../context/FavoriteContext";
import UserCard from "../../components/UserCard";
import { HeartX } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useFavorite();

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-[#111827]">
        Pengguna Favorit
      </h1>
      <p className="mt-2 text-zinc-600">
        Daftar anggota yang telah Anda simpan ke favorit.
      </p>

      {favorites.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center text-zinc-500">
          <HeartX className="size-10 text-zinc-400" />
          <p>Belum ada pengguna favorit yang ditambahkan.</p>
        </div>
      )}
    </section>
  );
}