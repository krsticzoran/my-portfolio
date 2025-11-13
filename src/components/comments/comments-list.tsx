"use client";

import { useEffect, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function CommentsList({ slug }: { slug: string }) {
  const supabase = createClientComponentClient();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", slug)
        .order("created_at", { ascending: false });

      console.log("FETCH ERROR:", error);
      console.log("FETCH DATA:", data);

      if (data) setComments(data);
      setLoading(false);
    };

    fetchComments();
  }, [slug]);

  if (loading) return <p className="text-zinc-400">Loading comments...</p>;

  return (
    <div className="w-full border-t">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col gap-3 w-full border-b py-6">
          <div className="flex gap-4">
            <Image
              src={comment.avatar_url || "/avatar.webp"}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full"
            />
            <div>
              <p className="text-sm">{comment.name}</p>
              <p className="text-xs text-zinc-400">
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-zinc-300">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}
