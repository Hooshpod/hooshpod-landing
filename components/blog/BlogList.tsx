"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { useLocale, useTranslations } from "next-intl";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const localizedPosts = posts.filter(
    (post: any) => !post?.locale || post.locale === locale
  );
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground">
          {t("noPosts")}
        </div>
      )}
      {localizedPosts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full group hover:shadow-lg hover:bg-muted/40 dark:hover:bg-muted/10 transition-all duration-300 border border-transparent hover:border-border bg-background/80 backdrop-blur-sm">
            {post.coverImage && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground">
                    {t("featured")}
                  </Badge>
                )}
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="text-xl font-bold line-clamp-2 text-foreground group-hover:text-black dark:group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="size-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group inline-flex items-center gap-2 font-medium dark:text-primary text-black dark:hover:text-primary/80 hover:text-black/80"
              >
                {t("readMore")}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
