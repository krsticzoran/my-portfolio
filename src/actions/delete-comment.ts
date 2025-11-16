"use server";

import { supabaseServer } from "@/lib/supabaseServer";
import { createClient } from "@/utils/supabase/server";

export async function deleteCommentAction(id: string) {
  const supabase =await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to delete a comment.",
    };
  }

  try {
    const supabaseSrv = supabaseServer();

    const { error } = await supabaseSrv
      .from("comments")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Delete failed." };
  }
}
