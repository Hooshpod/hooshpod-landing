"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Sparkles,
  Instagram,
} from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const tc = useTranslations("common");

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-col gap-8 px-4 py-8 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                <Sparkles className="size-4 dark:text-primary text-black" />
              </div>
              <span>{t("brand")}</span>
              <Sparkles className="size-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              {t("description")}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4" />
                <span>{t("contact.email")}</span>
              </div>
              <a
                href={`tel:${t("contact.phone")}`}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Phone className="size-4" />
                <span>{t("contact.phone")}</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span>{t("contact.address")}</span>
              </div>
              {t.has?.("contact.postalCode") && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center justify-center size-4 rounded-sm bg-primary/10 text-primary text-[10px]">
                    #
                  </span>
                  <span>{(t as any)("contact.postalCode")}</span>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Link
                href={t("social.github")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href={t("social.twitter")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href={t("social.linkedin")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href={t("social.youtube")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="size-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href={t("social.instagram")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="size-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">{t("sections.product.title")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/#features`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.product.features")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/#services`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.product.services")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/#how-it-works`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tc("nav.howItWorks")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/#faq`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tc("nav.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">
              {t("sections.resources.title")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("sections.resources.blog")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">{tc("agents.menuLabel")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/agents/administrative-assistant"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  locale={false}
                >
                  {tc("agents.administrativeAssistant")}
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/compliance"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  locale={false}
                >
                  {tc("agents.compliance")}
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/procurement"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  locale={false}
                >
                  {tc("agents.procurement")}
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/aviation"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  locale={false}
                >
                  {tc("agents.aviation")}
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/shipping"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  locale={false}
                >
                  {tc("agents.shipping")}
                </Link>
              </li>
              <li>
                <Link
                  href="/agents/healthcare"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  locale={false}
                >
                  {tc("agents.healthcare")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-6 md:pt-8">
          <p className="text-xs text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
