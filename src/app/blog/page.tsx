import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/container";
import { getSortedPostsData } from "@/lib/posts";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <Container as="main" className="my-24 md:my-28 lg:my-32 2xl:my-36">
      <div className="mb-16">
        <h1 className="font-bold text-3xl xs:text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-tight">
          Blog
        </h1>
        <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
          Honest reflections on freelancing, web development, and the long road from beginner to
          professional.
        </p>
      </div>
      <ul className="flex flex-col gap-6">
        {posts.map(({ slug, title, excerpt, imageUrl }) => (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              className="flex gap-6 p-6 rounded-lg border hover:bg-zinc-800 transition-colors duration-300"
            >
              <div className="relative min-w-[300px] h-[200px] rounded-lg overflow-hidden">
                <Image src={imageUrl} alt={title} fill className="object-cover " />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4 mb-6 tracking-tight leading-tight">
                  {title}
                </h2>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed px-4 text-pretty">
                  {excerpt}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
