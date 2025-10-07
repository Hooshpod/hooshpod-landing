import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/blog";
import { HeaderContainer } from "@/components/landing/HeaderContainer";
import { Footer } from "@/components/landing/Footer";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "blog" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const posts = getAllPosts(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "blog" });

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <HeaderContainer />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
          <BlogList posts={posts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
