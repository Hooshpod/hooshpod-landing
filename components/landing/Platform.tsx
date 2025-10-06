"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Server, Gauge, ShieldCheck } from "lucide-react";

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

export function Platform() {
  const pillars = [
    {
      title: "Autoscaling GPU infra",
      description:
        "Right‑sized, region‑aware clusters with intelligent scaling for steady latency.",
      icon: <Server className="size-5" />,
    },
    {
      title: "Low‑latency streaming",
      description:
        "Token streaming and connection reuse to keep interactions snappy at scale.",
      icon: <Gauge className="size-5" />,
    },
    {
      title: "Model flexibility",
      description:
        "Run OSS and proprietary models; swap variants without workflow changes.",
      icon: <Cpu className="size-5" />,
    },
    {
      title: "Enterprise‑grade controls",
      description:
        "GDPR‑ready, regional data paths, and governance guardrails for production.",
      icon: <ShieldCheck className="size-5" />,
    },
  ];

  return (
    <section id="platform" className="w-full py-20 md:py-32">
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
            Platform
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            GPU inference and infra built for agents
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Streamlined, region‑aware GPU infrastructure that keeps costs down
            and performance up—without locking you into a single model.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
