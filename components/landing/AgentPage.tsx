"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle, Clock, Users, Zap } from "lucide-react";

type AgentPageProps = {
  agentKey: string;
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function AgentPage({ agentKey }: AgentPageProps) {
  const t = useTranslations(`agents.${agentKey}`);

  return (
    <div className="w-full text-foreground">
      {/* Hero Section */}
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("title")}
            </h1>
            <p className="max-w-[900px] text-muted-foreground md:text-lg">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <motion.div variants={item} className="space-y-6">
              <h2 className="text-3xl font-bold">{t("description.title")}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("description.content")}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-primary flex-shrink-0" />
                    <span className="text-sm">
                      {t(`description.features.${i - 1}`)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={item}
              className="flex items-center justify-center"
            >
              <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="size-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="size-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    {t("description.visual")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("howItWorks.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("howItWorks.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {[1, 2, 3, 4].map((step) => (
              <motion.div key={step} variants={item}>
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-bold text-primary">
                        {step}
                      </span>
                    </div>
                    <CardTitle className="text-lg">
                      {t(`howItWorks.steps.${step - 1}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {t(`howItWorks.steps.${step - 1}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Flow Section */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("flow.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("flow.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid gap-6">
              {[1, 2, 3, 4, 5].map((step, index) => (
                <motion.div
                  key={step}
                  variants={item}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="size-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      {step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {t(`flow.steps.${index}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`flow.steps.${index}.description`)}
                    </p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute left-5 top-10 w-0.5 h-6 bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("benefits.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("benefits.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3, 4, 5, 6].map((benefit) => (
              <motion.div key={benefit} variants={item}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="size-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">
                        {t(`benefits.items.${benefit - 1}.title`)}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {t(`benefits.items.${benefit - 1}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-primary/5">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8">
                {t("cta.primary")}
                <ArrowRight className="ml-2 size-4 transform rtl:rotate-180" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                {t("cta.secondary")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
