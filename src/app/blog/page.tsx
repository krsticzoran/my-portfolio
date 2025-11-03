import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/container";
import { getSortedPostsData } from "@/lib/posts";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <Container as="main" className="my-24 md:my-28 lg:my-32 2xl:my-36">
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <h1 className="font-bold  text-3xl xs:text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-tight">
          Blog
        </h1>
        <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl leading-relaxed mt-4 sm:mt-6">
          Honest reflections on freelancing, web development, and the long road from beginner to
          professional.
        </p>
      </div>
      <ul className="flex flex-col gap-8 lg:gap-10">
        {posts.map(({ slug, title, excerpt, imageUrl }, index) => (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 rounded-lg border hover:bg-zinc-800 transition-colors duration-300"
            >
              <div className="relative lg:min-w-[356px] h-[200px] sm:h-[240px] lg:h-[200px] rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover object-top"
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 356px"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight">
                  {title}
                </h2>
                <p className="text-zinc-400 text-base md:text-lg leading-relaxed text-pretty">
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
