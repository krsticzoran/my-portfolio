import Link from "next/link";

import Container from "@/components/layout/container";
import { getSortedPostsData } from "@/lib/posts";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <Container as="main" className="my-24 md:my-28 lg:my-32 2xl:my-36">
      <ul>
        {posts.map(({ slug, title, date, excerpt }) => (
          <li key={slug}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4 mb-6 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed px-4 text-pretty">
              {excerpt}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
