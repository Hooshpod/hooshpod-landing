import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/blog/BlogPost";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

type Props = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  // Generate static params based on English slugs as the canonical set
  const posts = getAllPosts("en");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.locale, params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const t = await getTranslations({ locale: params.locale, namespace: "blog" });

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.locale, params.slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale: params.locale, namespace: "blog" });

  return (
    <div className="min-h-screen bg-background">
      <BlogPost post={post} />
    </div>
  );
}
