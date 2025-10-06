"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, Layers, Shield, Activity, BarChart3 } from "lucide-react";

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
  const features = [
    {
      title: "Agentic workflows",
      description:
        "Design, simulate, and orchestrate multi‑agent systems across the full lifecycle.",
      icon: <Users className="size-5" />,
    },
    {
      title: "GPU‑accelerated inference",
      description:
        "Streaming, autoscaling inference with low latency and optimal cost per token.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Security & regionalization",
      description:
        "GDPR‑ready with regional data controls; SOC 2/ISO 27001 available upon request.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Seamless integrations",
      description:
        "Connect to your tools, data sources, and runtime environments with ease.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "Observability & guardrails",
      description:
        "Trace agents end‑to‑end, enforce policies, and monitor quality with built‑in tooling.",
      icon: <Activity className="size-5" />,
    },
    {
      title: "Evaluation & simulation",
      description:
        "Assess prompts and agents with scenario simulation to improve reliability before launch.",
      icon: <BarChart3 className="size-5" />,
    },
  ];

  return (
    <section id="features" className="w-full py-20 md:py-32">
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
            Why HooshPod
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built for Agentic AI at enterprise scale
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Design, simulate, and run multi‑agent workflows on fast,
            cost‑efficient GPU inference—secure, compliant, and multilingual
            out‑of‑the‑box.
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
