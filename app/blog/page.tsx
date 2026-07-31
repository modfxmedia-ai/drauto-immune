import type { Metadata } from "next";
import BlogHubPage from "@/components/pages/blog/BlogHubPage";
import { buildMetadata } from "@/lib/content";
import { getAllBlogPosts } from "@/lib/blog-posts-server";

export function generateMetadata(): Metadata {
  return buildMetadata("blog");
}

export default function Page() {
  const posts = getAllBlogPosts();
  return <BlogHubPage posts={posts} />;
}
