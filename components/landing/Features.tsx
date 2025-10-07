"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, Layers, Shield, Activity, BarChart3 } from "lucide-react";
import { useTranslations } from "next-intl";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  const t = useTranslations("features");
  const features = [
    {
      title: t("items.0.title"),
      description: t("items.0.description"),
      icon: <Users className="size-5" />,
    },
    {
      title: t("items.1.title"),
      description: t("items.1.description"),
      icon: <Zap className="size-5" />,
    },
    {
      title: t("items.2.title"),
      description: t("items.2.description"),
      icon: <Shield className="size-5" />,
    },
    {
      title: t("items.3.title"),
      description: t("items.3.description"),
      icon: <Layers className="size-5" />,
    },
    {
      title: t("items.4.title"),
      description: t("items.4.description"),
      icon: <Activity className="size-5" />,
    },
    {
      title: t("items.5.title"),
      description: t("items.5.description"),
      icon: <BarChart3 className="size-5" />,
    },
  ];

  return (
    <section id="features" className="w-full py-14 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-12"
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
          <p className="max-w-[800px] text-muted-foreground text-base md:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
