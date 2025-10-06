import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("errors");
  return (
    <main className="container py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground mb-6">{t("404.message")}</p>
      <Link href="/" className="underline">
        {t("backHome")}
      </Link>
    </main>
  );
}
