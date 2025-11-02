import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  return <div>{post.title}</div>;
}
