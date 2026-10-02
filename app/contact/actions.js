"use server";

import { revalidatePath } from "next/cache";
import { messages } from "../../lib/db"; // Sesuaikan relative path ke lib/db.js

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  // Masukkan pesan baru ke array messages di lib/db.js
  messages.push({
    id: Date.now().toString(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });

  // Revalidate cache agar /messages langsung mendeteksi pesan baru
  revalidatePath("/messages");

  return { success: true };
}