import CommentForm from "./comment-form";
import CommentsList from "./comments-list";

export default function Comments({ slug }: { slug: string }) {
  return (
    <div className="border-t pt-12 mt-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
        Comments
      </h2>
      <CommentForm slug={slug} />
      <CommentsList slug={slug} />
    </div>
  );
}
