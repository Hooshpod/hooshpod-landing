"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FinalCTAProps = {
  onPrimaryCTA?: () => void;
};

export function FinalCTA({ onPrimaryCTA }: FinalCTAProps) {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6 text-center">
        <Badge
          className="rounded-full px-4 py-1.5 text-sm font-medium"
          variant="secondary"
        >
          Ready to act intelligently?
        </Badge>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
          Deploy agents that act intelligently for your business
        </h2>
        <p className="mt-3 text-muted-foreground md:text-lg max-w-2xl mx-auto">
          Schedule a demo and see how specialized agents accelerate decisions,
          reduce costs, and ensure compliance.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" className="h-12 px-8" onClick={onPrimaryCTA}>
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
