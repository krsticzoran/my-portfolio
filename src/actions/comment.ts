"use server"; 

import { supabaseServer } from "@/lib/supabaseServer";

export async function addComment( data: {
    comment:string;
    postSlug:string;
} 
) {

    try {
        const supabase = supabaseServer();
        const { error } = await supabase.from("comments").insert({
            post_slug: data.postSlug,             
            comment: data.comment, 
        });
    
        if (error) {
          console.error("Supabase insert error:", error);
          return { success: false, message: "Database error" };
        }
    
        return { success: true };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to add comment";
        return { success: false, message };
      }
  
}
