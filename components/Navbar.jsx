"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../context/UserContext";
import { useFavorite } from "../context/FavoriteContext";

import { cn } from "../lib/utils";
import { buttonVariants } from "../components/ui/button";

// Menu navigasi utama (Login dihapus dari sini agar bisa diatur dinamis di bagian kanan)
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/users", label: "Users" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
  { href: "/messages", label: "Messages" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { name, submitted } = useUser();
  const { favorites } = useFavorite();

  // Cek apakah user sedang berada di halaman login atau sudah tersimpan sesi login-nya
  // (Kamu bisa menyesuaikan kondisi di bawah ini sesuai dengan state login di project-mu)
  const isLoginActive = pathname?.startsWith("/login");

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-background/70 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
        {/* Logo Brand */}
        <Link
          href="/"
          className="shrink-0 text-lg font-extrabold tracking-wider text-[#E6008A] transition-opacity hover:opacity-80"
        >
          PARAS
        </Link>

        {/* Menu Navigasi */}
        <div className="hidden items-center gap-1 text-sm sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 transition-colors font-medium",
                  isActive
                    ? "bg-[#E6008A] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Bagian Kanan (Sapaan, Favorite, Get in Touch, & Tombol Login/Logout) */}
        <div className="flex items-center gap-3">
          {submitted && (
            <span className="text-sm font-medium text-primary">
              Hi, {name} 👋
            </span>
          )}

          {/* Badge Favorite counter */}
          <Link
            href="/favorites"
            className={cn(
              buttonVariants({ size: "sm", variant: "secondary" }),
              "rounded-full text-xs font-semibold bg-[#E6008A] text-white hover:bg-[#E6008A]/90"
            )}
          >
            Favorite ({favorites.length})
          </Link>

          {/* Tombol Contact / Get in touch */}
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full bg-[#159038] text-white hover:bg-[#159038]/90"
            )}
          >
            Get in touch
          </Link>

          {/* Tombol Login / Logout Dinamis */}
          <Link
            href="/login"
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors border",
              isLoginActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-black/5"
            )}
          >
            {/* Ganti teks ini atau sesuaikan kondisinya dengan status user */}
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}