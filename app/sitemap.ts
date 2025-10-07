import type { MetadataRoute } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ar", "fa"] as const;
  const agents = [
    "administrative-assistant",
    "compliance", 
    "procurement",
    "aviation",
    "shipping",
    "healthcare"
  ];

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

  const agentEntries = locales.flatMap((locale) =>
    agents.map((agent) => ({
      url: `${siteUrl}/${locale}/agents/${agent}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/en/agents/${agent}`,
          ar: `${siteUrl}/ar/agents/${agent}`,
          fa: `${siteUrl}/fa/agents/${agent}`,
          "x-default": `${siteUrl}/en/agents/${agent}`,
        },
      },
    }))
  );

  return [...rootEntries, ...agentEntries];
}
