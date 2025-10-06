"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type ResourcesProps = {
  onPrimaryCTA?: () => void;
};

export function Resources({ onPrimaryCTA }: ResourcesProps) {
  const items = [
    {
      title: "Agent Marketplace",
      description: "Browse pre-built templates",
      cta: "Explore",
    },
    {
      title: "Resources",
      description: '"2025 AI Agent Trends Across Industries"',
      cta: "Read Blog",
    },
    {
      title: "Support",
      description: "Join our developer community",
      cta: "Connect",
    },
  ];

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Get Started Today
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Agent Marketplace, Insights, and Community
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Card
              key={i}
              className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10"
            >
              <CardContent className="p-6 flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{it.title}</h3>
                <p className="text-muted-foreground">{it.description}</p>
                <div className="pt-2">
                  <Button onClick={onPrimaryCTA}>
                    {it.cta}
                    <ExternalLink className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
