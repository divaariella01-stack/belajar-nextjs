import { createClient } from "../../lib/supabase/server";

export async function findAllFavorites() {
  const supabase = await createClient();
  const { data, error } = await supabase
  .from("favorites")
  .select("*, app_users(id, name, email, company_name)");
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("id", Number(id)) // Pastikan dicasting ke Number
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(payload) {
  const cleanPayload = {
    id: Number(payload.id), // Ubah id menjadi angka (int8) sesuai database
    name: payload.name || "Tanpa Nama",
    email: payload.email || "-",
    company_name: payload.company_name || payload.company?.name || "Perusahaan / Komunitas",
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
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", Number(id)); // Pastikan dicasting ke Number
    
  if (error) throw new Error(error.message);
  return true;
}