import Link from "next/link";

import { getSortedPostsData } from "@/lib/posts";

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-gray-600">Thoughts on freelancing, web development, and the journey</p>
        </div>

        {/* Posts List */}
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                {/* Date */}
                <time className="text-sm text-gray-500 font-medium">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>

                {/* Read More */}
                <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                  <span>Read more</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  );
}
