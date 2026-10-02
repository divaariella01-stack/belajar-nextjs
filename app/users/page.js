"use client";

import { useEffect, useState } from "react";
import { SearchX, Users } from "lucide-react";

import UserCard from "../../components/UserCard";
import { Input } from "../../components/ui/input";
import { useUser } from "../../context/UserContext";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Menggunakan search dan setSearch dari UserContext
  const { search, setSearch } = useUser();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes((search || "").toLowerCase())
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center">
          <h2 className="font-semibold text-destructive">
            Terjadi Kesalahan
          </h2>
          <p className="mt-2 text-sm text-destructive/80">{error}</p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <p className="animate-pulse font-medium text-[#159038]">
          Memuat data anggota...
        </p>
      </main>
    );
  }

  return (
    <section className="relative bg-[#F8F9FA] text-[#111827]">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10 opacity-30" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          {/* Badge Sekunder Magenta Pink (#E6008A) */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E6008A]/20 bg-[#E6008A]/10 px-3.5 py-1 text-xs font-semibold text-[#E6008A]">
            <Users className="size-3.5 text-[#E6008A]" />
            Direktori Komunitas
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#111827] md:text-5xl">
            Daftar Anggota & Pengurus
          </h1>
          <p className="mt-4 text-[#111827]/70">
            Cari dan lihat daftar anggota serta pengurus PKK dan relawan aksi iklim PARAS.
          </p>
        </div>

        {/* Input Pencarian terhubung ke UserContext */}
        <Input
          type="text"
          placeholder="Cari nama anggota..."
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-8 h-11 max-w-sm rounded-full border-[#111827]/20 bg-white px-4 text-[#111827] shadow-sm focus-visible:ring-[#159038]"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center text-[#111827]/60">
              <SearchX className="size-8 text-[#E6008A]" />
              <p>Anggota tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}