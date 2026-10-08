"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../../lib/supabase/client";

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  // Masukkan data ke database Supabase
  const { error } = await supabase.from("messages").insert([
    { name, email, message }
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/messages");
  return { success: true };
}