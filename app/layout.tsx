import type React from "react";
import "@/styles/globals.css";
import { Inter, Vazirmatn, Cairo } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { isRtl } from "@/i18n";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const cairo = Cairo({ subsets: ["arabic"], display: "swap" });
const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap" });

export const metadata: Metadata = {
  title: "HooshPod — Agentic AI Workflows & Low‑Latency LLM Inference",
  description:
    "Build and run agentic AI workflows on GPU infra with streaming, observability, and regionalized deployments.",
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  ),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const fontForLocale =
    locale === "fa" ? vazirmatn : locale === "ar" ? cairo : inter;
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        {(() => {
          const siteUrl = (
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
          ).replace(/\/$/, "");
          const org = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HooshPod",
            url: siteUrl,
            logo: `${siteUrl}/favicon.ico`,
          };
          const webSite = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "HooshPod",
            url: siteUrl,
            inLanguage: locale,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          };
          return (
            <>
              <JsonLd schema={org} />
              <JsonLd schema={webSite} />
            </>
          );
        })()}
      </head>
      <body className={fontForLocale.className}>
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone="UTC"
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
