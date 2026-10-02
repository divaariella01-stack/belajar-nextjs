import { messages } from "../../lib/db";
import { deleteMessageAction } from "./actions";

export default function MessagesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-2xl font-bold mb-6">Pesan Masuk</h1>
      
      {messages.length === 0 ? (
        <p className="text-gray-500">Tidak ada pesan.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-5 border rounded-xl bg-white shadow-sm">
              <div className="space-y-1">
                {/* Menampilkan Nama */}
                <p className="font-semibold text-gray-800">
                  {item.name || "Tanpa Nama"}
                </p>

                {/* Menampilkan Email */}
                {item.email && (
                  <p className="text-xs text-gray-500">{item.email}</p>
                )}

                {/* Menampilkan Isi Pesan */}
                <p className="text-sm text-gray-700 mt-2">
                  {item.message || item.messageText || item.content || item.text || "Tidak ada isi pesan"}
                </p>
              </div>
              
              {/* Form Hapus */}
              <form action={deleteMessageAction.bind(null, item.id)}>
                <button 
                  type="submit" 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
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