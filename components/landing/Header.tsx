"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Moon,
  Sun,
  LanguagesIcon,
  Sparkles,
  ClipboardList,
  ShieldCheck,
  ShoppingCart,
  Plane,
  Ship,
  HeartPulse,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type HeaderProps = {
  isScrolled: boolean;
  mounted?: boolean;
  theme?: string | undefined;
  toggleTheme?: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
};

export function Header({
  isScrolled,
  mounted,
  theme,
  toggleTheme,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const t = useTranslations("common");
  const ts = useTranslations("services");
  const locale = useLocale();
  const pathname = usePathname();
  const { theme: themeFromProvider, setTheme } = useTheme();
  const [mountedInternal, setMountedInternal] = useState(false);
  useEffect(() => setMountedInternal(true), []);

  const effectiveTheme = theme ?? themeFromProvider ?? "system";
  const isMounted = mounted ?? mountedInternal;
  const safeToggleTheme =
    toggleTheme ??
    (() => {
      const next = effectiveTheme === "dark" ? "light" : "dark";
      setTheme(next);
    });
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const safeMobileMenuOpen = mobileMenuOpen ?? internalMobileOpen;
  const safeSetMobileMenuOpen = setMobileMenuOpen ?? setInternalMobileOpen;

  const buildLocaleHref = (targetLocale: string): string => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split("?")[0].split("#")[0].split("/");
    // Expect path like "/en/..."; ensure first segment is locale
    if (segments.length > 1) {
      segments[1] = targetLocale;
      return segments.join("/");
    }
    return `/${targetLocale}`;
  };
  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <div className="size-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center overflow-hidden">
            <Sparkles size={24} className="text-black" />
          </div>
          <span>{t("header.brand")}</span>
          <span className="hidden md:inline text-xs font-normal text-muted-foreground ml-2">
            {t("slogan")}
          </span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href={`/${locale}`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.home")}
          </Link>
          <Link
            href={`/${locale}/#features`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.features")}
          </Link>
          <Link
            href={`/${locale}/#services`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.services")}
          </Link>
          <div className="relative group">
            <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1">
              {t("nav.agents")}
              <ChevronDown className="size-3" />
            </button>
            <div className="absolute left-0 mt-0 hidden group-hover:block">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-lg border bg-popover text-popover-foreground shadow-md min-w-[520px]">
                <Link
                  href={`/${locale}/agents/administrative-assistant`}
                  locale={false}
                  className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                >
                  <ClipboardList className="size-5 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {t("agents.administrativeAssistant")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ts("cards.0.shortDesc")}
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/agents/compliance`}
                  locale={false}
                  className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                >
                  <ShieldCheck className="size-5 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {t("agents.compliance")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ts("cards.1.shortDesc")}
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/agents/procurement`}
                  locale={false}
                  className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                >
                  <ShoppingCart className="size-5 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {t("agents.procurement")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ts("cards.2.shortDesc")}
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/agents/aviation`}
                  locale={false}
                  className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                >
                  <Plane className="size-5 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {t("agents.aviation")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ts("cards.3.shortDesc")}
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/agents/shipping`}
                  locale={false}
                  className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                >
                  <Ship className="size-5 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {t("agents.shipping")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ts("cards.4.shortDesc")}
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/agents/healthcare`}
                  locale={false}
                  className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                >
                  <HeartPulse className="size-5 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {t("agents.healthcare")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ts("cards.5.shortDesc")}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Link
            href={`/${locale}/#how-it-works`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.howItWorks")}
          </Link>
          <Link
            href={`/${locale}/#faq`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.faq")}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.blog")}
          </Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          {/* Language switcher dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-3 rounded-full text-xs space-x-2 rtl:space-x-reverse"
              >
                <LanguagesIcon className="size-4" />
                {t("lang.label")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[10rem] rtl:text-right"
            >
              <DropdownMenuSeparator />
              <Link
                href={buildLocaleHref("en")}
                locale={false}
                prefetch
                onClick={(e) => {
                  e.preventDefault();
                  window.location.assign(buildLocaleHref("en"));
                }}
              >
                <DropdownMenuItem>{t("lang.english")}</DropdownMenuItem>
              </Link>
              <Link
                href={buildLocaleHref("fa")}
                locale={false}
                prefetch
                onClick={(e) => {
                  e.preventDefault();
                  window.location.assign(buildLocaleHref("fa"));
                }}
              >
                <DropdownMenuItem>{t("lang.persian")}</DropdownMenuItem>
              </Link>
              <Link
                href={buildLocaleHref("ar")}
                locale={false}
                prefetch
                onClick={(e) => {
                  e.preventDefault();
                  window.location.assign(buildLocaleHref("ar"));
                }}
              >
                <DropdownMenuItem>{t("lang.arabic")}</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={safeToggleTheme}
            className="rounded-full"
          >
            {isMounted && effectiveTheme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {/* Optional auth/login and CTA can go here */}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={safeToggleTheme}
            className="rounded-full"
          >
            {isMounted && effectiveTheme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => safeSetMobileMenuOpen(!safeMobileMenuOpen)}
          >
            {safeMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {safeMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
        >
          <div className="container py-4 flex flex-col gap-4">
            {/* Language switcher (mobile) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 px-3 rounded-full text-xs w-max"
                >
                  {t("lang.label")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[10rem]">
                <DropdownMenuLabel>{t("lang.label")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link
                  href={buildLocaleHref("en")}
                  locale={false}
                  prefetch
                  onClick={(e) => {
                    e.preventDefault();
                    safeSetMobileMenuOpen(false);
                    window.location.assign(buildLocaleHref("en"));
                  }}
                >
                  <DropdownMenuItem>{t("lang.english")}</DropdownMenuItem>
                </Link>
                <Link
                  href={buildLocaleHref("fa")}
                  locale={false}
                  prefetch
                  onClick={(e) => {
                    e.preventDefault();
                    safeSetMobileMenuOpen(false);
                    window.location.assign(buildLocaleHref("fa"));
                  }}
                >
                  <DropdownMenuItem>{t("lang.persian")}</DropdownMenuItem>
                </Link>
                <Link
                  href={buildLocaleHref("ar")}
                  locale={false}
                  prefetch
                  onClick={(e) => {
                    e.preventDefault();
                    safeSetMobileMenuOpen(false);
                    window.location.assign(buildLocaleHref("ar"));
                  }}
                >
                  <DropdownMenuItem>{t("lang.arabic")}</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href={`/${locale}/#features`}
              className="py-2 text-sm font-medium"
              onClick={() => safeSetMobileMenuOpen(false)}
            >
              {t("nav.features")}
            </Link>
            <Link
              href={`/${locale}`}
              className="py-2 text-sm font-medium"
              onClick={() => safeSetMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href={`/${locale}/#services`}
              className="py-2 text-sm font-medium"
              onClick={() => safeSetMobileMenuOpen(false)}
            >
              {t("nav.services")}
            </Link>
            <div className="py-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {t("nav.agents")}
              </div>
              <div className="pl-4 space-y-2">
                <Link
                  href={`/${locale}/agents/administrative-assistant`}
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => safeSetMobileMenuOpen(false)}
                >
                  {t("agents.administrativeAssistant")}
                </Link>
                <Link
                  href={`/${locale}/agents/compliance`}
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => safeSetMobileMenuOpen(false)}
                >
                  {t("agents.compliance")}
                </Link>
                <Link
                  href={`/${locale}/agents/procurement`}
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => safeSetMobileMenuOpen(false)}
                >
                  {t("agents.procurement")}
                </Link>
                <Link
                  href={`/${locale}/agents/aviation`}
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => safeSetMobileMenuOpen(false)}
                >
                  {t("agents.aviation")}
                </Link>
                <Link
                  href={`/${locale}/agents/shipping`}
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => safeSetMobileMenuOpen(false)}
                >
                  {t("agents.shipping")}
                </Link>
                <Link
                  href={`/${locale}/agents/healthcare`}
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => safeSetMobileMenuOpen(false)}
                >
                  {t("agents.healthcare")}
                </Link>
              </div>
            </div>
            <Link
              href={`/${locale}/#how-it-works`}
              className="py-2 text-sm font-medium"
              onClick={() => safeSetMobileMenuOpen(false)}
            >
              {t("nav.howItWorks")}
            </Link>
            <Link
              href={`/${locale}/#faq`}
              className="py-2 text-sm font-medium"
              onClick={() => safeSetMobileMenuOpen(false)}
            >
              {t("nav.faq")}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="py-2 text-sm font-medium"
              onClick={() => safeSetMobileMenuOpen(false)}
            >
              {t("nav.blog")}
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
