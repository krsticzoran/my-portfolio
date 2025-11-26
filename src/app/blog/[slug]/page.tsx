import type { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import Comments from "@/components/comments/comments";
import Container from "@/components/layout/container";
import PageFadeIn from "@/components/layout/page-fade-in";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const title = post.title;
  const description = post.excerpt || post.title;
  const image = post.imageUrl;
  const url = `https://zkrstic.dev/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <PageFadeIn>
      <Container as="main" className="my-24 md:my-28 lg:my-32 2xl:my-36 !max-w-4xl">
        <h1 className="font-bold text-3xl xs:text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Date */}
        <p className="text-zinc-400 text-sm sm:text-base mt-3 mb-8">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Featured Image */}
        <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] rounded-lg overflow-hidden mt-8 md:mt-10 lg:mt-12">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover object-top"
            priority={true}
            sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 1280px, 1400px"
          />
        </div>

        {/* Blog Content */}
        <article
          className="
    mx-auto text-zinc-300 mt-8 sm:mt-10 leading-relaxed
    space-y-5 sm:space-y-6
    [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:mt-8 sm:[&>h2]:mt-10 [&>h2]:mb-5 sm:[&>h2]:mb-6
    [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mt-6 sm:[&>h3]:mt-8 [&>h3]:mb-3 sm:[&>h3]:mb-4
    [&>p]:my-4 sm:[&>p]:my-6 [&>p]:leading-relaxed
    [&>strong]:font-semibold
    [&>ul]:list-disc [&>ul]:pl-5 sm:[&>ul]:pl-6 [&>li]:my-1 sm:[&>li]:my-2
  "
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
        <Comments slug={slug} />
      </Container>
    </PageFadeIn>
  );
}
