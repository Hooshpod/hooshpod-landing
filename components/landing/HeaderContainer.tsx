"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Header } from "@/components/landing/Header";

export function HeaderContainer() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme =
      theme === "dark" || (theme === undefined && systemTheme === "dark")
        ? "light"
        : "dark";
    setTheme(nextTheme);
  }, [theme, systemTheme, setTheme]);

  return (
    <Header
      isScrolled={isScrolled}
      mounted={mounted}
      theme={theme}
      toggleTheme={toggleTheme}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
}
