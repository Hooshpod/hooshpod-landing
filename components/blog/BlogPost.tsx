"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { renderMarkdown } from "@/lib/markdown";
// markdown rendering moved to @/lib/markdown

interface BlogPostProps {
  post: BlogPost;
}

export function BlogPost({ post }: BlogPostProps) {
  const locale = useLocale();
  const t = useTranslations("blog");
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <Link href={`/${locale}/blog`}>
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="size-4 mr-2" />
            {t("backToBlog")}
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                <Tag className="size-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {post.featured && (
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="size-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5" />
              <span>
                {new Date(post.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-64 md:h-96 w-full mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert blog-content">
          {renderMarkdown(post.content)}
        </div>

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm font-medium text-muted-foreground">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {t("publishedOn")}{" "}
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              {t("by")} {post.author}
            </div>

            <Link href={`/${locale}/blog`}>
              <Button variant="outline">
                <ArrowLeft className="size-4 mr-2" />
                {t("backToBlog")}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
