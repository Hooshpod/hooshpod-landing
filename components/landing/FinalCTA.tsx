"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type FinalCTAProps = {
  onPrimaryCTA?: () => void;
};

export function FinalCTA({ onPrimaryCTA }: FinalCTAProps) {
  const t = useTranslations("finalCta");
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6 text-center">
        <Badge
          className="rounded-full px-4 py-1.5 text-sm font-medium"
          variant="secondary"
        >
          {t("badge")}
        </Badge>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
          {t("title")}
        </h2>
        <p className="mt-3 text-muted-foreground md:text-lg max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" className="h-12 px-8" onClick={onPrimaryCTA}>
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
