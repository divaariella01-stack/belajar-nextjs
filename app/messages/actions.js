"use server";

import { revalidatePath } from "next/cache";
import { messages } from "../../lib/db"; 

export async function deleteMessageAction(id) {
  const index = messages.findIndex((msg) => msg.id === id);

  if (index !== -1) {
    messages.splice(index, 1);
    
    revalidatePath("/messages");
  }
}