import { getAllFavorites, addFavorite } from "../../../lib/services/favoriteService";

export async function GET() {
  try {
    const data = await getAllFavorites();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await addFavorite(body);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json(result.data, { status: result.status });
  } catch (error) {
    // 🔍 INI AKAN MENGIRIM PESAN ERROR ASLI DARI SUPABASE KE BROWSER
    return Response.json({ error: error.message || "Terjadi kesalahan pada server" }, { status: 500 });
  }
}