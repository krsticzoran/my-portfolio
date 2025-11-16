"use client";

import { useEffect, useState } from "react";

import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import { toast } from "sonner";

import { deleteCommentAction } from "@/actions/delete-comment";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type CommentType = {
  id: string;
  avatar_url: string;
  name: string;
  created_at: string;
  comment: string;
  post_slug: string;
};

export default function CommentsList({ slug }: { slug: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
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
          setComments((prev) => [payload.new as CommentType, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "comments",
          filter: `post_slug=eq.${slug}`,
        },
        (payload) => {
          if (payload.old?.id) {
            setComments((prev) => prev.filter((c) => c.id !== payload.old.id));
          }
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

  const handleDelete = async (id: string) => {
    setOpenId(null);
    try {
      const result = await deleteCommentAction(id);

      if (result?.success) {
        toast.success("Comment deleted");
        setComments((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error(result?.error || "Error deleting comment", {
          style: {
            background: "#F44336",
            color: "white",
            border: "none",
          },
        });
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Unexpected error", {
        style: {
          background: "#F44336",
          color: "white",
          border: "none",
        },
      });
    }
  };

  return (
    <div className="w-full border-t">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-col gap-3 w-full border-b py-6">
          <div className="flex items-end justify-between">
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
            <div className="relative">
              <button
                className="flex flex-row items-center gap-[4px] p-2 cursor-pointer rounded "
                onClick={() => setOpenId(openId === comment.id ? null : comment.id)}
              >
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
              </button>

              {openId === comment.id && (
                <div className="absolute right-0 mt-2 w-20 rounded-lg border bg-white shadow-lg p-2 text-sm">
                  <button
                    className="w-full text-left px-2 py-1 rounded text-background cursor-pointer"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-zinc-300">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
}
