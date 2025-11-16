"use server";

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
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        error: "You are not allowed to delete this comment.",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Delete failed." };
  }
}
