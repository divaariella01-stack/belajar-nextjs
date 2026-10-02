"use server";

import { revalidatePath } from "next/cache";
import { messages } from "../../lib/db"; 

export async function deleteMessageAction(id) {
  // Gunakan String() agar perbandingan ID aman (mencegah bug string vs number)
  const index = messages.findIndex((msg) => String(msg.id) === String(id));

  if (index !== -1) {
    // Hapus 1 pesan dari array
    messages.splice(index, 1);
    
    // Trigger revalidasi cache Next.js agar UI halaman /messages ter-update otomatis
    revalidatePath("/messages");
  }
}