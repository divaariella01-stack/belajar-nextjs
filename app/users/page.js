"use client";
import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import { Input } from "@/components/ui/input"; // Import Input dari shadcn/ui

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State untuk pencarian
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filter users berdasarkan input pencarian (nama atau email)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="p-5">Loading...</p>;
  }

  if (error) {
    return <p className="p-5 text-red-500">Error: {error}</p>;
  }

  return (
    <main className="p-5 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>

      {/* Input Search dari shadcn/ui */}
      <Input
        type="text"
        placeholder="Cari user berdasarkan nama atau email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      {/* Menampilkan hasil filter */}
      <div className="space-y-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <p className="text-gray-500">User tidak ditemukan.</p>
        )}
      </div>
    </main>
  );
}