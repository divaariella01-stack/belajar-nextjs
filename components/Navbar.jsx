"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { useUser } from "../context/UserContext";
import { useFavorite } from "../context/FavoriteContext";

import { cn } from "../lib/utils";
import { buttonVariants } from "../components/ui/button";

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
  const router = useRouter();
  const { name, submitted } = useUser();
  const { favorites } = useFavorite();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase, pathname]); // Ditambahkan pathname agar memperbarui sesi setiap kali pindah halaman

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
    router.refresh();
  };

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

        {/* Bagian Kanan */}
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

          {/* Tombol Login / Logout */}
          {!loading && (
            user ? (
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
                  pathname?.startsWith("/login")
                    ? "bg-[#E6008A] text-white border-transparent"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                )}
              >
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}