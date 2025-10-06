"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import {
  ClipboardList,
  ShieldCheck,
  ShoppingCart,
  Plane,
  Ship,
  Stethoscope,
  Banknote,
  ArrowRight,
} from "lucide-react";

type ServicesProps = {
  onPrimaryCTA?: () => void;
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Services({ onPrimaryCTA }: ServicesProps) {
  const t = useTranslations("services");
  const agents = [
    {
      icon: <ClipboardList className="size-5" />,
      title: t("cards.0.title"),
      description: t("cards.0.desc"),
    },
    {
      icon: <ShieldCheck className="size-5" />,
      title: t("cards.1.title"),
      description: t("cards.1.desc"),
    },
    {
      icon: <ShoppingCart className="size-5" />,
      title: t("cards.2.title"),
      description: t("cards.2.desc"),
    },
    {
      icon: <Plane className="size-5" />,
      title: t("cards.3.title"),
      description: t("cards.3.desc"),
    },
    {
      icon: <Ship className="size-5" />,
      title: t("cards.4.title"),
      description: t("cards.4.desc"),
    },
    {
      icon: <Stethoscope className="size-5" />,
      title: t("cards.5.title"),
      description: t("cards.5.desc"),
    },
  ];

  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            {t("badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto w-full max-w-3xl"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full divide-y rounded-xl border bg-background/50 backdrop-blur"
          >
            {agents.map((a, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="px-4">
                <AccordionTrigger className="py-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="size-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      {a.icon}
                    </div>
                    <span className="text-base md:text-lg font-semibold">
                      {a.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-muted-foreground mb-4">{a.description}</p>
                  {onPrimaryCTA && (
                    <Button
                      size="sm"
                      onClick={onPrimaryCTA}
                      className="rounded-full"
                    >
                      {/** Use generic CTA label from services or fall back to common CTA */}
                      {t.has?.("cta") ? (t as any)("cta") : "Learn more"}
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
