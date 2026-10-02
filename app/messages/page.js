import { messages } from "../../lib/db";
import { deleteMessageAction } from "./actions";

export default function MessagesPage() {
  // Pengamanan defensive agar messages selalu bertipe array
  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 text-white">
      <h1 className="text-2xl font-bold mb-6 text-zinc-100">Pesan Masuk</h1>

      {messageList.length === 0 ? (
        <p className="text-zinc-500">Tidak ada pesan.</p>
      ) : (
        <ul className="space-y-4">
          {messageList.map((item) => (
            <li
              key={item.id || Math.random()}
              className="flex justify-between items-start p-5 border border-zinc-800 rounded-xl bg-zinc-900 shadow-sm gap-4"
            >
              <div className="space-y-1">
                {/* Menampilkan Nama */}
                <p className="font-semibold text-zinc-100">
                  {item.name || "Tanpa Nama"}
                </p>

                {/* Menampilkan Email */}
                {item.email && (
                  <p className="text-xs text-zinc-400">{item.email}</p>
                )}

                {/* Menampilkan Isi Pesan (mengecek berbagai variasi key pesan) */}
                <p className="text-sm text-zinc-300 mt-2 whitespace-pre-wrap">
                  {item.message ||
                    item.messageText ||
                    item.content ||
                    item.text ||
                    "Tidak ada isi pesan"}
                </p>

                {/* Menampilkan Tanggal Pengiriman jika ada */}
                {item.createdAt && (
                  <p className="text-[10px] text-zinc-500 mt-2">
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </p>
                )}
              </div>

              {/* Form Hapus via Server Action */}
              <form action={deleteMessageAction.bind(null, item.id)}>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0"
                >
                  Hapus
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}