"use client";

import { useEffect, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

type CommentType = {
  id: string;
  avatar_url: string;
  name: string;
  created_at: string;
  comment: string;
  post_slug: string;
};

export default function CommentsList({ slug }: { slug: string }) {
  const supabase = createClientComponentClient();

  const [comments, setComments] = useState<CommentType[]>([]);

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

    const channel = supabase
      .channel("realtime-comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_slug=eq.${slug}`,
        },
        (payload) => {
          console.log("REALTIME NEW COMMENT:", payload.new);
          setComments((prev) => [payload.new as CommentType, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  if (loading) return <p className="text-zinc-400">Loading comments...</p>;

  if (!comments.length)
    return (
      <p className="text-zinc-500 italic border-t py-6">
        No comments yet. Be the first to comment!
      </p>
    );

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
