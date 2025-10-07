import LandingPage from "@/components/LandingPage";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export default function LocalizedLandingPage({
  params,
}: {
  params: { locale: string };
}) {
  const posts = getAllPosts(params.locale).slice(0, 3);
  return <LandingPage posts={posts} />;
}

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "fa" }];
}

type Params = { params: { locale: "en" | "ar" | "fa" } };

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
const localePath = (locale: string) => `/${locale}`;

const titles: Record<string, string> = {
  en: "HooshPod — Agentic AI Workflows & Low‑Latency LLM Inference",
  ar: "هوشپاد — تدفقات عمل ذكية بالوكلاء واستدلال منخفض الكمون",
  fa: "هوشپاد — جریان‌های عامل‌محور و استنتاج کم‌تأخیر LLM",
};

const descriptions: Record<string, string> = {
  en: "Design, simulate, orchestrate and monitor agentic AI with GPU streaming, observability and regionalized deployments.",
  ar: "صمّم وحاكِ ونسّق وراقِب أنظمة ذكاء عاملي مع بث على وحدات GPU ومراقبة ونشر إقليمي.",
  fa: "طراحی، شبیه‌سازی، ارکستراسیون و پایش هوش عامل‌محور با استریم GPU، مشاهده‌پذیری و استقرار منطقه‌ای.",
};

export function generateMetadata({ params }: Params): Metadata {
  const { locale } = params;
  const pathname = localePath(locale);
  const url = `${siteUrl}${pathname}`;

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}${localePath("en")}`,
        ar: `${siteUrl}${localePath("ar")}`,
        fa: `${siteUrl}${localePath("fa")}`,
        "x-default": `${siteUrl}${localePath("en")}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: titles[locale],
      description: descriptions[locale],
      locale,
      siteName: "HooshPod",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
    },
  };
}
