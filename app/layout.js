import { FavProvider } from "@/context/FavContext";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <FavProvider>
          <nav className="p-4 bg-slate-900 text-white flex gap-4">
            <Link href="/users" className="hover:underline">Daftar Users</Link>
            <Link href="/favorites" className="hover:underline">Favorites</Link>
          </nav>
          {children}
        </FavProvider>
      </body>
    </html>
  );
}