import CommentForm from "./comment-form";

export default function Comments() {
  return (
    <div className="border-t pt-12 mt-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
        Comments
      </h2>
      <CommentForm />
    </div>
  );
}
