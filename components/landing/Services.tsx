"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import {
  ClipboardList,
  ShieldCheck,
  ShoppingCart,
  Plane,
  Ship,
  Stethoscope,
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
  const slugs = [
    "administrative-assistant",
    "compliance",
    "procurement",
    "aviation",
    "shipping",
    "healthcare",
  ];
  const agents = [
    {
      icon: <ClipboardList className="size-6" />,
      title: t("cards.0.title"),
      shortDesc: t("cards.0.shortDesc"),
      description: t("cards.0.description"),
    },
    {
      icon: <ShieldCheck className="size-6" />,
      title: t("cards.1.title"),
      shortDesc: t("cards.1.shortDesc"),
      description: t("cards.1.description"),
    },
    {
      icon: <ShoppingCart className="size-6" />,
      title: t("cards.2.title"),
      shortDesc: t("cards.2.shortDesc"),
      description: t("cards.2.description"),
    },
    {
      icon: <Plane className="size-6" />,
      title: t("cards.3.title"),
      shortDesc: t("cards.3.shortDesc"),
      description: t("cards.3.description"),
    },
    {
      icon: <Ship className="size-6" />,
      title: t("cards.4.title"),
      shortDesc: t("cards.4.shortDesc"),
      description: t("cards.4.description"),
    },
    {
      icon: <Stethoscope className="size-6" />,
      title: t("cards.5.title"),
      shortDesc: t("cards.5.shortDesc"),
      description: t("cards.5.description"),
    },
  ];

  return (
    <section id="services" className="w-full py-14 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            {t("badge")}
          </Badge>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="max-w-[900px] text-muted-foreground text-base md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {agents.map((agent, i) => (
            <motion.div key={i} variants={item}>
              <Link
                href={`/agents/${slugs[i]}`}
                locale={false}
                target="_blank"
                aria-label={agent.title}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="size-12 rounded-xl bg-gradient-to-br dark:from-primary/20 dark:to-primary/10 from-black/20 to-black/10 flex items-center justify-center dark:text-primary text-black group-hover:scale-110 transition-transform duration-300">
                        {agent.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{agent.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {agent.shortDesc}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between h-64 ">
                    <p className="text-muted-foreground text-sm text-justify leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Features and Benefits removed as requested */}

                    {onPrimaryCTA && (
                      <Button
                        className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors items-center"
                        variant="outline"
                      >
                        {t("cta")}
                        <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
