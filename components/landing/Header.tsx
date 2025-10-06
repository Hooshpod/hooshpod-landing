"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Moon,
  Sun,
  ExternalLink,
  LanguagesIcon,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
  isScrolled: boolean;
  mounted: boolean;
  theme: string | undefined;
  toggleTheme: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  openCalendlyDirect: () => void;
};

export function Header({
  isScrolled,
  mounted,
  theme,
  toggleTheme,
  mobileMenuOpen,
  setMobileMenuOpen,
  openCalendlyDirect,
}: HeaderProps) {
  const t = useTranslations("common");
  const pathname = usePathname();

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
        <nav className="hidden md:flex gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.features")}
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.testimonials")}
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.faq")}
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
              <Link href={buildLocaleHref("en")} locale={false} prefetch>
                <DropdownMenuItem>{t("lang.english")}</DropdownMenuItem>
              </Link>
              <Link href={buildLocaleHref("fa")} locale={false} prefetch>
                <DropdownMenuItem>{t("lang.persian")}</DropdownMenuItem>
              </Link>
              <Link href={buildLocaleHref("ar")} locale={false} prefetch>
                <DropdownMenuItem>{t("lang.arabic")}</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {/* <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("auth.login")}
          </Link>
          <Button className="rounded-full" onClick={openCalendlyDirect}>
            {t("cta.getStarted")}
            <ExternalLink className="ml-1 size-4" />
          </Button> */}
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <DropdownMenuItem>{t("lang.english")}</DropdownMenuItem>
                </Link>
                <Link
                  href={buildLocaleHref("fa")}
                  locale={false}
                  prefetch
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <DropdownMenuItem>{t("lang.persian")}</DropdownMenuItem>
                </Link>
                <Link
                  href={buildLocaleHref("ar")}
                  locale={false}
                  prefetch
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <DropdownMenuItem>{t("lang.arabic")}</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="#features"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.features")}
            </Link>
            <Link
              href="#testimonials"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.testimonials")}
            </Link>
            <Link
              href="#faq"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.faq")}
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link
                href="#"
                className="py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("auth.login")}
              </Link>
              <Button
                className="rounded-full"
                onClick={() => {
                  openCalendlyDirect();
                  setMobileMenuOpen(false);
                }}
              >
                {t("cta.getStarted")}
                <ExternalLink className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
