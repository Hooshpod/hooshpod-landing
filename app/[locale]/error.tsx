"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const t = useTranslations("errors");
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="container py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">500</h1>
      <p className="text-muted-foreground mb-6">{t("500.message")}</p>
      <Link href="/" className="underline">
        {t("backHome")}
      </Link>
    </main>
  );
}
