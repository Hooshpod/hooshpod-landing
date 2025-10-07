"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { CheckCircle2, CircleX } from "lucide-react";

export function Comparison() {
  const t = useTranslations("comparison");
  const rows = [
    {
      feature: t("rows.0.feature"),
      hooshpod: t("rows.0.hooshpod"),
      competitors: t("rows.0.competitors"),
    },
    {
      feature: t("rows.1.feature"),
      hooshpod: t("rows.1.hooshpod"),
      competitors: t("rows.1.competitors"),
    },
    {
      feature: t("rows.2.feature"),
      hooshpod: t("rows.2.hooshpod"),
      competitors: t("rows.2.competitors"),
    },
    {
      feature: t("rows.3.feature"),
      hooshpod: t("rows.3.hooshpod"),
      competitors: t("rows.3.competitors"),
    },
    {
      feature: t("rows.4.feature"),
      hooshpod: t("rows.4.hooshpod"),
      competitors: t("rows.4.competitors"),
    },
  ];

  return (
    <section id="comparison" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((r, i) => (
            <Card
              key={i}
              className="h-full border-0 bg-background/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{r.feature}</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border p-3 rtl:flex-row-reverse">
                  <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium rtl:text-right">
                      {t("columns.hooshpod")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {r.hooshpod}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-3 rtl:flex-row-reverse">
                  <CircleX className="size-5 text-rose-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium rtl:text-right">
                      {t("columns.competitors")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {r.competitors}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
