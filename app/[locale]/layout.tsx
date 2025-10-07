import type React from "react";
import type { Metadata } from "next";

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: "en" | "ar" | "fa" };
};

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

const titles: Record<string, string> = {
  en: "HooshPod — Agentic AI Workflows & Low‑Latency LLM Inference",
  ar: "هوشپاد — تدفقات عمل ذكية بالوكلاء واستدلال منخفض الكمون",
  fa: "هوشپاد — ایجنت‌های هوش مصنوعی تخصصی برای سازمان‌ها",
};

const descriptions: Record<string, string> = {
  en: "Design, simulate, orchestrate and monitor agentic AI with GPU streaming, observability and regionalized deployments.",
  ar: "صمّم وحاكِ ونسّق وراقِب أنظمة ذكاء عاملي مع بث على وحدات GPU ومراقبة ونشر إقليمي.",
  fa: "طراحی، شبیه‌سازی، ارکستراسیون و پایش هوش عامل‌محور با استریم GPU، مشاهده‌پذیری و استقرار منطقه‌ای.",
};

export function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Metadata {
  const { locale } = params;
  const url = `${siteUrl}/${locale}`;
  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
        fa: `${siteUrl}/fa`,
        "x-default": `${siteUrl}/en`,
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

export default function LocaleLayout({ children }: LayoutProps) {
  return children;
}
