"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export function FAQ() {
  const t = useTranslations("common");
  const faqs = [
    { question: t("faq.items.q1.q"), answer: t("faq.items.q1.a") },
    { question: t("faq.items.q2.q"), answer: t("faq.items.q2.a") },
    { question: t("faq.items.q3.q"), answer: t("faq.items.q3.a") },
    { question: t("faq.items.q4.q"), answer: t("faq.items.q4.a") },
    { question: t("faq.items.q5.q"), answer: t("faq.items.q5.a") },
    { question: t("faq.items.q6.q"), answer: t("faq.items.q6.a") },
  ];

  return (
    <section id="faq" className="w-full py-20 md:py-32">
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
            {t("faq.badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t("faq.title")}
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-border/40 py-2"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
