import "./globals.css";
import localFont from "next/font/local";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { FavoriteProvider } from "../context/FavoriteContext";
import { UserProvider } from "../context/UserContext";

const fontSans = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Italic-Variable.woff2",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "PARAS — Perempuan Aksi dan Tanggap Lintas Bencana",
  description:
    "Wadah bagi komunitas perempuan dalam mendukung aksi iklim dan pemantauan informasi bencana terintegrasi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${fontSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-[#F8F9FA] text-[#111827] antialiased font-sans">
        <UserProvider>
          <FavoriteProvider>
            <Navbar />

            <main className="flex-1">{children}</main>

            <Footer />
          </FavoriteProvider>
        </UserProvider>
      </body>
    </html>
  );
}