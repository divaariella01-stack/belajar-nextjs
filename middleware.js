// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Logger: catat setiap request ke /api/...
  if (pathname.startsWith("/api")) {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${request.method} ${pathname}`);
  }

  // 2. Maintenance mode: lempar semua halaman ke /maintenance
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // 3. Auth guard: halaman yang dilindungi butuh cookie "token"
  const protectedPaths = []; // ganti sesuai halaman yang mau dilindungi, misal: ["/profile", "/dashboard"]

  if (protectedPaths.includes(pathname)) {
    const token = request.cookies.get("token");

    if (!token) {
      // belum ada tanda login → lempar ke halaman lain (misal ke home /)
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next(); // lanjutkan request seperti biasa
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // semua path, kecuali file internal Next.js
};