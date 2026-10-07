import { supabase } from "../../lib/supabase";

export async function findAllFavorites() {
  const { data, error } = await supabase.from("favorites").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(payload) {
  // Filter payload agar hanya mengirim kolom yang pasti ada di database Supabase
  // (Sesuaikan nama kolom di bawah ini dengan struktur tabel 'favorites' di Supabase Anda)
  const cleanPayload = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    company_name: payload.company_name || payload.company?.name || null,
    note: payload.note || null,
  };

  const { data, error } = await supabase
    .from("favorites")
    .insert(cleanPayload)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteFavoriteById(id) {
  const { error } = await supabase.from("favorites").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}