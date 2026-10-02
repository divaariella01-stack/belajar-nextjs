import { messages } from "../../lib/db";
import { deleteMessageAction } from "./actions";

// Non-aktifkan cache static prerender agar messages selalu ter-fetch paling fresh
export const dynamic = "force-dynamic";

export default function MessagesPage() {
  const list = Array.isArray(messages) ? messages : [];

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 text-white">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-zinc-100">
        Pesan Masuk
      </h1>

      {list.length === 0 ? (
        <p className="text-zinc-500">Tidak ada pesan.</p>
      ) : (
        <ul className="space-y-4">
          {list.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-start p-5 border border-zinc-800 rounded-xl bg-zinc-900 shadow-sm gap-4"
            >
              <div className="space-y-1">
                <p className="font-semibold text-zinc-100">
                  {item.name || "Tanpa Nama"}
                </p>

                {item.email && (
                  <p className="text-xs text-zinc-400">{item.email}</p>
                )}

                <p className="text-sm text-zinc-300 mt-2 whitespace-pre-wrap">
                  {item.message ||
                    item.messageText ||
                    item.content ||
                    item.text ||
                    "Tidak ada isi pesan"}
                </p>

                {item.createdAt && (
                  <p className="text-[10px] text-zinc-500 mt-2">
                    {new Date(item.createdAt).toLocaleString("id-ID")}
                  </p>
                )}
              </div>

              <form action={deleteMessageAction.bind(null, item.id)}>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shrink-0"
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