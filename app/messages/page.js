import { messages } from "../../lib/db";
import { deleteMessageAction } from "./actions";

export const dynamic = "force-dynamic";

export default function MessagesPage() {
  const list = Array.isArray(messages) ? messages : [];

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 text-zinc-900">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-zinc-800">
        Pesan Masuk
      </h1>

      {list.length === 0 ? (
        <p className="text-zinc-500">Tidak ada pesan.</p>
      ) : (
        <ul className="space-y-4">
          {list.map((item) => (
            <li
              key={item.id}
              /* MENGUANGI HITAM: Mengubah bg-zinc-900 menjadi bg-white / bg-zinc-50 dengan border lembut */
              className="flex justify-between items-start p-5 border border-zinc-200 rounded-xl bg-white shadow-sm gap-4"
            >
              <div className="space-y-1">
                {/* Nama Pengirim */}
                <p className="font-semibold text-zinc-900 text-base">
                  {item.name || "Tanpa Nama"}
                </p>

                {/* Email Pengirim */}
                {item.email && (
                  <p className="text-xs text-zinc-500">{item.email}</p>
                )}

                {/* Isi Pesan */}
                <p className="text-sm text-zinc-700 mt-2 whitespace-pre-wrap">
                  {item.message ||
                    item.messageText ||
                    item.content ||
                    item.text ||
                    "Tidak ada isi pesan"}
                </p>

                {/* Tanggal */}
                {item.createdAt && (
                  <p className="text-[10px] text-zinc-400 mt-2">
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </p>
                )}
              </div>

              {/* Tombol Hapus */}
              <form action={deleteMessageAction.bind(null, item.id)}>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0"
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