import type { MetadataRoute } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ar", "fa"] as const;

  const now = new Date();

  const rootEntries = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: {
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
        fa: `${siteUrl}/fa`,
        "x-default": `${siteUrl}/en`,
      },
    },
  }));

  return rootEntries;
}
